"use client";

import { useState } from "react";
import { CONTACT, IDO } from "@/lib/asset";

/** Osadzony silnik rezerwacji IdoBooking (daty i goście wybierane w samym silniku). */
export default function BookingWidget() {
  const [ready, setReady] = useState(false);
  return (
    <div className="embed">
      <div className="embed__bar">
        <span>Rezerwacja online · płatność i potwierdzenie od razu</span>
        <span className="embed__links">
          <a href={IDO.engine} target="_blank" rel="noopener">Otwórz w nowej karcie →</a>
          <a href={CONTACT.booking} target="_blank" rel="noopener">Booking.com →</a>
        </span>
      </div>
      <div className={`embed__frame${ready ? " is-ready" : ""}`}>
        {!ready && <div className="embed__ph"><span>Ładujemy wyszukiwarkę terminów…</span></div>}
        <iframe src={IDO.engine} title="Rezerwacja domków Avocado – IdoBooking" loading="lazy" onLoad={() => setReady(true)} allow="payment" />
      </div>
    </div>
  );
}
