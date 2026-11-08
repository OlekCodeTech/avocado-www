import Link from "next/link";
import { CONTACT, NAV } from "@/lib/asset";
import Logo from "./Logo";

export default function Footer() {
  return (
    <>
      <footer className="foot" id="stopka">
        <div className="wrap foot__grid">
          <div className="foot__logo">
            <Logo className="logo__svg" />
            <p>Restauracja &amp; catering przy brzozowym lesie. Wesela, przyjęcia, wydarzenia i noclegi – 10 minut od Sieradza.</p>
          </div>
          <div>
            <b>Oferta</b>
            {NAV.filter((l) => l.href !== "/kontakt/").map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </div>
          <div>
            <b>Kontakt</b>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a href={CONTACT.phone2Href}>{CONTACT.phone2}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={`mailto:${CONTACT.email2}`}>{CONTACT.email2}</a>
          </div>
          <div>
            <b>Adres</b>
            <span>Restauracja Avocado</span>
            <span>Kuśnie 32A</span>
            <span>98-200 Sieradz</span>
            <a href={CONTACT.maps} target="_blank" rel="noopener">Wyznacz trasę →</a>
          </div>
        </div>
        <div className="wrap foot__copy">
          <span>© 2026 Avocado · Wszystkie prawa zastrzeżone</span>
          <span><a href="#">Polityka prywatności</a> · projekt i wykonanie OlekCodeTech</span>
        </div>
      </footer>

      <nav className="mbar" aria-label="Szybki kontakt">
        <a href={CONTACT.phoneHref}>Zadzwoń</a>
        <Link href="/kontakt/#planer" className="mbar__main">Zapytaj o termin</Link>
      </nav>
    </>
  );
}
