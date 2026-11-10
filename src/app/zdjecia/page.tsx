import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { asset } from "@/lib/asset";

export const metadata: Metadata = { title: "Zdjęcia użyte na stronie", robots: { index: false, follow: false } };

const PAGES: [string, string][] = [
  ["src/app/page.tsx", "Strona główna"], ["src/components/Hero.tsx", "Strona główna"], ["src/components/Offer.tsx", "Strona główna"],
  ["src/components/Spaces.tsx", "Strona główna"], ["src/components/Kitchen.tsx", "Kuchnia"],
  ["src/app/wesela/page.tsx", "Wesela"], ["src/app/przyjecia/page.tsx", "Przyjęcia"], ["src/app/sale/page.tsx", "Sale"],
  ["src/app/noclegi/page.tsx", "Noclegi"], ["src/app/wydarzenia/page.tsx", "Wydarzenia"], ["src/app/o-nas/page.tsx", "O nas"], ["src/app/kontakt/page.tsx", "Kontakt"],
];

/** Lista zdjęć budowana w czasie eksportu: plik + na których podstronach występuje. */
function collect() {
  const root = process.cwd();
  const src = PAGES.map(([f, label]) => [fs.existsSync(path.join(root, f)) ? fs.readFileSync(path.join(root, f), "utf8") : "", label] as const);
  const files = fs.readdirSync(path.join(root, "public/img")).filter((f) => /\.(webp|jpg|png)$/i.test(f)).sort();
  return files.map((f) => {
    const where = [...new Set(src.filter(([s]) => s.includes(`/img/${f}`)).map(([, l]) => l))];
    return { f, where };
  }).filter((x) => x.where.length);
}

export default function Zdjecia() {
  const list = collect();
  return (
    <section className="sec">
      <div className="wrap">
        <p className="eyebrow">Robocze · do wyboru zdjęć</p>
        <h1>Zdjęcia użyte na stronie ({list.length})</h1>
        <p style={{ color: "var(--muted)", maxWidth: "60ch", margin: "12px 0 36px" }}>
          Każde zdjęcie ma numer. Wystarczy napisać np. „nr 12 do wymiany na zdjęcie z wesela w czerwcu” – albo podesłać nowe pliki z numerami, które mają zastąpić.
        </p>
        <div className="gallery gallery--3" style={{ gap: 18 }}>
          {list.map((x, i) => (
            <figure key={x.f} style={{ margin: 0 }}>
              <img src={asset(`/img/${x.f}`)} alt="" loading="lazy" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
              <figcaption style={{ fontSize: ".82rem", color: "var(--muted)", padding: "8px 0 0" }}>
                <b style={{ color: "var(--ink)", marginRight: 8 }}>nr {i + 1}</b>{x.where.join(" · ")}
                <span style={{ display: "block", opacity: .6 }}>{x.f}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
