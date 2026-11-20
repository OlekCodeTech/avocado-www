import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AlbumPhotos from "@/components/AlbumPhotos";
import CtaBand from "@/components/CtaBand";
import { asset } from "@/lib/asset";
import data from "@/lib/albums.json";

export function generateStaticParams() {
  return data.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = data.find((x) => x.slug === slug);
  return a ? { title: `${a.name} – galeria`, description: `Wesele ${a.name} w Avocado koło Sieradza – galeria zdjęć.` } : {};
}

/** Podstrona jednej pary (wzór: villa-love.pl): baner z beżowym prostokątem i kreską, okruszki, zdjęcia. */
export default async function Para({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = data.find((x) => x.slug === slug);
  if (!a) notFound();
  const [first, second] = a.name.split(" & ");
  return (
    <>
      <section className="abanner" style={{ backgroundImage: `url(${asset(a.banner)})` }}>
        <h1 className="abanner__title">
          {first}
          {second && <><br />&amp; {second}</>}
        </h1>
      </section>
      <nav className="crumbs wrap" aria-label="Okruszki">
        <Link href="/">Strona główna</Link><span>/</span><Link href="/galeria/">Galeria</Link><span>/</span><b>{a.name}</b>
      </nav>
      <section className="asingle">
        <AlbumPhotos pics={a.pics} title={a.name} />
        <p className="asingle__back"><Link href="/galeria/" className="link">← Wszystkie galerie</Link></p>
      </section>
      <CtaBand title={<>Wyobrażacie już sobie<br />Wasze wesele?</>} text="Spotkajmy się i porozmawiajmy o szczegółach. Pokażemy Wam nasze miejsce i poznamy Wasze pomysły." okazja="Wesele" button="Zacznij planować" />
    </>
  );
}
