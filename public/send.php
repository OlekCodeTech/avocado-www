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

$form = ($d['form'] ?? '') === 'newsletter' ? 'newsletter' : 'planer';

$name  = clean($d['name'] ?? '', 100);
$phone = clean($d['phone'] ?? '', 30);
$email = clean($d['email'] ?? '', 120);

$errors = [];
if ($form === 'newsletter') {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors[] = 'email'; }
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

if ($form === 'newsletter') {
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
out(200, ['ok' => true]);
