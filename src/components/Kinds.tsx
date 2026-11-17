"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { asset, planHref } from "@/lib/asset";
import Gallery from "./Gallery";

const img = (names: string[], alt: string) => names.map((n) => ({ src: `/img/${n}.webp`, alt }));

const KINDS = [
  { t: "Chrzciny i roczki", p: "Kameralnie, w jasnej sali albo w plenerze. Plac zabaw i ogród dla dzieci tuż obok.", img: "/img/of-przyjecia.webp", okazja: "Chrzciny",
    pics: img(["gchr-1", "gchr-2", "gchr-3", "gchr-4", "gchr-5", "gchr-6", "chrzciny", "slodki-stol", "chr-1"], "Chrzciny i roczki w Avocado"), cols: 3 as const, wide: [0, 4, 8] },
  { t: "Komunie", p: "Rodzinny obiad w spokojnym miejscu, słodki stół i przestrzeń do zabawy dla najmłodszych.", img: "/img/gkom-0.webp", okazja: "Komunia",
    pics: img(["gkom-0", "gkom-1", "gkom-2", "gkom-3", "komunia-stoly", "komunia-desery", "dzieci-brzozy", "komunia-dzieci", "kom-7", "kom-5", "roc-3", "chr-3", "plac-zabaw"], "Komunia w Avocado"), cols: 3 as const, wide: [0, 3, 6, 9, 12] },
  { t: "18-stki i urodziny", p: "Parkiet, bar, dekoracje w Waszym stylu – i zabawa do rana z dala od sąsiadów.", img: "/img/g18-2.webp", okazja: "Urodziny / 18-stka",
    pics: img(["g18-1", "g18-2", "g18-3", "g18-4", "g18-7", "g18-8", "g18-9", "g18-5", "g18-6", "osiemnastka", "g18b-1", "g18b-2", "g18b-3", "g18b-4", "g18b-5", "g18b-6", "g18b-7", "g18b-8", "g30-5", "g30-1", "g30-2", "g30-3", "g30-4", "g30-6", "g30-7", "g30-8", "gsb-136", "gsb-130", "gsb-131", "gsb-132", "gsb-133", "gsb-134", "gsb-135", "gsb-137", "gsb-138", "gsb-139", "gsb-140", "gsb-141"], "Urodziny w Avocado"), cols: 3 as const, wide: [0, 9, 18, 27] },
  { t: "Jubileusze i rocznice", p: "Elegancka oprawa dla bliskich. Zadbamy o menu, kwiaty i każdy szczegół.", img: "/img/stol-dlugi.webp", okazja: "Jubileusz",
    pics: [] as { src: string; alt: string }[], cols: 3 as const, wide: [] as number[] },
];

/** Kafle okazji; kliknięcie rozwija galerię pod spodem (bez przechodzenia na inną podstronę). */
export default function Kinds() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div className="tiles tiles--4">
        {KINDS.map((x, k) => (
          <div className={`tile tile--kind${open === k ? " is-open" : ""}`} key={x.t}>
            {x.pics.length ? (
              <button type="button" className="tile__media tile__btn" onClick={() => setOpen(open === k ? null : k)} aria-expanded={open === k} aria-label={`${open === k ? "Zwiń" : "Rozwiń"} galerię: ${x.t}`}>
                <img src={asset(x.img)} alt={x.t} loading="lazy" />
                <span className="tile__zoom">{open === k ? "Zwiń galerię" : "Zobacz zdjęcia"}</span>
              </button>
            ) : (
              <div className="tile__media"><img src={asset(x.img)} alt={x.t} loading="lazy" /></div>
            )}
            <h3>{x.t}</h3>
            <p>{x.p}</p>
            <Link href={planHref(x.okazja)} className="more">Zapytaj <i>→</i></Link>
          </div>
        ))}
      </div>
      <AnimatePresence initial={false}>
        {open !== null && (
          <motion.div key={open} className="kinds__panel" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5 }}>
            <div className="kinds__head">
              <h3>{KINDS[open].t}</h3>
              <button type="button" className="link" onClick={() => setOpen(null)}>Zwiń ↑</button>
            </div>
            <Gallery pics={KINDS[open].pics} cols={KINDS[open].cols} wide={KINDS[open].wide} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
