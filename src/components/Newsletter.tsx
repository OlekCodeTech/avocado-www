"use client";

import { useState } from "react";
import Link from "next/link";
import { sendForm } from "@/lib/send";

/** Zapis na powiadomienia o wydarzeniach – wysyła e-mail do Avocado przez send.php. */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "ok" | "demo" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setState("busy");
    setState(await sendForm({ form: "newsletter", email, company_website: hp }));
  };

  if (state === "ok" || state === "demo") {
    return <p className="newsletter__ok">Dziękujemy! Damy znać, gdy ogłosimy nowy termin.{state === "demo" ? " (podgląd – nic nie zostało wysłane)" : ""}</p>;
  }
  return (
    <form className="newsletter__form" onSubmit={submit}>
      <input type="email" required placeholder="Twój adres e-mail" aria-label="Adres e-mail" className="inp inp--light" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" value={hp} onChange={(e) => setHp(e.target.value)} />
      <button type="submit" className="btn" disabled={state === "busy"}>{state === "busy" ? "Wysyłamy…" : "Zapisz się"}</button>
      <p className="newsletter__info">
        {state === "error" ? "Nie udało się wysłać – spróbujcie jeszcze raz albo zadzwońcie. " : ""}
        Zapisując się, zgadzasz się na powiadomienia e-mail o wydarzeniach Avocado. <Link href="/polityka-prywatnosci/">Polityka prywatności</Link>
      </p>
    </form>
  );
}
