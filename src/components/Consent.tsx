"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isLive } from "@/lib/send";

/* Zgoda na piksel Meta (ten sam piksel co na dawnej stronie Webflow).
   Piksel zapisuje cookies i wysyła Mecie informacje o odwiedzinach, więc ładujemy go dopiero po zgodzie.
   Działa tylko na restauracjaavocado.pl — na podglądzie baner widać, ale nic nie jest wysyłane. */
const PIXEL_ID = "1419134847093606";
const KEY = "avocado_zgoda_marketing";
const DAY = 24 * 3600 * 1000;
const KEEP: Record<string, number> = { tak: 365 * DAY, nie: 180 * DAY };

type Fbq = ((...a: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
declare global {
  interface Window { fbq?: Fbq; _fbq?: Fbq; avoLead?: () => void }
}

function read(): string | null {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "null");
    if (v && KEEP[v.d] && Date.now() - v.t < KEEP[v.d]) return v.d;
  } catch { /* brak dostępu do pamięci przeglądarki = brak decyzji */ }
  return null;
}
function save(d: string) {
  try { localStorage.setItem(KEY, JSON.stringify({ d, t: Date.now() })); } catch { /* jw. */ }
}

let loaded = false;
function loadPixel() {
  if (loaded) { window.fbq?.("consent", "grant"); return; }
  loaded = true;
  if (!isLive()) return;
  const f = window;
  if (!f.fbq) {
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args); else n.queue!.push(args);
    } as Fbq;
    f.fbq = n; if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
    const t = document.createElement("script");
    t.async = true; t.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(t);
  }
  f.fbq!("init", PIXEL_ID);
  f.fbq!("track", "PageView");
}
function stopPixel() {
  window.fbq?.("consent", "revoke");
  ["_fbp", "_fbc"].forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.restauracjaavocado.pl`;
  });
}

/** Czy odwiedzający już zdecydował o cookies (żeby inne okna nie nakładały się na baner). */
export const consentDecided = () => read() !== null;

export default function Consent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.avoLead = () => { if (loaded && read() === "tak") window.fbq?.("track", "Lead"); };
    const t = setTimeout(() => {
      const d = read();
      if (d === "tak") loadPixel();
      else if (d === null) setOpen(true);
    }, 0);
    const reopen = (e: Event) => {
      const a = (e.target as HTMLElement | null)?.closest?.("[data-consent-open]");
      if (!a) return;
      e.preventDefault();
      setOpen(true);
    };
    document.addEventListener("click", reopen);
    return () => { clearTimeout(t); document.removeEventListener("click", reopen); };
  }, []);

  const decide = (d: "tak" | "nie") => {
    save(d);
    if (d === "tak") loadPixel(); else stopPixel();
    setOpen(false);
    window.dispatchEvent(new Event("avo:consent"));
  };

  if (!open) return null;
  return (
    <section className="cb" role="dialog" aria-label="Zgoda na pliki cookies">
      <div>
        <b>Pliki cookies</b>
        <p>
          Chcemy używać piksela Meta (Facebook i Instagram), żeby mierzyć skuteczność naszych reklam. Piksel zapisuje pliki cookies
          i przekazuje Mecie informacje o odwiedzinach tej strony. Włączymy go tylko za Twoją zgodą – możesz ją zmienić w stopce,
          w „Ustawieniach cookies”. <Link href="/polityka-prywatnosci/#cookies">Polityka prywatności</Link>
        </p>
      </div>
      <div className="cb__btns">
        <button type="button" className="btn btn--ghost-dark btn--sm" onClick={() => decide("nie")}>Nie zgadzam się</button>
        <button type="button" className="btn btn--sm" onClick={() => decide("tak")}>Zgadzam się</button>
      </div>
    </section>
  );
}
