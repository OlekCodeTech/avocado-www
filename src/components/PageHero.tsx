"use client";

import { motion } from "motion/react";
import { asset } from "@/lib/asset";

/** Nagłówek podstrony: zdjęcie, etykieta, tytuł, lead. */
export default function PageHero({
  img,
  alt,
  eyebrow,
  title,
  lead,
  children,
  pos,
}: {
  img: string;
  alt: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  children?: React.ReactNode;
  pos?: string;
}) {
  return (
    <section className="hero hero--page">
      <motion.img
        src={asset(img)}
        alt={alt}
        className="hero__img"
        style={pos ? { objectPosition: pos } : undefined}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "linear" }}
        fetchPriority="high"
      />
      <div className="hero__shade" />
      <div className="hero__txt">
        <motion.p className="eyebrow eyebrow--light" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}>
          {eyebrow}
        </motion.p>
        <h1>
          <span className="line">
            <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
              {title}
            </motion.span>
          </span>
        </h1>
        {lead && (
          <motion.p className="hero__lead" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}>
            {lead}
          </motion.p>
        )}
        {children && (
          <motion.div className="btns" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
