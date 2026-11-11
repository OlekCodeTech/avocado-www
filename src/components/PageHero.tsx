"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { asset } from "@/lib/asset";

/** Nagłówek podstrony: zmieniające się zdjęcia, tytuł, lead, przyciski, a pod nimi etykieta. */
export default function PageHero({
  img,
  more = [],
  alt,
  eyebrow,
  title,
  lead,
  children,
  pos,
}: {
  img: string;
  more?: string[];
  alt: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  children?: React.ReactNode;
  pos?: string;
}) {
  const imgs = [img, ...more];
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || imgs.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % imgs.length), 5000);
    return () => clearInterval(t);
  }, [reduce, imgs.length]);

  return (
    <section className="hero hero--page">
      <AnimatePresence initial={false}>
        <motion.img
          key={imgs[i]}
          src={asset(imgs[i])}
          alt={i === 0 ? alt : ""}
          className="hero__img"
          style={pos && i === 0 ? { objectPosition: pos } : undefined}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: "linear" } }}
          fetchPriority={i === 0 ? "high" : "auto"}
        />
      </AnimatePresence>
      <div className="hero__shade" />
      <div className="hero__txt">
        <h1>
          <span className="line">
            <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
              {title}
            </motion.span>
          </span>
        </h1>
        {lead && (
          <motion.p className="hero__lead" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
            {lead}
          </motion.p>
        )}
        {children && (
          <motion.div className="btns" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
            {children}
          </motion.div>
        )}
        <motion.p className="eyebrow eyebrow--light hero__tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}>
          {eyebrow}
        </motion.p>
      </div>
    </section>
  );
}
