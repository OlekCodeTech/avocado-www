import Reveal from "./Reveal";
import Clip from "./Clip";

const REELS = [
  { name: "wesele", label: "Wesele wśród brzóz" },
  { name: "plenerowa", label: "Sala plenerowa" },
  { name: "bankietowa", label: "Sala bankietowa" },
];

/** Trzy pionowe klipy z filmów Avocado. */
export default function Reels() {
  return (
    <section className="sec" id="film">
      <div className="wrap">
        <Reveal className="head head--center">
          <p className="eyebrow">Avocado w ruchu</p>
          <h2>Zobacz, jak to wygląda na żywo</h2>
        </Reveal>
        <div className="reels">
          {REELS.map((r, k) => (
            <Reveal key={r.name} delay={k * 0.1}>
              <figure className="reel">
                <Clip name={r.name} label={r.label} />
                <figcaption>{r.label}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
