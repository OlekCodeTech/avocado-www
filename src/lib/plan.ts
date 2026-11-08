import { asset, PLAN_EVENT, planHref } from "./asset";

/** Wybór okazji: na stronie z planerem przewija do niego, na innych przenosi do /kontakt. */
export function plan(type: string) {
  const el = document.getElementById("planer");
  if (el) {
    window.dispatchEvent(new CustomEvent(PLAN_EVENT, { detail: type }));
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = asset(planHref(type));
  }
}
