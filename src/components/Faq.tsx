"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type QA = readonly [string, string];

/** Lista pytań i odpowiedzi. `more` = dodatkowe pytania rozwijane przyciskiem „Pokaż więcej”. */
export default function Faq({
  items,
  more = [],
  title = "Najczęstsze pytania",
  eyebrow = "FAQ",
  sand = false,
}: {
  items: ReadonlyArray<QA>;
  more?: ReadonlyArray<QA>;
  title?: string;
  eyebrow?: string;
  sand?: boolean;
}) {
  const [all, setAll] = useState(false);
  const list = all ? [...items, ...more] : items;
  return (
    <section className={`sec${sand ? " sec--sand" : ""}`} id="faq">
      <div className="wrap faq">
        <Reveal className="faq__head">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </Reveal>
        <Reveal delay={0.1} className="faq__list">
          {list.map(([q, a]) => (
            <details key={q} className="faq__item">
              <summary>{q}<span aria-hidden="true">+</span></summary>
              <p>{a}</p>
            </details>
          ))}
          {more.length > 0 && (
            <button type="button" className="faq__more link" onClick={() => setAll(!all)} aria-expanded={all}>
              {all ? "Pokaż mniej" : "Pokaż więcej"} <span aria-hidden="true">{all ? "↑" : "↓"}</span>
            </button>
          )}
        </Reveal>
      </div>
    </section>
  );
}
