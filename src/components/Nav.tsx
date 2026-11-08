"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT, NAV } from "@/lib/asset";
import Logo from "./Logo";

export default function Nav({ light = false }: { light?: boolean }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

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

  const isActive = (href: string) => path.startsWith(href.replace(/\/$/, ""));

  return (
    <>
      <header className={`nav${solid || light ? " is-solid" : ""}${open ? " is-open" : ""}`}>
        <div className="nav__in">
          <Link href="/" className="logo" aria-label="Avocado – strona główna" onClick={() => setOpen(false)}>
            <Logo className="logo__svg" />
          </Link>
          <nav className="nav__links" aria-label="Menu główne">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className={isActive(l.href) ? "is-active" : undefined} aria-current={isActive(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="nav__right">
            <a href={CONTACT.phoneHref} className="nav__tel">{CONTACT.phone}</a>
            <Link href="/kontakt/#planer" className="btn btn--sm">Zapytaj o termin</Link>
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
          {NAV.map((l, i) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ transitionDelay: `${open ? 0.05 * i + 0.1 : 0}s` }} tabIndex={open ? 0 : -1}>
              {l.label}
            </Link>
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
