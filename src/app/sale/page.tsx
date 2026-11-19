import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import Strip from "@/components/Strip";
import CtaBand from "@/components/CtaBand";
import { asset, FAQ, planHref } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Sale – bankietowa i plenerowa",
  description: "Sala bankietowa do 180 gości i sala plenerowa do 130 gości w Avocado koło Sieradza. Klimatyzacja, parking, ogród, plac zabaw i ceremonie w plenerze.",
};

const SPECS = ["Klimatyzacja", "Dedykowany parking", "Przestrzeń gastronomiczna i zaplecze sanitarne", "Profesjonalne zaplecze multimedialne (nagłośnienie, projektor, ekran, mikrofony)", "Dedykowany koordynator wydarzenia"];

const BANK = [
  { src: "/img/sala-szeroka.webp", alt: "Sala bankietowa w świetle dziennym" },
  { src: "/img/sb-139.webp", alt: "Bar w sali bankietowej" },
  { src: "/img/bank-wieczor.webp", alt: "Sala bankietowa wieczorem" },
  { src: "/img/sb-gk-pop13.webp", alt: "Długie stoły na tle świetlnej kurtyny" },
  { src: "/img/sb-116.webp", alt: "Okrągłe stoły z błękitnymi obrusami" },
  { src: "/img/sala-dlugie-stoly.webp", alt: "Układ długich stołów" },
  { src: "/img/sb-a50.webp", alt: "Dekoracja stołu ze świecami i czerwonymi kwiatami" },
  { src: "/img/bk-3.webp", alt: "Okrągłe stoły przy oknach" },
  { src: "/img/sb-113.webp", alt: "Okrągły stół z błękitnym obrusem i pomarańczowymi serwetami" },
  { src: "/img/sb-d44.webp", alt: "Stoły przy wejściu do sali" },
  { src: "/img/stol-dlugi.webp", alt: "Drewniany stół ze świecami" },
  { src: "/img/sb-a4.webp", alt: "Sala w czerni i czerwieni" },
  { src: "/img/bk-5.webp", alt: "Stół pary młodej" },
  { src: "/img/sb-gk-pop.webp", alt: "Sala bankietowa z długimi stołami przy oknach" },
  { src: "/img/bk-7.webp", alt: "Sala z błękitnymi obrusami" },
  { src: "/img/sb-119.webp", alt: "Długie stoły z granatowymi obrusami" },
  { src: "/img/nw-5.webp", alt: "Sala bankietowa w różu i bieli" },
  { src: "/img/wejscie.webp", alt: "Wejście do Avocado" },
];
const PLENER = [
  { src: "/img/intro-15.webp", alt: "Okrągłe stoły w sali plenerowej" },
  { src: "/img/plener-wnetrze.webp", alt: "Jasne wnętrze sali plenerowej" },
  { src: "/img/pl-3u2a7479.webp", alt: "Sala plenerowa z dekoracją z białych kwiatów" },
  { src: "/img/pl-k09.webp", alt: "Stół z białymi kwiatami przy oknie" },
  { src: "/img/pl-wn-2.webp", alt: "Długie stoły z zielenią" },
  { src: "/img/pl-zew-3.webp", alt: "Sala plenerowa o zmierzchu" },
  { src: "/img/plener-stoly.webp", alt: "Długie stoły w sali plenerowej" },
  { src: "/img/pl-525a1302.webp", alt: "Sala plenerowa w bordowej oprawie" },
  { src: "/img/pl-k19.webp", alt: "Miejsce ceremonii wśród brzóz" },
  { src: "/img/plener-zima.webp", alt: "Sala plenerowa zimą" },
  { src: "/img/pl-wn-1.webp", alt: "Białe stoły w sali plenerowej" },
  { src: "/img/pl-wn-4.webp", alt: "Sala plenerowa z widokiem na las" },
  { src: "/img/pl-525a1340.webp", alt: "Miejsce ceremonii w ogrodzie z bordową dekoracją" },
  { src: "/img/pl-k196.webp", alt: "Wieża kieliszków w ogrodzie" },
  { src: "/img/pl-zew-2.webp", alt: "Goście na tarasie sali plenerowej" },
  { src: "/img/intro-07.webp", alt: "Sufit z tkaniny i ściana z drewna" },
];
const CEREMONIA = [
  { src: "/img/ceremonia-goscie.webp", alt: "Ceremonia ślubna w ogrodzie wśród brzóz" },
  { src: "/img/cer-k094.webp", alt: "Przysięga pary młodej w ogrodzie" },
  { src: "/img/cer-3u2a8516.webp", alt: "Para młoda wśród gości po ceremonii" },
  { src: "/img/slub-1.webp", alt: "Para młoda wśród gości po ceremonii" },
  { src: "/img/cer-k145.webp", alt: "Para młoda przy dekoracji z białej tkaniny" },
  { src: "/img/slub-3.webp", alt: "Ceremonia pod altaną" },
  { src: "/img/cer-3u2a8268.webp", alt: "Ceremonia w ogrodzie z białym dywanem" },
  { src: "/img/slub-4.webp", alt: "Wejście pary młodej na ceremonię" },
  { src: "/img/nw-1.webp", alt: "Pocałunek pary młodej podczas ceremonii" },
  { src: "/img/slub-2.webp", alt: "Goście witają parę młodą" },
  { src: "/img/slub-7.webp", alt: "Aleja prowadząca do miejsca ceremonii" },
  { src: "/img/ceremonia-las.webp", alt: "Krzesła ustawione wśród brzóz" },
  { src: "/img/slub-8.webp", alt: "Stół przygotowany do ceremonii" },
  { src: "/img/slub-9.webp", alt: "Miejsce ceremonii z lotu ptaka" },
  { src: "/img/pl-cer-2.webp", alt: "Altana ślubna w ogrodzie" },
  { src: "/img/pl-cer-3.webp", alt: "Goście podczas ceremonii w ogrodzie" },
];

export default function Sale() {
  return (
    <>
      <PageHero
        img="/img/plener-dron.webp"
        more={["/img/intro-11.webp", "/img/intro-10.webp", "/img/intro-15.webp", "/img/intro-14.webp"]}
        alt="Sala plenerowa Avocado z lotu ptaka"
        eyebrow="Nasze obiekty"
        title="Dwie sale – dwa różne charaktery."
        lead="Posiadamy dwie niezależne przestrzenie. Zobacz nasze obiekty w pełnej okazałości i umów się na spotkanie już dzisiaj."
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
              <p>Drewniany sufit, duże okna i ciepłe światło tworzą spokojne tło dla Waszego przyjęcia. Wnętrze można zaaranżować na różne sposoby — od rodzinnego obiadu po wesele z tańcami. Pokażemy Wam przykładowe ustawienia stołów i możliwości dekoracji.</p>
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
              <h2>Przestrzeń pełna światła</h2>
              <p>Przeszklony pawilon pozwala być blisko zieleni także podczas przyjęcia wewnątrz. Tuż obok znajduje się taras i ogród. To przestrzeń dla osób, które lubią naturalne otoczenie i chcą mieć je blisko przez cały dzień. Wieczorami całość rozświetlają girlandy lampek. Sala i otoczenie idealne na ślub w plenerze, letnie wesele i kameralne przyjęcia.</p>
              <ul className="specs">{SPECS.map((s) => <li key={s}>{s}</li>)}<li>Taras, ogród i ceremonia w plenerze</li></ul>
              <Link href={planHref()} className="link">Zapytaj o salę plenerową →</Link>
            </Reveal>
          </div>
        </div>
        <Gallery pics={PLENER} cols={3} wide={[0, 9]} tight />
      </section>

      <section className="sec" id="teren">
        <div className="wrap">
          <Reveal className="head head--center"><p className="eyebrow">Ceremonia</p><h2>Na Twoje życzenie możemy też<br />zaaranżować ceremonię ślubną</h2><p className="head__lead">Nasze ogrody aż proszą się o zorganizowanie w nich uroczystości. Będą idealnym tłem w Waszym wymarzonym dniu. Dostosujemy wszystko do Waszych potrzeb.</p></Reveal>
          <Reveal><Strip pics={CEREMONIA} title="Ceremonie w ogrodzie Avocado" /></Reveal>
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

      <Faq items={FAQ.slice(0, 5)} more={FAQ.slice(5)} sand />
      <CtaBand title={<>Spełnienie<br />Waszych marzeń</>} text="Jeśli zainteresowało Cię to, co mamy do zaoferowania – zapraszamy. Na indywidualnym spotkaniu poznamy Państwa oczekiwania, spersonalizujemy ofertę oraz przybliżymy możliwości przyjęcia na sali lub cateringu." button="Zacznij planować" />
    </>
  );
}
