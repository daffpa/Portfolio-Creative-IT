"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ABOUT_CONTENT } from "@/lib/constants";

// ============================================================
// AboutSection — Narrative Bio + Animated Counters (Ringkas)
// ============================================================

function useCounter(end: number, duration: number = 2000, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, duration, inView]);

  return count;
}

function StatCard({ value, suffix, label, color }: { value: number; suffix: string; label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCounter(value, 2000, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center px-4 py-5 glass-card rounded-xl"
    >
      <div className="font-heading text-3xl md:text-4xl font-bold mb-1" style={{ color }}>
        {count}{suffix}
      </div>
      <div className="font-mono text-xs text-text-muted uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

const STAT_COLORS = ["#2563ff", "#ff4757", "#48ff91", "#ffc23a"];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-section">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-4"
        >
          01 — Tentang Saya
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-5xl font-bold text-text mb-12 leading-tight max-w-3xl"
        >
          Bukan hanya analis.{" "}
          <span style={{ color: "#2563ff" }}>Bukan hanya desainer.</span>{" "}
          <span style={{ color: "#ff4757" }}>Jembatan</span> di antara keduanya.
        </motion.h2>

        {/* Bio + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Bio — takes 3 columns */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-sm md:text-base text-text-muted leading-[1.9] whitespace-pre-line">
              {ABOUT_CONTENT.bio}
            </p>
          </motion.div>

          {/* Stats — takes 2 columns */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {ABOUT_CONTENT.stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                color={STAT_COLORS[i % STAT_COLORS.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
