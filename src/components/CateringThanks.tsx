"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONTACT } from "@/lib/asset";
import CAT from "../../public/catering-2026.json";
import { CATERING_KEY } from "./CateringOrder";

const zl = (n: number) => n.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł";

/** Treść strony podziękowania – numer zgłoszenia i wartość z pamięci sesji (ustawia CateringOrder po wysłaniu). */
export default function CateringThanks() {
  const [o, setO] = useState<{ ref: string; total: number; demo?: boolean } | null>(null);
  useEffect(() => {
    try { setO(JSON.parse(sessionStorage.getItem(CATERING_KEY) || "null")); } catch { /* brak pamięci */ }
  }, []);

  return (
    <div className="co__thanks">
      <span className="planner__check">✓</span>
      <h1>Dziękujemy za zamówienie!</h1>
      {o && <p className="co__ref">Numer zgłoszenia: <b>{o.ref}</b> · wartość produktów: <b>{zl(o.total)}</b></p>}
      {o?.demo && <p className="planner__note">Podgląd strony – zamówienie nie zostało wysłane.</p>}
      <p>Kopię zgłoszenia wysłaliśmy na Wasz adres e-mail (zajrzyjcie też do folderu SPAM). Zamówienie potwierdzimy po sprawdzeniu zgłoszenia i zaksięgowaniu zadatku.</p>
      <div className="co__deposit co__deposit--thanks">
        <p className="co__tag">Zadatek {CAT.deposit} zł</p>
        <p className="co__acc">{CAT.account}</p>
        <p><b>Tytuł przelewu:</b> {CAT.transferTitle}{o ? ` – ${o.ref}` : ""}</p>
        {o && o.total < CAT.deposit && <p className="co__hint">Wartość zamówienia jest niższa niż {CAT.deposit} zł – zanim zrobicie przelew, zadzwońcie do nas, ustalimy płatność.</p>}
      </div>
      <p>Pytania? <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
      <div className="btns co__thanks-btns">
        <Link href="/" className="btn">Strona główna</Link>
        <Link href="/catering/regulamin/" className="btn btn--ghost-dark">Regulamin</Link>
      </div>
    </div>
  );
}
