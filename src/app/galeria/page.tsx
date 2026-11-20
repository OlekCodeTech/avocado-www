import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Albums, { type Album } from "@/components/Albums";
import CtaBand from "@/components/CtaBand";
import data from "@/lib/albums.json";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Galeria Avocado koło Sieradza: wesela naszych par w sali bankietowej, sali plenerowej i ogrodzie wśród brzóz.",
};

/** Galerie par – foldery od Eweliny (scripts/prep_albums.py). Każda para ma osobną podstronę /galeria/[slug]/. */
const PARY: Album[] = data.map((a) => ({ slug: a.slug, name: a.name, cover: a.cover }));

const AUTORZY = [
  ["Dagmara Chaładaj Fotografia", "https://www.facebook.com/fotografiadagmarachaladaj/?locale=pl_PL"],
  ["Asia Frize-Szulc", "https://www.facebook.com/joannafrizeszulc/?locale=pl_PL"],
  ["Kochana Fotografia", "https://kochanafotografia.pl/"],
  ["Shots of love", "https://shotsoflove.pl/"],
  ["Paulina Gałuszka", "https://www.galuszkapaulina.pl"],
  ["Marta Chruścińska", "https://www.instagram.com/martachruscinskafotografia/"],
];

export default function Galeria() {
  return (
    <>
      <PageHero img="/img/intro-06.webp" alt="Para młoda wśród brzóz o zachodzie słońca" eyebrow="Wesela w Avocado" title="Galeria" />
      <section className="sec">
        <div className="wrap">
          <Albums albums={PARY} />
          <p className="credits">
            Fotografie zamieszczone w galerii autorstwa m.in.:{" "}
            {AUTORZY.map(([n, href], k) => (
              <span key={n}>
                <a href={href} target="_blank" rel="noopener">{n}</a>{k < AUTORZY.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      </section>
      <CtaBand title={<>Wyobrażacie już sobie<br />Wasze wesele?</>} text="Spotkajmy się i porozmawiajmy o szczegółach. Pokażemy Wam nasze miejsce i poznamy Wasze pomysły." okazja="Wesele" button="Zacznij planować" />
    </>
  );
}
