import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Albums, { type Album } from "@/components/Albums";
import CtaBand from "@/components/CtaBand";
import data from "@/lib/albums.json";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Galeria Avocado koło Sieradza: wesela naszych par w sali bankietowej, sali plenerowej i ogrodzie wśród brzóz.",
};

/** Okładka każdej pary (indeks zdjęcia w albumie). */
const COVER: Record<string, number> = { "michalina-michal": 12, "gabi-kuba": 9, "a-j": 9, "n-k": 3, "paulina-igor": 1, "sabina-nick": 1, "ola-bartosz": 4, "natalia-blazej": 4 };

const PARY: Album[] = data.map((a) => ({ name: a.name, cover: a.pics[COVER[a.slug] ?? 0].src, pics: a.pics.map((p) => ({ src: p.src })) }));

export default function Galeria() {
  return (
    <>
      <PageHero img="/img/intro-06.webp" alt="Para młoda wśród brzóz o zachodzie słońca" eyebrow="Wesela w Avocado" title="Galeria" />
      <section className="sec">
        <div className="wrap"><Albums albums={PARY} /></div>
      </section>
      <CtaBand title={<>Wyobrażacie już sobie<br />Wasze wesele?</>} text="Spotkajmy się i porozmawiajmy o szczegółach. Pokażemy Wam nasze miejsce i poznamy Wasze pomysły." okazja="Wesele" button="Zacznij planować" />
    </>
  );
}
