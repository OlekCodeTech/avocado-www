import type { Metadata } from "next";
import { CONTACT } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Polityka prywatności i cookies",
  description: "Jak Restauracja Avocado przetwarza dane osobowe osób, które kontaktują się z nami przez stronę, oraz jakich plików cookies używamy.",
};

/** Dane administratora – DO POTWIERDZENIA przez Avocado (pełna nazwa firmy, NIP, REGON / KRS). */
const ADMIN = {
  nazwa: "Restauracja Avocado",
  dopisek: "", // np. „TASTEGO sp. z o.o., KRS …, NIP …” – po potwierdzeniu przez Avocado
  adres: "Kuśnie 32A, 98-200 Sieradz",
};
const AKTUALIZACJA = "20 listopada 2026";

export default function Polityka() {
  return (
    <section className="legal">
      <div className="wrap legal__in">
        <p className="eyebrow">Dokumenty</p>
        <h1>Polityka prywatności i cookies</h1>
        <p className="legal__date">Ostatnia aktualizacja: {AKTUALIZACJA}</p>

        <h2>1. Kto jest administratorem danych</h2>
        <p>
          Administratorem danych osobowych przekazywanych przez stronę restauracjaavocado.pl jest {ADMIN.nazwa}
          {ADMIN.dopisek ? `, ${ADMIN.dopisek}` : ""}, {ADMIN.adres}. W sprawach danych osobowych możesz napisać na adres{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> albo zadzwonić: {CONTACT.phone}.
        </p>

        <h2>2. Jakie dane zbieramy i po co</h2>
        <ul>
          <li>
            <b>Zapytanie o przyjęcie (formularz „Zacznij planować”)</b> – imię i nazwisko, telefon, e-mail, a jeśli je podasz także
            nazwa firmy, stanowisko oraz informacje o planowanym wydarzeniu. Używamy ich, żeby odpowiedzieć na zapytanie, przygotować
            ofertę i umówić spotkanie. Podstawa: działania przed zawarciem umowy na Twoje żądanie (art. 6 ust. 1 lit. b RODO) oraz nasz
            prawnie uzasadniony interes, czyli obsługa korespondencji (art. 6 ust. 1 lit. f RODO).
          </li>
          <li>
            <b>Powiadomienia o wydarzeniach</b> – adres e-mail. Używamy go wyłącznie do poinformowania Cię o nowych terminach naszych
            wydarzeń. Podstawa: Twoja zgoda (art. 6 ust. 1 lit. a RODO), którą możesz w każdej chwili wycofać, pisząc do nas.
          </li>
          <li>
            <b>Kontakt telefoniczny i mailowy</b> – dane, które sam nam przekażesz, przetwarzamy, żeby odpowiedzieć i prowadzić rozmowę
            (art. 6 ust. 1 lit. f RODO).
          </li>
          <li>
            <b>Rezerwacja domków</b> – rezerwację online obsługuje system IdoBooking (IdoSell sp. z o.o.). Dane wpisane w systemie
            rezerwacji są przetwarzane na zasadach opisanych w trakcie rezerwacji, w celu jej realizacji.
          </li>
        </ul>

        <h2>3. Jak długo przechowujemy dane</h2>
        <p>
          Dane z zapytań przechowujemy do czasu zakończenia rozmów, a jeśli dojdzie do zawarcia umowy – przez czas jej realizacji i okres
          wymagany przepisami (m.in. podatkowymi). Zapytania, które nie zakończyły się umową, usuwamy najpóźniej po 12 miesiącach.
          Adres e-mail do powiadomień przechowujemy do wycofania zgody.
        </p>

        <h2>4. Komu przekazujemy dane</h2>
        <p>
          Dane mogą trafić do firm, które świadczą dla nas usługi: hostingu strony (OVH), poczty elektronicznej (Google), systemu
          rezerwacji domków (IdoSell) oraz – tylko po wyrażeniu zgody na cookies reklamowe – do Meta Platforms (Facebook, Instagram).
          Meta może przekazywać dane poza Europejski Obszar Gospodarczy na podstawie standardowych klauzul umownych zatwierdzonych przez
          Komisję Europejską. Nie sprzedajemy danych osobowych.
        </p>

        <h2>5. Twoje prawa</h2>
        <p>
          Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia oraz sprzeciwu
          wobec przetwarzania. Jeśli przetwarzamy dane na podstawie zgody, możesz ją w każdej chwili wycofać – bez wpływu na zgodność
          z prawem wcześniejszego przetwarzania. Masz też prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych
          (ul. Stawki 2, 00-193 Warszawa). Podanie danych jest dobrowolne, ale bez numeru telefonu nie odpowiemy na zapytanie z formularza.
        </p>

        <h2 id="cookies">6. Pliki cookies i podobne technologie</h2>
        <ul>
          <li>
            <b>Niezbędne</b> – w pamięci przeglądarki zapisujemy Twoją decyzję dotyczącą cookies reklamowych oraz informację, że
            zamknąłeś okno z ogłoszeniem w danej wizycie. Bez tego strona nie zapamiętałaby wyboru.
          </li>
          <li>
            <b>Reklamowe (piksel Meta)</b> – tylko jeśli się zgodzisz. Piksel zapisuje pliki cookies (_fbp, _fbc) i przekazuje Mecie
            informacje o odwiedzinach strony oraz o wysłaniu formularza, dzięki czemu możemy mierzyć skuteczność reklam na Facebooku
            i Instagramie. Zgodę możesz zmienić w każdej chwili w stopce strony, w „Ustawieniach cookies”.
          </li>
          <li>
            <b>Treści zewnętrzne</b> – mapa dojazdu korzysta z kafelków OpenStreetMap, a wyszukiwarka wolnych terminów z systemu
            IdoBooking. Te serwisy otrzymują adres IP Twojego urządzenia, żeby wyświetlić treść.
          </li>
        </ul>
        <p>Nie używamy Google Analytics ani innych narzędzi analitycznych.</p>
      </div>
    </section>
  );
}
