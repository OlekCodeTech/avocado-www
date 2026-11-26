"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";
import { consentDecided } from "./Consent";

/* Popupy świąteczne (grafiki od Eweliny). Każdy raz na sesję, najwyżej jeden na odsłonę strony –
   najpierw spotkania świąteczne, przy kolejnym przejściu catering. Znikają same po terminie akcji.
   Pokazywane dopiero po decyzji o cookies, żeby okna nie zasłaniały się nawzajem. */
type Popup = { key: string; img: string; w: number; h: number; alt: string; href: string; until: string; skip: string[]; event?: string };
const POPUPS: Popup[] = [
  {
    key: "avoPopup",
    img: "/img/popup-swieta-2026-b.webp", w: 1080, h: 1350,
    alt: "Spotkania świąteczne w Avocado 11–12.12.2026 – rezerwacje grupowe, liczba miejsc ograniczona. Tel. 511 647 111",
    href: "/wydarzenia/#rezerwacja-grupowa", event: "avo:group",
    until: "2026-12-12T23:59:59", skip: ["/kontakt", "/wydarzenia", "/catering"],
  },
  {
    key: "avoPopupCatering",
    img: "/img/popup-catering-2026.webp", w: 1080, h: 1534,
    alt: "Catering świąteczny od Avocado – zamówienia do 18 grudnia, odbiór 24 grudnia, dostawa gratis w Sieradzu. Tel. 511 647 111",
    href: "/catering/#zamowienie",
    until: "2026-12-18T23:59:59", skip: ["/kontakt", "/catering"],
  },
];

const seen = (k: string) => { try { return !!sessionStorage.getItem(k); } catch { return false; } };
const mark = (k: string) => { try { sessionStorage.setItem(k, "1"); } catch { /* brak pamięci */ } };
let shownThisLoad = false;

export default function XmasPopup() {
  const path = usePathname();
  const [cur, setCur] = useState<Popup | null>(null);

  useEffect(() => {
    if (shownThisLoad) { shownThisLoad = false; return; } // po pokazaniu jednego – następny dopiero przy kolejnym przejściu
    const now = new Date();
    const p = POPUPS.find((x) => now <= new Date(x.until) && !x.skip.some((s) => path.startsWith(s)) && !seen(x.key));
    if (!p) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const show = (delay: number) => {
      t = setTimeout(() => { mark(p.key); shownThisLoad = true; setCur(p); }, delay);
    };
    const onConsent = () => show(700);
    if (consentDecided()) show(1500);
    else window.addEventListener("avo:consent", onConsent, { once: true });
    return () => { clearTimeout(t); window.removeEventListener("avo:consent", onConsent); };
  }, [path]);

  useEffect(() => {
    if (!cur) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setCur(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [cur]);

  if (!cur) return null;
  const close = () => setCur(null);
  return (
    <div className="xmas" role="dialog" aria-modal="true" aria-label={cur.alt} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="xmas__box">
        <button type="button" className="xmas__x" aria-label="Zamknij" onClick={close}>×</button>
        <Link href={cur.href} onClick={() => { close(); if (cur.event) window.dispatchEvent(new Event(cur.event)); }}>
          <img src={asset(cur.img)} alt={cur.alt} width={cur.w} height={cur.h} />
        </Link>
      </div>
    </div>
  );
}
