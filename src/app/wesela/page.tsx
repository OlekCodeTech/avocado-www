import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { asset, FAQ, HALLS, planHref } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Wesela",
  description: "Wesele w Avocado koło Sieradza: ślub w ogrodzie wśród brzóz, sala bankietowa do 180 gości lub plenerowa do 130, własna kuchnia, noclegi i opiekun przyjęcia.",
};

const STEPS = [
  ["Spotkanie. Poznajemy Wasze plany", "Zaczynamy od terminu, liczby gości i tego, co jest dla Was ważne. Nie musicie mieć gotowej koncepcji. Podczas umówionego spotkania zobaczycie przestrzenie i porozmawiacie z nami o możliwościach organizacji. Omawiamy zakres przyjęcia, menu i wybrane dodatki. Zasady rezerwacji oraz płatności przedstawiamy przed podpisaniem umowy."],
  ["Kulinarna kreatywność", "Wraz z naszym szefem kuchni przygotowujemy sezonowe menu, udoskonalamy je i szyjemy na miarę Twoich potrzeb. Jesteśmy otwarci na Wasze propozycje, które szczegółowo omawiamy na spotkaniach."],
  ["Ceremonia", "Jednym z wielu atutów naszych sal jest możliwość organizacji ślubu w plenerze. Wystarczy Wasza chęć, a my zaaranżujemy dla Was ślub jak z bajki w otoczeniu naszego ogrodu."],
  ["Wesele", "Podczas ceremonii zaopiekuje się Wami doświadczony zespół koordynatorów oraz obsługi kelnerskiej – zawsze dbamy o to, aby goście czuli się zaopiekowani od samego początku."],
  ["Poprawiny", "Goście nocują na miejscu, a rano spotykacie się przy wspólnym stole. Po południu parkiet znów należy do Was. Jest czas na rozmowy, wspominanie wczorajszego wieczoru i dalszą zabawę – już na luzie, bez pośpiechu."],
];

const PICS = [
  { src: "/img/sala-wesele-noc.webp", alt: "Sala bankietowa wieczorem w dniu wesela" },
  { src: "/img/ceremonia-goscie.webp", alt: "Ceremonia ślubna wśród brzóz" },
  { src: "/img/intro-01.webp", alt: "Tort weselny na tarasie sali plenerowej" },
  { src: "/img/neon.webp", alt: "Ścianka z kwiatów z neonem" },
  { src: "/img/g3.webp", alt: "Pierwszy taniec w dymie" },
  { src: "/img/plener-wieczor.webp", alt: "Tort i zimne ognie wśród brzóz" },
  { src: "/img/para-wejscie.webp", alt: "Para młoda tańczy na sali" },
  { src: "/img/para-love.webp", alt: "Para młoda przy napisie LOVE" },
  { src: "/img/intro-06.webp", alt: "Para młoda wśród brzóz o zachodzie słońca" },
  { src: "/img/nw-2.webp", alt: "Para młoda z psem w brzozowym lesie" },
  { src: "/img/nw-3.webp", alt: "Pierwszy taniec w sali plenerowej" },
  { src: "/img/nw-4.webp", alt: "Zabawa weselna w sali plenerowej" },
  { src: "/img/intro-05.webp", alt: "Para młoda wieczorem w ogrodzie" },
  { src: "/img/intro-09.webp", alt: "Para młoda przy słodkim stole" },
  { src: "/img/pl-tort-2.webp", alt: "Tort na tle makramy i fontann iskier" },
  { src: "/img/intro-08.webp", alt: "Wejście pary młodej na salę bankietową" },
];

const FAQ_W = [FAQ[0], FAQ[1], FAQ[4], FAQ[3], FAQ[2], FAQ[7], FAQ[13]];

export default function Wesela() {
  return (
    <>
      <PageHero
        img="/img/wes-hero-1.webp"
        more={["/img/wes-hero-4.webp", "/img/wes-hero-3.webp"]}
        alt="Para młoda przy torcie wśród fontann iskier w ogrodzie Avocado"
        eyebrow="Wesela · Kuśnie koło Sieradza"
        title="Wasze wesele, Wasz sposób świętowania"
        lead="Chcecie długo rozmawiać przy stole, tańczyć do ulubionych piosenek i mieć bliskich obok? W Avocado znajdziecie przestrzeń na taki dzień. Pomożemy Wam połączyć Wasze pomysły z możliwościami miejsca — od wyboru sali po menu i przebieg przyjęcia."
      >
        <Link href={planHref("Wesele")} className="btn btn--light">Sprawdź wolne terminy</Link>
        <a href="#przebieg" className="btn btn--ghost">Jak to u nas wygląda</a>
      </PageHero>

      <section className="sec">
        <div className="wrap split">
          <Reveal className="split__img"><img src={asset("/img/ceremonia-goscie.webp")} alt="Ceremonia ślubna w ogrodzie Avocado" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="split__txt">
            <p className="eyebrow">Niezapomniany dzień</p>
            <h2>Jedz, pij i tańcz</h2>
            <p>Każda para ma swój pomysł na wesele. Chętnie poznamy Wasz i pomożemy go zrealizować — wspólnie ustalimy menu, przygotowanie sali i przebieg przyjęcia. Chcemy, żebyście czuli się u nas swobodnie i mogli cieszyć się tym dniem z bliskimi.</p>
            <ul className="ticks">
              <li>Zieleń za oknem, swoboda przy stole</li>
              <li>Wasze pomysły i nasza pomoc w organizacji</li>
              <li>Jedzenie, do którego chce się wracać</li>
              <li>Zespół, który jest z Wami od pierwszej rozmowy po ostatni taniec</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--sand" id="przebieg">
        <div className="wrap">
          <Reveal className="head head--center">
            <p className="eyebrow">Krok po kroku</p>
            <h2>Jak wygląda Wasz dzień u nas</h2>
          </Reveal>
          <ol className="timeline">
            {STEPS.map(([t, p], k) => (
              <Reveal key={t} delay={k * 0.08}>
                <li>
                  <span className="timeline__n">0{k + 1}</span>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="head head--row">
            <div><p className="eyebrow">Dwie sale, dwa charaktery</p><h2>Wybierzcie swoją przestrzeń</h2></div>
            <Link href="/sale/" className="link">Wszystko o salach →</Link>
          </Reveal>
          <div className="halls">
            {[
              { ...HALLS.bankietowa, img: "/img/hall-bank.webp" },
              { ...HALLS.plenerowa, img: "/img/hall-plener.webp" },
            ].map((h, k) => (
              <Reveal key={h.name} delay={k * 0.1}>
                <Link href={h.href} className="hall">
                  <img src={asset(h.img)} alt={h.name} loading="lazy" />
                  <div className="hall__txt">
                    <h3>{h.name}</h3>
                    <span className="more">Zobacz salę <i>→</i></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--tight">
        <div className="wrap"><Reveal className="head head--row"><p className="eyebrow eyebrow--lg">Wesela w Avocado</p><Link href="/galeria/#wesela" className="link">Zobacz więcej →</Link></Reveal></div>
        <Gallery pics={PICS} />
      </section>

      <Faq items={FAQ_W} title="Pytania o wesele" />
      <CtaBand title={<>Wyobrażacie już sobie<br />Wasze wesele?</>} text="Spotkajmy się i porozmawiajmy o szczegółach. Pokażemy Wam nasze miejsce, poznamy Wasze pomysły i wspólnie zastanowimy się, jak je zrealizować. A jeśli dopiero szukacie inspiracji — też zapraszamy. Być może atmosfera tego miejsca zachwyci Was tak samo jak nas." okazja="Wesele" button="Zacznij planować" />
    </>
  );
}
