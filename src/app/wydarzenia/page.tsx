import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import MoreGallery from "@/components/MoreGallery";
import EV from "@/lib/events.json";
import CtaBand from "@/components/CtaBand";
import Clip from "@/components/Clip";
import { planHref } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Wydarzenia otwarte",
  description: "Otwarte wydarzenia w Avocado koło Sieradza: Kobieciarnia, kolacje walentynkowe i degustacyjne. Sprawdź kalendarz i zarezerwuj miejsce.",
};

const EVENTS = [
  { d: "06", m: "mar", y: "2027", t: "Kobieciarnia", p: "Wieczór dla kobiet: warsztaty, strefa relaksu, lampka wina i kolacja w dobrym towarzystwie.", tag: "Zapisy otwarte" },
  { d: "14", m: "lut", y: "2027", t: "Kolacja walentynkowa", p: "Kilkudaniowe menu szefa kuchni dla dwojga, świece i muzyka na żywo. Jak co roku – miejsca znikają szybko.", tag: "Termin wkrótce" },
  { d: "—", m: "", y: "wkrótce", t: "Kolacja degustacyjna", p: "Kilkudaniowe menu sezonowe szefa kuchni, każde danie opowiedziane przy stole, do tego dobrane wina i muzyka na żywo. Termin ogłosimy wkrótce.", tag: "Termin wkrótce" },
];

export default function Wydarzenia() {
  return (
    <>
      <PageHero
        img="/img/wyd-hero.webp"
        alt="Goście przy stołach podczas kolacji w Avocado, w tle zespół kuchni"
        eyebrow="Wydarzenia"
        title="Spotkajmy się w Avocado"
        lead="Dobra kolacja, muzyka i czas spędzony razem. W ciągu roku zapraszamy Was na wydarzenia, podczas których możecie poznać naszą kuchnię, spotkać znajomych i po prostu miło spędzić wieczór. Jeśli zastanawiasz się nad wyborem Avocado na swoje przyjęcie, to najlepsza okazja, aby się poznać."
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

      <section className="sec sec--sand" id="walentynki">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow eyebrow--lg">Walentynki 2025 | 2026</p>
            <h2>Kolacje degustacyjne z Pascalem Brodnickim</h2>
            <p className="head__sub">Pascal Brodnicki, Patryk Dziamski i zespół Avocado</p>
          </Reveal>
          <MoreGallery pics={EV.walentynki} title="Kolacja degustacyjna z Pascalem Brodnickim w Avocado" />
        </div>
      </section>

      <section className="sec" id="kobieciarnia">
        <div className="wrap">
          <Reveal className="head"><p className="eyebrow eyebrow--lg">Kobieciarnia</p></Reveal>
          <MoreGallery pics={EV.kobieciarnia} title="Kobieciarnia w Avocado" />
        </div>
      </section>

      <section className="sec sec--sand" id="kolacja-swiateczna">
        <div className="wrap">
          <Reveal className="head head--center">
            <p className="eyebrow eyebrow--lg">Kolacja świąteczna</p>
            <h2>Kolacja degustacyjna</h2>
            <p className="head__sub">Avocado i Patryk Dziamski</p>
          </Reveal>
          <Reveal><div className="film"><Clip name="kolacja" label="Film z kolacji świątecznej w Avocado" className="clip--wide" /></div></Reveal>
        </div>
      </section>

      <section className="sec" id="degustacje">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow eyebrow--lg">Kolacja degustacyjna</p>
            <h2>Kolacja degustacyjna Avocado</h2>
            <p className="head__sub">Patryk Dziamski, Rafał Niewiarowski i Witold Szeszycki</p>
          </Reveal>
          <MoreGallery pics={EV.degustacja} title="Kolacja degustacyjna w Avocado" />
        </div>
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
