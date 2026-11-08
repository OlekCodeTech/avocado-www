"use client";

import { asset } from "@/lib/asset";
import Reveal from "./Reveal";
import { plan } from "./Hero";

const TILES = [
  { t: "Wesela", p: "Jednodniowe lub z poprawinami. W sali albo pod gwiazdami.", img: "/img/wesela.webp", alt: "Para młoda wieczorem wśród brzóz", go: "Wesele" },
  { t: "Przyjęcia rodzinne", p: "Chrzciny, komunie, 18-stki, jubileusze – kameralnie i bez stresu.", img: "/img/przyjecia.webp", alt: "Stół z dekoracją z pomarańczowych kwiatów", go: "Chrzciny" },
  { t: "Wydarzenia", p: "Sylwester, Kobieciarnia, kolacje degustacyjne. Sprawdź kalendarz.", img: "/img/wydarzenia.webp", alt: "Sala przygotowana na imprezę z kulami disco", go: "" },
  { t: "Noclegi", p: "Domki na miejscu dla gości weselnych i nie tylko.", img: "", alt: "", go: "" },
];

export default function Offer() {
  return (
    <section className="sec" id="oferta">
      <div className="wrap">
        <Reveal className="head head--row">
          <div>
            <p className="eyebrow">Co u nas zorganizujecie</p>
            <h2>Jedno miejsce,<br />wiele okazji</h2>
          </div>
          <p className="head__aside">Każde przyjęcie prowadzi jeden opiekun – od pierwszej rozmowy po ostatni taniec.</p>
        </Reveal>
        <div className="tiles">
          {TILES.map((x, k) => (
            <Reveal key={x.t} delay={k * 0.08}>
              <a
                className={`tile${x.img ? "" : " tile--soon"}`}
                href={x.go ? "#planer" : x.t === "Noclegi" ? "#noclegi" : "#kontakt"}
                onClick={(e) => { if (x.go) { e.preventDefault(); plan(x.go); } }}
              >
                <div className="tile__media">
                  {x.img ? <img src={asset(x.img)} alt={x.alt} loading="lazy" /> : <div className="ph"><span>zdjęcia domków<br />w drodze</span></div>}
                  <span className="tile__num">0{k + 1}</span>
                </div>
                <h3>{x.t}</h3>
                <p>{x.p}</p>
                <span className="more">Zobacz <i>→</i></span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
