import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { asset, HALLS, planHref } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Wesela",
  description: "Wesele w Avocado koło Sieradza: ślub w ogrodzie wśród brzóz, sala bankietowa do 180 gości lub plenerowa do 130, własna kuchnia, noclegi i opiekun przyjęcia.",
};

const STEPS = [
  ["Spotkanie", "Oprowadzamy Was po salach, ogrodzie i domkach. Rozmawiamy o Waszej wizji, terminie i budżecie – bez zobowiązań."],
  ["Menu i aranżacja", "Szef kuchni układa z Wami menu, a opiekun pomaga dobrać dekoracje, ustawienie stołów i przebieg dnia."],
  ["Ceremonia w ogrodzie", "Ślub wśród brzóz, kilka kroków od sali. W razie deszczu mamy gotowy plan B pod dachem."],
  ["Wesele", "Powitanie, obiad, tort, pierwszy taniec i zabawa do rana. Nad wszystkim czuwa koordynator."],
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

const FAQ_W = [
  ["Ile kosztuje wesele w Avocado?", "Cena zależy od liczby gości, menu i terminu. Po krótkiej rozmowie przygotujemy indywidualną wycenę – bez ukrytych kosztów."],
  ["Czy możemy mieć ślub cywilny na miejscu?", "Tak. Ceremonię organizujemy w ogrodzie wśród brzóz, a w razie niepogody – w sali."],
  ["Czy jest możliwość wesela jednodniowego i z poprawinami?", "Oczywiście. Poprawiny możecie zrobić w tej samej sali, na tarasie albo w plenerze."],
  ["Gdzie przenocują goście?", "Na miejscu: w domkach i pokojach przy sali bankietowej. Dla większych grup pomagamy w rezerwacji dodatkowych noclegów w okolicy."],
  ["Czy przygotowujecie menu dla dzieci, wegetarian i alergików?", "Tak – menu dopasowujemy do Waszych gości. Wystarczy, że powiecie nam o tym na spotkaniu."],
  ["Do której można się bawić?", "Do białego rana – sale są położone z dala od zabudowań, więc nikt Wam nie przeszkodzi."],
] as const;

export default function Wesela() {
  return (
    <>
      <PageHero
        img="/img/sala-wesele-noc.webp"
        alt="Sala bankietowa Avocado przygotowana na wesele"
        eyebrow="Wesela · Kuśnie koło Sieradza"
        title="Magiczne i niezapomniane wesele"
        lead="Do każdego wesela podchodzimy indywidualnie: od ceremonii w ogrodzie, przez menu szefa kuchni, po poprawiny – tak, aby Wasz dzień odzwierciedlał Wasze gusta, potrzeby i marzenia."
      >
        <Link href={planHref("Wesele")} className="btn btn--light">Sprawdź wolne terminy</Link>
        <a href="#przebieg" className="btn btn--ghost">Jak to u nas wygląda</a>
      </PageHero>

      <section className="sec">
        <div className="wrap split">
          <Reveal className="split__img"><img src={asset("/img/ceremonia-goscie.webp")} alt="Ceremonia ślubna w ogrodzie Avocado" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="split__txt">
            <p className="eyebrow">Niezapomniany dzień</p>
            <h2>Jedzcie, pijcie i tańczcie – resztą zajmiemy się my</h2>
            <p>Do Waszej dyspozycji mamy dwie wyjątkowe sale, które przemieniamy w wymarzoną przestrzeń, oraz ogród, w którym możecie powiedzieć sobie „tak”. Doświadczony zespół koordynatorów i kelnerów zadba, aby wszyscy goście byli obsłużeni z najwyższą starannością i aby nikomu niczego nie zabrakło.</p>
            <ul className="ticks">
              <li>Ślub w plenerze wśród brzóz</li>
              <li>Sala bankietowa do 180 lub plenerowa do 130 gości</li>
              <li>Sezonowe menu układane z szefem kuchni</li>
              <li>Noclegi dla gości i poprawiny na miejscu</li>
              <li>Dedykowany opiekun przyjęcia</li>
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
              { ...HALLS.bankietowa, img: "/img/sala-biala.webp", txt: "Jasne, eleganckie wnętrze z drewnianym sufitem i widokiem na zieleń. Sprawdza się o każdej porze roku." },
              { ...HALLS.plenerowa, img: "/img/plener-lato.webp", txt: "Przeszklony pawilon na skraju lasu. Dzień spędzacie w zieleni, a wieczorem całość rozświetlają girlandy." },
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
      <CtaBand title={<>Wesele, o którym marzycie,<br />jest naszą misją</>} text="Zapraszamy na indywidualne spotkanie – poczujecie atmosferę miejsca i poznacie nas oraz naszą ofertę." okazja="Wesele" />
    </>
  );
}
