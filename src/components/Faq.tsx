import Reveal from "./Reveal";

/** Lista pytań i odpowiedzi (natywne <details>, bez JS). */
export default function Faq({
  items,
  title = "Najczęstsze pytania",
  eyebrow = "FAQ",
  sand = false,
}: {
  items: ReadonlyArray<readonly [string, string]>;
  title?: string;
  eyebrow?: string;
  sand?: boolean;
}) {
  return (
    <section className={`sec${sand ? " sec--sand" : ""}`} id="faq">
      <div className="wrap faq">
        <Reveal className="faq__head">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </Reveal>
        <Reveal delay={0.1} className="faq__list">
          {items.map(([q, a]) => (
            <details key={q} className="faq__item">
              <summary>{q}<span aria-hidden="true">+</span></summary>
              <p>{a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
