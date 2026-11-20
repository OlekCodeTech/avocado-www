"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

/** Zapętlony klip: gra bez dźwięku, gdy jest widoczny; kliknięcie włącza / wyłącza dźwięk
 *  (naraz gra z dźwiękiem tylko jeden klip na stronie). */
export default function Clip({ name, label, className = "" }: { name: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else {
        v.pause();
        v.muted = true;
        setSound(false);
      }
    }, { threshold: 0.35 });
    io.observe(v);
    const onOther = (e: Event) => {
      if ((e as CustomEvent<HTMLVideoElement>).detail !== v) {
        v.muted = true;
        setSound(false);
      }
    };
    window.addEventListener("avo:sound", onOther);
    return () => {
      io.disconnect();
      window.removeEventListener("avo:sound", onOther);
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    const on = v.muted;
    v.muted = !on;
    setSound(on);
    if (on) {
      window.dispatchEvent(new CustomEvent("avo:sound", { detail: v }));
      v.play().catch(() => {});
    }
  };

  return (
    <span className={`clipbox ${className}`}>
      <video ref={ref} className="clip" muted loop playsInline preload="none" poster={asset(`/video/${name}.jpg`)} aria-label={label} onClick={toggle}>
        <source src={asset(`/video/${name}.mp4`)} type="video/mp4" />
      </video>
      <button type="button" className={`clip__sound${sound ? " is-on" : ""}`} onClick={toggle} aria-pressed={sound} aria-label={sound ? "Wyłącz dźwięk" : "Włącz dźwięk"}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
          {sound ? <><path d="M15.5 9a4.2 4.2 0 0 1 0 6" /><path d="M18 6.5a7.6 7.6 0 0 1 0 11" /></> : <><path d="M16 9.5l5 5" /><path d="M21 9.5l-5 5" /></>}
        </svg>
        <span>{sound ? "Dźwięk włączony" : "Włącz dźwięk"}</span>
      </button>
    </span>
  );
}
