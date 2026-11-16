"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { asset } from "@/lib/asset";

export type LbPic = { src: string; alt?: string };

/** Pełnoekranowy podgląd zdjęć (klawisze ← → Esc). `open` = indeks zdjęcia albo null. */
export default function Lightbox({ pics, open, setOpen, title }: { pics: LbPic[]; open: number | null; setOpen: (v: number | null) => void; title?: string }) {
  useEffect(() => {
    if (open === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((open + 1) % pics.length);
      if (e.key === "ArrowLeft") setOpen((open - 1 + pics.length) % pics.length);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [open, pics.length, setOpen]);

  return (
    <AnimatePresence>
      {open !== null && (
        <motion.div className="lb" role="dialog" aria-modal="true" aria-label={title || pics[open].alt || "Galeria"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
          <motion.img key={open} src={asset(pics[open].src)} alt={pics[open].alt || title || ""} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} />
          <button className="lb__x" aria-label="Zamknij" onClick={() => setOpen(null)}>×</button>
          <button className="lb__nav lb__nav--l" aria-label="Poprzednie" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + pics.length) % pics.length); }}>←</button>
          <button className="lb__nav lb__nav--r" aria-label="Następne" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % pics.length); }}>→</button>
          <span className="lb__count">{title ? `${title} · ` : ""}{open + 1} / {pics.length}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
