import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import BookingWidget from "@/components/BookingWidget";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Clip from "@/components/Clip";
import { asset, CONTACT, planHref } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Avocado Domki – komfort i natura w jednym miejscu",
  description: "Avocado Domki w Kuśniach koło Sieradza: stylowe, całoroczne domki w otoczeniu brzozowego lasu, kilka kroków od sal bankietowych. Klimatyzacja, aneks kuchenny, sauna i balia. Rezerwacja online.",
};

const SPECS = [
  ["8", "domków Superior"],
  ["40 m²", "powierzchni"],
  ["do 6", "osób w domku"],
  ["2", "sypialnie + salon"],
];

const AMENITIES = [
  "Klimatyzacja z funkcją ogrzewania i chłodzenia",
  "Nowoczesna łazienka z prysznicem – wyposażona w suszarkę do włosów oraz zestaw kosmetyków hotelowych",
  "Funkcjonalny aneks kuchenny – do dyspozycji Gości czajnik, ekspres do kawy, lodówka oraz zastawa stołowa",
  "Telewizor i bezpłatne Wi-Fi",
  "Łóżeczko dziecięce na życzenie",
  "Bezobsługowe zameldowanie i wymeldowanie 24/7 – pełna swoboda i niezależność",
  "Sauna i balia na terenie kompleksu – dostępne na życzenie Gości, idealne na chwilę odprężenia",
  "Parking bezpośrednio przy domkach – wygodny dostęp do miejsca noclegowego",
];

const PICS = [
  { src: "/img/domek-taras.webp", alt: "Domki Avocado z tarasem wśród brzóz" },
  { src: "/img/domek-wnetrze.webp", alt: "Wnętrze domku: salon z antresolą i aneksem" },
  { src: "/img/domek-sypialnia.webp", alt: "Sypialnia w domku" },
  { src: "/img/domek-4.webp", alt: "Taras domku numer 4" },
  { src: "/img/domek-lazienka.webp", alt: "Łazienka z prysznicem" },
  { src: "/img/domek-8.webp", alt: "Domek numer 8 między brzozami" },
  { src: "/img/domek-stol.webp", alt: "Stół na tarasie domku" },
  { src: "/img/domek-antresola.webp", alt: "Antresola z łóżkiem" },
];

const FAQ_N = [
  ["Ile kosztuje pobyt?", "Cenę dla wybranych dat i liczby osób sprawdzicie w systemie rezerwacji. W sprawie noclegu dla grupy przyjęciowej napiszcie do nas razem z zapytaniem o wydarzenie."],
  ["O której można się zameldować?", "Zameldowanie od 14:00, wymeldowanie do 11:00."],
  ["Czy w czasie pobytu odbywają się przyjęcia?", "Domki znajdują się przy naszych salach, w których organizujemy wesela i inne wydarzenia. Jeśli zależy Wam na spokojnym pobycie, zapytajcie przed rezerwacją o plany na wybrany termin."],
] as const;

export default function Noclegi() {
  return (
    <>
      <PageHero
        img="/img/domek-taras.webp"
        alt="Domki Avocado wśród brzóz"
        more={["/img/domek-8.webp", "/img/domek-wnetrze.webp", "/img/domek-4.webp"]}
        eyebrow="Avocado Domki"
        title="Komfort, natura i wyjątkowy wypoczynek w jednym miejscu"
        lead="Odpocznij w miejscu, gdzie nowoczesny komfort spotyka się z bliskością natury. Nasze stylowe, całoroczne domki położone są w malowniczym otoczeniu brzozowego lasu, tworząc idealną przestrzeń do relaksu i odpoczynku od codziennego zgiełku."
      >
        <a href="#rezerwacja" className="btn btn--light">Sprawdź dostępność</a>
        <a href={CONTACT.booking} className="btn btn--ghost" target="_blank" rel="noopener">Booking.com</a>
      </PageHero>

      <section className="facts">
        <div className="wrap facts__grid">
          {SPECS.map(([k, v], i) => (
            <Reveal key={v} delay={i * 0.06}><span className="facts__k">{k}</span><span className="facts__v">{v}</span></Reveal>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <Reveal className="split__img"><img src={asset("/img/domek-wnetrze.webp")} alt="Wnętrze domku Superior" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="split__txt">
            <p className="eyebrow">Avocado Domki</p>
            <h2>Wszystko, czego potrzebujesz do komfortowego pobytu</h2>
            <p>Zaledwie kilka kroków dzieli domki od naszych sal bankietowych, dzięki czemu stanowią doskonałe miejsce noclegowe dla Gości weselnych, uczestników przyjęć okolicznościowych i wydarzeń firmowych, a także wszystkich, którzy pragną spędzić czas w wyjątkowym otoczeniu.</p>
            <p>Każdy domek został wykończony i wyposażony w wysokim standardzie, z dbałością o detale, estetykę oraz wygodę naszych Gości.</p>
            <ul className="ticks">{AMENITIES.map((a) => <li key={a}>{a}</li>)}</ul>
            <p className="price">od <b>449 zł</b> / domek / noc · śniadanie 40 zł/os.</p>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--tight">
        <div className="wrap"><Reveal><Clip name="domki" label="Film o Avocado Domki" className="clip--wide" /></Reveal></div>
      </section>

      <section className="sec sec--tight sec--sand">
        <div className="wrap"><Reveal className="head"><p className="eyebrow">Galeria</p><h2>Domki z bliska</h2></Reveal></div>
        <Gallery pics={PICS} />
      </section>

      <section className="sec" id="rezerwacja">
        <div className="wrap">
          <Reveal className="head head--row">
            <div><p className="eyebrow">Rezerwacja online</p><h2>Wybierzcie termin pobytu</h2></div>
            <p className="head__aside">Wpiszcie daty i liczbę osób. Przed potwierdzeniem rezerwacji sprawdźcie wybrany wariant, cenę oraz warunki pobytu.</p>
          </Reveal>
          <Reveal delay={0.1}><BookingWidget /></Reveal>
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap split split--rev">
          <Reveal className="split__img"><img src={asset("/img/domek-sauna.webp")} alt="Sauna na terenie Avocado Domki" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="split__txt">
            <p className="eyebrow">Zatrzymaj się na dłużej</p>
            <h2>Odpocznij<br />wśród brzóz</h2>
            <p>Poranna kawa w otoczeniu natury, chwila relaksu w saunie lub balii i spokojny odpoczynek po wyjątkowym przyjęciu – tutaj każdy pobyt może stać się przyjemnym doświadczeniem.</p>
            <p>Odkryj miejsce, w którym elegancja, wygoda i natura tworzą idealne połączenie. Zapraszamy do naszych domków – poczuj się wyjątkowo, niezależnie od okazji!</p>
            <Link href={planHref("Wesele", { nocleg: "1" })} className="link">Zapytaj razem z weselem →</Link>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap duo">
          <Reveal>
            <div className="duo__item">
              <h2>Noclegi dla gości przyjęcia</h2>
              <p>Przyjeżdża do Was rodzina z daleka? Podajcie przy zapytaniu o przyjęcie orientacyjną liczbę osób, które chciałyby zostać na noc. Sprawdzimy dostępność i zasady rezerwacji domków na ten termin.</p>
              <Link href={planHref(undefined, { nocleg: "1" })} className="link">Zapytaj o przyjęcie z noclegiem →</Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="duo__item">
              <h2>Przyjazd na wypoczynek</h2>
              <p>Jeśli planujecie pobyt niezwiązany z przyjęciem, wybierzcie daty w systemie rezerwacji. Zobaczycie dostępne warianty i cenę dla Waszej grupy.</p>
              <a href="#rezerwacja" className="link">Wybierz termin pobytu →</a>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq items={FAQ_N} title="Pytania i odpowiedzi" sand />
      <CtaBand
        title={<>Macie pytania<br />o nocleg?</>}
        text="Napiszcie lub zadzwońcie do osoby zajmującej się domkami: 511 647 111, avocado.domki@gmail.com. Przyjęcie z noclegiem omówicie z Patrykiem."
        extra={{ nocleg: "1" }}
        button="Zapytaj o nocleg"
      />
    </>
  );
}
