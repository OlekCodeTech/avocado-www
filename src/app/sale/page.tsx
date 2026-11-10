import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { asset, FAQ, planHref } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Sale – bankietowa i plenerowa",
  description: "Sala bankietowa do 180 gości i sala plenerowa do 130 gości w Avocado koło Sieradza. Klimatyzacja, parking, ogród, plac zabaw i ceremonie w plenerze.",
};

const SPECS = ["Klimatyzacja", "Dedykowany parking", "Zaplecze gastronomiczne i sanitarne", "Nagłośnienie i multimedia", "Dostęp dla osób z niepełnosprawnością"];

const BANK = [
  { src: "/img/sala-szeroka.webp", alt: "Sala bankietowa w świetle dziennym" },
  { src: "/img/sala-biala.webp", alt: "Sala bankietowa z długimi stołami" },
  { src: "/img/bank-wieczor.webp", alt: "Sala bankietowa wieczorem" },
  { src: "/img/sala-dlugie-stoly.webp", alt: "Układ długich stołów" },
  { src: "/img/stol-dlugi.webp", alt: "Drewniany stół ze świecami" },
  { src: "/img/wejscie.webp", alt: "Wejście do Avocado" },
];
const PLENER = [
  { src: "/img/plener-lato.webp", alt: "Sala plenerowa latem" },
  { src: "/img/plener-wnetrze.webp", alt: "Jasne wnętrze sali plenerowej" },
  { src: "/img/ceremonia-las.webp", alt: "Ceremonia w lesie – krzesła wśród brzóz" },
  { src: "/img/plener-noc.webp", alt: "Sala plenerowa nocą" },
  { src: "/img/plener-stoly.webp", alt: "Długie stoły w sali plenerowej" },
  { src: "/img/plener-zima.webp", alt: "Sala plenerowa zimą" },
];

export default function Sale() {
  return (
    <>
      <PageHero
        img="/img/plener-dron.webp"
        alt="Sala plenerowa Avocado z lotu ptaka"
        eyebrow="Nasze obiekty"
        title="Dwie sale, dwa charaktery"
        lead="Do Waszej dyspozycji mamy dwie niezależne przestrzenie – razem do 240 gości – oraz ogród, taras, plac zabaw i noclegi. Wszystko w jednym miejscu, przy brzozowym lesie."
      >
        <a href="#bankietowa" className="btn btn--light">Sala bankietowa</a>
        <a href="#plenerowa" className="btn btn--ghost">Sala plenerowa</a>
      </PageHero>

      <section className="sec" id="bankietowa">
        <div className="wrap">
          <div className="split">
            <Reveal className="split__img"><img src={asset("/img/bank-dzien.webp")} alt="Sala bankietowa za dnia" loading="lazy" /></Reveal>
            <Reveal delay={0.1} className="split__txt">
              <p className="eyebrow">Sala bankietowa · do 180 gości</p>
              <h2>Jasna. Elegancka. Na każdą porę roku.</h2>
              <p>Nowoczesne wnętrze z drewnianym sufitem, ciepłym światłem i dużymi oknami z widokiem na zieleń. Neutralna baza, którą łatwo dopasować do Waszego stylu – od klasyki po minimalizm. Parkiet, bar i słodki stół mają swoje miejsce, a goście nie tłoczą się przy przejściach.</p>
              <ul className="specs">{SPECS.map((s) => <li key={s}>{s}</li>)}</ul>
              <Link href={planHref()} className="link">Zapytaj o salę bankietową →</Link>
            </Reveal>
          </div>
        </div>
        <Gallery pics={BANK} cols={3} wide={[0]} tight />
      </section>

      <section className="sec sec--sand" id="plenerowa">
        <div className="wrap">
          <div className="split split--rev">
            <Reveal className="split__img"><img src={asset("/img/plener-front.webp")} alt="Sala plenerowa na skraju lasu" loading="lazy" /></Reveal>
            <Reveal delay={0.1} className="split__txt">
              <p className="eyebrow">Sala plenerowa · do 130 gości</p>
              <h2>Industrialny sznyt. Wśród brzóz.</h2>
              <p>Przeszklony, czarny pawilon na skraju lasu – latem otwarty na ogród, zimą przytulny i rozświetlony. Dzień spędzacie w zieleni, a wieczorem całość rozświetlają girlandy lampek. Idealna na ślub w plenerze, letnie wesele i kameralne przyjęcia.</p>
              <ul className="specs">{SPECS.slice(0, 3).map((s) => <li key={s}>{s}</li>)}<li>Taras i ogród</li><li>Ceremonia w plenerze</li></ul>
              <Link href={planHref()} className="link">Zapytaj o salę plenerową →</Link>
            </Reveal>
          </div>
        </div>
        <Gallery pics={PLENER} cols={3} wide={[0]} tight />
      </section>

      <section className="sec" id="teren">
        <div className="wrap">
          <Reveal className="head head--center"><p className="eyebrow">Wokół sal</p><h2>Cały teren jest dla Was</h2></Reveal>
          <div className="tiles tiles--4">
            {[
              { t: "Ogród i las", p: "Miejsce na ceremonię, sesję zdjęciową i wieczorne ognisko.", img: "/img/ceremonia-las.webp" },
              { t: "Plac zabaw", p: "Dzieci bawią się w zasięgu wzroku rodziców.", img: "/img/plac-zabaw.webp" },
              { t: "Taras", p: "Kawa o poranku i drink wieczorem – z widokiem na zieleń.", img: "/img/g8.webp" },
              { t: "Noclegi", p: "8 domków i pokoje kilka kroków od sali.", img: "/img/domek-taras.webp", href: "/noclegi/" },
            ].map((x, k) => (
              <Reveal key={x.t} delay={k * 0.08}>
                {x.href ? (
                  <Link className="tile" href={x.href}>
                    <div className="tile__media"><img src={asset(x.img)} alt={x.t} loading="lazy" /></div>
                    <h3>{x.t}</h3><p>{x.p}</p><span className="more">Zobacz <i>→</i></span>
                  </Link>
                ) : (
                  <div className="tile">
                    <div className="tile__media"><img src={asset(x.img)} alt={x.t} loading="lazy" /></div>
                    <h3>{x.t}</h3><p>{x.p}</p>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq items={FAQ} sand />
      <CtaBand title={<>Zobaczcie sale<br />w pełnej okazałości</>} text="Umówcie się na spotkanie – oprowadzimy Was po obiekcie i odpowiemy na wszystkie pytania." button="Umów spotkanie" />
    </>
  );
}
