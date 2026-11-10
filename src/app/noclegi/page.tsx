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
  title: "Noclegi – domki Avocado",
  description: "Domki Superior w Kuśniach koło Sieradza: 8 domków do 6 osób, 40 m², 2 sypialnie, aneks kuchenny, taras i klimatyzacja. Rezerwacja online, przy sali weselnej Avocado.",
};

const SPECS = [
  ["8", "domków Superior"],
  ["40 m²", "powierzchni"],
  ["do 6", "osób w domku"],
  ["2", "sypialnie + salon"],
];

const AMENITIES = [
  "Klimatyzacja i ogrzewanie", "Aneks kuchenny z lodówką, czajnikiem i ekspresem", "Łazienka z prysznicem i kosmetykami",
  "Taras z meblami", "Telewizor i bezpłatne Wi-Fi", "Łóżeczko dla dziecka na życzenie", "Parking przy domku", "Odbiór kluczy 24/7",
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
  ["O której zameldowanie?", "Klucze odbierzecie o dowolnej porze – obsługa jest dostępna 24 godziny na dobę, 7 dni w tygodniu."],
  ["Czy goście weselni mogą zarezerwować domki razem z przyjęciem?", "Tak. Zaznaczcie w planerze „potrzebujemy noclegu” – zablokujemy domki dla Waszych gości i przygotujemy jedną ofertę."],
  ["Czy można przyjechać z dzieckiem lub większą rodziną?", "Domek mieści do 6 osób (2 sypialnie, rozkładane sofy), a na życzenie dostawimy łóżeczko. Na terenie jest plac zabaw."],
] as const;

export default function Noclegi() {
  return (
    <>
      <PageHero
        img="/img/domek-taras.webp"
        alt="Domki Avocado wśród brzóz"
        eyebrow="Noclegi · domki Avocado"
        title="Zostańcie na noc wśród brzóz"
        lead="Osiem nowoczesnych domków Superior kilka kroków od sali bankietowej i plenerowej. Dla gości weselnych, rodzin na weekend i firm – z rezerwacją online i płatnością od ręki."
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
            <p className="eyebrow">Domek Superior</p>
            <h2>Własny kąt<br />przy brzozowym lesie</h2>
            <p>Czarna elewacja, drewno i duże przeszklenia – domki wyglądają jak sala plenerowa w miniaturze. W środku salon z aneksem kuchennym, dwie sypialnie, łazienka z prysznicem i taras z widokiem na las. Do 6 osób: 2 pojedyncze łóżka, duże łóżko Queen i 2 rozkładane sofy.</p>
            <ul className="ticks">{AMENITIES.map((a) => <li key={a}>{a}</li>)}</ul>
            <p className="price">od <b>449 zł</b> / domek / noc · śniadanie 40 zł/os.</p>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--tight sec--sand">
        <div className="wrap"><Reveal className="head"><p className="eyebrow">Galeria</p><h2>Domki z bliska</h2></Reveal></div>
        <Gallery pics={PICS} cols={4} wide={[0, 5]} />
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
          <Reveal className="split__img"><img src={asset("/img/budynek.webp")} alt="Budynek sali bankietowej Avocado" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="split__txt">
            <p className="eyebrow">Pokoje przy sali bankietowej</p>
            <h2>Dla najbliższych<br />– tuż obok parkietu</h2>
            <p>W budynku sali bankietowej mamy cztery pokoje dla dziewięciu osób – dla Pary Młodej, rodziców czy gości, którzy chcą być najbliżej wydarzenia. Rezerwujemy je razem z przyjęciem.</p>
            <ul className="ticks"><li>4 pokoje · 9 miejsc</li><li>Dostęp bezpośrednio z obiektu</li><li>Rezerwacja razem z przyjęciem</li></ul>
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

      <Faq items={FAQ_N} title="Pytania o noclegi" sand />
      <CtaBand
        title={<>Pytania o domki?<br />Zadzwońcie</>}
        text={`Recepcja domków: ${CONTACT.domkiPhone} · ${CONTACT.domkiEmail}. Grupy weselne i firmowe wyceniamy razem z przyjęciem.`}
        extra={{ nocleg: "1" }}
        button="Zapytaj o nocleg dla grupy"
      />
    </>
  );
}
