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
        lead="Ważne chwile wymagają wyjątkowej oprawy. Avocado ma dla Ciebie i Twojej grupy przestrzeń, w której uciekniecie na chwilę od codzienności. Niezależnie czy organizujesz chrzciny, przyjęcie, czy jubileusz – my pomożemy Ci zrealizować niezapomniane wydarzenie."
      >
        <Link href={planHref("Chrzciny")} className="btn btn--light">Zapytaj o termin</Link>
        <a href="#firmowe" className="btn btn--ghost">Imprezy firmowe</a>
      </PageHero>

      <section className="sec">
        <div className="wrap">
          <Reveal className="head head--row">
            <div><p className="eyebrow">Świętuj i baw się w Avocado</p><h2>Każda okazja ma u nas swoje miejsce</h2></div>
            <p className="head__aside">Każde przyjęcie traktujemy indywidualnie – możesz je z nami zaplanować według własnych upodobań, a jeśli nie masz na to czasu, we wszystkim chętnie pomożemy.</p>
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
            <p className="eyebrow">Kulinarna kreatywność i obsługa</p>
            <h2>Nasz szef kuchni opracuje z Wami dedykowane, sezonowe menu</h2>
            <p>Menu, które zaskoczy największych smakoszy. Podczas wydarzenia zaopiekuje się Wami doświadczony zespół – zadbają oni, aby wszyscy goście byli napici, najedzeni i uśmiechnięci. A dzieci mają do dyspozycji plac zabaw w ogrodzie, w zasięgu wzroku rodziców.</p>
            <ul className="ticks"><li>Perfekcyjna sceneria</li><li>Pyszne jedzenie</li><li>5* obsługa</li><li>Plac zabaw i ogród dla dzieci</li></ul>
          </Reveal>
        </div>
      </section>

      <section className="sec" id="firmowe">
        <div className="wrap split">
          <Reveal className="split__img"><img src={asset("/img/firma-stol.webp")} alt="Bar i długi stół w sali bankietowej" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="split__txt">
            <p className="eyebrow">Imprezy firmowe</p>
            <h2>Przenieś się z biura do azylu</h2>
            <p>Najlepsze miejsce na niezapomniane spotkanie lub event firmowy. W Avocado posiadamy przestrzenie idealne do organizacji firmowych spotkań, konferencji oraz pozostałych eventów. Menu na przyjęcia firmowe i cateringi zawsze ustalamy indywidualnie tak, aby sprostać Waszym oczekiwaniom. Podczas wydarzenia zaopiekuje się Wami doświadczony zespół – zadbamy, aby każdy bankiet, konferencja czy impreza firmowa na długo została w pamięci Państwa gości.</p>
            <ul className="ticks">
              <li>Integracja na najwyższym poziomie</li>
              <li>Profesjonalne zaplecze multimedialne (nagłośnienie, projektor, ekran, mikrofony)</li>
              <li>Dedykowany koordynator wydarzenia</li>
              <li>Przyjęcie na sali lub catering</li>
            </ul>
            <Link href={planHref("Impreza firmowa")} className="link">Zapytaj o ofertę dla firmy →</Link>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--tight sec--sand">
        <div className="wrap"><Reveal className="head"><p className="eyebrow">Galeria</p><h2>Przyjęcia w Avocado</h2></Reveal></div>
        <Gallery pics={PICS} cols={3} wide={[0]} />
      </section>

      <CtaBand title={<>Wydarzenie, które na długo<br />zapadnie w pamięci wszystkich</>} text="Zawsze polecamy odwiedzenie Avocado. Pozwoli to poczuć wyjątkową atmosferę miejsca i lepiej poznać to, co mamy do zaoferowania." okazja="Chrzciny" button="Zacznij planować" />
    </>
  );
}
