import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
  robots: { index: false, follow: false }, // makieta – zdjąć przy wdrożeniu
};

export const viewport: Viewport = { themeColor: "#FAF7F2" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
