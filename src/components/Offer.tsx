import Link from "next/link";
import { asset } from "@/lib/asset";
import Reveal from "./Reveal";

const TILES = [
  { t: "Wesela", p: "Avocado to perfekcyjne miejsce na Twoje wyjątkowe wesele. Nasz zespół zadba o każdy detal – od przygotowania wnętrz, poprzez menu, po koordynację całego wydarzenia.", img: "/img/wesela.webp", alt: "Para młoda wieczorem wśród brzóz", href: "/wesela/" },
  { t: "Przyjęcia", p: "Niezależnie od okazji, Avocado to świetne miejsce, aby odnowić więzi i wspólnie doświadczyć cudownych chwil podczas przyjęć, jubileuszy i urodzin.", img: "/img/komunia.webp", alt: "Dekoracja komunijna w sali bankietowej", href: "/przyjecia/" },
  { t: "Spotkania firmowe", p: "Zapewnij swoim współpracownikom niezapomniany wieczór. Od tematycznych spotkań, po oficjalne konferencje.", img: "/img/firma-stol.webp", alt: "Bar i długi stół w sali bankietowej", href: "/przyjecia/#firmowe" },
  { t: "Wydarzenia otwarte", p: "Ekskluzywne spotkania, dostępne dla wszystkich: Sylwester, Kobieciarnia, kolacje degustacyjne.", img: "/img/kobieciarnia.webp", alt: "Kobieciarnia w Avocado", href: "/wydarzenia/" },
  { t: "Noclegi", p: "8 domków Superior wśród brzóz i pokoje przy sali – goście zostają na noc, a rano poprawiny.", img: "/img/domek-8.webp", alt: "Domek Avocado między brzozami", href: "/noclegi/" },
  { t: "Nasze sale", p: "Do Twojej dyspozycji mamy dwie niezależne przestrzenie: bankietową do 180 i plenerową do 130 osób.", img: "/img/sala-szeroka.webp", alt: "Sala bankietowa przygotowana na wesele", href: "/sale/" },
];

export default function Offer() {
  return (
    <section className="sec" id="oferta">
      <div className="wrap">
        <Reveal className="head head--row">
          <div>
            <p className="eyebrow">Oferta</p>
            <h2>Jedno miejsce,<br />wiele okazji</h2>
          </div>
          <p className="head__aside">Nasz dedykowany zespół zadba o to, aby Wasze spotkanie było wyjątkowe – tak, abyście w tym najważniejszym dniu nie musieli się o nic martwić.</p>
        </Reveal>
        <div className="tiles tiles--3">
          {TILES.map((x, k) => (
            <Reveal key={x.t} delay={(k % 3) * 0.08}>
              <Link className="tile" href={x.href}>
                <div className="tile__media">
                  <img src={asset(x.img)} alt={x.alt} loading="lazy" />
                  <span className="tile__num">0{k + 1}</span>
                </div>
                <h3>{x.t}</h3>
                <p>{x.p}</p>
                <span className="more">Zobacz <i>→</i></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
