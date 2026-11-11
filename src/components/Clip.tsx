"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

/** Wyciszony, zapętlony klip – gra tylko wtedy, gdy jest widoczny na ekranie. */
export default function Clip({ name, label, className = "" }: { name: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={ref} className={`clip ${className}`} muted loop playsInline preload="none" poster={asset(`/video/${name}.jpg`)} aria-label={label}>
      <source src={asset(`/video/${name}.mp4`)} type="video/mp4" />
    </video>
  );
}
