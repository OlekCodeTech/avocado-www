"use client";

import { useEffect } from "react";

/** Polska typografia: jednoliterowe spójniki i przyimki (i, a, o, u, w, z) nie zostają na końcu wiersza –
 *  spacja po nich jest zamieniana na twardą. Działa na całej stronie, także po zmianie podstrony. */
const RE = /(^|[\s(„"])([aiouwzAIOUWZ]) (?=\S)/g;
const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"]);

function fix(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const n of nodes) {
    const p = n.parentElement;
    if (!p || SKIP.has(p.tagName) || p.closest(".leaflet-container")) continue;
    const t = n.nodeValue || "";
    if (!t.includes(" ")) continue;
    // dwa przebiegi, bo spójniki mogą stać obok siebie („a w”, „i z”)
    const out = t.replace(RE, "$1$2 ").replace(RE, "$1$2 ");
    if (out !== t) n.nodeValue = out;
  }
}

export default function Typo() {
  useEffect(() => {
    fix(document.body);
    const mo = new MutationObserver((list) => {
      for (const m of list) {
        if (m.type === "characterData") fix(m.target.parentNode || m.target);
        else m.addedNodes.forEach((n) => fix(n));
      }
    });
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => mo.disconnect();
  }, []);
  return null;
}
