import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { asset, CONTACT, planHref } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Noclegi – domki i pokoje",
  description: "Noclegi przy sali weselnej Avocado koło Sieradza: domki dla gości i pokoje przy sali bankietowej. Zostańcie na noc i spotkajcie się rano na poprawinach.",
};

export default function Noclegi() {
  return (
    <>
      <PageHero
        img="/img/budynek-ogrod.webp"
        alt="Budynek Avocado i ogród"
        eyebrow="Noclegi · nowość"
        title="Zostańcie na noc"
        lead="Na terenie Avocado uruchomiliśmy domki dla gości. Rodzina z daleka śpi kilka kroków od sali, nikt nie musi wracać po północy, a rano wszyscy spotykają się na poprawinach."
        pos="center 70%"
      >
        <Link href={planHref(undefined, { nocleg: "1" })} className="btn btn--light">Zapytaj o ofertę</Link>
        <a href={CONTACT.booking} className="btn btn--ghost" target="_blank" rel="noopener">Rezerwuj na Booking.com</a>
      </PageHero>

      <section className="sec">
        <div className="wrap split">
          <Reveal className="split__img">
            <div className="ph ph--tall"><span>zdjęcia domków<br /><small>czekamy na materiały od Avocado</small></span></div>
          </Reveal>
          <Reveal delay={0.1} className="split__txt">
            <p className="eyebrow">Domki</p>
            <h2>Własny kąt<br />przy brzozowym lesie</h2>
            <p>Nowe, komfortowe domki w otoczeniu zieleni – dla gości weselnych, rodzin na weekend i uczestników firmowych wyjazdów. Śniadanie serwujemy w restauracji, a do Sieradza jest 10 minut.</p>
            <ul className="ticks">
              <li>Kilka kroków od sali bankietowej i plenerowej</li>
              <li>Parking przy domku</li>
              <li>Śniadanie w restauracji</li>
              <li>Rezerwacja razem z przyjęciem lub osobno przez Booking.com</li>
            </ul>
            <p className="note">Liczba domków, układ i cennik – uzupełnimy po otrzymaniu materiałów.</p>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap split split--rev">
          <Reveal className="split__img"><img src={asset("/img/budynek.webp")} alt="Budynek Avocado z zewnątrz" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="split__txt">
            <p className="eyebrow">Pokoje przy sali bankietowej</p>
            <h2>Dla najbliższych<br />– tuż obok parkietu</h2>
            <p>W budynku sali bankietowej mamy cztery pokoje dla dziewięciu osób – idealne dla Pary Młodej, rodziców czy gości, którzy chcą być najbliżej wydarzenia.</p>
            <ul className="ticks"><li>4 pokoje · 9 miejsc</li><li>Dostęp bezpośrednio z obiektu</li><li>Rezerwacja razem z przyjęciem</li></ul>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="head head--center"><p className="eyebrow">Dla kogo</p><h2>Nie tylko na wesele</h2></Reveal>
          <div className="tiles tiles--3">
            {[
              { t: "Goście weselni", p: "Zaznaczcie w planerze „potrzebujemy noclegu” – przygotujemy ofertę razem z przyjęciem.", href: planHref("Wesele", { nocleg: "1" }), img: "/img/plener-wieczor.webp" },
              { t: "Weekend za miastem", p: "Las, cisza, dobra kuchnia i 10 minut do Sieradza. Rezerwacja przez Booking.com.", href: CONTACT.booking, img: "/img/dzieci-brzozy.webp" },
              { t: "Firmy", p: "Szkolenie lub integracja z noclegiem – sala, catering i domki w jednym miejscu.", href: planHref("Impreza firmowa", { nocleg: "1" }), img: "/img/firma-stol.webp" },
            ].map((x, k) => (
              <Reveal key={x.t} delay={k * 0.08}>
                <Link className="tile" href={x.href}>
                  <div className="tile__media"><img src={asset(x.img)} alt={x.t} loading="lazy" /></div>
                  <h3>{x.t}</h3><p>{x.p}</p><span className="more">Zapytaj <i>→</i></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={<>Zapytajcie o nocleg<br />razem z przyjęciem</>} text="Podajcie orientacyjną liczbę gości – podpowiemy, ile osób zmieści się w domkach i pokojach." extra={{ nocleg: "1" }} button="Zapytaj o ofertę" />
    </>
  );
}
