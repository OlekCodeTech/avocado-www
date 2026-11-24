"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";
import { consentDecided } from "./Consent";

/* Popup świąteczny przeniesiony z Webflow: raz na sesję, nie na stronie Kontakt, znika sam po 24.12.2026.
   Kliknięcie prowadzi do rezerwacji grupowej w Wydarzeniach (formularz otwiera się sam – prośba Eweliny 23.11.2026). */
const KONIEC = new Date("2026-12-24T23:59:59");
const KEY = "avoPopup";

export default function XmasPopup() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (new Date() > KONIEC || path.startsWith("/kontakt")) return;
    try { if (sessionStorage.getItem(KEY)) return; } catch { /* brak pamięci = pokaż */ }
    let t: ReturnType<typeof setTimeout> | undefined;
    const show = (delay: number) => {
      t = setTimeout(() => {
        try { sessionStorage.setItem(KEY, "1"); } catch { /* jw. */ }
        setOpen(true);
      }, delay);
    };
    // najpierw decyzja o cookies, potem popup – żeby dwa okna nie zasłaniały się nawzajem
    const onConsent = () => show(700);
    if (consentDecided()) show(1500);
    else window.addEventListener("avo:consent", onConsent, { once: true });
    return () => { clearTimeout(t); window.removeEventListener("avo:consent", onConsent); };
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  if (!open) return null;
  return (
    <div className="xmas" role="dialog" aria-modal="true" aria-label="Rezerwacja spotkania świątecznego" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="xmas__box">
        <button type="button" className="xmas__x" aria-label="Zamknij" onClick={() => setOpen(false)}>×</button>
        <Link href="/wydarzenia/#rezerwacja-grupowa" onClick={() => { setOpen(false); window.dispatchEvent(new Event("avo:group")); }}>
          <img src={asset("/img/popup-swieta-2026-b.webp")} alt="Spotkania świąteczne w Avocado 11–12.12.2026 – rezerwacje grupowe od 15 do 60 osób, liczba miejsc ograniczona. Tel. 511 647 111" width={1080} height={1350} />
        </Link>
      </div>
    </div>
  );
}
