import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Kitchen from "@/components/Kitchen";
import CtaBand from "@/components/CtaBand";
import { asset, CONTACT } from "@/lib/asset";

export const metadata: Metadata = {
  title: "O nas",
  description: "Avocado w Kuśniach koło Sieradza – miejsce stworzone z pasji do gotowania i perfekcyjnej organizacji. Poznajcie właścicieli, szefa kuchni Roberta Piąstkę i managera Patryka Marcisiaka.",
};

export default function ONas() {
  return (
    <>
      <PageHero
        img="/img/budynek.webp"
        alt="Budynek Restauracji Avocado"
        eyebrow="O nas"
        title="Miejsce, o jakim sami marzyliśmy"
        lead="Avocado powstało z chęci stworzenia miejsca, w którym sami chcielibyśmy zorganizować przyjęcie – z pasji do gotowania, perfekcyjnej organizacji i potrzeby świeżych, nowoczesnych wnętrz."
        pos="center 60%"
      />

      <section className="sec">
        <div className="wrap host">
          <Reveal><img src={asset("/img/wlasciciele.webp")} alt="Ewelina i Marek Molscy, właściciele Avocado" className="host__img" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="host__txt">
            <p className="eyebrow">Właściciele</p>
            <h2>Ewelina i Marek Molscy</h2>
            <p className="quote">„Chcieliśmy stworzyć miejsce, o jakim sami marzyliśmy, żeby zorganizować w nim przyjęcie.”</p>
            <p>Żaden z obiektów – choć różnorodnych i naprawdę dobrych – nie był dla nas idealny. Chcieliśmy miejsca, w którym każde spotkanie będzie niezapomniane: jasne sale, kuchnia na najwyższym poziomie i natura za oknem.</p>
            <p>Tak powstało Avocado w Kuśniach – przy brzozowym lesie, 10 minut od Sieradza. Dziś to dwie sale, ogród, restauracja z cateringiem i domki dla gości. I zespół, który świętuje razem z Wami.</p>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--sand" id="kuchnia">
        <div className="wrap host">
          <Reveal><img src={asset("/img/robert.webp")} alt="Robert Piąstka, szef kuchni Avocado" className="host__img" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="host__txt">
            <p className="eyebrow">Szef kuchni</p>
            <h2>Robert Piąstka</h2>
            <p className="quote">„Serwujemy tylko to, co sami chętnie podalibyśmy w naszych domach.”</p>
            <p>W Avocado od 2016 roku, od 2018 jako szef kuchni. Właściwy człowiek na właściwym miejscu: ma smak, uwagę i dokładność, które pozwalają zarządzać sporym zespołem i przygotowywać najlepsze kulinarne przyjęcia w regionie. Z pasją śledzi kulinarne nowinki i chętnie współpracuje z innymi szefami kuchni.</p>
            <p>Podstawą menu jest sezonowość – owoce i warzywa kupujemy bezpośrednio od rolników, a składniki pochodzą od sprawdzonych dostawców.</p>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap host">
          <Reveal><img src={asset("/img/patryk.webp")} alt="Patryk Marcisiak, manager Avocado" className="host__img" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="host__txt">
            <p className="eyebrow">Manager · Wasz opiekun</p>
            <h2>Patryk Marcisiak</h2>
            <p className="quote">„Są osoby, które po prostu dobrze czują ludzi, atmosferę i&nbsp;tempo wydarzeń. Patryk zdecydowanie do nich należy.”</p>
            <p>Od lat związany z branżą restauracyjną, organizację przyjęć zna od kuchni. Lubi, kiedy wszystko ma swój rytm, goście czują się swobodnie, a każdy detal jest dokładnie tam, gdzie powinien. W Avocado jest blisko Was od pierwszych rozmów aż po sam dzień wydarzenia: podpowie, doradzi, uporządkuje pomysły i zadba, żebyście mogli po prostu cieszyć się tym, co dzieje się wokół.</p>
            <p className="host__contact">
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </Reveal>
        </div>
      </section>

      <Kitchen />
      <CtaBand title={<>Przyjedźcie<br />i poczujcie to miejsce</>} text="Na indywidualnym spotkaniu oprowadzimy Was po salach i ogrodzie, a przy kawie opowiemy, jak pracujemy." button="Umów spotkanie" />
    </>
  );
}
