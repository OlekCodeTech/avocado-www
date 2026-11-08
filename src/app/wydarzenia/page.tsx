import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";
import { planHref } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Wydarzenia otwarte",
  description: "Otwarte wydarzenia w Avocado koło Sieradza: Sylwester, Kobieciarnia, kolacje degustacyjne. Sprawdź kalendarz i zarezerwuj miejsce.",
};

const EVENTS = [
  { d: "31", m: "gru", y: "2026", t: "Sylwester w Avocado", p: "Bal z zespołem na żywo, menu szefa kuchni i toast o północy pod gwiazdami.", tag: "Zapisy otwarte" },
  { d: "06", m: "mar", y: "2027", t: "Kobieciarnia", p: "Wieczór dla kobiet: warsztaty, strefa relaksu, lampka wina i kolacja w dobrym towarzystwie.", tag: "Zapisy otwarte" },
  { d: "—", m: "", y: "wkrótce", t: "Kolacja degustacyjna", p: "Kilkudaniowe menu sezonowe w parze z winami, przy jednym długim stole. Termin ogłosimy wkrótce.", tag: "Termin wkrótce" },
];

const GAL = {
  sylwester: [
    { src: "/img/sylwester.webp", alt: "Sala udekorowana na sylwestra 2025" },
    { src: "/img/sylwester-2.webp", alt: "Stoły sylwestrowe z pomarańczowymi kwiatami" },
    { src: "/img/sylwester-zespol.webp", alt: "Zespół muzyczny na scenie" },
    { src: "/img/sylwester-stol.webp", alt: "Dekoracja stołu z cytrusami" },
  ],
  degustacja: [
    { src: "/img/d2.webp", alt: "Danie główne" },
    { src: "/img/d1.webp", alt: "Zupa" },
    { src: "/img/d7.webp", alt: "Polewanie dania sosem" },
    { src: "/img/stol-dlugi.webp", alt: "Długi stół ze świecami" },
  ],
};

export default function Wydarzenia() {
  return (
    <>
      <PageHero
        img="/img/sylwester.webp"
        alt="Sala Avocado udekorowana na sylwestra"
        eyebrow="Wydarzenia otwarte"
        title="Ekskluzywne spotkania, dostępne dla wszystkich"
        lead="W ciągu roku organizujemy otwarte wydarzenia – szansę, by doświadczyć gościnności, wyjątkowego jedzenia i otulającej atmosfery Avocado bez okazji."
      >
        <a href="#kalendarz" className="btn btn--light">Zobacz kalendarz</a>
      </PageHero>

      <section className="sec" id="kalendarz">
        <div className="wrap">
          <Reveal className="head head--row">
            <div><p className="eyebrow">Kalendarz</p><h2>Najbliższe wydarzenia</h2></div>
            <p className="head__aside">Liczba miejsc jest ograniczona – rezerwacja przez formularz lub telefonicznie.</p>
          </Reveal>
          <ul className="events">
            {EVENTS.map((e, k) => (
              <Reveal key={e.t} delay={k * 0.08}>
                <li className="event">
                  <div className="event__date"><b>{e.d}</b><span>{e.m} {e.y}</span></div>
                  <div className="event__txt">
                    <span className="event__tag">{e.tag}</span>
                    <h3>{e.t}</h3>
                    <p>{e.p}</p>
                  </div>
                  <Link href={planHref("Inne", { info: `${e.t}${e.m ? ` ${e.d}.${e.m}.${e.y}` : ""}` })} className="btn">Rezerwuję miejsce</Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap">
          <Reveal className="head"><p className="eyebrow">Tak było</p><h2>Sylwester 2024/25</h2></Reveal>
        </div>
        <Gallery pics={GAL.sylwester} cols={4} wide={[0]} />
      </section>

      <section className="sec">
        <div className="wrap split">
          <Reveal className="split__img"><div className="ph ph--tall"><span>zdjęcia z Kobieciarni<br /><small>czekamy na materiały</small></span></div></Reveal>
          <Reveal delay={0.1} className="split__txt">
            <p className="eyebrow">Kobieciarnia · 06.03.2027</p>
            <h2>Wieczór tylko dla Was</h2>
            <p>Dzień Kobiet świętujemy razem: warsztaty, strefa piękna i relaksu, lampka wina i kolacja przygotowana przez naszą kuchnię. Przyjdźcie z przyjaciółkami, siostrą, mamą.</p>
            <Link href={planHref("Inne", { info: "Kobieciarnia 06.03.2027" })} className="link">Zarezerwuj miejsce →</Link>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--sand sec--tight">
        <div className="wrap"><Reveal className="head"><p className="eyebrow">Kolacje degustacyjne</p><h2>Kilka dań, jedno wino, jeden długi stół</h2></Reveal></div>
        <Gallery pics={GAL.degustacja} cols={4} wide={[0]} />
      </section>

      <section className="sec newsletter">
        <Reveal className="wrap newsletter__in">
          <div>
            <p className="eyebrow">Nie przegapcie</p>
            <h2>Dajcie znać, że chcecie wiedzieć pierwsi</h2>
            <p>Zostawcie adres e-mail – napiszemy, gdy ogłosimy nowy termin.</p>
          </div>
          <form className="newsletter__form">
            <input type="email" placeholder="Twój adres e-mail" aria-label="Adres e-mail" className="inp inp--light" />
            <button type="button" className="btn">Zapisz się</button>
          </form>
        </Reveal>
      </section>

      <CtaBand title={<>Chcecie zorganizować<br />własne wydarzenie?</>} text="Wieczór tematyczny, pokaz, premiera – zadzwońcie, pomożemy." okazja="Inne" />
    </>
  );
}
