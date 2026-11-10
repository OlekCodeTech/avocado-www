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
  ["Spotkanie", "Zobaczcie nasze obiekty w pełnej okazałości. Umówcie się na spotkanie – pozwoli to poczuć atmosferę miejsca oraz bliżej zapoznać się z nami i naszą ofertą."],
  ["Kulinarna kreatywność", "Wraz z naszym szefem kuchni przygotowujemy sezonowe menu, udoskonalamy je i szyjemy na miarę Twoich potrzeb. Jesteśmy otwarci na Wasze propozycje, które szczegółowo omawiamy na spotkaniach."],
  ["Ceremonia", "Jednym z wielu atutów naszych sal jest możliwość organizacji ślubu w plenerze. Wystarczy Wasza chęć, a my zaaranżujemy dla Was ślub jak z bajki w otoczeniu naszego ogrodu."],
  ["Wesele", "Podczas ceremonii zaopiekuje się Wami doświadczony zespół koordynatorów oraz obsługi kelnerskiej – nikomu niczego nie zabraknie."],
  ["Poprawiny", "Goście nocują na miejscu, a rano spotykacie się przy wspólnym stole – u nas albo na tarasie."],
];

const PICS = [
  { src: "/img/sala-wesele-noc.webp", alt: "Sala bankietowa wieczorem w dniu wesela" },
  { src: "/img/ceremonia-goscie.webp", alt: "Ceremonia ślubna wśród brzóz" },
  { src: "/img/g1.webp", alt: "Wejście pary młodej na salę" },
  { src: "/img/neon.webp", alt: "Ścianka z kwiatów z neonem" },
  { src: "/img/g3.webp", alt: "Pierwszy taniec w dymie" },
  { src: "/img/plener-wieczor.webp", alt: "Tort i zimne ognie wśród brzóz" },
  { src: "/img/para-wejscie.webp", alt: "Para młoda tańczy na sali" },
  { src: "/img/para-love.webp", alt: "Para młoda przy napisie LOVE" },
];

const FAQ_W = [FAQ[0], FAQ[1], FAQ[4], FAQ[3], FAQ[2], FAQ[7], FAQ[13]];

export default function Wesela() {
  return (
    <>
      <PageHero
        img="/img/sala-wesele-noc.webp"
        alt="Sala bankietowa Avocado przygotowana na wesele"
        eyebrow="Wesela · Kuśnie koło Sieradza"
        title="Magiczne i niezapomniane wesele"
        lead="Do każdego wesela podchodzimy indywidualnie, aby zorganizować najbardziej spektakularny i magiczny wieczór dla Was i Waszych gości. Nasz zespół pomoże Ci zaplanować Twoje wesele w taki sposób, aby odzwierciedlało ono Wasze gusta, potrzeby i marzenia."
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
            <p>Podczas ceremonii zaopiekuje się Wami doświadczony zespół naszych koordynatorów oraz obsługi kelnerskiej. Zadbamy, aby wszyscy goście byli obsłużeni z najwyższą jakością i starannością oraz aby nikomu niczego nie zabrakło.</p>
            <ul className="ticks">
              <li>Perfekcyjna sceneria</li>
              <li>Wszystko, czego oczekujecie w jednym miejscu</li>
              <li>Pyszne jedzenie</li>
              <li>5* obsługa</li>
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
              { ...HALLS.bankietowa, img: "/img/sala-biala.webp", txt: "Nowoczesne wnętrza. Pojemność do 180 osób, klimatyzacja, dedykowany parking, przestrzeń gastronomiczna i zaplecze sanitarne." },
              { ...HALLS.plenerowa, img: "/img/plener-lato.webp", txt: "Industrialny sznyt. Pojemność do 130 osób, klimatyzacja, dedykowany parking, przestrzeń gastronomiczna i zaplecze sanitarne." },
            ].map((h, k) => (
              <Reveal key={h.name} delay={k * 0.1}>
                <Link href={h.href} className="hall">
                  <img src={asset(h.img)} alt={h.name} loading="lazy" />
                  <div className="hall__txt">
                    <p className="eyebrow">{h.tag} · do {h.cap} gości</p>
                    <h3>{h.name}</h3>
                    <p>{h.txt}</p>
                    <span className="more">Zobacz salę <i>→</i></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--tight">
        <div className="wrap"><Reveal className="head"><p className="eyebrow">Galeria</p><h2>Wesela w Avocado</h2></Reveal></div>
        <Gallery pics={PICS} />
      </section>

      <Faq items={FAQ_W} title="Pytania o wesele" />
      <CtaBand title={<>Wesele, o którym marzycie,<br />jest naszą misją</>} text="Jeśli poczuliście, że nasze sale mogą stać się idealnym tłem dla jednego z najważniejszych dni w Waszym życiu, pozwolimy sobie zaprosić Was na indywidualne spotkanie. Pozwoli to bardziej poczuć atmosferę miejsca oraz bliżej zapoznać się z nami i naszą ofertą." okazja="Wesele" button="Zacznij planować" />
    </>
  );
}
