"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ABOUT_CONTENT } from "@/lib/constants";

// ============================================================
// AboutSection — Scroll Line Reveal + Magnetic Stat Cards
// Inspired by 21st.dev Features sections
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

function MagneticStatCard({ value, suffix, label, color, index }: {
  value: number; suffix: string; label: string; color: string; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCounter(value, 2000, inView);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.1);
    y.set(dy * 0.1);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{
        borderColor: `${color}50`,
        boxShadow: `0 0 30px -8px ${color}30`,
      }}
      className="flex flex-col items-center justify-center text-center px-4 py-6 glass-card rounded-xl cursor-default transition-colors"
    >
      <motion.div
        className="font-heading text-3xl md:text-4xl font-bold mb-1"
        style={{ color }}
        animate={inView ? { scale: [1.2, 1] } : {}}
        transition={{ delay: index * 0.12 + 0.3, type: "spring", stiffness: 200, damping: 12 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="font-mono text-xs text-text-muted uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

const STAT_COLORS = ["#2563ff", "#ff4757", "#48ff91", "#ffc23a"];

export default function AboutSection() {
  const bioLines = ABOUT_CONTENT.bio.split("\n\n");

  return (
    <section id="about" className="relative py-section">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label mb-4"
        >
          01 — Tentang Saya
        </motion.p>

        {/* Heading with word-by-word reveal */}
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-3xl md:text-5xl font-bold text-text mb-12 leading-tight max-w-3xl"
        >
          Bukan hanya analis.{" "}
          <span style={{ color: "#2563ff" }}>Bukan hanya desainer.</span>{" "}
          <span style={{ color: "#ff4757" }}>Jembatan</span> di antara keduanya.
        </motion.h2>

        {/* Bio + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Bio — line-by-line reveal */}
          <div className="lg:col-span-3 space-y-6 flex flex-col justify-center">
            {bioLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-mono text-sm md:text-base text-text-muted leading-[1.9] text-justify md:text-left"
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Magnetic Stat Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {ABOUT_CONTENT.stats.map((stat, i) => (
              <MagneticStatCard
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                color={STAT_COLORS[i]}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
