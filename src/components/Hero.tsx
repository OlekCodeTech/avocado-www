"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { asset, EVENT_TYPES } from "@/lib/asset";
import { plan } from "@/lib/plan";

const SLIDES = [
  { src: "/img/hero.webp", alt: "Jasna sala bankietowa Avocado z kwiatami, za oknami zieleń", label: "Sala bankietowa" },
  { src: "/img/hero-2.webp", alt: "Para młoda wieczorem wśród brzóz i girland lampek", label: "Sala plenerowa" },
  { src: "/img/plener-dzien.webp", alt: "Sala plenerowa za dnia na skraju brzozowego lasu", label: "Ogród i las" },
];

export default function Hero() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [reduce]);

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
          Kuśnie · 5 minut od Sieradza
        </motion.p>
        <h1>
          {["Wesela i przyjęcia", "blisko natury"].map((line, k) => (
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
          <span className="picker__q">Co planujecie?</span>
          <div className="picker__chips">
            {EVENT_TYPES.slice(0, 6).map((t) => (
              <button key={t} className="chip" onClick={() => plan(t)}>{t}</button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="hero__dots" role="tablist" aria-label="Zdjęcia w tle">
        {SLIDES.map((s, k) => (
          <button key={s.src} role="tab" aria-selected={k === i} aria-label={s.label} onClick={() => setI(k)} className={k === i ? "on" : ""}>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
