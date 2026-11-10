"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { asset } from "@/lib/asset";

export type Pic = { src: string; alt: string };

/** Siatka zdjęć z lightboxem (klawisze ← → Esc). `wide` = indeksy kafli na 2 kolumny. */
export default function Gallery({
  pics,
  cols = 4,
  wide = [0, 3, 4, 7],
  tight = false,
}: {
  pics: Pic[];
  cols?: 3 | 4;
  wide?: number[];
  tight?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((v) => ((v ?? 0) + 1) % pics.length);
      if (e.key === "ArrowLeft") setOpen((v) => ((v ?? 0) - 1 + pics.length) % pics.length);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [open, pics.length]);

  return (
    <>
      <div className={`gallery gallery--${cols}${tight ? " gallery--tight" : ""}`}>
        {pics.map((p, k) => (
          <button key={p.src + k} className={`gallery__item${wide.includes(k) ? " is-wide" : ""}`} onClick={() => setOpen(k)} aria-label={`Powiększ: ${p.alt}`}>
            <img src={asset(p.src)} alt={p.alt} loading="lazy" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div className="lb" role="dialog" aria-modal="true" aria-label={pics[open].alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.img key={open} src={asset(pics[open].src)} alt={pics[open].alt} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} />
            <button className="lb__x" aria-label="Zamknij" onClick={() => setOpen(null)}>×</button>
            <button className="lb__nav lb__nav--l" aria-label="Poprzednie" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + pics.length) % pics.length); }}>←</button>
            <button className="lb__nav lb__nav--r" aria-label="Następne" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % pics.length); }}>→</button>
            <span className="lb__count">{open + 1} / {pics.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
