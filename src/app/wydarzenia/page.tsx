import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import MoreGallery from "@/components/MoreGallery";
import Newsletter from "@/components/Newsletter";
import EV from "@/lib/events.json";
import CtaBand from "@/components/CtaBand";
import Clip from "@/components/Clip";
import { planHref, asset } from "@/lib/asset";
import GroupBooking, { XMAS } from "@/components/GroupBooking";

export const metadata: Metadata = {
  title: "Wydarzenia otwarte",
  description: "Spotkania świąteczne dla grup 11–12 grudnia 2026 i otwarte wydarzenia w Avocado koło Sieradza: Kobieciarnia, kolacje walentynkowe i degustacyjne. Zarezerwuj miejsce.",
};

/** Oferta „Spotkanie świąteczne 2026” (PDF od Eweliny, 24.11.2026) – ceny netto za osobę. */
const OFERTA = "/oferty/avocado-spotkania-swiateczne-2026.pdf";
const BASE = ["Zimne przystawki", "Deser lub ciasta (2 kawałki/osobę)", "Bufet kawowy z ekspresem i bufet herbaciany", "Napoje niegazowane", "Podstawowa dekoracja: obrusy, serwety, świece", "Muzyka na żywo"];
const PAKIETY = [
  { n: "Propozycja I", cena: "195", h: "4 godziny", extra: ["Obiad dwudaniowy"] },
  { n: "Propozycja II", cena: "225", h: "5 godzin", extra: ["Obiad dwudaniowy", "Posiłek gorący"] },
  { n: "Propozycja III", cena: "260", h: "7 godzin", extra: ["Obiad dwudaniowy", "Dwa posiłki gorące"] },
];

const EVENTS = [
  { d: "11–12", m: "gru", y: "2026", t: "Spotkania świąteczne dla grup", p: "Świąteczne menu, dekoracje i muzyka na żywo – dla firm i grup od 10 do 60 osób. Trzy propozycje do wyboru.", tag: "Rezerwacje grupowe", href: "#spotkania-swiateczne", cta: "Zobacz szczegóły" },
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
        <a href="#spotkania-swiateczne" className="btn btn--light">Spotkania świąteczne</a>
        <a href="#kalendarz" className="btn btn--ghost">Zobacz kalendarz</a>
      </PageHero>

      <section className="sec sec--sand xg" id="spotkania-swiateczne">
        <div className="wrap">
          <Reveal className="head head--center">
            <p className="eyebrow eyebrow--lg">11–12 grudnia 2026</p>
            <h2>Spotkania świąteczne dla grup</h2>
            <p className="head__lead">
              Spotkanie świąteczne to coś więcej niż wspólna kolacja. To chwila, w której można na moment odłożyć obowiązki i po prostu
              spędzić czas razem. Przygotowaliśmy świąteczne menu w zgodzie z tajnikami kuchni polskiej, wspaniałe dekoracje i muzykę na żywo.
              Zaproście swoich współpracowników już teraz!
            </p>
          </Reveal>

          <div className="xg__pkgs">
            {PAKIETY.map((p, k) => (
              <Reveal key={p.n} delay={k * 0.08} className="xg__pkg">
                <p className="xg__pkg-n">{p.n}</p>
                <p className="xg__price"><b>{p.cena} zł</b> / os. netto</p>
                <p className="xg__time">Czas rezerwacji: {p.h}</p>
                <ul>{p.extra.map((x) => <li key={x} className="xg__extra">{x}</li>)}{BASE.map((x) => <li key={x}>{x}</li>)}</ul>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <ul className="xg__info">
              <li>Grupy od {XMAS.min} do {XMAS.max} osób – przy większej liczbie gości sala na wyłączność</li>
              <li>Ceny netto · zadatek 2000 zł przy podpisaniu umowy</li>
              <li>Ostateczna liczba gości – 7 dni przed spotkaniem</li>
              <li>Możliwość dostarczenia własnych alkoholi</li>
              <li>Nocleg w Avocado Domkach tuż obok sali</li>
            </ul>
          </Reveal>

          <GroupBooking offer={asset(OFERTA)} />
        </div>
      </section>

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
                  {"href" in e && e.href ? (
                    <a href={e.href} className="btn">{e.cta}</a>
                  ) : (
                    <Link href={planHref("Inne", { info: `${e.t}${e.m ? ` ${e.d}.${e.m}.${e.y}` : ""}` })} className="btn">Rezerwuję miejsce</Link>
                  )}
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
          <Newsletter />
        </Reveal>
      </section>

      <CtaBand title={<>Chcecie zorganizować<br />własne wydarzenie?</>} text="Wieczór tematyczny, pokaz, premiera – zadzwońcie, pomożemy." okazja="Inne" />
    </>
  );
}
