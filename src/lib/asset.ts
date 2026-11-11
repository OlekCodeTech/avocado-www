/** Ścieżka do pliku z /public z uwzględnieniem basePath (podgląd na GitHub Pages). */
export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${p}`;

export const CONTACT = {
  phone: "511 647 111",
  phoneHref: "tel:+48511647111",
  phone2: "572 460 010",
  phone2Href: "tel:+48572460010",
  email: "pmarcisiak@restauracjaavocado.pl",
  email2: "avocado.sieradz@gmail.com",
  address: "Kuśnie 32A, 98-200 Sieradz",
  maps: "https://maps.google.com/?q=Ku%C5%9Bnie+32A+Sieradz",
  mapsEmbed:
    "https://www.google.com/maps?q=Restauracja+Avocado,+Ku%C5%9Bnie+32A,+98-200+Sieradz&z=12&output=embed",
  booking: "https://www.booking.com/hotel/pl/avocado-domki.pl.html",
  domkiPhone: "501 234 962",
  domkiPhoneHref: "tel:+48501234962",
  domkiEmail: "avocado.domki@gmail.com",
};

/** Silnik rezerwacji IdoBooking (konto klienta: client61565). Docelowo własna subdomena, np. rezerwacje.restauracjaavocado.pl. */
export const IDO = {
  engine: "https://client61565.idobooking.com/book-now/",
  rooms: "https://client61565.idobooking.com/book-now/index.php?module=rooms",
};

/** Czasy dojazdu – z obecnej strony (zakładka Kontakt). */
export const DRIVE = [
  { name: "Sieradz", min: 10 },
  { name: "Zduńska Wola", min: 20 },
  { name: "Łask", min: 30 },
  { name: "Wieluń", min: 40 },
  { name: "Wieruszów", min: 40 },
  { name: "Łódź", min: 55 },
  { name: "Kalisz", min: 55 },
] as const;

export const HALLS = {
  bankietowa: { name: "Sala bankietowa", cap: 180, tag: "Nowoczesne wnętrza", href: "/sale/#bankietowa" },
  plenerowa: { name: "Sala plenerowa", cap: 130, tag: "Industrialny sznyt wśród brzóz", href: "/sale/#plenerowa" },
} as const;

export const NAV = [
  { label: "Wesela", href: "/wesela/" },
  { label: "Przyjęcia", href: "/przyjecia/" },
  { label: "Sale", href: "/sale/" },
  { label: "Avocado Domki", href: "/noclegi/" },
  { label: "Wydarzenia", href: "/wydarzenia/" },
  { label: "O nas", href: "/o-nas/" },
  { label: "Kontakt", href: "/kontakt/" },
] as const;

/** Planer zapytania: wybór okazji z hero / kafelków / podstron. */
export const PLAN_EVENT = "avo:plan";
export const EVENT_TYPES = [
  "Wesele",
  "Chrzciny",
  "Komunia",
  "Urodziny / 18-stka",
  "Jubileusz",
  "Impreza firmowa",
  "Inne",
] as const;
export type EventType = (typeof EVENT_TYPES)[number];

/** Link do planera z wybraną okazją (działa z każdej podstrony). */
export const planHref = (okazja?: string, extra?: Record<string, string>) => {
  const q = new URLSearchParams({ ...(okazja ? { okazja } : {}), ...(extra || {}) }).toString();
  return `/kontakt/${q ? `?${q}` : ""}#planer`;
};

export const FAQ = [
  ["Jak mogę dokonać rezerwacji?", "Skontaktuj się z nami telefonicznie lub mailowo – omówimy szczegóły i dostępność terminu."],
  ["Jakie są warunki wynajmu sali?", "Rezerwacja wymaga podpisania umowy i wpłaty zadatku."],
  ["Czy sala posiada pokoje noclegowe?", "Tak. W sali bankietowej mamy dwa pokoje dwuosobowe – głównie dla naszych Par Młodych. Dla Gości przygotowaliśmy Avocado Domki: 8 całorocznych domków kilka kroków od sal."],
  ["Czy można zorganizować wydarzenie na świeżym powietrzu?", "Tak, oferujemy również przestrzeń plenerową."],
  ["Czy oferujecie usługę koordynatora wesel?", "Tak, każda impreza ma dedykowanego koordynatora."],
  ["Czy sale są klimatyzowane?", "Tak, zapewniamy komfortową temperaturę o każdej porze roku."],
  ["Czy sale posiadają oddzielne zaplecze kuchenne?", "Tak, każda sala ma własne zaplecze gastronomiczne."],
  ["Jakie opcje ustawień stołów oferujecie?", "Oferujemy stoły okrągłe i prostokątne, z możliwością dowolnej aranżacji."],
  ["Czy sale nadają się na inne eventy niż wesela?", "Oczywiście! Organizujemy również konferencje, bankiety i inne wydarzenia."],
  ["Czy można wynająć salę na eventy firmowe?", "Tak, oferujemy przestrzeń idealną na spotkania biznesowe."],
  ["Czy sala może być wynajęta na wydarzenia cykliczne?", "Tak, organizujemy zarówno jednorazowe eventy, jak i regularne spotkania."],
  ["Czy można organizować imprezy tematyczne?", "Tak, przestrzeń dostosujemy do wybranego motywu."],
  ["Czy sala nadaje się do sesji foto i video?", "Tak, nasza przestrzeń to idealne tło dla sesji zdjęciowych i nagrań."],
  ["Czy w umowie zawarte są zasady anulacji rezerwacji?", "Tak, szczegółowe informacje są dostępne w umowie."],
  ["Czy obiekt jest przystosowany dla osób niepełnosprawnych?", "Tak, nasza przestrzeń jest w pełni dostępna."],
] as const;
