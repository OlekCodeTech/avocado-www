"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";
import { consentDecided } from "./Consent";

/* Popup świąteczny (grafiki od Eweliny): JEDNO okno z obiema ofertami obok siebie – prośba Eweliny 26.11.2026.
   Na telefonie grafiki przewija się palcem (kropki pod spodem). Raz na sesję, po decyzji o cookies.
   Każda grafika znika sama po terminie swojej akcji i nie pokazuje się na swojej własnej podstronie. */
type Item = { img: string; w: number; h: number; alt: string; label: string; href: string; until: string; skip: string[]; event?: string };
const ITEMS: Item[] = [
  {
    img: "/img/popup-swieta-2026-b.webp", w: 1080, h: 1350,
    alt: "Spotkania świąteczne w Avocado 11–12.12.2026 – rezerwacje grupowe, liczba miejsc ograniczona. Tel. 511 647 111",
    label: "Spotkania świąteczne – rezerwuj dla grupy",
    href: "/wydarzenia/#rezerwacja-grupowa", event: "avo:group",
    until: "2026-12-12T23:59:59", skip: ["/wydarzenia"],
  },
  {
    img: "/img/popup-catering-2026.webp", w: 1080, h: 1534,
    alt: "Catering świąteczny od Avocado – zamówienia do 18 grudnia, odbiór 24 grudnia, dostawa gratis w Sieradzu. Tel. 511 647 111",
    label: "Catering świąteczny – zamów online",
    href: "/catering/#zamowienie",
    until: "2026-12-18T23:59:59", skip: [],
  },
];
const KEY = "avoPopup";
const NEVER = ["/kontakt", "/catering"]; // tu okno nie wyskakuje w ogóle

export default function XmasPopup() {
  const path = usePathname();
  const [items, setItems] = useState<Item[] | null>(null);
  const [cur, setCur] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (NEVER.some((s) => path.startsWith(s))) return;
    try { if (sessionStorage.getItem(KEY)) return; } catch { /* brak pamięci = pokaż */ }
    const now = new Date();
    const list = ITEMS.filter((x) => now <= new Date(x.until) && !x.skip.some((s) => path.startsWith(s)));
    if (!list.length) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const show = (delay: number) => {
      t = setTimeout(() => {
        try { sessionStorage.setItem(KEY, "1"); } catch { /* jw. */ }
        setCur(0);
        setItems(list);
      }, delay);
    };
    const onConsent = () => show(700);
    if (consentDecided()) show(1500);
    else window.addEventListener("avo:consent", onConsent, { once: true });
    return () => { clearTimeout(t); window.removeEventListener("avo:consent", onConsent); };
  }, [path]);

  useEffect(() => {
    if (!items) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setItems(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [items]);

  // na telefonie (grafiki jedna za drugą) – po chwili samo pokazuje drugą, żeby catering nie umknął
  const touched = useRef(false);
  useEffect(() => {
    if (!items || items.length < 2) return;
    touched.current = false;
    const t = setTimeout(() => {
      const el = track.current;
      if (!touched.current && el && el.scrollWidth > el.clientWidth + 10) el.scrollTo({ left: (el.children[1] as HTMLElement).offsetLeft - el.offsetLeft - 16, behavior: "smooth" });
    }, 3500);
    return () => clearTimeout(t);
  }, [items]);

  if (!items) return null;
  const close = () => setItems(null);
  const go = (k: number) => {
    const el = track.current;
    const it = el?.children[k] as HTMLElement | undefined;
    if (el && it) el.scrollTo({ left: Math.max(0, it.offsetLeft - el.offsetLeft - 16), behavior: "smooth" });
  };
  const onScroll = () => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (el && first) setCur(Math.min(items!.length - 1, Math.round(el.scrollLeft / (first.offsetWidth + 12))));
  };

  return (
    <div className="xmas" role="dialog" aria-modal="true" aria-label="Oferta świąteczna Avocado" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className={`xmas__box${items.length > 1 ? " xmas__box--multi" : ""}`}>
        <button type="button" className="xmas__x" aria-label="Zamknij" onClick={close}>×</button>
        <div className="xmas__track" ref={track} onScroll={onScroll} onTouchStart={() => { touched.current = true; }}>
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="xmas__item" onClick={() => { close(); if (it.event) window.dispatchEvent(new Event(it.event)); }}>
              <img src={asset(it.img)} alt={it.alt} width={it.w} height={it.h} />
              <span className="xmas__cta">{it.label} →</span>
            </Link>
          ))}
        </div>
        {items.length > 1 && (
          <div className="xmas__dots">
            {items.map((it, k) => (
              <button key={it.href} type="button" className={k === cur ? "on" : ""} aria-label={`Pokaż: ${it.label}`} onClick={() => go(k)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
