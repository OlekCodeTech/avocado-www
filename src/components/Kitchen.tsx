"use client";

import Link from "next/link";
import { asset } from "@/lib/asset";
import Reveal from "./Reveal";

const DISHES = [
  { src: "/img/d1.webp", alt: "Zupa podana w głębokim talerzu" },
  { src: "/img/d2.webp", alt: "Danie główne z sosem" },
  { src: "/img/d3.webp", alt: "Deser z owocami" },
  { src: "/img/d4.webp", alt: "Ciasto warstwowe na talerzu" },
  { src: "/img/d6.webp", alt: "Owoce i przekąski na stole" },
  { src: "/img/d5.webp", alt: "Przystawka z zieleniną" },
  { src: "/img/d7.webp", alt: "Polewanie dania sosem przy stole" },
];

export default function Kitchen() {
  return (
    <section className="sec" id="kuchnia">
      <div className="wrap kitchen">
        <Reveal className="kitchen__txt">
          <p className="eyebrow">Kuchnia Avocado</p>
          <h2>Smak, który<br />goście pamiętają</h2>
          <p>Z pasji do gotowania. Podstawą menu jest sezonowość – warzywa i owoce kupujemy prosto od rolników, a menu układamy razem z Wami: od klasyki polskiej kuchni po nowoczesne podanie i stoły tematyczne.</p>
          <Link href="/o-nas/#kuchnia" className="link">Poznaj szefa kuchni →</Link>
        </Reveal>
        <Reveal delay={0.1}>
          <img src={asset("/img/kuchnia-zespol.webp")} alt="Zespół kuchni Avocado przy wydawce" className="kitchen__team" loading="lazy" />
        </Reveal>
      </div>

      {/* automatyczna, zapętlona taśma zdjęć (zatrzymuje się po najechaniu) */}
      <div className="dishes" aria-hidden="true">
        <div className="dishes__track">
          {[...DISHES, ...DISHES].map((d, k) => (
            <div className="dish" key={k}><img src={asset(d.src)} alt="" loading="lazy" draggable={false} /></div>
          ))}
        </div>
      </div>
    </section>
  );
}
