"use client";

import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/asset";
import Logo from "./Logo";

const LINKS = [
  ["Wesela", "#oferta"],
  ["Przyjęcia", "#oferta"],
  ["Sale", "#sale"],
  ["Noclegi", "#noclegi"],
  ["Wydarzenia", "#oferta"],
  ["Kuchnia", "#kuchnia"],
  ["Dojazd", "#dojazd"],
] as const;

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    const t = setTimeout(on, 300); // po przywróceniu pozycji przewijania przy odświeżeniu
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", on);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`nav${solid ? " is-solid" : ""}${open ? " is-open" : ""}`}>
        <div className="nav__in">
          <a href="#top" className="logo" aria-label="Avocado – strona główna" onClick={() => setOpen(false)}>
            <Logo className="logo__svg" />
          </a>
          <nav className="nav__links" aria-label="Menu główne">
            {LINKS.map(([l, h]) => (
              <a key={l} href={h}>{l}</a>
            ))}
          </nav>
          <div className="nav__right">
            <a href={CONTACT.phoneHref} className="nav__tel">{CONTACT.phone}</a>
            <a href="#planer" className="btn btn--sm">Zapytaj o termin</a>
            <button
              className="nav__burger"
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Menu mobilne">
          {LINKS.map(([l, h], i) => (
            <a key={l} href={h} onClick={() => setOpen(false)} style={{ transitionDelay: `${open ? 0.05 * i + 0.1 : 0}s` }} tabIndex={open ? 0 : -1}>
              {l}
            </a>
          ))}
        </nav>
        <div className="drawer__foot">
          <a href={CONTACT.phoneHref} tabIndex={open ? 0 : -1}>{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`} tabIndex={open ? 0 : -1}>{CONTACT.email}</a>
        </div>
      </div>
    </>
  );
}
