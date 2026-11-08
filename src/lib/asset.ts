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
  booking: "#", // TODO: link do obiektu na Booking.com od klienta
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
  { label: "Noclegi", href: "/noclegi/" },
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
  ["Jak mogę zarezerwować termin?", "Najprościej przez planer na stronie albo telefonicznie – oddzwaniamy z wolnymi terminami i zapraszamy na spotkanie w Avocado. Rezerwację potwierdza umowa i zadatek."],
  ["Ile osób pomieszczą sale?", "Sala bankietowa do 180 gości, sala plenerowa do 130. Obie są klimatyzowane i mają własne zaplecze gastronomiczne oraz sanitarne."],
  ["Czy można zorganizować ślub w plenerze?", "Tak. Ceremonię aranżujemy w naszym ogrodzie, wśród brzóz – a w razie niepogody przenosimy ją pod dach bez stresu."],
  ["Czy goście mogą u Was przenocować?", "Tak. Na terenie Avocado są domki dla gości oraz pokoje przy sali bankietowej. Szczegóły i cennik podajemy przy wycenie przyjęcia."],
  ["Czy menu można dopasować do nas?", "Zawsze. Menu układamy razem z Wami – od klasyki po kuchnię nowoczesną, z uwzględnieniem diet i alergii. Na spotkaniu pokażemy przykładowe propozycje."],
  ["Czy jest parking i dojazd dla gości z daleka?", "Mamy własny, bezpłatny parking. Z Łodzi, Kalisza i Wielunia jedzie się do nas około godziny, a Sieradz jest 10 minut drogi."],
  ["Czy obiekt jest dostępny dla osób z niepełnosprawnością?", "Tak, sale i zaplecze są w pełni dostępne."],
  ["Czy organizujecie też imprezy firmowe i konferencje?", "Tak – od kameralnych spotkań po konferencje z nagłośnieniem, projektorem i mikrofonami. Każde wydarzenie prowadzi dedykowany koordynator."],
] as const;
