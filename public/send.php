<?php
declare(strict_types=1);

/* Avocado — odbiór zgłoszeń ze strony (planer „Zacznij planować” i zapis na powiadomienia o wydarzeniach).
   Formularz wysyła JSON metodą POST; skrypt sprawdza dane i wysyła e-mail do Avocado.
   Niczego nie zapisuje na serwerze poza licznikiem zgłoszeń z jednego adresu IP (ochrona przed zalewaniem skrzynki). */

const MAIL_TO     = 'pmarcisiak@restauracjaavocado.pl';
const MAIL_FROM   = 'kontakt@restauracjaavocado.pl';   // skrzynka w domenie strony — inaczej poczta trafi do spamu
const RATE_MAX    = 6;                                  // tyle zgłoszeń z jednego IP…
const RATE_WINDOW = 3600;                               // …w ciągu godziny
const MIN_FILL_S  = 3;                                  // szybciej wypełnia tylko bot

date_default_timezone_set('Europe/Warsaw');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

function out(int $code, array $data): never
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Tekst z formularza: bez znaków sterujących, przycięty do limitu. */
function clean(mixed $v, int $max, bool $multiline = false): string
{
    if (is_int($v) || is_float($v)) {
        $v = (string) $v;
    }
    if (!is_string($v)) {
        return '';
    }
    $v = str_replace("\r\n", "\n", $v);
    $v = preg_replace($multiline ? '/[^\P{C}\n]/u' : '/\p{C}/u', $multiline ? '' : ' ', $v) ?? '';
    $v = trim($v);
    return function_exists('mb_substr') ? mb_substr($v, 0, $max, 'UTF-8') : substr($v, 0, $max);
}

function header_text(string $v): string
{
    return '=?UTF-8?B?' . base64_encode($v) . '?=';
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    out(405, ['ok' => false, 'error' => 'method']);
}

// zgłoszenie musi pochodzić z tej samej domeny co skrypt
$host   = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '') ?? '');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $host) {
    out(403, ['ok' => false, 'error' => 'origin']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$d   = json_decode($raw === false ? '' : $raw, true);
if (!is_array($d)) {
    out(400, ['ok' => false, 'error' => 'json']);
}

// pułapka na boty: udajemy sukces, nic nie wysyłamy
if (!empty($d['company_website']) || (int) ($d['fill_seconds'] ?? 0) < MIN_FILL_S) {
    out(200, ['ok' => true]);
}

$form = match ($d['form'] ?? '') { 'newsletter' => 'newsletter', 'swieta' => 'swieta', 'catering' => 'catering', default => 'planer' };

$name  = clean($d['name'] ?? '', 100);
$phone = clean($d['phone'] ?? '', 30);
$email = clean($d['email'] ?? '', 120);

$errors = [];
if ($form === 'newsletter') {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors[] = 'email'; }
} elseif ($form === 'catering') {
    // zamówienie cateringu świątecznego 2026 – ceny liczymy od nowa z katalogu, nie z przeglądarki
    $cat = json_decode((string) @file_get_contents(__DIR__ . '/catering-2026.json'), true);
    if (!is_array($cat)) { error_log('Avocado: brak catering-2026.json'); out(500, ['ok' => false, 'error' => 'catalog']); }
    if (time() > strtotime($cat['deadline'])) { out(410, ['ok' => false, 'error' => 'closed']); }
    $name  = clean($d['first'] ?? '', 80) . ' ' . clean($d['last'] ?? '', 100);
    $cAddr = function (mixed $a): array {
        $a = is_array($a) ? $a : [];
        return ['street' => clean($a['street'] ?? '', 120), 'building' => clean($a['building'] ?? '', 30), 'postcode' => clean($a['postcode'] ?? '', 6), 'city' => clean($a['city'] ?? '', 120)];
    };
    $cAddrOk = fn(array $a): bool => mb_strlen($a['street']) >= 2 && $a['building'] !== '' && preg_match('/^\d{2}-\d{3}$/', $a['postcode']) === 1 && mb_strlen($a['city']) >= 2;
    $home  = $cAddr($d['home'] ?? null);
    $deliv = ($d['delivery'] ?? '') === 'delivery';
    $other = $deliv && ($d['other'] ?? false) === true;
    $ship  = $other ? $cAddr($d['ship'] ?? null) : null;
    $want  = is_array($d['items'] ?? null) ? $d['items'] : [];
    $lines = [];
    $total = 0;
    foreach ($cat['categories'] as $c) {
        foreach ($c['items'] as $it) {
            $q = (int) ($want[$it['id']] ?? 0);
            if ($q < 1) { continue; }
            if ($q > 99) { $errors[] = 'qty'; continue; }
            $sum = $q * (int) $it['price'];
            $total += $sum;
            $lines[] = sprintf('- %s: %d × %s po %d zł = %d zł', $it['name'], $q, $it['unit'], $it['price'], $sum);
        }
    }
    if (!$lines) { $errors[] = 'items'; }
    if (mb_strlen(clean($d['first'] ?? '', 80)) < 2 || mb_strlen(clean($d['last'] ?? '', 100)) < 2) { $errors[] = 'name'; }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors[] = 'email'; }
    if (strlen(preg_replace('/\D/', '', $phone) ?? '') < 9) { $errors[] = 'phone'; }
    if (!$cAddrOk($home)) { $errors[] = 'home'; }
    if ($other && !$cAddrOk($ship)) { $errors[] = 'ship'; }
    if (($d['terms'] ?? false) !== true || ($d['rodo'] ?? false) !== true) { $errors[] = 'legal'; }
    $ref = preg_match('/^AV\d{4}-[A-Z0-9]{4}$/', (string) ($d['ref'] ?? '')) ? (string) $d['ref'] : 'AV' . date('md') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 4));
} elseif ($form === 'swieta') {
    // rezerwacja grupowa na spotkania świąteczne 11–12.12.2026: od 10 do 60 osób
    $xGuests = (int) clean($d['guests'] ?? '', 4);
    $xDate   = clean($d['date'] ?? '', 40);
    if (mb_strlen($name) < 2) { $errors[] = 'name'; }
    if (strlen(preg_replace('/\D/', '', $phone) ?? '') < 9) { $errors[] = 'phone'; }
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors[] = 'email'; }
    if ($xGuests < 10 || $xGuests > 60) { $errors[] = 'guests'; }
    if (!preg_match('/^1[12]\.12\.2026/', $xDate)) { $errors[] = 'date'; }
} else {
    if (mb_strlen($name) < 2) { $errors[] = 'name'; }
    if (strlen(preg_replace('/\D/', '', $phone) ?? '') < 9) { $errors[] = 'phone'; }
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors[] = 'email'; }
}
if ($errors) {
    out(422, ['ok' => false, 'error' => 'validation', 'fields' => $errors]);
}

// limit zgłoszeń z jednego adresu
$ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$file = rtrim(sys_get_temp_dir(), '/\\') . '/avocado_form_' . hash('sha256', $ip) . '.json';
$now  = time();
$hits = [];
if (is_file($file)) {
    $hits = json_decode((string) @file_get_contents($file), true);
    $hits = is_array($hits) ? array_values(array_filter($hits, fn($t) => is_int($t) && $t > $now - RATE_WINDOW)) : [];
}
if (count($hits) >= RATE_MAX) {
    out(429, ['ok' => false, 'error' => 'rate']);
}
$hits[] = $now;
@file_put_contents($file, json_encode($hits), LOCK_EX);

$line = fn(string $label, string $value): string => $value === '' ? '' : $label . ': ' . $value . "\n";
$page = clean($d['page'] ?? '', 300);

if ($form === 'catering') {
    $fmtAddr = fn(array $a): string => $a['street'] . ' ' . $a['building'] . ', ' . $a['postcode'] . ' ' . $a['city'];
    $notes   = clean($d['notes'] ?? '', 1000, true);
    $free    = $total >= (int) $cat['freeDeliveryFrom'];
    $subject = 'Catering świąteczny – zamówienie ' . $ref . ' – ' . $total . ' zł – ' . $name;
    $body  = "Nowe zamówienie cateringu świątecznego 2026 (formularz na restauracjaavocado.pl/catering/).\n";
    $body .= "Numer zgłoszenia: " . $ref . "\n\n";
    $body .= "ZAMÓWIONE PRODUKTY\n" . implode("\n", $lines) . "\n\n";
    $body .= "Wartość produktów: " . $total . " zł\n";
    $body .= 'Sposób otrzymania: ' . ($deliv ? 'DOSTAWA' . ($free ? ' (gratis w Sieradzu – wartość od ' . $cat['freeDeliveryFrom'] . ' zł)' : ' (koszt do uzgodnienia – wartość poniżej ' . $cat['freeDeliveryFrom'] . ' zł albo poza Sieradzem)') : 'odbiór osobisty ' . $cat['pickup']) . "\n";
    if ($ship) { $body .= 'Adres dostawy: ' . $fmtAddr($ship) . "\n"; }
    elseif ($deliv) { $body .= "Adres dostawy: jak adres zamieszkania\n"; }
    $body .= "\nZAMAWIAJĄCY\n";
    $body .= $line('Imię i nazwisko', $name);
    $body .= $line('Telefon', $phone);
    $body .= $line('E-mail', $email);
    $body .= 'Adres zamieszkania: ' . $fmtAddr($home) . "\n";
    if ($notes !== '') { $body .= "\nUwagi:\n" . $notes . "\n"; }
    $body .= "\nOŚWIADCZENIA (" . date('Y-m-d H:i') . ")\n- zaakceptował regulamin cateringu 2026, w tym zasady zadatku " . $cat['deposit'] . " zł\n- potwierdził zapoznanie się z klauzulą informacyjną RODO\n";
    $body .= "\nZadatek " . $cat['deposit'] . ' zł – klient dostał dane do przelewu (tytuł: ' . $cat['transferTitle'] . ' – ' . $ref . ").\n";
    $reply = $email;
    $replyName = $name;
} elseif ($form === 'swieta') {
    $company = clean($d['company'] ?? '', 120);
    $pkg     = clean($d['pkg'] ?? '', 40);
    $msg     = clean($d['msg'] ?? '', 2000, true);
    $subject = 'Rezerwacja grupowa – spotkanie świąteczne ' . substr($xDate, 0, 5) . ' – ' . $xGuests . ' os. – ' . ($company !== '' ? $company : $name);
    $body  = "Nowa rezerwacja grupowa na spotkanie świąteczne (strona Wydarzenia na restauracjaavocado.pl).
";
    $body .= "Klient wie, że rezerwację potwierdzi manager telefonicznie lub e-mailowo.

";
    $body .= $line('Termin', $xDate);
    $body .= $line('Liczba osób', (string) $xGuests);
    $body .= $line('Propozycja menu', $pkg !== '' ? $pkg : 'nie wybrano');
    $body .= "
";
    $body .= $line('Imię i nazwisko', $name);
    $body .= $line('Firma', $company);
    $body .= $line('Telefon', $phone);
    $body .= $line('E-mail', $email);
    if ($msg !== '') {
        $body .= "
Uwagi:
" . $msg . "
";
    }
    $reply = $email;
    $replyName = $name;
} elseif ($form === 'newsletter') {
    $subject = 'Zapis na powiadomienia o wydarzeniach: ' . $email;
    $body  = "Nowy zapis na powiadomienia o wydarzeniach Avocado (formularz na stronie Wydarzenia).\n\n";
    $body .= $line('E-mail', $email);
    $body .= "\nOsoba prosi o informację, gdy pojawi się nowy termin wydarzenia.\n";
    $reply = $email;
    $replyName = $email;
} else {
    $type     = clean($d['type'] ?? '', 60);
    $variant  = clean($d['variant'] ?? '', 120);
    $where    = clean($d['where'] ?? '', 160);
    $year     = clean($d['year'] ?? '', 4);
    $months   = clean($d['months'] ?? '', 200);
    $dateNote = clean($d['dateNote'] ?? '', 300);
    $guests   = clean($d['guests'] ?? '', 6);
    $stay     = ($d['stay'] ?? false) === true;
    $company  = clean($d['company'] ?? '', 120);
    $role     = clean($d['role'] ?? '', 120);
    $msg      = clean($d['msg'] ?? '', 2000, true);

    $subject = 'Zapytanie ze strony: ' . ($type !== '' ? $type : 'przyjęcie') . ($year !== '' ? ' ' . $year : '') . ' – ' . $name;
    $body  = "Nowe zapytanie z formularza „Zacznij planować” na restauracjaavocado.pl\n\n";
    $body .= $line('Okazja', $type . ($variant !== '' ? ' (' . $variant . ')' : ''));
    $body .= $line('Gdzie (catering)', $where);
    $body .= $line('Rok', $year);
    $body .= $line('Miesiące', $months);
    $body .= $line('Uwagi do terminu', $dateNote);
    $body .= $line('Liczba gości', $guests);
    $body .= 'Nocleg dla gości: ' . ($stay ? 'tak' : 'nie') . "\n\n";
    $body .= $line('Imię i nazwisko', $name);
    $body .= $line('Telefon', $phone);
    $body .= $line('E-mail', $email);
    $body .= $line('Firma', $company);
    $body .= $line('Stanowisko', $role);
    if ($msg !== '') {
        $body .= "\nWizja wydarzenia:\n" . $msg . "\n";
    }
    $reply = $email;
    $replyName = $name;
}

$body .= "\n--\nWysłano: " . date('Y-m-d H:i') . "\n";
$body .= $line('Strona', $page);
if ($reply !== '') {
    $body .= "Odpowiedz na tę wiadomość, żeby napisać bezpośrednio do zgłaszającego.\n";
}

$headers = [
    'From: ' . header_text('Avocado — formularz') . ' <' . MAIL_FROM . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    'X-Mailer: restauracjaavocado.pl',
];
if ($reply !== '') {
    array_splice($headers, 1, 0, ['Reply-To: ' . header_text($replyName) . ' <' . $reply . '>']);
}
$headers = implode("\r\n", $headers);
$encoded = rtrim(chunk_split(base64_encode($body)));

// test lokalny: AVOCADO_MAIL_DRYRUN=ścieżka zapisuje wiadomość do pliku zamiast wysyłać
$dry = getenv('AVOCADO_MAIL_DRYRUN');
if (is_string($dry) && $dry !== '') {
    $sent = @file_put_contents($dry, "To: " . MAIL_TO . "\nSubject: " . $subject . "\n" . $headers . "\n\n" . $body) !== false;
} else {
    $sent = @mail(MAIL_TO, header_text($subject), $encoded, $headers, '-f' . MAIL_FROM);
}

if (!$sent) {
    error_log('Avocado formularz: mail() nie wysłał zgłoszenia (' . $form . ')');
    out(500, ['ok' => false, 'error' => 'mail']);
}

// catering: kopia zgłoszenia dla klienta (z danymi do przelewu i linkami do dokumentów)
if ($form === 'catering') {
    $cBody  = "Dzień dobry,\n\ndziękujemy za zamówienie cateringu świątecznego w Restauracji Avocado. Poniżej kopia zgłoszenia.\n";
    $cBody .= "To potwierdzenie OTRZYMANIA zgłoszenia – zamówienie potwierdzimy po jego sprawdzeniu i zaksięgowaniu zadatku.\n\n";
    $cBody .= "Numer zgłoszenia: " . $ref . "\n\n" . implode("\n", $lines) . "\n\nWartość produktów: " . $total . " zł\n";
    $cBody .= 'Sposób otrzymania: ' . ($deliv ? 'dostawa' . ($free ? ' (gratis na terenie Sieradza)' : ' – koszt ustalimy przed potwierdzeniem zamówienia') : 'odbiór osobisty ' . $cat['pickup'] . ', Restauracja Avocado, Kuśnie 32A, 98-200 Sieradz') . "\n\n";
    $cBody .= "ZADATEK " . $cat['deposit'] . " zł\nRachunek: " . $cat['account'] . "\nTytuł przelewu: " . $cat['transferTitle'] . ' – ' . $ref . "\n";
    if ($total < (int) $cat['deposit']) { $cBody .= "Wartość zamówienia jest niższa niż zadatek – przed przelewem prosimy o kontakt, ustalimy płatność.\n"; }
    $cBody .= "\nRegulamin: https://www.restauracjaavocado.pl/catering/regulamin/\nKlauzula RODO: https://www.restauracjaavocado.pl/catering/rodo/\n";
    $cBody .= "\nW razie pytań: 511 647 111, " . MAIL_TO . "\n\nRestauracja Avocado\nM-invest Marek Molski, Kuśnie 32A, 98-200 Sieradz\n";
    $cHeaders = implode("\r\n", [
        'From: ' . header_text('Restauracja Avocado') . ' <' . MAIL_FROM . '>',
        'Reply-To: ' . header_text('Restauracja Avocado') . ' <' . MAIL_TO . '>',
        'MIME-Version: 1.0', 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: base64', 'X-Mailer: restauracjaavocado.pl',
    ]);
    $cSubject = 'Avocado – catering świąteczny: kopia zgłoszenia ' . $ref;
    if (is_string($dry) && $dry !== '') {
        @file_put_contents($dry, "\n\n===== KOPIA DLA KLIENTA\nTo: " . $email . "\nSubject: " . $cSubject . "\n" . $cHeaders . "\n\n" . $cBody, FILE_APPEND);
    } elseif (!@mail($email, header_text($cSubject), rtrim(chunk_split(base64_encode($cBody))), $cHeaders, '-f' . MAIL_FROM)) {
        error_log('Avocado formularz: nie wysłano kopii zamówienia cateringu do klienta');
    }
    out(200, ['ok' => true, 'ref' => $ref, 'total' => $total]);
}
out(200, ['ok' => true]);
