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

const SPECS = ["Klimatyzacja", "Dedykowany parking", "Przestrzeń gastronomiczna i zaplecze sanitarne", "Profesjonalne zaplecze multimedialne (nagłośnienie, projektor, ekran, mikrofony)", "Dedykowany koordynator wydarzenia"];

const BANK = [
  { src: "/img/sala-szeroka.webp", alt: "Sala bankietowa w świetle dziennym" },
  { src: "/img/sala-biala.webp", alt: "Sala bankietowa z długimi stołami" },
  { src: "/img/bank-wieczor.webp", alt: "Sala bankietowa wieczorem" },
  { src: "/img/bk-1.webp", alt: "Łuk z kwiatów z neonem" },
  { src: "/img/sala-dlugie-stoly.webp", alt: "Układ długich stołów" },
  { src: "/img/bk-3.webp", alt: "Okrągłe stoły przy oknach" },
  { src: "/img/stol-dlugi.webp", alt: "Drewniany stół ze świecami" },
  { src: "/img/bk-5.webp", alt: "Stół pary młodej" },
  { src: "/img/bk-7.webp", alt: "Sala z błękitnymi obrusami" },
  { src: "/img/bk-2.webp", alt: "Dekoracja z białych i pomarańczowych kwiatów" },
  { src: "/img/nw-5.webp", alt: "Sala bankietowa w różu i bieli" },
  { src: "/img/wejscie.webp", alt: "Wejście do Avocado" },
];
const PLENER = [
  { src: "/img/intro-15.webp", alt: "Okrągłe stoły w sali plenerowej" },
  { src: "/img/plener-wnetrze.webp", alt: "Jasne wnętrze sali plenerowej" },
  { src: "/img/pl-wn-2.webp", alt: "Długie stoły z zielenią" },
  { src: "/img/pl-zew-3.webp", alt: "Sala plenerowa o zmierzchu" },
  { src: "/img/plener-stoly.webp", alt: "Długie stoły w sali plenerowej" },
  { src: "/img/plener-zima.webp", alt: "Sala plenerowa zimą" },
  { src: "/img/pl-wn-1.webp", alt: "Białe stoły w sali plenerowej" },
  { src: "/img/pl-wn-4.webp", alt: "Sala plenerowa z widokiem na las" },
  { src: "/img/pl-zew-2.webp", alt: "Goście na tarasie sali plenerowej" },
  { src: "/img/intro-07.webp", alt: "Sufit z tkaniny i ściana z drewna" },
  { src: "/img/pl-wn-7.webp", alt: "Stół pary młodej w sali plenerowej" },
  { src: "/img/pl-las.webp", alt: "Brzozowy las przy sali plenerowej" },
];

export default function Sale() {
  return (
    <>
      <PageHero
        img="/img/plener-dron.webp"
        more={["/img/intro-11.webp", "/img/intro-10.webp", "/img/intro-15.webp", "/img/intro-14.webp"]}
        alt="Sala plenerowa Avocado z lotu ptaka"
        eyebrow="Nasze obiekty"
        title="Dwie niezależne przestrzenie"
        lead="Do Twojej dyspozycji mamy dwie niezależne przestrzenie – razem do 240 osób. Zobacz nasze obiekty w pełnej okazałości i umów się na spotkanie już dzisiaj."
      >
        <a href="#bankietowa" className="btn btn--light">Sala bankietowa</a>
        <a href="#plenerowa" className="btn btn--ghost">Sala plenerowa</a>
      </PageHero>

      <section className="sec" id="bankietowa">
        <div className="wrap">
          <div className="split">
            <Reveal className="split__img"><img src={asset("/img/bank-dzien.webp")} alt="Sala bankietowa za dnia" loading="lazy" /></Reveal>
            <Reveal delay={0.1} className="split__txt">
              <p className="eyebrow">Sala bankietowa · Pojemność: do 180 osób</p>
              <h2>Nowoczesne wnętrza</h2>
              <p>Nowoczesne wnętrze z drewnianym sufitem, ciepłym światłem i dużymi oknami z widokiem na zieleń. Neutralna baza, którą łatwo dopasować do Waszego stylu – od klasyki po minimalizm. Parkiet, bar i słodki stół mają swoje miejsce, a goście nie tłoczą się przy przejściach.</p>
              <ul className="specs">{SPECS.map((s) => <li key={s}>{s}</li>)}<li>Dwa pokoje dwuosobowe – głównie dla naszych Par Młodych</li></ul>
              <Link href={planHref()} className="link">Zapytaj o salę bankietową →</Link>
            </Reveal>
          </div>
        </div>
        <Gallery pics={BANK} cols={3} wide={[]} tight />
      </section>

      <section className="sec sec--sand" id="plenerowa">
        <div className="wrap">
          <div className="split split--rev">
            <Reveal className="split__img"><img src={asset("/img/plener-front.webp")} alt="Sala plenerowa na skraju lasu" loading="lazy" /></Reveal>
            <Reveal delay={0.1} className="split__txt">
              <p className="eyebrow">Sala plenerowa · Pojemność: do 130 osób</p>
              <h2>Industrialny sznyt</h2>
              <p>Przeszklony, czarny pawilon na skraju lasu – latem otwarty na ogród, zimą przytulny i rozświetlony. Dzień spędzacie w zieleni, a wieczorem całość rozświetlają girlandy lampek. Idealna na ślub w plenerze, letnie wesele i kameralne przyjęcia.</p>
              <ul className="specs">{SPECS.map((s) => <li key={s}>{s}</li>)}<li>Taras, ogród i ceremonia w plenerze</li></ul>
              <Link href={planHref()} className="link">Zapytaj o salę plenerową →</Link>
            </Reveal>
          </div>
        </div>
        <Gallery pics={PLENER} cols={3} wide={[]} tight />
      </section>

      <section className="sec" id="teren">
        <div className="wrap">
          <Reveal className="head head--center"><p className="eyebrow">Ceremonia</p><h2>Na Twoje życzenie możemy też<br />zaaranżować ceremonię ślubną</h2><p className="head__lead">Nasze ogrody aż proszą się o zorganizowanie w nich uroczystości. Będą idealnym tłem w Waszym wymarzonym dniu. Dostosujemy wszystko do Waszych potrzeb.</p></Reveal>
          <div className="tiles tiles--4">
            {[
              { t: "Ogród i las", p: "Miejsce na ceremonię, sesję zdjęciową i wieczorne ognisko.", img: "/img/ceremonia-las.webp" },
              { t: "Plac zabaw", p: "Dzieci bawią się w zasięgu wzroku rodziców.", img: "/img/plac-zabaw.webp" },
              { t: "Taras", p: "Kawa o poranku i drink wieczorem – z widokiem na zieleń.", img: "/img/g8.webp" },
              { t: "Avocado Domki", p: "8 całorocznych domków kilka kroków od sal.", img: "/img/domek-taras.webp", href: "/noclegi/" },
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
      <CtaBand title={<>Spełnienie<br />Waszych marzeń</>} text="Jeśli zainteresowało Cię to, co mamy do zaoferowania – zapraszamy. Na indywidualnym spotkaniu poznamy Państwa oczekiwania, spersonalizujemy ofertę oraz przybliżymy możliwości przyjęcia na sali lub cateringu." button="Zacznij planować" />
    </>
  );
}
