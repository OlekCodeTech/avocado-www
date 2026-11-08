"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CONTACT } from "@/lib/asset";
import Reveal from "./Reveal";

// Odległości orientacyjne – do weryfikacji w Google Maps przed wdrożeniem.
const CITIES = [
  { name: "Łódź", km: 65, min: 50, via: "S8", x: 462, y: 104, d: "M262 232 Q360 170 452 112", lx: 462, ly: 82 },
  { name: "Kalisz", km: 60, min: 55, via: "DK12", x: 68, y: 110, d: "M248 228 Q160 180 78 118", lx: 68, ly: 88 },
  { name: "Wieluń", km: 55, min: 50, via: "DK45", x: 212, y: 398, d: "M252 248 Q232 320 214 388", lx: 212, ly: 430 },
];

export default function MapSection() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="sec sec--sand" id="dojazd">
      <div className="wrap map">
        <Reveal className="map__txt">
          <p className="eyebrow">Dojazd</p>
          <h2>Bliżej, niż myślicie</h2>
          <p>Avocado leży w Kuśniach, tuż przy Sieradzu. Z Łodzi, Kalisza czy Wielunia dojedziecie w niecałą godzinę – a na noc goście zostają w naszych domkach.</p>
          <ul className="dist">
            <li><b>Sieradz</b><span>ok. 6 km · 10 min</span></li>
            {CITIES.map((c) => (
              <li key={c.name} onMouseEnter={() => setHover(c.name)} onMouseLeave={() => setHover(null)} className={hover === c.name ? "on" : ""}>
                <b>{c.name}</b><span>ok. {c.km} km · {c.min} min ({c.via})</span>
              </li>
            ))}
          </ul>
          <a href={CONTACT.maps} className="link" target="_blank" rel="noopener">Wyznacz trasę w Google Maps →</a>
        </Reveal>

        <div className="map__art">
          <svg viewBox="0 0 520 450" role="img" aria-labelledby="mapT">
            <title id="mapT">Mapka: Avocado w Kuśniach i odległości do Łodzi, Kalisza i Wielunia</title>
            <defs>
              <radialGradient id="land" cx="50%" cy="52%" r="60%">
                <stop offset="0" stopColor="#E6DCCB" />
                <stop offset="1" stopColor="#E6DCCB" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="255" cy="240" r="230" fill="url(#land)" />
            {[70, 140, 210].map((r) => (
              <circle key={r} cx="255" cy="240" r={r} className="ring" />
            ))}
            {CITIES.map((c, k) => (
              <g key={c.name} className={`city${hover === c.name ? " on" : ""}`} onMouseEnter={() => setHover(c.name)} onMouseLeave={() => setHover(null)}>
                <motion.path
                  d={c.d}
                  className="route"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.3 + k * 0.25, ease: "easeInOut" }}
                />
                <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.3 + k * 0.25 }}>
                  <circle cx={c.x} cy={c.y} r="6" className="dot" />
                  <text x={c.lx} y={c.ly} textAnchor="middle" className="cname">{c.name}</text>
                  <text x={c.lx} y={c.ly + (c.ly > c.y ? 18 : 64)} textAnchor="middle" className="sm">{c.km} km · {c.min} min</text>
                </motion.g>
              </g>
            ))}
            <circle cx="292" cy="214" r="4" className="dot dot--sm" />
            <text x="300" y="230" className="sm">Sieradz</text>
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
          <iframe
            src={CONTACT.mapsEmbed}
            title="Mapa Google – Restauracja Avocado, Kuśnie 32A, Sieradz"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Reveal>
    </section>
  );
}
