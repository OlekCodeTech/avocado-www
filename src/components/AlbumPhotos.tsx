"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import Lightbox from "./Lightbox";

export type Photo = { src: string; w: number; h: number };

/** Zdjęcia jednej pary w układzie jak w villa-love.pl: wąska kolumna, zdjęcia poziome na całą szerokość,
 *  pionowe parami obok siebie. Kliknięcie otwiera podgląd. */
export default function AlbumPhotos({ pics, title }: { pics: Photo[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);

  // podział na wiersze: poziome = cały wiersz, pionowe = para. Pionowe zdjęcie bez sąsiada dobiera
  // najbliższe kolejne pionowe (jak w villa-love.pl zdjęcia pionowe zawsze stoją parami).
  const rows: number[][] = [];
  const used = new Set<number>();
  const isPortrait = (i: number) => pics[i].h > pics[i].w;
  for (let k = 0; k < pics.length; k++) {
    if (used.has(k)) continue;
    used.add(k);
    if (!isPortrait(k)) { rows.push([k]); continue; }
    let j = -1;
    for (let n = k + 1; n < pics.length; n++) if (!used.has(n) && isPortrait(n)) { j = n; break; }
    if (j === -1) rows.push([k]);
    else { used.add(j); rows.push([k, j]); }
  }

  return (
    <>
      <div className="aphotos">
        {rows.map((r) => (
          <div className={`aphotos__row${r.length === 2 ? " aphotos__row--2" : ""}`} key={r[0]}>
            {r.map((i) => (
              <button type="button" key={pics[i].src} className="aphotos__item" onClick={() => setOpen(i)} aria-label={`Powiększ zdjęcie ${i + 1}`}>
                <img src={asset(pics[i].src)} alt={`${title} – zdjęcie ${i + 1}`} width={pics[i].w} height={pics[i].h} loading={i < 2 ? "eager" : "lazy"} />
              </button>
            ))}
          </div>
        ))}
      </div>
      <Lightbox pics={pics} open={open} setOpen={setOpen} title={title} />
    </>
  );
}
