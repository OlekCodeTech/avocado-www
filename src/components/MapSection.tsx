"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CONTACT, DRIVE } from "@/lib/asset";
import Reveal from "./Reveal";

// Pozycje na schemacie (orientacyjne, kierunki geograficzne względem Kuśni).
const CITIES = [
  { name: "Łódź", min: 55, x: 470, y: 96, d: "M266 230 Q370 160 460 104", lx: 470, ly: 74, below: false },
  { name: "Zduńska Wola", min: 20, x: 352, y: 176, d: "M268 234 Q310 206 344 182", lx: 372, ly: 160, below: false },
  { name: "Łask", min: 30, x: 420, y: 150, d: "M270 232 Q345 190 410 156", lx: 436, ly: 130, below: false },
  { name: "Kalisz", min: 55, x: 60, y: 130, d: "M244 234 Q150 190 70 138", lx: 60, ly: 108, below: false },
  { name: "Wieruszów", min: 40, x: 96, y: 380, d: "M246 252 Q170 320 104 372", lx: 96, ly: 412, below: true },
  { name: "Wieluń", min: 40, x: 222, y: 410, d: "M254 254 Q238 330 224 400", lx: 222, ly: 442, below: true },
];

export default function MapSection({ sand = true }: { sand?: boolean }) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className={`sec${sand ? " sec--sand" : ""}`} id="dojazd">
      <div className="wrap map">
        <Reveal className="map__txt">
          <p className="eyebrow">Dojazd</p>
          <h2>Bliżej, niż myślicie</h2>
          <p>Avocado leży w Kuśniach, 10 minut od Sieradza i tuż przy trasie S8. Z Łodzi czy Kalisza dojedziecie w niecałą godzinę – a na noc goście zostają w naszych domkach.</p>
          <ul className="dist">
            {DRIVE.map((c) => (
              <li key={c.name} onMouseEnter={() => setHover(c.name)} onMouseLeave={() => setHover(null)} className={hover === c.name ? "on" : ""}>
                <b>{c.name}</b><span>ok. {c.min} min</span>
              </li>
            ))}
          </ul>
          <a href={CONTACT.maps} className="link" target="_blank" rel="noopener">Wyznacz trasę w Google Maps →</a>
        </Reveal>

        <div className="map__art">
          <svg viewBox="0 0 520 460" role="img" aria-labelledby="mapT">
            <title id="mapT">Schemat dojazdu do Avocado w Kuśniach z Łodzi, Kalisza, Wielunia, Łasku, Zduńskiej Woli i Wieruszowa</title>
            <defs>
              <radialGradient id="land" cx="50%" cy="52%" r="60%">
                <stop offset="0" stopColor="#E6DCCB" />
                <stop offset="1" stopColor="#E6DCCB" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="255" cy="240" r="230" fill="url(#land)" />
            {[70, 140, 210].map((r) => <circle key={r} cx="255" cy="240" r={r} className="ring" />)}
            {CITIES.map((c, k) => (
              <g key={c.name} className={`city${hover === c.name ? " on" : ""}`} onMouseEnter={() => setHover(c.name)} onMouseLeave={() => setHover(null)}>
                <motion.path d={c.d} className="route" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 + k * 0.15, ease: "easeInOut" }} />
                <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 + k * 0.15 }}>
                  <circle cx={c.x} cy={c.y} r="6" className="dot" />
                  <text x={c.lx} y={c.ly} textAnchor="middle" className="cname">{c.name}</text>
                  <text x={c.lx} y={c.ly + (c.below ? 18 : -22)} textAnchor="middle" className="sm">{c.min} min</text>
                </motion.g>
              </g>
            ))}
            <circle cx="292" cy="214" r="4" className="dot dot--sm" />
            <text x="300" y="226" className="sm">Sieradz · 10 min</text>
            <g className="pin">
              <circle cx="255" cy="240" r="26" className="halo" />
              <circle cx="255" cy="240" r="11" />
              <text x="255" y="292" textAnchor="middle" className="pname">Avocado</text>
              <text x="255" y="310" textAnchor="middle" className="sm">Kuśnie 32A</text>
            </g>
          </svg>
        </div>
      </div>

      <Reveal className="wrap">
        <div className="gmap">
          <iframe src={CONTACT.mapsEmbed} title="Mapa Google – Restauracja Avocado, Kuśnie 32A, Sieradz" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </Reveal>
    </section>
  );
}
