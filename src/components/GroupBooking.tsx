"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CONTACT } from "@/lib/asset";
import { sendForm } from "@/lib/send";

/* Rezerwacja grupowa na spotkania świąteczne 11–12.12.2026 (prośba Eweliny 23.11.2026).
   Minimalna liczba osób w formularzu: 10 (tak chce Ewelina; w PDF oferty jest 15). Rezerwację potwierdza manager. */
export const XMAS = {
  dates: ["11.12.2026 (piątek)", "12.12.2026 (sobota)"],
  packages: ["Propozycja I", "Propozycja II", "Propozycja III", "Jeszcze nie wiem"],
  min: 10,
  max: 60,
};
export const XMAS_NOTE = "Rezerwacja będzie potwierdzona telefonicznie lub e-mailowo przez naszego managera.";

type D = { date: string; pkg: string; guests: string; company: string; name: string; phone: string; email: string; msg: string };
const EMPTY: D = { date: "", pkg: "", guests: "", company: "", name: "", phone: "", email: "", msg: "" };

export default function GroupBooking({ offer }: { offer: string }) {
  const [open, setOpen] = useState(false);
  const [d, setD] = useState<D>(EMPTY);
  const [hp, setHp] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);
  const [sent, setSent] = useState<false | "ok" | "demo">(false);
  const [tried, setTried] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const set = (p: Partial<D>) => setD((v) => ({ ...v, ...p }));

  // wejście z popupu albo z linku z kotwicą #rezerwacja-grupowa → formularz od razu otwarty i przewinięty do widoku
  // (popup klikany na tej samej stronie wysyła zdarzenie „avo:group”, bo zmiana adresu przez Next nie odpala hashchange)
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const go = () => {
      setOpen(true);
      // drugi raz po chwili – zdjęcia i animacje wyżej na stronie mogą przesunąć układ
      [120, 900].forEach((ms) => timers.push(setTimeout(() => box.current?.scrollIntoView({ behavior: "smooth", block: "start" }), ms)));
    };
    if (window.location.hash === "#rezerwacja-grupowa") go();
    window.addEventListener("avo:group", go);
    return () => { timers.forEach(clearTimeout); window.removeEventListener("avo:group", go); };
  }, []);

  const show = () => {
    setOpen(true);
    requestAnimationFrame(() => box.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const n = Number(d.guests);
  const guestsOk = Number.isInteger(n) && n >= XMAS.min && n <= XMAS.max;
  const phoneOk = d.phone.replace(/\D/g, "").length >= 9;
  const emailOk = d.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email);
  const ok = d.date !== "" && guestsOk && d.name.trim().length >= 2 && phoneOk && emailOk;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!ok || busy) return;
    setBusy(true);
    setErr(false);
    const r = await sendForm({ form: "swieta", ...d, guests: String(n), company_website: hp });
    setBusy(false);
    if (r === "error") setErr(true);
    else setSent(r);
  };

  return (
    <>
      <div className="xg__cta">
        <div className="btns">
          <button type="button" className="btn" onClick={show}>Rezerwuję dla grupy</button>
          <a href={offer} className="btn btn--ghost-dark" target="_blank" rel="noopener">Zobacz ofertę (PDF)</a>
        </div>
        <p className="xg__note">{XMAS_NOTE}</p>
      </div>

      <div ref={box} id="rezerwacja-grupowa" className={`xg__form${open ? " is-open" : ""}`} hidden={!open}>
        {sent ? (
          <div className="xg__done" role="status">
            <span className="planner__check">✓</span>
            <h3>Dziękujemy, mamy Waszą rezerwację!</h3>
            <p>{XMAS_NOTE}</p>
            {sent === "demo" && <p className="planner__note">Podgląd strony – rezerwacja nie została wysłana.</p>}
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h3>Rezerwacja dla grupy</h3>
            <p className="xg__lead">Spotkania świąteczne 11–12 grudnia 2026 · od {XMAS.min} do {XMAS.max} osób</p>

            <p className="xg__lbl">Termin</p>
            <div className="opts">
              {XMAS.dates.map((t) => (
                <button key={t} type="button" className={`opt${d.date === t ? " on" : ""}`} onClick={() => set({ date: t })}>{t}</button>
              ))}
            </div>
            {tried && !d.date && <p className="hint hint--err">Wybierzcie termin.</p>}

            <p className="xg__lbl">Propozycja menu</p>
            <div className="opts">
              {XMAS.packages.map((t) => (
                <button key={t} type="button" className={`opt${d.pkg === t ? " on" : ""}`} onClick={() => set({ pkg: d.pkg === t ? "" : t })}>{t}</button>
              ))}
            </div>

            <div className="fields xg__fields">
              <label>
                Liczba osób
                <input className="inp" type="number" inputMode="numeric" min={XMAS.min} max={XMAS.max} value={d.guests} onChange={(e) => set({ guests: e.target.value })} placeholder={`od ${XMAS.min} do ${XMAS.max}`} />
                {d.guests !== "" && !guestsOk && <span className="hint hint--err">Rezerwacja grupowa: od {XMAS.min} do {XMAS.max} osób. Większa grupa? Zadzwońcie: {CONTACT.phone}.</span>}
                {tried && d.guests === "" && <span className="hint hint--err">Podajcie liczbę osób.</span>}
              </label>
              <div className="fields__2">
                <label>Imię i nazwisko<input className="inp" autoComplete="name" value={d.name} onChange={(e) => set({ name: e.target.value })} /></label>
                <label><span>Firma <i>(opcjonalnie)</i></span><input className="inp" autoComplete="organization" value={d.company} onChange={(e) => set({ company: e.target.value })} /></label>
              </div>
              {tried && d.name.trim().length < 2 && <span className="hint hint--err">Podajcie imię i nazwisko.</span>}
              <div className="fields__2">
                <label>Telefon<input className="inp" type="tel" autoComplete="tel" value={d.phone} onChange={(e) => set({ phone: e.target.value })} /></label>
                <label><span>E-mail <i>(opcjonalnie)</i></span><input className="inp" type="email" autoComplete="email" value={d.email} onChange={(e) => set({ email: e.target.value })} /></label>
              </div>
              {tried && !phoneOk && <span className="hint hint--err">Podajcie numer telefonu – manager zadzwoni, żeby potwierdzić rezerwację.</span>}
              {!emailOk && <span className="hint hint--err">Sprawdźcie adres e-mail.</span>}
              <label><span>Uwagi <i>(opcjonalnie)</i></span><textarea className="inp" rows={3} value={d.msg} onChange={(e) => set({ msg: e.target.value })} placeholder="np. godzina rozpoczęcia, dieta, nocleg w domkach" /></label>
            </div>

            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" value={hp} onChange={(e) => setHp(e.target.value)} />
            <p className="planner__rodo">Dane z formularza wykorzystamy tylko do obsługi rezerwacji. <Link href="/polityka-prywatnosci/">Polityka prywatności</Link></p>
            {err && <p className="planner__err">Nie udało się wysłać rezerwacji. Spróbujcie jeszcze raz albo zadzwońcie: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.</p>}
            <div className="xg__submit">
              <button type="submit" className="btn btn--light" disabled={busy}>{busy ? "Wysyłamy…" : "Rezerwuję dla grupy"}</button>
              <p className="xg__note xg__note--light">{XMAS_NOTE}</p>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
