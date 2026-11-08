"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CONTACT, EVENT_TYPES, PLAN_EVENT } from "@/lib/asset";

const YEARS = [2026, 2027, 2028, 2029, 2030];
const MONTHS = ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"];
const MONTHS_FULL = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
const GUESTS = ["do 30", "30–60", "60–100", "100–150", "150+"];
const STEPS = ["Okazja", "Termin", "Kontakt"];
const SUB: Partial<Record<string, string[]>> = {
  Wesele: ["Jednodniowe", "Z poprawinami"],
  "Urodziny / 18-stka": ["18-stka", "40. urodziny", "Inne urodziny"],
};

type Data = {
  type: string; variant: string; year: number | null; month: number | null;
  guests: string; stay: boolean; name: string; phone: string; email: string;
  company: string; role: string; msg: string;
};
const EMPTY: Data = {
  type: "", variant: "", year: null, month: null, guests: "", stay: false,
  name: "", phone: "", email: "", company: "", role: "", msg: "",
};

/** Trzykrokowy formularz zapytania (odpowiednik formularza z obecnej strony). */
export default function Planner({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [d, setD] = useState<Data>(EMPTY);
  const set = (p: Partial<Data>) => setD((v) => ({ ...v, ...p }));

  const pick = (type: string, info?: string) => {
    set({ type, variant: info || "" });
    setStep(SUB[type] && !info ? 0 : 1);
  };

  useEffect(() => {
    // okazja z hero / kafelków na tej samej stronie
    const on = (e: Event) => pick((e as CustomEvent<string>).detail);
    window.addEventListener(PLAN_EVENT, on);
    // okazja z linku (?okazja=…&info=…&nocleg=1)
    const t = setTimeout(() => {
      const q = new URLSearchParams(window.location.search);
      const okazja = q.get("okazja");
      if (okazja) pick(okazja, q.get("info") || undefined);
      if (q.get("nocleg")) set({ stay: true });
    }, 0);
    return () => {
      clearTimeout(t);
      window.removeEventListener(PLAN_EVENT, on);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ok = [!!d.type, !!d.year, !!(d.name && d.phone)][step];
  const now = new Date();
  const firma = d.type === "Impreza firmowa";

  return (
    <section className={`cta${compact ? " cta--compact" : ""}`} id="planer">
      <div className="wrap cta__grid">
        <div className="cta__intro">
          <p className="eyebrow eyebrow--light">Terminy 2026–2030</p>
          <h2>Zaplanujmy<br />Wasz dzień</h2>
          <p>Trzy krótkie kroki – odezwiemy się w ciągu 24 godzin z wolnymi terminami i propozycją menu.</p>
          <p className="cta__contact">
            Wolicie porozmawiać?<br />
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a><br />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </div>

        <div className="planner">
          {sent ? (
            <motion.div className="planner__done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
              <span className="planner__check">✓</span>
              <h3>Dziękujemy, {d.name.split(" ")[0]}!</h3>
              <p>Patryk odezwie się z dostępnymi terminami{d.year ? ` na ${d.month !== null ? MONTHS_FULL[d.month] + " " : ""}${d.year}` : ""}.</p>
              <p className="planner__note">To makieta – wysyłka zostanie podpięta w wersji docelowej.</p>
            </motion.div>
          ) : (
            <>
              <ol className="planner__steps">
                {STEPS.map((s, k) => (
                  <li key={s} className={k === step ? "on" : k < step ? "done" : ""}>
                    <button onClick={() => k < step && setStep(k)} disabled={k > step}>
                      <span>{k + 1}</span>{s}
                    </button>
                  </li>
                ))}
              </ol>

              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
                  {step === 0 && (
                    <fieldset>
                      <legend>Co planujecie?</legend>
                      <div className="opts">
                        {EVENT_TYPES.map((t) => (
                          <button key={t} type="button" className={`opt${d.type === t ? " on" : ""}`} onClick={() => set({ type: t, variant: "" })}>{t}</button>
                        ))}
                      </div>
                      {SUB[d.type] && (
                        <div className="opts opts--sub">
                          {SUB[d.type]!.map((v) => (
                            <button key={v} type="button" className={`opt opt--sm${d.variant === v ? " on" : ""}`} onClick={() => set({ variant: v })}>{v}</button>
                          ))}
                        </div>
                      )}
                      {d.type === "Inne" && (
                        <input className="inp" placeholder="np. roczek, rocznica, spotkanie klasowe" value={d.variant} onChange={(e) => set({ variant: e.target.value })} />
                      )}
                    </fieldset>
                  )}

                  {step === 1 && (
                    <fieldset>
                      <legend>Kiedy?</legend>
                      <div className="opts">
                        {YEARS.map((y) => (
                          <button key={y} type="button" className={`opt opt--sm${d.year === y ? " on" : ""}`} onClick={() => set({ year: y })}>{y}</button>
                        ))}
                      </div>
                      {d.year && (
                        <div className="months">
                          {MONTHS.map((m, k) => {
                            const past = d.year === now.getFullYear() && k < now.getMonth();
                            return (
                              <button key={m} type="button" disabled={past} className={`month${d.month === k ? " on" : ""}`} onClick={() => set({ month: d.month === k ? null : k })}>{m}</button>
                            );
                          })}
                        </div>
                      )}
                      <legend className="legend2">Ilu gości się spodziewacie?</legend>
                      <div className="opts">
                        {GUESTS.map((g) => (
                          <button key={g} type="button" className={`opt opt--sm${d.guests === g ? " on" : ""}`} onClick={() => set({ guests: g })}>{g}</button>
                        ))}
                      </div>
                      <label className="toggle">
                        <input type="checkbox" checked={d.stay} onChange={(e) => set({ stay: e.target.checked })} />
                        <span className="toggle__ui" />
                        Potrzebujemy też noclegu dla gości
                      </label>
                    </fieldset>
                  )}

                  {step === 2 && (
                    <fieldset className="fields">
                      <legend>Jak się z Wami skontaktować?</legend>
                      <label>Imię i nazwisko<input className="inp" autoComplete="name" value={d.name} onChange={(e) => set({ name: e.target.value })} /></label>
                      <div className="fields__2">
                        <label>Telefon<input className="inp" type="tel" autoComplete="tel" value={d.phone} onChange={(e) => set({ phone: e.target.value })} /></label>
                        <label>E-mail<input className="inp" type="email" autoComplete="email" value={d.email} onChange={(e) => set({ email: e.target.value })} /></label>
                      </div>
                      {firma && (
                        <div className="fields__2">
                          <label>Nazwa firmy<input className="inp" autoComplete="organization" value={d.company} onChange={(e) => set({ company: e.target.value })} /></label>
                          <label>Stanowisko<input className="inp" autoComplete="organization-title" value={d.role} onChange={(e) => set({ role: e.target.value })} /></label>
                        </div>
                      )}
                      <label>Wasza wizja wydarzenia <i>(opcjonalnie)</i><textarea className="inp" rows={2} value={d.msg} onChange={(e) => set({ msg: e.target.value })} /></label>
                      <p className="summary">
                        {d.type}{d.variant ? ` (${d.variant.toLowerCase()})` : ""} · {d.month !== null ? MONTHS_FULL[d.month] + " " : ""}{d.year}
                        {d.guests ? ` · ${d.guests} gości` : ""}{d.stay ? " · z noclegiem" : ""}
                      </p>
                    </fieldset>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="planner__nav">
                {step > 0 && <button type="button" className="btn btn--ghost" onClick={() => setStep(step - 1)}>Wstecz</button>}
                <button type="button" className="btn btn--light" disabled={!ok} onClick={() => (step < 2 ? setStep(step + 1) : setSent(true))}>
                  {step < 2 ? "Dalej" : "Wyślij zapytanie"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
