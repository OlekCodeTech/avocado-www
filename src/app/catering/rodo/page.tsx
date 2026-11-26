import type { Metadata } from "next";
import Link from "next/link";
import { RODO } from "@/lib/catering-docs";

export const metadata: Metadata = { title: RODO.title, description: "Klauzula informacyjna RODO dla osób zamawiających catering świąteczny 2026 w Restauracji Avocado." };

export default function Page() {
  return (
    <section className="legal">
      <div className="wrap legal__in">
        <p className="eyebrow">Catering świąteczny 2026</p>
        <h1>{RODO.title}</h1>
        <div className="legal__doc" dangerouslySetInnerHTML={{ __html: RODO.html }} />
        <p className="legal__back"><Link href="/catering/#zamowienie">← Wróć do zamówienia</Link></p>
      </div>
    </section>
  );
}
