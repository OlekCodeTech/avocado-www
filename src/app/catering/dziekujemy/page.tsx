import type { Metadata } from "next";
import CateringThanks from "@/components/CateringThanks";

/* Strona po wysłaniu zamówienia cateringu – osobny adres pod konwersję w kampanii Meta (prośba Martyny, 24.11.2026). */
export const metadata: Metadata = {
  title: "Dziękujemy za zamówienie cateringu",
  robots: { index: false, follow: false },
};

export default function Dziekujemy() {
  return (
    <section className="legal">
      <div className="wrap legal__in">
        <CateringThanks />
      </div>
    </section>
  );
}
