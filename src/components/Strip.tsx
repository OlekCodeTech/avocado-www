"use client";

import { useRef, useState } from "react";
import { asset } from "@/lib/asset";
import Lightbox, { type LbPic } from "./Lightbox";

/** Pasek zdjęć do przewijania (strzałki < > lub palcem); kliknięcie otwiera podgląd. */
export default function Strip({ pics, title }: { pics: LbPic[]; title?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const go = (dir: number) => {
    const el = box.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".strip__item");
    el.scrollBy({ left: dir * ((card?.offsetWidth || 320) + 16) * 2, behavior: "smooth" });
  };
  return (
    <div className="strip">
      <div className="strip__nav">
        <button type="button" aria-label="Poprzednie zdjęcia" onClick={() => go(-1)}>‹</button>
        <button type="button" aria-label="Następne zdjęcia" onClick={() => go(1)}>›</button>
      </div>
      <div className="strip__track" ref={box} data-lenis-prevent>
        {pics.map((p, k) => (
          <button type="button" className="strip__item" key={p.src} onClick={() => setOpen(k)} aria-label={`Powiększ: ${p.alt || title || "zdjęcie"}`}>
            <img src={asset(p.src)} alt={p.alt || ""} loading="lazy" />
          </button>
        ))}
      </div>
      <Lightbox pics={pics} open={open} setOpen={setOpen} title={title} />
    </div>
  );
}
