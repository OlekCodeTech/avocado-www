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
}: {
  title: React.ReactNode;
  text?: string;
  okazja?: string;
  extra?: Record<string, string>;
  button?: string;
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
          <a href={CONTACT.phoneHref} className="band__tel">lub zadzwoń: {CONTACT.phone}</a>
        </div>
      </Reveal>
    </section>
  );
}
