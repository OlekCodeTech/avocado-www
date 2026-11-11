import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import BookingWidget from "@/components/BookingWidget";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { asset, CONTACT, IDO, planHref } from "@/lib/asset";

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
  ["Ile kosztuje nocleg?", "Ceny zaczynają się od 449 zł za domek za noc (2 osoby) i zależą od terminu oraz liczby gości. Aktualne ceny i dostępność pokazuje wyszukiwarka poniżej."],
  ["Czy jest śniadanie?", "Tak – śniadanie w restauracji dokupicie przy rezerwacji (40 zł od osoby za noc)."],
  ["Jakie są warunki rezerwacji?", "Przedpłata 10%, bezkosztowa anulacja zgodnie z regulaminem silnika rezerwacji. Dowolna długość i początek pobytu."],
  ["O której zameldowanie?", "Zameldowanie i wymeldowanie są bezobsługowe i dostępne 24/7 – pełna swoboda i niezależność."],
  ["Czy goście weselni mogą zarezerwować domki razem z przyjęciem?", "Tak. Zaznaczcie w planerze „potrzebujemy noclegu” – zablokujemy domki dla Waszych gości i przygotujemy jedną ofertę."],
  ["Czy można przyjechać z dzieckiem lub większą rodziną?", "Domek mieści do 6 osób (2 sypialnie, rozkładane sofy), a na życzenie dostawimy łóżeczko. Na terenie jest plac zabaw."],
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

      <section className="sec sec--tight sec--sand">
        <div className="wrap"><Reveal className="head"><p className="eyebrow">Galeria</p><h2>Domki z bliska</h2></Reveal></div>
        <Gallery pics={PICS} />
      </section>

      <section className="sec" id="rezerwacja">
        <div className="wrap">
          <Reveal className="head head--row">
            <div><p className="eyebrow">Rezerwacja online</p><h2>Sprawdźcie wolne terminy</h2></div>
            <p className="head__aside">Wybierzcie daty i liczbę gości – system pokaże dostępne domki i cenę. Bez prowizji portali.</p>
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
        <div className="wrap">
          <Reveal className="head head--center"><p className="eyebrow">Dla kogo</p><h2>Nie tylko na wesele</h2></Reveal>
          <div className="tiles tiles--3">
            {[
              { t: "Goście weselni", p: "Rodzina z daleka śpi kilka kroków od sali, a rano wszyscy spotykają się na poprawinach.", href: planHref("Wesele", { nocleg: "1" }), img: "/img/plener-lampki.webp" },
              { t: "Weekend za miastem", p: "Las, cisza, śniadanie w restauracji i 10 minut do Sieradza. Rezerwacja online.", href: IDO.engine, img: "/img/domek-8.webp" },
              { t: "Firmy", p: "Szkolenie lub integracja z noclegiem – sala, catering i domki w jednym miejscu.", href: planHref("Impreza firmowa", { nocleg: "1" }), img: "/img/firma-stol.webp" },
            ].map((x, k) => (
              <Reveal key={x.t} delay={k * 0.08}>
                <Link className="tile" href={x.href} target={x.href.startsWith("http") ? "_blank" : undefined}>
                  <div className="tile__media"><img src={asset(x.img)} alt={x.t} loading="lazy" /></div>
                  <h3>{x.t}</h3><p>{x.p}</p><span className="more">{x.href.startsWith("http") ? "Rezerwuj" : "Zapytaj"} <i>→</i></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq items={FAQ_N} title="Pytania o Avocado Domki" sand />
      <CtaBand
        title={<>Pytania o domki?<br />Zadzwońcie</>}
        text={`Recepcja domków: ${CONTACT.domkiPhone} · ${CONTACT.domkiEmail}. Grupy weselne i firmowe wyceniamy razem z przyjęciem.`}
        extra={{ nocleg: "1" }}
        button="Zapytaj o nocleg dla grupy"
      />
    </>
  );
}
