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
            <p>Restauracja &amp; catering przy brzozowym lesie. Wesela, przyjęcia, wydarzenia i Avocado Domki – 10 minut od Sieradza.</p>
            <div className="social">
              <span>Obserwuj nas</span>
              <a href="https://www.instagram.com/restauracja_avocado/" target="_blank" rel="noopener" aria-label="Avocado na Instagramie">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r=".6" fill="currentColor" /></svg>
                Instagram
              </a>
              <a href="https://www.facebook.com/RestauracjaAvocado/" target="_blank" rel="noopener" aria-label="Avocado na Facebooku">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M13.2 21v-7.4h2.5l.4-2.9h-2.9V9c0-.9.3-1.4 1.5-1.4h1.5V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.6 1.3-3.6 3.7v2h-2.4v2.9h2.4V21" /></svg>
                Facebook
              </a>
            </div>
          </div>
          <div>
            <b>Oferta</b>
            {NAV.filter((l) => l.href !== "/kontakt/").map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
            <Link href="/galeria/">Galeria</Link>
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
