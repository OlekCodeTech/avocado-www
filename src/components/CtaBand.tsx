import Link from "next/link";
import { CONTACT, planHref } from "@/lib/asset";
import Reveal from "./Reveal";

/** Pasek zachęty na końcu podstron – prowadzi do planera z wybraną okazją. */
export default function CtaBand({
  title,
  text,
  okazja,
  extra,
  button = "Zapytaj o termin",
  noTel = false,
}: {
  title: React.ReactNode;
  text?: string;
  okazja?: string;
  extra?: Record<string, string>;
  button?: string;
  /** bez „lub zadzwoń” po prawej (gdy numer jest już w tekście) */
  noTel?: boolean;
}) {
  return (
    <section className="band">
      <Reveal className="wrap band__in">
        <div>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <div className="band__act">
          <Link href={planHref(okazja, extra)} className="btn btn--light">{button}</Link>
          {!noTel && <a href={CONTACT.phoneHref} className="band__tel">lub zadzwoń: {CONTACT.phone}</a>}
        </div>
      </Reveal>
    </section>
  );
}
