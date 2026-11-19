"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import Lightbox, { type LbPic } from "./Lightbox";

/** Galeria: najpierw `first` zdjęć, reszta po kliknięciu „Rozwiń” (i z powrotem „Zwiń”). */
export default function MoreGallery({ pics, first = 6, title }: { pics: LbPic[]; first?: number; title: string }) {
  const [all, setAll] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const shown = all ? pics : pics.slice(0, first);
  return (
    <>
      <div className={`gallery gallery--3 gallery--more${shown.length % 2 ? " gallery--odd" : ""}`}>
        {shown.map((p, k) => (
          <button key={p.src} type="button" className="gallery__item" onClick={() => setOpen(k)} aria-label={`Powiększ zdjęcie ${k + 1}: ${title}`}>
            <img src={asset(p.src)} alt={`${title} – zdjęcie ${k + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
      {pics.length > first && (
        <div className="more-bar">
          <button type="button" className="btn btn--ghost-dark" onClick={() => setAll(!all)} aria-expanded={all}>
            {all ? "Zwiń" : `Rozwiń – pokaż wszystkie (${pics.length})`}
          </button>
        </div>
      )}
      <Lightbox pics={shown} open={open} setOpen={setOpen} title={title} />
    </>
  );
}
