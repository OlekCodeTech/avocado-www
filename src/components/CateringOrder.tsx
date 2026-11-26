"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CONTACT } from "@/lib/asset";
import { sendForm } from "@/lib/send";
import CAT from "../../public/catering-2026.json";

/* Zamówienie cateringu świątecznego 2026 – odpowiednik wtyczki WordPress Eweliny (v1.2, 24.11.2026).
   Ceny przelicza ponownie send.php z tego samego pliku public/catering-2026.json.
   Po wysłaniu przechodzimy na /catering/dziekujemy/ (strona konwersji dla kampanii Meta). */

const zl = (n: number) => n.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł";
export const CATERING_KEY = "avoCatering";
const PRODUCTS = CAT.categories.flatMap((c) => c.items);

type Addr = { street: string; building: string; postcode: string; city: string };
const EMPTY_ADDR: Addr = { street: "", building: "", postcode: "", city: "" };
const addrOk = (a: Addr) => a.street.trim().length >= 2 && a.building.trim() !== "" && /^\d{2}-\d{3}$/.test(a.postcode.trim()) && a.city.trim().length >= 2;

export default function CateringOrder() {
  const router = useRouter();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [p, setP] = useState({ first: "", last: "", email: "", phone: "", notes: "" });
  const [home, setHome] = useState<Addr>(EMPTY_ADDR);
  const [ship, setShip] = useState<Addr>(EMPTY_ADDR);
  const [delivery, setDelivery] = useState<"pickup" | "delivery">("pickup");
  const [other, setOther] = useState(false);
  const [terms, setTerms] = useState(false);
  const [rodo, setRodo] = useState(false);
  const [hp, setHp] = useState("");
  const [tried, setTried] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [closed, setClosed] = useState(false);

  useEffect(() => { setClosed(Date.now() > new Date(CAT.deadline).getTime()); }, []);

  const lines = useMemo(() => PRODUCTS.filter((x) => (qty[x.id] ?? 0) > 0).map((x) => ({ ...x, qty: qty[x.id], sum: qty[x.id] * x.price })), [qty]);
  const total = lines.reduce((s, l) => s + l.sum, 0);
  const clamp = (v: number) => Math.max(0, Math.min(99, Math.round(v) || 0));
  const setQ = (id: string, v: number) => setQty((q) => ({ ...q, [id]: clamp(v) }));
  const step = (id: string, d: number) => setQty((q) => ({ ...q, [id]: clamp((q[id] ?? 0) + d) }));

  const phoneOk = p.phone.replace(/\D/g, "").length >= 9;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email);
  const shipNeeded = delivery === "delivery" && other;
  const ok = lines.length > 0 && p.first.trim().length >= 2 && p.last.trim().length >= 2 && emailOk && phoneOk && addrOk(home) && (!shipNeeded || addrOk(ship)) && terms && rodo;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!ok || busy) {
      document.querySelector(".co [data-err]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setBusy(true);
    setErr("");
    const ref = "AV" + new Date().toISOString().slice(5, 10).replace("-", "") + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
    const r = await sendForm({
      form: "catering", ref, items: Object.fromEntries(lines.map((l) => [l.id, l.qty])),
      first: p.first, last: p.last, email: p.email, phone: p.phone, notes: p.notes,
      home, delivery, other: shipNeeded, ship: shipNeeded ? ship : null, terms, rodo, company_website: hp,
    });
    setBusy(false);
    if (r === "error") { setErr("Nie udało się wysłać zamówienia."); return; }
    try { sessionStorage.setItem(CATERING_KEY, JSON.stringify({ ref, total, demo: r === "demo" })); } catch { /* brak pamięci */ }
    router.push("/catering/dziekujemy/");
  };

  if (closed) {
    return (
      <div className="co__closed">
        <h3>Przyjmowanie zamówień zakończone</h3>
        <p>Zamówienia na catering świąteczny 2026 przyjmowaliśmy do 18 grudnia. W sprawie dostępności zadzwońcie: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.</p>
      </div>
    );
  }

  const field = (label: string, v: string, set: (s: string) => void, o: { type?: string; ac?: string; ph?: string; bad?: boolean; max?: number } = {}) => (
    <label>
      <span>{label} <b className="co__req">*</b></span>
      <input className="inp" type={o.type ?? "text"} autoComplete={o.ac} placeholder={o.ph} maxLength={o.max ?? 120} value={v} onChange={(e) => set(e.target.value)} aria-invalid={tried && o.bad ? true : undefined} />
      {tried && o.bad && <span className="hint hint--err" data-err>Uzupełnijcie to pole.</span>}
    </label>
  );
  const addr = (a: Addr, set: (a: Addr) => void, pre: string) => (
    <div className="co__addr">
      {field(pre ? "Ulica dostawy" : "Ulica", a.street, (v) => set({ ...a, street: v }), { ac: pre ? undefined : "address-line1", ph: "lub miejscowość, gdy brak ulicy", bad: a.street.trim().length < 2 })}
      {field("Nr domu / lokalu", a.building, (v) => set({ ...a, building: v }), { bad: a.building.trim() === "", max: 30 })}
      {field("Kod pocztowy", a.postcode, (v) => set({ ...a, postcode: v }), { ac: pre ? undefined : "postal-code", ph: "98-200", bad: !/^\d{2}-\d{3}$/.test(a.postcode.trim()), max: 6 })}
      {field("Miejscowość", a.city, (v) => set({ ...a, city: v }), { ac: pre ? undefined : "address-level2", bad: a.city.trim().length < 2 })}
    </div>
  );

  return (
    <form className="co" onSubmit={submit} noValidate>
      <p className="co__how"><b>Jak zamawiać?</b> Wybierzcie dania i ustawcie ilość. <b>1</b> oznacza jedną jednostkę z cennika – np. 10 pierogów, 500 g kapusty albo 100 g karpia.</p>

      <div className="co__menu">
      {CAT.categories.map((c) => (
        <section key={c.title} className="co__cat">
          <h3>{c.title}</h3>
          <ul>
            {c.items.map((x) => {
              const q = qty[x.id] ?? 0;
              return (
                <li key={x.id} className={`co__item${q ? " on" : ""}`}>
                  <span className="co__name">{x.name}</span>
                  <span className="co__price"><b>{x.price} zł</b> / {x.unit}</span>
                  <span className="co__qty">
                    <button type="button" onClick={() => step(x.id, -1)} disabled={!q} aria-label={`Mniej: ${x.name}`}>−</button>
                    <input type="number" inputMode="numeric" min={0} max={99} value={q} onChange={(e) => setQ(x.id, Number(e.target.value))} aria-label={`Ilość: ${x.name}`} />
                    <button type="button" onClick={() => step(x.id, 1)} aria-label={`Więcej: ${x.name}`}>+</button>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
        <div className="co__bar" aria-hidden={lines.length === 0}>
          <span>{lines.length ? `Wybrane pozycje: ${lines.length}` : "Wybierzcie dania i ilość"}</span>
          <b>{zl(total)}</b>
          <a href="#co-dane" className="btn btn--light btn--sm">Dalej</a>
        </div>
      </div>

      <section className="co__sum" aria-live="polite">
        <h3>Podsumowanie</h3>
        {lines.length === 0 ? (
          <p className="co__empty">Nie wybraliście jeszcze żadnych dań.</p>
        ) : (
          <ul>{lines.map((l) => <li key={l.id}><span>{l.name} <i>{l.qty} × {l.unit}</i></span><b>{zl(l.sum)}</b></li>)}</ul>
        )}
        {tried && lines.length === 0 && <p className="hint hint--err" data-err>Wybierzcie co najmniej jedną pozycję.</p>}
        <p className="co__total"><span>Wartość produktów</span><b>{zl(total)}</b></p>
        <p className="co__hint">{total >= CAT.freeDeliveryFrom
          ? "Dostawa na terenie Sieradza gratis."
          : `Bezpłatna dostawa na terenie Sieradza od ${CAT.freeDeliveryFrom} zł. Koszt innej dostawy ustalamy przed potwierdzeniem zamówienia.`}</p>
      </section>

      <section className="co__box" id="co-dane">
        <h3>Dane zamawiającego</h3>
        <p className="co__hint">Pola oznaczone * są wymagane, także przy odbiorze osobistym.</p>
        <div className="co__grid">
          {field("Imię", p.first, (v) => setP({ ...p, first: v }), { ac: "given-name", bad: p.first.trim().length < 2, max: 80 })}
          {field("Nazwisko", p.last, (v) => setP({ ...p, last: v }), { ac: "family-name", bad: p.last.trim().length < 2, max: 100 })}
          {field("E-mail", p.email, (v) => setP({ ...p, email: v }), { type: "email", ac: "email", bad: !emailOk, max: 160 })}
          {field("Telefon", p.phone, (v) => setP({ ...p, phone: v }), { type: "tel", ac: "tel", ph: "np. 511 647 111", bad: !phoneOk, max: 25 })}
        </div>
        <h4>Adres zamieszkania</h4>
        {addr(home, setHome, "")}
      </section>

      <section className="co__box">
        <h3>Odbiór czy dostawa?</h3>
        <div className="co__choice">
          <label className={delivery === "pickup" ? "on" : ""}>
            <input type="radio" name="co-delivery" checked={delivery === "pickup"} onChange={() => setDelivery("pickup")} />
            <span><b>Odbiór osobisty – {CAT.pickup}</b><small>Restauracja Avocado, Kuśnie 32A, 98-200 Sieradz. Godzinę ustalimy przy potwierdzeniu.</small></span>
          </label>
          <label className={delivery === "delivery" ? "on" : ""}>
            <input type="radio" name="co-delivery" checked={delivery === "delivery"} onChange={() => setDelivery("delivery")} />
            <span><b>Dostawa</b><small>Gratis na terenie Sieradza od {CAT.freeDeliveryFrom} zł. Inne dostawy – po indywidualnym uzgodnieniu.</small></span>
          </label>
        </div>
        {delivery === "delivery" && (
          <div className="co__ship">
            <label className="co__check"><input type="checkbox" checked={other} onChange={(e) => setOther(e.target.checked)} /> <span>Adres dostawy jest inny niż adres zamieszkania</span></label>
            {other && addr(ship, setShip, "dostawy ")}
          </div>
        )}
        <label className="co__notes"><span>Uwagi do zamówienia <i>(opcjonalnie)</i></span>
          <textarea className="inp" rows={3} maxLength={1000} value={p.notes} onChange={(e) => setP({ ...p, notes: e.target.value })} placeholder="np. informacje przydatne przy odbiorze" />
        </label>
      </section>

      <section className="co__deposit">
        <p className="co__tag">Ważne · zadatek</p>
        <h3>Warunkiem potwierdzenia zamówienia jest wpłata zadatku {CAT.deposit} zł</h3>
        <p>Po wysłaniu formularza wpłaćcie <b>{CAT.deposit} zł zadatku</b> na rachunek:</p>
        <p className="co__acc">{CAT.account}</p>
        <p><b>Tytuł przelewu:</b> {CAT.transferTitle}</p>
        <p className="co__hint">Samo wysłanie formularza nie oznacza potwierdzenia zamówienia. Restauracja potwierdzi je po sprawdzeniu zgłoszenia i zaksięgowaniu zadatku. Jeśli wartość produktów jest niższa niż {CAT.deposit} zł, przed przelewem skontaktujcie się z nami, żeby ustalić płatność.</p>
      </section>

      <section className="co__legal">
        <label className="co__check">
          <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
          <span>Zapoznałem/am się z <Link href="/catering/regulamin/" target="_blank">Regulaminem zamówień cateringu świątecznego 2026</Link> i akceptuję go, w tym zasady zadatku {CAT.deposit} zł. <b className="co__req">*</b></span>
        </label>
        {tried && !terms && <p className="hint hint--err" data-err>Zaakceptujcie regulamin.</p>}
        <label className="co__check">
          <input type="checkbox" checked={rodo} onChange={(e) => setRodo(e.target.checked)} />
          <span>Potwierdzam zapoznanie się z <Link href="/catering/rodo/" target="_blank">Klauzulą informacyjną RODO</Link>. <b className="co__req">*</b></span>
        </label>
        {tried && !rodo && <p className="hint hint--err" data-err>Potwierdźcie zapoznanie się z klauzulą RODO.</p>}
        <p className="co__hint">Potwierdzenie zapoznania się z klauzulą RODO nie jest zgodą na marketing. Administratorem danych jest M-invest Marek Molski, NIP 827-217-81-76.</p>
      </section>

      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" value={hp} onChange={(e) => setHp(e.target.value)} />
      {err && <p className="planner__err co__err">{err} Spróbujcie jeszcze raz albo zadzwońcie: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.</p>}
      <div className="co__submit">
        <button type="submit" className="btn" disabled={busy}>{busy ? "Wysyłamy…" : "Zamawiam z obowiązkiem zapłaty"}</button>
        <p className="co__hint">Wartość produktów: <b>{zl(total)}</b> · kopię zamówienia wyślemy na podany e-mail</p>
      </div>
    </form>
  );
}
