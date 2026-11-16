"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { asset } from "@/lib/asset";
import Reveal from "./Reveal";

const SPACES = {
  bankietowa: {
    name: "Sala bankietowa",
    claim: "Nowoczesne wnętrza",
    text: "Duże okna, ciepłe światło i drewno. Wnętrze, w którym możecie stworzyć oprawę pasującą do Waszego stylu — od minimalistycznych, naturalnych dekoracji po bardziej eleganckie aranżacje. Do tego przestronny taras i ogród pełen zakamarków, w których można usiąść, porozmawiać i odpocząć.",
    ticks: ["Przyjęcia taneczne do 180 osób", "Konferencje do 240 osób", "Klimatyzacja", "Dedykowany parking", "Zadaszone tarasy", "Grill bar", "Altana"],
    day: { src: "/img/bank-dzien.webp", alt: "Sala bankietowa za dnia, stoły z kwiatami przy dużych oknach" },
    night: { src: "/img/bank-wieczor.webp", alt: "Sala bankietowa wieczorem, ciemne obrusy i ciepłe światło" },
  },
  plenerowa: {
    name: "Sala plenerowa",
    claim: "Industrialny sznyt",
    text: "Przeszklona sala wśród brzóz, w której zieleń staje się częścią Waszego przyjęcia. W ciągu dnia pełna naturalnego światła, wieczorem nabiera przytulnego charakteru dzięki girlandom lampek. Tuż obok ogród — miejsce na ceremonię, serwis tortu, akustyczny występ pod gołym niebem oraz chwilę rozmowy z dala od parkietu.",
    ticks: ["Przyjęcia do 130 osób", "Klimatyzacja", "Dedykowany parking", "Kameralne tarasy wśród zieleni"],
    day: { src: "/img/plener-dzien-2.webp", alt: "Sala plenerowa za dnia – kryształowe żyrandole i girlandy lampek" },
    night: { src: "/img/plener-wieczor.webp", alt: "Tort i zimne ognie wieczorem wśród brzóz" },
  },
} as const;
type Key = keyof typeof SPACES;

export default function Spaces() {
  const [key, setKey] = useState<Key>("bankietowa");
  const [night, setNight] = useState(false);
  const s = SPACES[key];
  const img = night ? s.night : s.day;

  return (
    <section className="sec sec--sand" id="sale">
      <div className="wrap">
        <Reveal className="head head--center">
          <p className="eyebrow">Nasze sale</p>
          <h2>Do Twojej dyspozycji mamy<br />dwie niezależne przestrzenie</h2>
        </Reveal>

        <div className="spaces__bar">
          <div className="seg" role="tablist" aria-label="Wybierz salę">
            {(Object.keys(SPACES) as Key[]).map((k) => (
              <button key={k} role="tab" aria-selected={k === key} className={k === key ? "on" : ""} onClick={() => setKey(k)}>
                {k === key && <motion.span layoutId="seg" className="seg__pill" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
                <span>{SPACES[k].name}</span>
              </button>
            ))}
          </div>
          <button className={`daynight${night ? " is-night" : ""}`} onClick={() => setNight(!night)} aria-pressed={night}>
            <span className="daynight__track"><span className="daynight__knob" /></span>
            {night ? "Wieczorem" : "Za dnia"}
          </button>
        </div>

        <div className="spaces">
          <div className="spaces__img">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img
                key={img.src}
                src={asset(img.src)}
                alt={img.alt}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                loading="lazy"
              />
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              className="spaces__txt"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
            >
              <p className="eyebrow">{s.name}</p>
              <h3>{s.claim}</h3>
              <p>{s.text}</p>
              <ul className="ticks">{s.ticks.map((t) => <li key={t}>{t}</li>)}</ul>
              <Link href="/sale/" className="link">Zobacz nasze sale →</Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
