import Link from "next/link";
import { asset } from "@/lib/asset";
import Reveal from "./Reveal";

const TILES = [
  { t: "Wesela", p: "Jednodniowe lub z poprawinami. Ślub w ogrodzie, w sali albo pod gwiazdami.", img: "/img/wesela.webp", alt: "Para młoda wieczorem wśród brzóz", href: "/wesela/" },
  { t: "Przyjęcia rodzinne", p: "Chrzciny, komunie, roczki, 18-stki i jubileusze – kameralnie i bez stresu.", img: "/img/komunia.webp", alt: "Dekoracja komunijna w sali bankietowej", href: "/przyjecia/" },
  { t: "Imprezy firmowe", p: "Od integracji po konferencje – z nagłośnieniem, projektorem i koordynatorem.", img: "/img/firma-stol.webp", alt: "Bar i długi stół w sali bankietowej", href: "/przyjecia/#firmowe" },
  { t: "Wydarzenia otwarte", p: "Sylwester, Kobieciarnia, kolacje degustacyjne. Sprawdź kalendarz.", img: "/img/kobieciarnia.webp", alt: "Kobieciarnia w Avocado", href: "/wydarzenia/" },
  { t: "Noclegi", p: "8 domków Superior wśród brzóz – goście zostają na noc, a rano poprawiny.", img: "/img/domek-8.webp", alt: "Domek Avocado między brzozami", href: "/noclegi/" },
  { t: "Nasze sale", p: "Bankietowa do 180 gości i plenerowa do 130 – dwa charaktery, jeden standard.", img: "/img/sala-szeroka.webp", alt: "Sala bankietowa przygotowana na wesele", href: "/sale/" },
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
