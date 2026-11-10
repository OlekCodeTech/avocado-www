import Reveal from "./Reveal";

/* Opinie gości z obecnej strony (fragmenty) */
const REVIEWS = [
  { who: "Marysia i Tomek", what: "wesele", txt: "We wrześniu zorganizowaliśmy nasze wesele w Avocado. Spokojnie mogę powiedzieć, że była to jedna z najlepszych decyzji w moim życiu. Sala jest piękna, otoczenie jest piękne, obsługa na najwyższym poziomie, a jedzenie wspaniałe. Nasi goście byli zachwyceni! My zresztą też. Niczego bym w tym dniu nie zmieniła." },
  { who: "Błażej Kwiatkowski", what: "wesele i poprawiny", txt: "Nigdzie nie spotkaliśmy tak profesjonalnej obsługi kelnerskiej. Jedzenie, jakie jest podawane, nie wymaga więcej komentarza – było przepyszne! Podanie tortu było spektakularne. Sala plenerowa jest genialna, widać wszystkich gości, nawet tych, którzy odpoczywają w ogrodzie – przeszklenia są niesamowite!" },
  { who: "Anita Kaczmarek-Walczuk", what: "przyjęcie", txt: "Chciałabym docenić kunszt, smak, dokładność oraz wygląd serwowanych dań. Obłędny smak towarzyszył nam przez całe przyjęcie – w każdym daniu, przystawce, wręcz zachwycał! Lokal zachwycił osoby z całego kraju, ale i przyjezdnych z Włoch. Miejsce, atmosfera, okolica, sam wystrój i aranżacja – bajka!" },
  { who: "Patrycja Biegańska", what: "wesele", txt: "Od pierwszego zobaczenia tej plenerowej sali wiedziałam, że to idealne miejsce – magiczna atmosfera pozostała w pamięci wszystkich gości. To najwyższy poziom usług, jaki sala weselna może zaoferować. Sala dostała tyle komplementów co Para Młoda, albo więcej! Top, top, top!" },
];

export default function Reviews() {
  return (
    <section className="sec sec--sand" id="opinie">
      <div className="wrap">
        <Reveal className="head head--center"><p className="eyebrow">Nasza historia</p><h2>Co mówią nasi goście</h2></Reveal>
        <div className="reviews">
          {REVIEWS.map((r, k) => (
            <Reveal key={r.who} delay={k * 0.08}>
              <figure className="review">
                <blockquote>{r.txt}</blockquote>
                <figcaption><b>{r.who}</b><span>{r.what}</span></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
