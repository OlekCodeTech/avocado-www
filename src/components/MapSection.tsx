import { CONTACT, DRIVE } from "@/lib/asset";
import Reveal from "./Reveal";
import LiveMap from "./LiveMap";

export default function MapSection({ sand = true }: { sand?: boolean }) {
  return (
    <section className={`sec${sand ? " sec--sand" : ""}`} id="dojazd">
      <div className="wrap map">
        <Reveal className="map__txt">
          <p className="eyebrow">Dojazd</p>
          <h2>Bliżej, niż myślicie</h2>
          <p>Avocado leży w Kuśniach, 10 minut od Sieradza i tuż przy trasie S8. Z Łodzi czy Kalisza dojedziecie w niecałą godzinę – a na noc goście zostają w naszych domkach.</p>
          <ul className="dist">
            {DRIVE.map((c) => (
              <li key={c.name}><b>{c.name}</b><span>ok. {c.min} min</span></li>
            ))}
          </ul>
          <a href={CONTACT.maps} className="link" target="_blank" rel="noopener">Wyznacz trasę w Google Maps →</a>
        </Reveal>
        <Reveal delay={0.1} className="map__live">
          <LiveMap />
        </Reveal>
      </div>
    </section>
  );
}
