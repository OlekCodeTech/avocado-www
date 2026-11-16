"use client";

import { useRef } from "react";
import Reveal from "./Reveal";
import Clip from "./Clip";

const REELS = [
  { name: "wesele", label: "Wesele wśród brzóz" },
  { name: "plenerowa", label: "Sala plenerowa" },
  { name: "bankietowa", label: "Sala bankietowa" },
  { name: "r1", label: "Wesele w sali plenerowej" },
  { name: "r4", label: "Ślub w ogrodzie" },
  { name: "r5", label: "Wesele w plenerze" },
  { name: "r6", label: "Wesele w sali bankietowej" },
  { name: "r2", label: "Wesele" },
  { name: "r7", label: "Wesele" },
  { name: "r8", label: "Wesele" },
  { name: "r3", label: "Roczek" },
  { name: "dekoracje", label: "Dekoracje" },
  { name: "detale", label: "Detale" },
];

/** Karuzela pionowych klipów z filmów Avocado (strzałki < > lub przesunięcie palcem). */
export default function Reels() {
  const box = useRef<HTMLDivElement>(null);
  const go = (dir: number) => {
    const el = box.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".reel");
    el.scrollBy({ left: dir * ((card?.offsetWidth || 300) + 22), behavior: "smooth" });
  };
  return (
    <section className="sec" id="film">
      <div className="wrap">
        <Reveal className="head head--row">
          <h2>Avocado w ruchu</h2>
          <div className="reels__nav">
            <button type="button" aria-label="Poprzednie filmy" onClick={() => go(-1)}>‹</button>
            <button type="button" aria-label="Następne filmy" onClick={() => go(1)}>›</button>
          </div>
        </Reveal>
        <div className="reels" ref={box} data-lenis-prevent>
          {REELS.map((r) => (
            <figure className="reel" key={r.name}>
              <Clip name={r.name} label={r.label} />
              <figcaption>{r.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
