import Link from "next/link";
import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import Spaces from "@/components/Spaces";
import MapSection from "@/components/MapSection";
import Gallery from "@/components/Gallery";
import Planner from "@/components/Planner";
import Faq from "@/components/Faq";
import Reviews from "@/components/Reviews";
import Reels from "@/components/Reels";
import Reveal from "@/components/Reveal";
import { asset, FAQ, FAQ_MORE, planHref } from "@/lib/asset";

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
        <div className="wrap facts__grid facts__grid--5">
          <Reveal>
            <span className="facts__k">Dwie sale – dwa różne charaktery</span>
            <span className="facts__v">sala bankietowa – do 180 osób<br />sala plenerowa – do 130<br />konferencje, sala główna – do 240 osób</span>
          </Reveal>
          <Reveal delay={0.06}>
            <span className="facts__k">Ogród i leśne otoczenie</span>
            <span className="facts__v">śluby plenerowe i przyjęcia przy brzozowym lesie</span>
          </Reveal>
          <Reveal delay={0.12}>
            <span className="facts__k">Kuchnia, która zapada w pamięć</span>
            <span className="facts__v">sezonowe menu oraz pełna precyzja wykonania pod okiem szefa kuchni Roberta Piąstki</span>
          </Reveal>
          <Reveal delay={0.18}>
            <Link href="/noclegi/" className="facts__a">
              <span className="facts__k">Avocado Domki</span>
              <span className="facts__v">8 całorocznych domków tuż obok naszych sal bankietowych</span>
            </Link>
          </Reveal>
          <Reveal delay={0.24}>
            <Link href={planHref("Catering")} className="facts__a">
              <span className="facts__k">Catering</span>
              <span className="facts__v">Twoje przyjęcie z naszym cateringiem – spytaj o ofertę →</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="sec intro">
        <div className="wrap intro__grid">
          <Reveal>
            <p className="eyebrow">Nowoczesność i natura w jednym miejscu</p>
            <h2>Z dala od zgiełku miasta,<br />przy brzozowym lesie</h2>
          </Reveal>
          <Reveal delay={0.1} className="intro__txt">
            <p>Avocado położone jest przy brzozowym lesie, blisko natury i z dala od miejskiego zgiełku. To co nas wyróżnia, to dobre jedzenie i zespół ludzi, którzy pomogą Wam na każdym etapie planowania i organizacji przyjęcia. Nasze otoczenie tworzy wyjątkową scenerię dla wesel, rodzinnych uroczystości i spotkań biznesowych. Pomagamy realizować Wasze pomysły i dbamy o szczegóły, żebyście Wy mieli czas dla bliskich i zaproszonych gości.</p>
            <div className="intro__act">
              <Link href={planHref()} className="btn">Opowiedzcie nam o swoich planach</Link>
              <Link href="/o-nas/" className="link">Poznajcie nas →</Link>
            </div>
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

      <MapSection />

      <section className="sec sec--tight" id="galeria">
        <div className="wrap">
          <Reveal className="head head--row">
            <div><p className="eyebrow">Galeria</p><h2>Tak u nas świętujecie</h2></div>
            <Link href="/galeria/" className="link">Zobacz więcej →</Link>
          </Reveal>
        </div>
        <Gallery pics={PICS} />
      </section>

      <Reviews />
      <Faq items={FAQ.slice(0, 5)} more={FAQ_MORE} />
      <Planner />
    </>
  );
}
