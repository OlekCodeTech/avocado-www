import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Albums, { type Album } from "@/components/Albums";
import CtaBand from "@/components/CtaBand";
import data from "@/lib/albums.json";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Galeria Avocado koło Sieradza: wesela, przyjęcia rodzinne, imprezy firmowe i wydarzenia otwarte w sali bankietowej, sali plenerowej i ogrodzie.",
};

const img = (names: string[]) => names.map((n) => ({ src: `/img/${n}.webp` }));
const COVER: Record<string, number> = { "michalina-michal": 12, "gabi-kuba": 9, "a-j": 9, "n-k": 3, "paulina-igor": 1, "sabina-nick": 1, "ola-bartosz": 4, "natalia-blazej": 4 };

const WESELA: Album[] = data.map((a) => ({ name: a.name, sub: a.sub, cover: a.pics[COVER[a.slug] ?? 0].src, pics: a.pics.map((p) => ({ src: p.src })) }));

WESELA.push({ name: "Ślub w ogrodzie", sub: "Ceremonie plenerowe", cover: "/img/ceremonia-goscie.webp", pics: img(["ceremonia-goscie", "slub-1", "slub-2", "slub-3", "slub-4", "slub-5", "slub-6", "slub-7", "slub-8", "slub-9", "nw-1", "ceremonia-las", "pl-cer-2", "pl-cer-3", "intro-06"]) });

const PRZYJECIA: Album[] = [
  { name: "Chrzciny i roczki", cover: "/img/of-przyjecia.webp", pics: img(["of-przyjecia", "gchr-1", "gchr-2", "gchr-3", "gchr-4", "gchr-5", "gchr-6", "chr-1", "roc-3", "roc-2"]) },
  { name: "Komunie", cover: "/img/gkom-0.webp", pics: img(["gkom-0", "gkom-1", "gkom-2", "gkom-3", "gkom-4", "gkom-5", "gkom-6", "kom-5", "kom-7", "komunia-stoly", "komunia-desery"]) },
  { name: "18-stka", sub: "Sala bankietowa", cover: "/img/g18-2.webp", pics: img(["g18-1", "g18-2", "g18-3", "g18-4", "g18-5", "g18-6", "g18-7", "g18-8", "g18-9", "g18b-1", "g18b-2", "g18b-3", "g18b-4", "g18b-5", "g18b-6", "g18b-7", "g18b-8"]) },
  { name: "30-tka", sub: "Sala plenerowa", cover: "/img/g30-5.webp", pics: img(["g30-5", "g30-1", "g30-2", "g30-3", "g30-4", "g30-6", "g30-7", "g30-8"]) },
  { name: "Urodziny", sub: "Sala bankietowa", cover: "/img/gsb-136.webp", pics: img(["gsb-136", "gsb-130", "gsb-131", "gsb-132", "gsb-133", "gsb-134", "gsb-135", "gsb-137", "gsb-138", "gsb-139", "gsb-140", "gsb-141"]) },
  { name: "25-lecie firmy", sub: "Impreza firmowa", cover: "/img/of-firma.webp", pics: img(["of-firma", "gf-10", "gf-12", "gf-13", "gf-19", "gf-26", "gf-44", "gf-45", "gf-46", "gf-35", "gf-165", "gf-214", "gf-226", "gf-116", "gf-1"]) },
];

const WYDARZENIA: Album[] = [
  { name: "Kobieciarnia", cover: "/img/kobieciarnia-sala.webp", pics: img(["kobieciarnia-sala", "kobieciarnia", "kobieciarnia-drinki", "kobieciarnia-taniec", "kobieciarnia-goscie", "kob-5", "kob-6", "kob-7", "kob-9", "of-wydarzenia"]) },
  { name: "Kolacja walentynkowa", cover: "/img/walentynki.webp", pics: img(["walentynki", "walentynki-danie", "walentynki-kuchnia", "walentynki-stol", "wal-5", "wal-7", "wal-8", "wal-10"]) },
  { name: "Kolacja degustacyjna", cover: "/img/degust-sala.webp", pics: img(["degust-sala", "degust-sos", "degust-talerze", "degust-desery", "dg-5", "dg-6", "dg-7", "dg-8"]) },
];

export default function Galeria() {
  return (
    <>
      <PageHero img="/img/intro-06.webp" more={["/img/intro-08.webp", "/img/intro-03.webp"]} alt="Para młoda wśród brzóz o zachodzie słońca" eyebrow="Galeria" title="Tak u nas świętujecie" lead="Wesela, rodzinne przyjęcia, spotkania firmowe i wydarzenia otwarte. Najedźcie na zdjęcie i zajrzyjcie do środka." />
      <section className="sec" id="wesela">
        <div className="wrap"><Reveal className="head"><p className="eyebrow">Galeria</p><h2>Wesela</h2></Reveal><Albums albums={WESELA} /></div>
      </section>
      <section className="sec sec--sand" id="przyjecia">
        <div className="wrap"><Reveal className="head"><p className="eyebrow">Galeria</p><h2>Przyjęcia i spotkania firmowe</h2></Reveal><Albums albums={PRZYJECIA} /></div>
      </section>
      <section className="sec" id="wydarzenia">
        <div className="wrap"><Reveal className="head"><p className="eyebrow">Galeria</p><h2>Wydarzenia otwarte</h2></Reveal><Albums albums={WYDARZENIA} /></div>
      </section>
      <CtaBand title={<>Wyobrażacie już sobie<br />swoje przyjęcie?</>} text="Spotkajmy się i porozmawiajmy o szczegółach. Pokażemy Wam nasze miejsce i poznamy Wasze pomysły." button="Zacznij planować" />
    </>
  );
}
