import { asset } from "./asset";

/** Czy strona działa na docelowej domenie (tylko tam formularz naprawdę wysyła, a piksel się ładuje). */
export const isLive = () => typeof window !== "undefined" && /(^|\.)restauracjaavocado\.pl$/.test(window.location.hostname);

const opened = typeof window !== "undefined" ? Date.now() : 0;

/** Wysyła zgłoszenie do send.php. Poza domeną docelową działa w trybie pokazowym (nic nie wysyła). */
export async function sendForm(data: Record<string, unknown>): Promise<"ok" | "demo" | "error"> {
  if (!isLive()) return "demo";
  try {
    const r = await fetch(asset("/send.php"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, fill_seconds: Math.round((Date.now() - opened) / 1000), page: window.location.href }),
    });
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.ok) {
      (window as unknown as { avoLead?: () => void }).avoLead?.();
      return "ok";
    }
    return "error";
  } catch {
    return "error";
  }
}
