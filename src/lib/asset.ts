/** Ścieżka do pliku z /public z uwzględnieniem basePath (podgląd na GitHub Pages). */
export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${p}`;

export const CONTACT = {
  phone: "511 647 111",
  phoneHref: "tel:+48511647111",
  email: "pmarcisiak@restauracjaavocado.pl",
  address: "Kuśnie 32A, 98-200 Sieradz",
  maps: "https://maps.google.com/?q=Ku%C5%9Bnie+32A+Sieradz",
  mapsEmbed: "https://www.google.com/maps?q=Restauracja+Avocado,+Ku%C5%9Bnie+32A,+98-200+Sieradz&z=12&output=embed",
};

/** Hero / planer: wybór okazji przewija do formularza z uzupełnionym typem. */
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
