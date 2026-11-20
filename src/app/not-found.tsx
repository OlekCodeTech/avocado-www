import Link from "next/link";

export default function NotFound() {
  return (
    <section className="legal">
      <div className="wrap legal__in nf">
        <p className="eyebrow">Błąd 404</p>
        <h1>Tej strony nie ma</h1>
        <p>Możliwe, że adres się zmienił – mamy nową stronę. Zacznijcie od strony głównej albo napiszcie do nas.</p>
        <div className="btns btns--top">
          <Link href="/" className="btn">Strona główna</Link>
          <Link href="/kontakt/" className="btn btn--ghost-dark">Kontakt</Link>
        </div>
      </div>
    </section>
  );
}
