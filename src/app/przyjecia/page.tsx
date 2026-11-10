import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";
import { asset, planHref } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Przyjęcia rodzinne i firmowe",
  description: "Chrzciny, komunie, roczki, 18-stki, jubileusze oraz imprezy firmowe i konferencje w Avocado koło Sieradza. Dwie sale, ogród, plac zabaw i własna kuchnia.",
};

const KINDS = [
  { t: "Chrzciny i roczki", p: "Kameralnie, w jasnej sali albo w plenerze. Plac zabaw i ogród dla dzieci tuż obok.", img: "/img/chrzciny-2.webp", okazja: "Chrzciny" },
  { t: "Komunie", p: "Rodzinny obiad w spokojnym miejscu, słodki stół i przestrzeń do zabawy dla najmłodszych.", img: "/img/komunia.webp", okazja: "Komunia" },
  { t: "18-stki i urodziny", p: "Parkiet, bar, dekoracje w Waszym stylu – i zabawa do rana z dala od sąsiadów.", img: "/img/osiemnastka.webp", okazja: "Urodziny / 18-stka" },
  { t: "Jubileusze i rocznice", p: "Elegancka oprawa dla bliskich. Zadbamy o menu, kwiaty i każdy szczegół.", img: "/img/stol-dlugi.webp", okazja: "Jubileusz" },
];

const PICS = [
  { src: "/img/chrzciny.webp", alt: "Dekoracja chrzcin w sali plenerowej" },
  { src: "/img/komunia-stoly.webp", alt: "Stoły komunijne w sali bankietowej" },
  { src: "/img/komunia-desery.webp", alt: "Desery komunijne" },
  { src: "/img/dzieci-brzozy.webp", alt: "Dzieci bawiące się wśród brzóz" },
  { src: "/img/osiemnastka.webp", alt: "Sala udekorowana na 18-stkę" },
  { src: "/img/przyjecia.webp", alt: "Stół z dekoracją z kwiatów" },
  { src: "/img/komunia-dzieci.webp", alt: "Dzieci na trawniku przy dmuchańcu" },
  { src: "/img/plac-zabaw.webp", alt: "Plac zabaw w ogrodzie Avocado" },
  { src: "/img/slodki-stol.webp", alt: "Słodki stół" },
];

export default function Przyjecia() {
  return (
    <>
      <PageHero
        img="/img/chrzciny.webp"
        alt="Sala plenerowa udekorowana na chrzciny"
        eyebrow="Przyjęcia · rodzinne i firmowe"
        title="Wyjątkowe miejsce spotkań"
        lead="Ważne chwile wymagają wyjątkowej oprawy. Niezależnie od tego, czy organizujecie chrzciny, komunię, jubileusz czy spotkanie firmowe – pomożemy Wam zrealizować niezapomniane wydarzenie."
      >
        <Link href={planHref("Chrzciny")} className="btn btn--light">Zapytaj o termin</Link>
        <a href="#firmowe" className="btn btn--ghost">Imprezy firmowe</a>
      </PageHero>

      <section className="sec">
        <div className="wrap">
          <Reveal className="head head--row">
            <div><p className="eyebrow">Świętujcie i bawcie się</p><h2>Każda okazja ma u nas swoje miejsce</h2></div>
            <p className="head__aside">My zaopiekujemy się całym wydarzeniem, abyście Wy mogli skupić się na świętowaniu.</p>
          </Reveal>
          <div className="tiles tiles--4">
            {KINDS.map((x, k) => (
              <Reveal key={x.t} delay={k * 0.08}>
                <Link className="tile" href={planHref(x.okazja)}>
                  <div className="tile__media"><img src={asset(x.img)} alt={x.t} loading="lazy" /></div>
                  <h3>{x.t}</h3>
                  <p>{x.p}</p>
                  <span className="more">Zapytaj <i>→</i></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap split split--rev">
          <Reveal className="split__img"><img src={asset("/img/plac-zabaw.webp")} alt="Plac zabaw w ogrodzie Avocado" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="split__txt">
            <p className="eyebrow">Dla najmłodszych</p>
            <h2>Dzieci mają gdzie się wybiegać</h2>
            <p>Duży plac zabaw w ogrodzie, trawnik i brzozowy las tuż za salą. Rodzice siedzą przy stole, a dzieci bawią się w zasięgu wzroku. Menu dziecięce przygotowujemy osobno.</p>
            <ul className="ticks"><li>Plac zabaw i ogrodzony teren</li><li>Menu dla dzieci</li><li>Przewijak i krzesełka do karmienia</li></ul>
          </Reveal>
        </div>
      </section>

      <section className="sec" id="firmowe">
        <div className="wrap split">
          <Reveal className="split__img"><img src={asset("/img/firma-stol.webp")} alt="Bar i długi stół w sali bankietowej" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="split__txt">
            <p className="eyebrow">Imprezy firmowe</p>
            <h2>Przenieście się z biura do azylu</h2>
            <p>Integracje, bankiety, konferencje i spotkania z klientami. Dwie sale, które dopasujemy do charakteru wydarzenia, menu ustalane indywidualnie i catering poza Avocado.</p>
            <ul className="ticks">
              <li>Nagłośnienie, projektor, ekran i mikrofony</li>
              <li>Dedykowany koordynator wydarzenia</li>
              <li>Przerwy kawowe, lunch, kolacja – lub catering u Was</li>
              <li>Noclegi dla uczestników na miejscu</li>
            </ul>
            <Link href={planHref("Impreza firmowa")} className="link">Zapytaj o ofertę dla firmy →</Link>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--tight sec--sand">
        <div className="wrap"><Reveal className="head"><p className="eyebrow">Galeria</p><h2>Przyjęcia w Avocado</h2></Reveal></div>
        <Gallery pics={PICS} cols={3} wide={[0]} />
      </section>

      <CtaBand title={<>Wydarzenie, które na długo<br />zapadnie w pamięć</>} text="Zawsze polecamy odwiedzić Avocado – pozwoli to poczuć atmosferę miejsca i lepiej poznać to, co mamy do zaoferowania." okazja="Chrzciny" />
    </>
  );
}
