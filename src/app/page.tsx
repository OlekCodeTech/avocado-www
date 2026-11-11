import Link from "next/link";
import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import Spaces from "@/components/Spaces";
import Kitchen from "@/components/Kitchen";
import MapSection from "@/components/MapSection";
import Gallery from "@/components/Gallery";
import Planner from "@/components/Planner";
import Faq from "@/components/Faq";
import Reviews from "@/components/Reviews";
import Reels from "@/components/Reels";
import Reveal from "@/components/Reveal";
import { asset, CONTACT, FAQ, planHref } from "@/lib/asset";

const PICS = [
  { src: "/img/nw-1.webp", alt: "Pocałunek pary młodej podczas ceremonii w ogrodzie" },
  { src: "/img/neon.webp", alt: "Ścianka z kwiatów z neonowym napisem" },
  { src: "/img/g3.webp", alt: "Pierwszy taniec w dymie" },
  { src: "/img/nw-6.webp", alt: "Para młoda wśród zimnych ogni" },
  { src: "/img/ceremonia-goscie.webp", alt: "Ceremonia ślubna w ogrodzie wśród brzóz" },
  { src: "/img/para-tort.webp", alt: "Para młoda przy torcie" },
  { src: "/img/dzieci-brzozy.webp", alt: "Dzieci bawiące się wśród brzóz" },
  { src: "/img/pl-zew-3.webp", alt: "Sala plenerowa o zmierzchu" },
  { src: "/img/intro-06.webp", alt: "Para młoda wśród brzóz o zachodzie słońca" },
  { src: "/img/bk-1.webp", alt: "Łuk z kwiatów z neonem w sali bankietowej" },
  { src: "/img/pl-wn-2.webp", alt: "Długie stoły w sali plenerowej" },
  { src: "/img/intro-09.webp", alt: "Para młoda przy słodkim stole" },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="facts">
        <div className="wrap facts__grid">
          {[
            ["2 sale", "do 240 osób – bankietowa i plenerowa"],
            ["Wyjątkowa kuchnia", "sezonowe menu szefa kuchni Roberta Piąstki"],
            ["Plenerowa magia", "ślub i przyjęcie przy brzozowym lesie"],
            ["Avocado Domki", "8 domków na miejscu, catering na każdą okazję"],
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
            <h2>Z dala od zgiełku miasta,<br />przy brzozowym lesie</h2>
          </Reveal>
          <Reveal delay={0.1} className="intro__txt">
            <p>Avocado położone jest w malowniczej okolicy, z dala od zgiełku miasta, przy brzozowym lesie. To wyjątkowa sceneria na wesele, przyjęcie oraz celebracje.</p>
            <p>Nasz dedykowany zespół zadba o każdy szczegół, dzięki czemu Twój dzień będzie naprawdę niezapomniany. Odkryj nasze czarujące wnętrza, zapierające dech w piersiach otoczenie, fantastyczne jedzenie i 5* obsługę, na jaką zasługujesz.</p>
            <Link href="/o-nas/" className="link">Poznajcie nas →</Link>
          </Reveal>
        </div>
      </section>

      <Offer />
      <Spaces />
      <Reels />

      <section className="stay" id="noclegi">
        <div className="wrap stay__grid">
          <Reveal className="stay__txt">
            <p className="eyebrow eyebrow--light">Avocado Domki</p>
            <h2>Komfort, natura<br />i wyjątkowy wypoczynek</h2>
            <p>Nasze stylowe, całoroczne domki położone są w malowniczym otoczeniu brzozowego lasu. Zaledwie kilka kroków dzieli je od naszych sal bankietowych, dzięki czemu stanowią doskonałe miejsce noclegowe dla Gości weselnych, uczestników przyjęć okolicznościowych i wydarzeń firmowych. Rezerwacja online.</p>
            <div className="btns">
              <Link href="/noclegi/" className="btn btn--light">Zobacz Avocado Domki</Link>
              <Link href={planHref(undefined, { nocleg: "1" })} className="btn btn--ghost">Zapytaj o ofertę</Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="stay__img">
            <img src={asset("/img/domek-taras.webp")} alt="Domki Avocado z tarasem wśród brzóz" loading="lazy" />
            <img src={asset("/img/domek-wnetrze.webp")} alt="Wnętrze domku" loading="lazy" className="stay__img2" />
          </Reveal>
        </div>
      </section>

      <Kitchen />
      <MapSection />

      <section className="sec" id="opiekun">
        <div className="wrap host">
          <Reveal><img src={asset("/img/patryk.webp")} alt="Patryk Marcisiak, manager Avocado" className="host__img" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="host__txt">
            <p className="eyebrow">Manager</p>
            <h2>Patryk Marcisiak</h2>
            <p className="quote">„Są osoby, które po prostu dobrze czują ludzi, atmosferę i&nbsp;tempo wydarzeń. Patryk zdecydowanie do nich należy.”</p>
            <p>Od lat związany jest z branżą restauracyjną, a organizację przyjęć zna od kuchni. Lubi, kiedy wszystko ma swój rytm, Goście czują się swobodnie, a każdy detal jest dokładnie tam, gdzie powinien. W Avocado Patryk jest blisko Was od pierwszych rozmów o przyjęciu aż po sam dzień wydarzenia.</p>
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

      <Reviews />
      <Faq items={FAQ.slice(0, 5)} />
      <Planner />
    </>
  );
}
