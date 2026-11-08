"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { asset } from "@/lib/asset";
import Reveal from "./Reveal";

const PICS = [
  { src: "/img/g1.webp", alt: "Wejście pary młodej na salę" },
  { src: "/img/g4.webp", alt: "Ścianka z kwiatów z neonowym napisem" },
  { src: "/img/g3.webp", alt: "Pierwszy taniec w dymie" },
  { src: "/img/g7.webp", alt: "Długi drewniany stół ze świecami" },
  { src: "/img/g2.webp", alt: "Para młoda w ogrodzie" },
  { src: "/img/g6.webp", alt: "Tort i zimne ognie wśród brzóz" },
  { src: "/img/g5.webp", alt: "Deser podany na talerzu" },
  { src: "/img/g8.webp", alt: "Taras z widokiem na ogród" },
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((v) => ((v ?? 0) + 1) % PICS.length);
      if (e.key === "ArrowLeft") setOpen((v) => ((v ?? 0) - 1 + PICS.length) % PICS.length);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [open]);

  return (
    <section className="sec sec--tight" id="galeria">
      <div className="wrap">
        <Reveal className="head head--row">
          <div><p className="eyebrow">Galeria</p><h2>Tak u nas świętujecie</h2></div>
          <a href="#galeria" className="link">Cała galeria →</a>
        </Reveal>
      </div>
      <div className="gallery">
        {PICS.map((p, k) => (
          <button key={p.src} className="gallery__item" onClick={() => setOpen(k)} aria-label={`Powiększ: ${p.alt}`}>
            <img src={asset(p.src)} alt={p.alt} loading="lazy" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div className="lb" role="dialog" aria-modal="true" aria-label={PICS[open].alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.img key={open} src={asset(PICS[open].src)} alt={PICS[open].alt} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} />
            <button className="lb__x" aria-label="Zamknij" onClick={() => setOpen(null)}>×</button>
            <button className="lb__nav lb__nav--l" aria-label="Poprzednie" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + PICS.length) % PICS.length); }}>←</button>
            <button className="lb__nav lb__nav--r" aria-label="Następne" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % PICS.length); }}>→</button>
            <span className="lb__count">{open + 1} / {PICS.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
