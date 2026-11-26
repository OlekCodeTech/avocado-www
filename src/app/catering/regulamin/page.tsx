import type { Metadata } from "next";
import Link from "next/link";
import { REGULAMIN } from "@/lib/catering-docs";

export const metadata: Metadata = { title: REGULAMIN.title, description: "Regulamin zamówień cateringu świątecznego 2026 Restauracji Avocado: zamówienia, zadatek, odbiór i dostawa, reklamacje." };

export default function Page() {
  return (
    <section className="legal">
      <div className="wrap legal__in">
        <p className="eyebrow">Catering świąteczny 2026</p>
        <h1>{REGULAMIN.title}</h1>
        <div className="legal__doc" dangerouslySetInnerHTML={{ __html: REGULAMIN.html }} />
        <p className="legal__back"><Link href="/catering/#zamowienie">← Wróć do zamówienia</Link></p>
      </div>
    </section>
  );
}
