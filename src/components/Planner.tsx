"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { CONTACT, EVENT_TYPES, PLAN_EVENT } from "@/lib/asset";
import { sendForm } from "@/lib/send";

const YEARS = [2026, 2027, 2028, 2029, 2030, 2031];
const MONTHS = ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"];
const MONTHS_FULL = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
/** Minimalna liczba gości: komunie od 25, pozostałe przyjęcia od 60 (catering i wydarzenia otwarte bez limitu). */
const minGuests = (type: string) => (type === "Komunia" ? 25 : type === "Inne" || type === "Catering" ? 1 : 60);
const STEPS = ["Okazja", "Termin", "Kontakt"];
const SUB: Partial<Record<string, string[]>> = {
  Wesele: ["Jednodniowe", "Z poprawinami"],
  "Urodziny / 18-stka": ["18-stka", "40. urodziny", "Inne urodziny"],
};

type Data = {
  type: string; variant: string; year: number | null; months: number[]; dateNote: string; where: string;
  guests: string; stay: boolean; name: string; phone: string; email: string;
  company: string; role: string; msg: string;
};
const EMPTY: Data = {
  type: "", variant: "", year: null, months: [], dateNote: "", where: "", guests: "", stay: false,
  name: "", phone: "", email: "", company: "", role: "", msg: "",
};

/** Trzykrokowy formularz zapytania (odpowiednik formularza z obecnej strony). */
export default function Planner({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState<false | "ok" | "demo">(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);
  const [hp, setHp] = useState("");
  const [d, setD] = useState<Data>(EMPTY);
  const set = (p: Partial<Data>) => setD((v) => ({ ...v, ...p }));

  const pick = (type: string, info?: string) => {
    set({ type, variant: info || "" });
    setStep((SUB[type] && !info) || type === "Catering" ? 0 : 1); // catering: najpierw pytanie „Gdzie?”
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

  const min = minGuests(d.type);
  const monthsTxt = [...d.months].sort((a, b) => a - b).map((m) => MONTHS_FULL[m]).join(', ');
  const toggleMonth = (k: number) => setD((v) => ({ ...v, months: v.months.includes(k) ? v.months.filter((m) => m !== k) : [...v.months, k] }));
  const guestsOk = !d.guests || Number(d.guests) >= min;
  const ok = [!!d.type, !!d.year && guestsOk, !!(d.name && d.phone)][step];
  const now = new Date();

  const submit = async () => {
    setBusy(true);
    setErr(false);
    const r = await sendForm({
      form: "planer", type: d.type, variant: d.variant, where: d.where, year: d.year ?? "", months: monthsTxt, dateNote: d.dateNote,
      guests: d.guests, stay: d.stay, name: d.name, phone: d.phone, email: d.email, company: d.company, role: d.role, msg: d.msg,
      company_website: hp,
    });
    setBusy(false);
    if (r === "error") setErr(true);
    else setSent(r);
  };
  const firma = d.type === "Impreza firmowa";

  return (
    <section className={`cta${compact ? " cta--compact" : ""}`} id="planer">
      <div className="wrap cta__grid">
        <div className="cta__intro">
          <p className="eyebrow eyebrow--light">Terminy 2026–2031</p>
          <h2>Zacznij<br />planować</h2>
          <p>Tylko kilka krótkich kroków dzieli Cię od naszej oferty. Jeśli jednak wolisz kontakt bezpośredni – napisz lub zadzwoń:</p>
          <p className="cta__contact">
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a><br />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </div>

        <div className="planner">
          {sent ? (
            <motion.div className="planner__done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
              <span className="planner__check">✓</span>
              <h3>Dziękujemy, {d.name.split(" ")[0]}!</h3>
              <p>Patryk odezwie się z dostępnymi terminami{d.year ? ` na ${monthsTxt ? monthsTxt + " " : ""}${d.year}` : ""}.</p>
              {sent === "demo" && <p className="planner__note">Podgląd strony – zapytanie nie zostało wysłane.</p>}
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
                      <legend>Zaplanuj swoje przyjęcie</legend>
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
                      {d.type === "Catering" && (
                        <label className="lbl">Gdzie?<input className="inp" placeholder="miejscowość lub adres przyjęcia" value={d.where} onChange={(e) => set({ where: e.target.value })} /></label>
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
                              <button key={m} type="button" disabled={past} aria-pressed={d.months.includes(k)} className={`month${d.months.includes(k) ? " on" : ""}`} onClick={() => toggleMonth(k)}>{m}</button>
                            );
                          })}
                        </div>
                      )}
                      {d.year && <p className="hint">Możecie zaznaczyć kilka miesięcy.</p>}
                      <label className="lbl">Kluczowe informacje co do terminu <i>(opcjonalnie)</i><input className="inp" placeholder="np. tylko soboty, konkretna data, elastycznie" value={d.dateNote} onChange={(e) => set({ dateNote: e.target.value })} /></label>
                      <legend className="legend2">Ilu gości się spodziewacie?</legend>
                      <input className="inp inp--num" type="number" inputMode="numeric" min={min} max={240} placeholder={`np. ${Math.max(min, 80)}`} value={d.guests} onChange={(e) => set({ guests: e.target.value })} aria-label="Liczba gości" />
                      <p className={`hint${guestsOk ? "" : " hint--err"}`}>
                        {d.type === "Komunia" ? "Komunie organizujemy od 25 osób." : min === 1 ? "Wpisz orientacyjną liczbę osób." : "Przyjęcia organizujemy od 60 osób (komunie od 25)."}
                      </p>
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
                      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" value={hp} onChange={(e) => setHp(e.target.value)} />
                      <p className="planner__rodo">Dane z formularza wykorzystamy tylko do odpowiedzi na zapytanie. <Link href="/polityka-prywatnosci/">Polityka prywatności</Link></p>
                      {err && <p className="planner__err">Nie udało się wysłać zapytania. Spróbujcie jeszcze raz albo zadzwońcie: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.</p>}
                      <p className="summary">
                        {d.type}{d.variant ? ` (${d.variant.toLowerCase()})` : ""}{d.where ? ` · ${d.where}` : ""} · {monthsTxt ? monthsTxt + " " : ""}{d.year}{d.dateNote ? ` · ${d.dateNote}` : ""}
                        {d.guests ? ` · ${d.guests} os.` : ""}{d.stay ? " · z noclegiem" : ""}
                      </p>
                    </fieldset>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="planner__nav">
                {step > 0 && <button type="button" className="btn btn--ghost" onClick={() => setStep(step - 1)}>Wstecz</button>}
                <button type="button" className="btn btn--light" disabled={!ok || busy} onClick={() => (step < 2 ? setStep(step + 1) : submit())}>
                  {step < 2 ? "Dalej" : busy ? "Wysyłamy…" : "Wyślij zapytanie"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
