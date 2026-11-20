import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Typo from "@/components/Typo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Consent from "@/components/Consent";
import XmasPopup from "@/components/XmasPopup";

/** NEXT_PUBLIC_PROD=1 tylko przy budowaniu wersji na restauracjaavocado.pl (tools/build-prod.py). */
const PROD = process.env.NEXT_PUBLIC_PROD === "1";
const SITE = "https://www.restauracjaavocado.pl";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const sans = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Avocado – restauracja & catering | Wesela i przyjęcia koło Sieradza",
    template: "%s | Avocado Sieradz",
  },
  description:
    "Wesela, przyjęcia rodzinne i firmowe w Kuśniach koło Sieradza. Jasna sala bankietowa, sala plenerowa wśród brzóz, własna kuchnia i noclegi w domkach.",
  metadataBase: new URL(SITE),
  alternates: { canonical: "./" },
  openGraph: { type: "website", locale: "pl_PL", siteName: "Restauracja Avocado", images: [{ url: "/img/hero.webp", width: 2000, height: 1333 }] },
  robots: PROD ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#FAF7F2" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        <Typo />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Consent />
        <XmasPopup />
      </body>
    </html>
  );
}
