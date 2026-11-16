import Link from "next/link";
import { asset } from "@/lib/asset";
import Reveal from "./Reveal";

const TILES = [
  { t: "Wesela", p: "A co, jeśli właśnie znaleźliście miejsce na Wasze wesele? Poznajcie Avocado i sprawdźcie, czy poczujecie się tu u siebie.", img: "/img/wesela.webp", alt: "Para młoda wieczorem wśród brzóz", href: "/wesela/" },
  { t: "Przyjęcia", p: "Zbierzcie rodzinę i przyjaciół przy jednym stole. My zajmiemy się menu i organizacją, a Wy cieszcie się rozmowami, śmiechem i czasem razem. Niezależnie od okazji Avocado będzie bardzo dobrym wyborem.", img: "/img/of-przyjecia.webp", alt: "Sala plenerowa przygotowana na rodzinne przyjęcie", href: "/przyjecia/" },
  { t: "Spotkania firmowe", p: "Zapewnij swoim współpracownikom niezapomniany wieczór. Od tematycznych spotkań, po oficjalne konferencje.", img: "/img/of-firma.webp", alt: "Sala bankietowa przygotowana na jubileusz firmy", href: "/przyjecia/#firmowe" },
  { t: "Wydarzenia otwarte", p: "Nie musicie czekać na zaproszenie, aby bawić się w Avocado. Zobaczcie wydarzenia, jakie dla Was tworzymy – sprawdźcie, co planujemy w najbliższym czasie.", img: "/img/of-wydarzenia.webp", alt: "Goście przy stołach podczas wydarzenia w Avocado", href: "/wydarzenia/" },
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
          <p className="head__aside">Nasz dedykowany koordynator oraz zespół kelnerski zadba, aby Wasze spotkanie było wyjątkowe – jeden człowiek, jeden zespół, wszystko po to, abyście w najważniejszym dniu nie musieli się o nic martwić.</p>
        </Reveal>
        <div className="tiles tiles--4 tiles--offer">
          {TILES.map((x, k) => (
            <Reveal key={x.t} delay={k * 0.08}>
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
