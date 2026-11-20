import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Kitchen from "@/components/Kitchen";
import CtaBand from "@/components/CtaBand";
import { asset, CALENDLY, CONTACT } from "@/lib/asset";

export const metadata: Metadata = {
  title: "O nas",
  description: "Avocado w Kuśniach koło Sieradza – miejsce stworzone z pasji do gotowania i perfekcyjnej organizacji. Poznajcie właścicieli, szefa kuchni Roberta Piąstkę i managera Patryka Marcisiaka.",
};

export default function ONas() {
  return (
    <>
      <PageHero
        img="/img/onas.webp"
        more={["/img/intro-10.webp", "/img/intro-11.webp"]}
        alt="Wejście do sali bankietowej Avocado"
        eyebrow="O nas"
        title="Tworzymy miejsce, w którym chce się być razem."
        lead="Avocado powstało z myślą o spotkaniach w subtelnych wnętrzach, przy dobrym jedzeniu oraz swobodnej atmosferze, których nam brakowało. Takich, jakie sami lubimy."
      />

      <section className="sec">
        <div className="wrap host">
          <Reveal><img src={asset("/img/wlasciciele-2.webp")} alt="Ewelina i Marek Molscy, właściciele Avocado" className="host__img" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="host__txt">
            <p className="eyebrow">Właściciele</p>
            <h2>Ewelina i Marek Molscy</h2>
            <p>Pomysł na Avocado zaczął się od miejsca, w którym sami chcielibyśmy urządzić przyjęcie. Zależało nam na dobrej kuchni, przyjemnych wnętrzach i atmosferze, w której można poczuć się swobodnie. Takie miejsce tworzymy dla Was.</p>
            <p>Lubimy poznawać ludzi i ich pomysły na wspólne świętowanie. Chcemy, żebyście mogli przyjechać, porozmawiać i spokojnie zdecydować, czy Avocado wpisuje się w Wasze plany.</p>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--sand" id="manager">
        <div className="wrap host">
          <Reveal><img src={asset("/img/patryk.webp")} alt="Patryk Marcisiak, manager Avocado" className="host__img" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="host__txt">
            <p className="eyebrow">Manager</p>
            <h2>Patryk Marcisiak</h2>
            <p>Od lat związany jest z branżą restauracyjną, a organizację przyjęć zna od kuchni. Lubi, kiedy wszystko ma swój rytm, Goście czują się swobodnie, a każdy detal jest dokładnie tam, gdzie powinien. Świetne wyczucie estetyki przekłada się na dużą uważność w wyglądzie Waszych przyjęć.</p>
            <p>W Avocado Patryk jest blisko Was od pierwszych rozmów o przyjęciu – podpowie, doradzi, uporządkuje pomysły i zadba o to, żebyście zamiast myśleć o organizacji, mogli po prostu cieszyć się tym, co dzieje się wokół.</p>
            <p className="host__note">Nie musisz podejmować decyzji od razu ani znać wszystkich odpowiedzi – po prostu przyjedź się poznać.</p>
            <p className="host__contact">
              <a href={CALENDLY} target="_blank" rel="noopener" className="btn btn--sm">Umów spotkanie</a>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec" id="koordynatorzy">
        <div className="wrap">
          <Reveal className="head head--row">
            <div><p className="eyebrow">Zespół do zadań specjalnych</p><h2>Nasi koordynatorzy</h2></div>
            <p className="head__aside head__aside--wide">Od ustawienia stołów po ostatni taniec na parkiecie — nasi koordynatorzy czuwają nad przebiegiem Waszego przyjęcia. Dbają o przygotowanie sali, współpracują z kuchnią i obsługą oraz pilnują ustalonych szczegółów. Są blisko, gdy potrzebujecie pomocy, pojawia się pytanie lub trzeba coś zmienić w planie. To nasz zespół do zadań specjalnych. Poznajcie ich bliżej.</p>
          </Reveal>
          <div className="team">
            {[
              ["Natalia Jarominek", "/img/koord-natalia.webp"],
              ["Mateusz Jarzembski", "/img/koord-mateusz.webp"],
              ["Oskar Sibiński", "/img/koord-oskar.webp"],
            ].map(([n, src], k) => (
              <Reveal key={n} delay={k * 0.08}>
                <figure className="team__item">
                  <img src={asset(src)} alt={`${n}, koordynator przyjęć w Avocado`} loading="lazy" />
                  <figcaption><b>{n}</b><span>Koordynator przyjęć</span></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--sand" id="kuchnia">
        <div className="wrap host">
          <Reveal><img src={asset("/img/robert.webp")} alt="Robert Piąstka, szef kuchni Avocado" className="host__img" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="host__txt">
            <p className="eyebrow">Szef kuchni</p>
            <h2>Robert Piąstka</h2>
            <p>Robert jest z nami od 2016 roku, a od 2018 prowadzi kuchnię Avocado. Odpowiada za menu i pracę zespołu, który przygotowuje dania na Wasze przyjęcia. Łączy duże doświadczenie z wyczuciem smaku i dbałością o szczegóły. W kuchni stawia na sezonowość i pomysły dopasowane do okazji.</p>
            <p>Chętnie poznaje nowe smaki, śledzi kulinarne nowinki i współpracuje z innymi szefami kuchni. Z tych spotkań czerpie inspiracje, które później trafiają do naszego menu. Jest też otwarty na Wasze pomysły — jeśli macie ulubione potrawy lub szczególne potrzeby dotyczące jedzenia, opowiedzcie nam o nich. Robert wraz z zespołem pomoże dobrać menu do Waszego przyjęcia.</p>
          </Reveal>
        </div>
      </section>

      <section className="sec" id="motto">
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
