"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import Lightbox, { type LbPic } from "./Lightbox";

export type Album = { name: string; sub?: string; cover: string; pics: LbPic[] };

/** Siatka galerii par: podłużna okładka, po najechaniu beżowy prostokąt z imionami i kreską, kliknięcie otwiera galerię. */
export default function Albums({ albums }: { albums: Album[] }) {
  const [al, setAl] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div className="albums">
        {albums.map((a, k) => (
          <button key={a.name} type="button" className="album" onClick={() => { setAl(k); setOpen(0); }} aria-label={`Zobacz galerię: ${a.name}`}>
            <img src={asset(a.cover)} alt="" loading="lazy" />
            <span className="album__over">
              <span className="album__box">
                <b>{a.name}</b>
                <i aria-hidden="true" />
                <em>Zobacz galerię</em>
              </span>
            </span>
          </button>
        ))}
      </div>
      {al !== null && <Lightbox pics={albums[al].pics} open={open} setOpen={setOpen} title={albums[al].name} />}
    </>
  );
}
