"use client";

import { useEffect, useRef } from "react";
import { CONTACT } from "@/lib/asset";

/* Avocado + miasta (czasy dojazdu z obecnej strony). Współrzędne Avocado z systemu rezerwacji. */
const AVO: [number, number] = [51.541871, 18.669349];
// side: po której stronie kropki stoi etykieta (żeby się nie nakładały)
const CITIES: { name: string; min: number; pos: [number, number]; side?: "l" | "b" }[] = [
  { name: "Sieradz", min: 10, pos: [51.5956, 18.73], side: "b" },
  { name: "Zduńska Wola", min: 20, pos: [51.5992, 18.9389], side: "l" },
  { name: "Łask", min: 30, pos: [51.5908, 19.134] },
  { name: "Wieluń", min: 40, pos: [51.2207, 18.5697] },
  { name: "Wieruszów", min: 40, pos: [51.2963, 18.1539], side: "l" },
  { name: "Łódź", min: 55, pos: [51.7592, 19.456] },
  { name: "Kalisz", min: 55, pos: [51.7611, 18.091], side: "l" },
];

const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

type LeafletNS = typeof import("leaflet");
declare global { interface Window { L?: LeafletNS } }

function loadLeaflet(): Promise<LeafletNS> {
  if (window.L) return Promise.resolve(window.L);
  if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
    const l = document.createElement("link"); l.rel = "stylesheet"; l.href = LEAFLET_CSS; document.head.appendChild(l);
  }
  return new Promise((res, rej) => {
    const s = document.createElement("script"); s.src = LEAFLET_JS; s.async = true;
    s.onload = () => res(window.L!); s.onerror = rej; document.head.appendChild(s);
  });
}

/** Mapa dojazdu: jasne kafelki CARTO/OSM, pinezka Avocado, etykiety miast z czasem jazdy i linie dojazdu. */
export default function LiveMap() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let alive = true;
    loadLeaflet().then((L) => {
      if (!alive || !box.current) return;
      map = L.map(box.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const bounds = L.latLngBounds([AVO]);
      CITIES.forEach((c) => {
        bounds.extend(c.pos);
        L.polyline([AVO, c.pos], { color: "#A8865A", weight: 1.5, dashArray: "4 6", opacity: 0.9 }).addTo(map!);
        L.marker(c.pos, {
          icon: L.divIcon({ className: "lm-city", html: `<span class="lm-dot"></span><span class="lm-lbl${c.side ? ` lm-lbl--${c.side}` : ""}"><b>${c.name}</b>${c.min} min</span>`, iconAnchor: [6, 6] }),
          interactive: false,
        }).addTo(map!);
      });
      L.marker(AVO, {
        icon: L.divIcon({ className: "lm-avo", html: `<span class="lm-pin"></span><span class="lm-avo-lbl"><b>Avocado</b>Kuśnie 32A</span>`, iconAnchor: [14, 14] }),
      }).addTo(map!).bindPopup(`<b>Restauracja Avocado</b><br>${CONTACT.address}<br><a href="${CONTACT.maps}" target="_blank" rel="noopener">Wyznacz trasę →</a>`);

      map.fitBounds(bounds.pad(0.05));
      const onResize = () => map?.invalidateSize();
      window.addEventListener("resize", onResize);
    }).catch(() => { /* bez mapy – zostaje lista czasów dojazdu */ });
    return () => { alive = false; map?.remove(); };
  }, []);

  return (
    <div className="lm">
      <div ref={box} className="lm__map" role="img" aria-label="Mapa: Avocado w Kuśniach i czasy dojazdu z okolicznych miast" />
      <a href={CONTACT.maps} className="lm__btn btn btn--sm" target="_blank" rel="noopener">Otwórz w Google Maps</a>
    </div>
  );
}
