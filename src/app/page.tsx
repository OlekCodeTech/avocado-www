import Link from "next/link";
import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import Spaces from "@/components/Spaces";
import Kitchen from "@/components/Kitchen";
import MapSection from "@/components/MapSection";
import Gallery from "@/components/Gallery";
import Planner from "@/components/Planner";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import { asset, CONTACT, FAQ, planHref } from "@/lib/asset";

const PICS = [
  { src: "/img/g1.webp", alt: "Wejście pary młodej na salę" },
  { src: "/img/neon.webp", alt: "Ścianka z kwiatów z neonowym napisem" },
  { src: "/img/g3.webp", alt: "Pierwszy taniec w dymie" },
  { src: "/img/g7.webp", alt: "Długi drewniany stół ze świecami" },
  { src: "/img/ceremonia.webp", alt: "Ceremonia ślubna w ogrodzie" },
  { src: "/img/para-tort.webp", alt: "Para młoda przy torcie" },
  { src: "/img/dzieci-brzozy.webp", alt: "Dzieci bawiące się wśród brzóz" },
  { src: "/img/g8.webp", alt: "Taras z widokiem na ogród" },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="facts">
        <div className="wrap facts__grid">
          {[
            ["2 sale", "bankietowa do 180 i plenerowa do 130 gości"],
            ["Własna kuchnia", "sezonowe menu szefa kuchni Roberta Piąstki"],
            ["Noclegi", "domki i pokoje na miejscu"],
            ["Jeden opiekun", "od pierwszej rozmowy do ostatniego tańca"],
          ].map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.06}>
              <span className="facts__k">{k}</span>
              <span className="facts__v">{v}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec intro">
        <div className="wrap intro__grid">
          <Reveal>
            <p className="eyebrow">Nowoczesność i natura w jednym miejscu</p>
            <h2>Z dala od zgiełku,<br />przy brzozowym lesie</h2>
          </Reveal>
          <Reveal delay={0.1} className="intro__txt">
            <p>Avocado powstało z marzenia o miejscu, w którym sami chcielibyśmy świętować: świeże, jasne wnętrza, dobra kuchnia i spokój natury za oknem. Dwie niezależne sale, ogród, plac zabaw i noclegi dla gości – wszystko kilka kroków od siebie.</p>
            <p>Nasz zespół zadba o każdy szczegół, dzięki czemu Wasz dzień będzie naprawdę niezapomniany – a Wy zamiast myśleć o organizacji, będziecie mogli po prostu cieszyć się tym, co dzieje się wokół.</p>
            <Link href="/o-nas/" className="link">Poznajcie nas →</Link>
          </Reveal>
        </div>
      </section>

      <Offer />
      <Spaces />

      <section className="stay" id="noclegi">
        <div className="wrap stay__grid">
          <Reveal className="stay__txt">
            <p className="eyebrow eyebrow--light">Nowość · noclegi</p>
            <h2>Goście nie muszą<br />wracać po północy</h2>
            <p>Na terenie Avocado czekają domki dla gości, a przy sali bankietowej – pokoje. Rodzina z daleka śpi kilka kroków od sali, a rano wszyscy spotykają się na poprawinach.</p>
            <div className="btns">
              <Link href="/noclegi/" className="btn btn--light">Zobacz noclegi</Link>
              <Link href={planHref(undefined, { nocleg: "1" })} className="btn btn--ghost">Zapytaj o ofertę</Link>
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
            <p>Od lat związany z branżą restauracyjną – organizację przyjęć zna od kuchni. Jest blisko Was od pierwszych rozmów aż po sam dzień wydarzenia: podpowie, doradzi, uporządkuje pomysły.</p>
            <p className="host__contact">
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--tight" id="galeria">
        <div className="wrap">
          <Reveal className="head head--row">
            <div><p className="eyebrow">Galeria</p><h2>Tak u nas świętujecie</h2></div>
            <Link href="/sale/" className="link">Zobacz sale →</Link>
          </Reveal>
        </div>
        <Gallery pics={PICS} />
      </section>

      <Faq items={FAQ.slice(0, 5)} />
      <Planner />
    </>
  );
}
