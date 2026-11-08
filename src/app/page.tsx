import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import Spaces from "@/components/Spaces";
import Kitchen from "@/components/Kitchen";
import MapSection from "@/components/MapSection";
import Gallery from "@/components/Gallery";
import Planner from "@/components/Planner";
import Reveal from "@/components/Reveal";
import Logo from "@/components/Logo";
import { asset, CONTACT } from "@/lib/asset";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <section className="facts">
          <div className="wrap facts__grid">
            {[
              ["2 sale", "bankietowa i plenerowa"],
              ["Własna kuchnia", "menu układane pod Was"],
              ["Noclegi", "domki na miejscu"],
              ["Jeden opiekun", "od rozmowy do ostatniego tańca"],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.06}>
                <span className="facts__k">{k}</span>
                <span className="facts__v">{v}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <Offer />
        <Spaces />

        <section className="stay" id="noclegi">
          <div className="wrap stay__grid">
            <Reveal className="stay__txt">
              <p className="eyebrow eyebrow--light">Nowość · noclegi</p>
              <h2>Goście nie muszą<br />wracać po północy</h2>
              <p>Na terenie Avocado czekają domki dla gości. Rodzina z daleka śpi kilka kroków od sali, a rano wszyscy spotykają się na poprawinach.</p>
              <div className="btns">
                <a href="#planer" className="btn btn--light">Zapytaj o ofertę</a>
                <a href="#" className="btn btn--ghost">Rezerwuj na Booking.com</a>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="stay__ph">
              <span>tu zdjęcia domków<br /><small>czekamy na materiały</small></span>
            </Reveal>
          </div>
        </section>

        <Kitchen />
        <MapSection />

        <section className="sec" id="opiekun">
          <div className="wrap host">
            <Reveal><img src={asset("/img/patryk.webp")} alt="Patryk Marcisiak, manager Avocado" className="host__img" loading="lazy" /></Reveal>
            <Reveal delay={0.1} className="host__txt">
              <p className="eyebrow">Wasz opiekun</p>
              <h2>Patryk Marcisiak</h2>
              <p className="quote">„Są osoby, które po prostu dobrze czują ludzi, atmosferę i&nbsp;tempo wydarzeń.”</p>
              <p>Od lat związany z branżą restauracyjną – organizację przyjęć zna od kuchni. Poprowadzi Was od pierwszego spotkania aż po ostatni toast.</p>
              <p className="host__contact">
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </p>
            </Reveal>
          </div>
        </section>

        <Gallery />
        <Planner />
      </main>

      <footer className="foot" id="kontakt">
        <div className="wrap foot__grid">
          <div className="foot__logo"><Logo className="logo__svg" /></div>
          <div><b>Adres</b><br />Kuśnie 32A<br />98-200 Sieradz</div>
          <div><b>Kontakt</b><br /><a href={CONTACT.phoneHref}>{CONTACT.phone}</a><br /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
          <div><b>Na skróty</b><br /><a href="#oferta">Wesela</a> · <a href="#noclegi">Noclegi</a> · <a href="#dojazd">Dojazd</a></div>
        </div>
        <p className="foot__copy">© 2026 Avocado · projekt i wykonanie OlekCodeTech</p>
      </footer>

      <nav className="mbar" aria-label="Szybki kontakt">
        <a href={CONTACT.phoneHref}>Zadzwoń</a>
        <a href="#planer" className="mbar__main">Zapytaj o termin</a>
      </nav>
    </>
  );
}
