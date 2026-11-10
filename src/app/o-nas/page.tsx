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
        lead="Avocado powstało z chęci stworzenia miejsca, o jakim sami marzyliśmy, aby zorganizować w nim przyjęcie. Z pasji do gotowania oraz perfekcyjnej organizacji, a także potrzeby świeżych i nowoczesnych wnętrz."
        pos="center 60%"
      />

      <section className="sec">
        <div className="wrap host">
          <Reveal><img src={asset("/img/wlasciciele.webp")} alt="Ewelina i Marek Molscy, właściciele Avocado" className="host__img" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="host__txt">
            <p className="eyebrow">Właściciele</p>
            <h2>Ewelina i Marek Molscy</h2>
            <p className="quote">„Chcieliśmy stworzyć miejsce, w którym każde spotkanie będzie niezapomniane.”</p>
            <p>Avocado powstało z chęci stworzenia miejsca o jakim sami marzyliśmy, aby zorganizować w nim przyjęcie. Żaden z obiektów, mimo że różnorodnych i naprawdę dobrych, nie był dla nas idealny. Chcieliśmy stworzyć miejsce, w którym każde spotkanie będzie niezapomniane. Z pasji do gotowania oraz perfekcyjnej organizacji, a także potrzeby świeżych i nowoczesnych wnętrz...</p>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--sand" id="kuchnia">
        <div className="wrap host">
          <Reveal><img src={asset("/img/robert.webp")} alt="Robert Piąstka, szef kuchni Avocado" className="host__img" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="host__txt">
            <p className="eyebrow">Szef kuchni</p>
            <h2>Robert Piąstka</h2>
            <p className="quote">„Właściwy człowiek na właściwym miejscu.”</p>
            <p>W naszej firmie od 2016 roku, od 2018 jako szef kuchni Restauracji Avocado. Wspaniale odnalazł się w roli szefa kuchni. Swoim doświadczeniem mógłby obdarzyć kilku kucharzy. Ma smak, uwagę oraz dokładność. Wszystkie cechy, które na co dzień pozwalają zarządzać sporym zespołem kucharzy i pomocników oraz przygotowywać najlepsze kulinarne przyjęcia w naszym regionie.</p>
            <p>Z pasją śledzi kulinarne nowinki, które znajdują odzwierciedlenie w naszym menu. Nie boi się wyzwań i chętnie współpracuje z innymi szefami kuchni, czerpiąc inspiracje oraz nowe doświadczenia. Jego zaangażowanie i dążenie do perfekcji kształtują smak i jakość serwowanych dań.</p>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap host">
          <Reveal><img src={asset("/img/patryk.webp")} alt="Patryk Marcisiak, manager Avocado" className="host__img" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="host__txt">
            <p className="eyebrow">Manager</p>
            <h2>Patryk Marcisiak</h2>
            <p className="quote">„Są osoby, które po prostu dobrze czują ludzi, atmosferę i&nbsp;tempo wydarzeń. Patryk zdecydowanie do nich należy.”</p>
            <p>Od lat związany jest z branżą restauracyjną, a organizację przyjęć zna od kuchni. Lubi, kiedy wszystko ma swój rytm, Goście czują się swobodnie, a każdy detal jest dokładnie tam, gdzie powinien. Świetne wyczucie estetyki przekłada się na dużą uważność w wyglądzie Waszych przyjęć.</p>
            <p>W Avocado Patryk jest blisko Was od pierwszych rozmów o przyjęciu aż po sam dzień wydarzenia. Podpowie, doradzi, uporządkuje pomysły i zadba o to, żebyście zamiast myśleć o organizacji, mogli po prostu cieszyć się tym, co dzieje się wokół.</p>
            <p className="host__contact">
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--sand" id="motto">
        <div className="wrap">
          <Reveal className="head head--center"><p className="eyebrow">Kuchnia</p><h2>Dobre jedzenie to podstawa<br />udanej imprezy</h2></Reveal>
          <div className="motto">
            {[
              ["01", "Nasze motto", "W naszej kuchni kierujemy się mottem: z pasji do gotowania. Podstawą menu jest sezonowość, dlatego korzystamy wyłącznie z wyselekcjonowanych składników pochodzących od sprawdzonych dostawców. Owoce i warzywa kupujemy bezpośrednio od rolników, dzięki czemu mamy pewność ich świeżości i najwyższej jakości."],
              ["02", "Pochodzenie produktów", "Zawsze zwracamy uwagę na pochodzenie produktów, ponieważ serwujemy tylko to, co sami chętnie podalibyśmy w naszych domach. Dbałość o smak i najwyższy standard to fundament naszej filozofii kulinarnej."],
              ["03", "Zaplanuj własne menu", "Nie boimy się wyzwań. Jeśli masz pomysł na swoje przyjęcie, a szczególnie na jego kulinarną formę lub określone smaki – jesteśmy otwarci na Twoje propozycje i chętnie podejmiemy się przygotowania takich potraw, jakie preferujesz. Spotkaj się z nami i powiedz nam o swoich życzeniach."],
            ].map(([n, t, p], k) => (
              <Reveal key={n} delay={k * 0.08}>
                <div className="motto__item"><span className="motto__n">{n}</span><h3>{t}</h3><p>{p}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Kitchen />
      <CtaBand title={<>Przyjedźcie<br />i poczujcie to miejsce</>} text="Zobacz nasze obiekty w pełnej okazałości. Umów się na spotkanie już dzisiaj." button="Zacznij planować" />
    </>
  );
}
