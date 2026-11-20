import Link from "next/link";
import { asset } from "@/lib/asset";

export type Album = { slug: string; name: string; cover: string };

/** Lista galerii par (wzór: villa-love.pl): podłużna okładka, po najechaniu beżowy prostokąt
 *  z imionami w dwóch wierszach i kreską po lewej; kliknięcie prowadzi na osobną podstronę pary. */
export default function Albums({ albums }: { albums: Album[] }) {
  return (
    <div className="albums">
      {albums.map((a) => {
        const [first, second] = a.name.split(" & ");
        return (
          <Link key={a.slug} href={`/galeria/${a.slug}/`} className="album" style={{ backgroundImage: `url(${asset(a.cover)})` }} aria-label={`Galeria: ${a.name}`}>
            <span className="album__box">
              <span className="album__title">
                {first}
                {second && <><br />&amp; {second}</>}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
