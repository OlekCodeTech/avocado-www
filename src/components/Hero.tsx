"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { asset, EVENT_TYPES } from "@/lib/asset";
import { plan } from "@/lib/plan";

const SLIDES = [
  { g: 0, src: "/img/intro-11.webp", alt: "Sala bankietowa – okrągłe stoły z czarnymi obrusami" },
  { g: 0, src: "/img/intro-08.webp", alt: "Wejście pary młodej na salę bankietową" },
  { g: 0, src: "/img/intro-13.webp", alt: "Sala bankietowa – stoły z pomarańczowymi kwiatami" },
  { g: 0, src: "/img/intro-09.webp", alt: "Para młoda przy słodkim stole" },
  { g: 0, src: "/img/intro-14.webp", alt: "Sala bankietowa wieczorem – błękitne obrusy" },
  { g: 0, src: "/img/intro-12.webp", alt: "Goście oglądają film na sali bankietowej" },
  { g: 1, src: "/img/intro-15.webp", alt: "Sala plenerowa – okrągłe stoły i ściana z drewna" },
  { g: 1, src: "/img/intro-02.webp", alt: "Para młoda przed salą plenerową wieczorem" },
  { g: 1, src: "/img/intro-07.webp", alt: "Jasne wnętrze sali plenerowej" },
  { g: 1, src: "/img/intro-01.webp", alt: "Tort weselny na tarasie sali plenerowej" },
  { g: 1, src: "/img/intro-03.webp", alt: "Goście pod girlandami świateł przy sali plenerowej" },
  { g: 1, src: "/img/intro-04.webp", alt: "Tort i fontanny iskier na tarasie" },
  { g: 2, src: "/img/intro-06.webp", alt: "Para młoda wśród brzóz o zachodzie słońca" },
  { g: 2, src: "/img/intro-10.webp", alt: "Sala plenerowa na skraju brzozowego lasu" },
  { g: 2, src: "/img/intro-05.webp", alt: "Para młoda wieczorem w ogrodzie" },
];
const GROUPS = ["Sala bankietowa", "Sala plenerowa", "Ogród i las"];

export default function Hero() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [reduce, i]);

  return (
    <section className="hero" id="top">
      <AnimatePresence initial={false}>
        <motion.img
          key={SLIDES[i].src}
          src={asset(SLIDES[i].src)}
          alt={SLIDES[i].alt}
          className="hero__img"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 }, scale: { duration: 8, ease: "linear" } }}
          fetchPriority={i === 0 ? "high" : "auto"}
        />
      </AnimatePresence>
      <div className="hero__shade" />

      <div className="hero__txt">
        <motion.p className="eyebrow eyebrow--light" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
          Perfekcyjne miejsce na Twój wyjątkowy dzień
        </motion.p>
        <h1>
          {["Nowoczesność i natura", "w jednym miejscu"].map((line, k) => (
            <span className="line" key={line}>
              <motion.span
                className={k ? "it" : undefined}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.35 + k * 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div className="picker" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
          <span className="picker__q">Zaplanuj swoje przyjęcie</span>
          <div className="picker__chips">
            {EVENT_TYPES.slice(0, 6).map((t) => (
              <button key={t} className="chip" onClick={() => plan(t)}>{t}</button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="hero__dots" role="tablist" aria-label="Zdjęcia w tle">
        {GROUPS.map((label, g) => (
          <button key={label} role="tab" aria-selected={SLIDES[i].g === g} aria-label={label} onClick={() => setI(SLIDES.findIndex((s) => s.g === g))} className={SLIDES[i].g === g ? "on" : ""}>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
