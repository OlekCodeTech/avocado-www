import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CateringOrder from "@/components/CateringOrder";
import CtaBand from "@/components/CtaBand";
import { asset, CONTACT } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Catering świąteczny 2026 – zamów online",
  description: "Catering świąteczny z Avocado koło Sieradza: barszcz, karp, pierogi, uszka, dania główne i ciasta. Zamówienia do 18 grudnia, odbiór 24 grudnia, dostawa gratis w Sieradzu od 400 zł.",
};

const ULOTKA = "/oferty/avocado-catering-swiateczny-2026.pdf";

export default function Catering() {
  return (
    <>
      <PageHero
        img="/img/walentynki-danie.webp"
        alt="Danie przygotowane przez kuchnię Avocado"
        eyebrow="Catering"
        title="Twoje święta. Nasza kuchnia."
        lead="Barszcz, karp, pierogi i uszka, dania główne i świąteczne ciasta – przygotujemy je dla Was, a Wy spędzicie Wigilię przy stole, nie w kuchni."
      >
        <a href="#zamowienie" className="btn btn--light">Zamów catering świąteczny</a>
        <a href={asset(ULOTKA)} className="btn btn--ghost" target="_blank" rel="noopener">Ulotka (PDF)</a>
      </PageHero>

      <section className="sec sec--sand" id="zamowienie">
        <div className="wrap">
          <Reveal className="head head--center">
            <p className="eyebrow eyebrow--lg">Boże Narodzenie 2026</p>
            <h2>Catering świąteczny</h2>
            <p className="head__lead">Wybierzcie ulubione dania i liczbę porcji, a my przygotujemy Wasze świąteczne zamówienie.</p>
          </Reveal>
          <Reveal>
            <ul className="co__facts">
              <li><b>Zamówienia do 18 grudnia</b><span>przez formularz, telefonicznie lub e-mailem</span></li>
              <li><b>Odbiór 24 grudnia</b><span>Restauracja Avocado, Kuśnie 32A</span></li>
              <li><b>Dostawa gratis w Sieradzu</b><span>przy zamówieniu od 400 zł</span></li>
            </ul>
          </Reveal>
          <CateringOrder />
          <p className="co__contact">Wolicie zamówić inaczej? Zadzwońcie: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> albo napiszcie: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>
        </div>
      </section>

      <CtaBand title={<>Catering na Wasze<br />przyjęcie?</>} text="Przygotujemy menu na przyjęcie poza Avocado – opowiedzcie nam o nim." okazja="Catering" />
    </>
  );
}
