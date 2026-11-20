"use client";

import { useEffect, useState } from "react";
import { IDO } from "@/lib/asset";

/** Rezerwacja domków: estetyczna karta z przyciskiem, a sam silnik IdoBooking otwiera się w oknie
 *  na cały ekran (jeden suwak zamiast ramki z własnym suwakiem w środku strony). */
export default function BookingWidget() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const on = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", on);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", on);
    };
  }, [open]);

  return (
    <>
      <div className="bookcard">
        <ol className="bookcard__steps">
          <li><b>1</b><span>Wybierzcie daty i liczbę osób</span></li>
          <li><b>2</b><span>Sprawdźcie wariant, cenę i warunki pobytu</span></li>
          <li><b>3</b><span>Potwierdźcie rezerwację online</span></li>
        </ol>
        <div className="bookcard__act">
          <button type="button" className="btn" onClick={() => setOpen(true)}>Sprawdź dostępność i zarezerwuj</button>
          <a href={IDO.engine} target="_blank" rel="noopener" className="bookcard__alt">lub otwórz system rezerwacji w nowej karcie →</a>
        </div>
      </div>

      {open && (
        <div className="bookmodal" role="dialog" aria-modal="true" aria-label="Rezerwacja domków Avocado">
          <div className="bookmodal__bar">
            <span>Avocado Domki · rezerwacja online</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Zamknij rezerwację">Zamknij ×</button>
          </div>
          <div className="bookmodal__frame">
            {!ready && <div className="embed__ph"><span>Ładujemy system rezerwacji…</span></div>}
            <iframe src={IDO.engine} title="Rezerwacja domków Avocado – IdoBooking" onLoad={() => setReady(true)} allow="payment" data-lenis-prevent />
          </div>
        </div>
      )}
    </>
  );
}
