import type { Metadata } from "next";
import { Suspense } from "react";
import Planner from "@/components/Planner";
import MapSection from "@/components/MapSection";
import Reveal from "@/components/Reveal";
import { CONTACT } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Kontakt i rezerwacja terminu",
  description: "Skontaktuj się z Avocado w Kuśniach koło Sieradza: zapytanie o wesele, przyjęcie, imprezę firmową lub nocleg. Telefon 511 647 111.",
};

export default function Kontakt() {
  return (
    <>
      <section className="contact">
        <div className="wrap contact__grid">
          <Reveal>
            <p className="eyebrow">Kontakt</p>
            <h1>Chcesz dowiedzieć się więcej<br />lub zarezerwować termin?</h1>
            <p className="contact__lead">Skontaktuj się z nami – chętnie pomożemy!</p>
          </Reveal>
          <Reveal delay={0.1} className="contact__cards">
            <div className="ccard">
              <span className="eyebrow">Telefon</span>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a href={CONTACT.phone2Href}>{CONTACT.phone2}</a>
            </div>
            <div className="ccard">
              <span className="eyebrow">E-mail</span>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <a href={`mailto:${CONTACT.email2}`}>{CONTACT.email2}</a>
            </div>
            <div className="ccard">
              <span className="eyebrow">Adres</span>
              <span>Restauracja Avocado</span>
              <span>Kuśnie 32A, 98-200 Sieradz</span>
              <a href={CONTACT.maps} target="_blank" rel="noopener">Wyznacz trasę →</a>
            </div>
          </Reveal>
        </div>
      </section>

      <Suspense>
        <Planner />
      </Suspense>
      <MapSection sand={false} />
    </>
  );
}
