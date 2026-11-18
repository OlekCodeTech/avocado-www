import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Kinds from "@/components/Kinds";
import { asset, planHref } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Przyjęcia rodzinne i firmowe",
  description: "Chrzciny, komunie, roczki, 18-stki, jubileusze oraz imprezy firmowe i konferencje w Avocado koło Sieradza. Dwie sale, ogród, plac zabaw i własna kuchnia.",
};

export default function Przyjecia() {
  return (
    <>
      <PageHero
        img="/img/prz-hero-1.webp"
        more={["/img/prz-hero-2.webp", "/img/kom-7.webp", "/img/intro-13.webp"]}
        alt="Sala plenerowa udekorowana na rodzinne przyjęcie"
        eyebrow="Przyjęcia · rodzinne i firmowe"
        title="Wyjątkowe miejsce spotkań"
        lead="Ważne chwile wymagają wyjątkowej oprawy. Chrzciny, urodziny, jubileusz — każda okazja ma swoją historię i ludzi, z którymi chcecie ją dzielić. W Avocado jest miejsce na wspólny obiad, długie rozmowy i zabawę. Opowiedzcie nam, co planujecie, a pomożemy dobrać salę, ustalić menu i przygotować przyjęcie po Waszemu."
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
          <Kinds />
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap split split--rev">
          <Reveal className="split__img"><img src={asset("/img/prz-stol.webp")} alt="Zespół Avocado nakłada dania gościom przy bufecie" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="split__txt">
            <h2>Przy wspólnym stole, po Waszemu</h2>
            <p>Z naszym managerem i szefem kuchni ustalicie menu dopasowane do okazji, sezonu i upodobań Waszych gości, a nasz zespół zadba o przygotowanie i przebieg przyjęcia. Nie masz czasu na przygotowania, a planowanie generuje niepotrzebny stres? Nie ma problemu, my się wszystkim zajmiemy.</p>
            <ul className="ticks">
              <li>Menu dopasowane do Waszego spotkania</li>
              <li>Jasne wnętrza i swobodna atmosfera</li>
              <li>Tarasy i ogród pełen zakamarków</li>
              <li>Plac zabaw dla najmłodszych</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="sec" id="firmowe">
        <div className="wrap split">
          <Reveal className="split__img"><img src={asset("/img/gf-13.webp")} alt="Sala bankietowa przygotowana na jubileusz firmy" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="split__txt">
            <p className="eyebrow">Imprezy firmowe</p>
            <h2>Przenieście się z biur na… event firmowy</h2>
            <p>Kolacja zespołu, jubileusz firmy czy spotkanie po szkoleniu? W Avocado możecie połączyć wspólny posiłek z czasem na rozmowy. Napiszcie, jaki charakter ma mieć wydarzenie, ilu uczestników zapraszacie i czy potrzebujecie noclegów lub wyposażenia do prezentacji.</p>
            <h3 className="sub">Zacznijmy od Waszych planów:</h3>
            <p>Podajcie okazję, przybliżony termin i liczbę gości. Dobierzemy możliwą przestrzeń i przygotujemy propozycję przyjęcia.</p>
            <h3 className="sub">Przyjęcia firmowe z Avocado:</h3>
            <ul className="ticks">
              <li>Integracja na najwyższym poziomie</li>
              <li>Profesjonalne zaplecze multimedialne (nagłośnienie, projektor, ekran, mikrofony)</li>
              <li>Dedykowany koordynator wydarzenia</li>
              <li>Przyjęcie na sali lub catering</li>
            </ul>
            <div className="btns btns--top"><Link href={planHref("Impreza firmowa")} className="btn">Zapytajcie o termin i ofertę</Link></div>
          </Reveal>
        </div>
      </section>

      <CtaBand title={<>Wydarzenie, które na długo<br />zapadnie w pamięci wszystkich</>} text="Zawsze polecamy odwiedzenie Avocado. Pozwoli to poczuć wyjątkową atmosferę miejsca i lepiej poznać to, co mamy do zaoferowania." okazja="Chrzciny" button="Zacznij planować" />
    </>
  );
}
