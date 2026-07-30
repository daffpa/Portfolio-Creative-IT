"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ABOUT_CONTENT } from "@/lib/constants";
import { skillGroups } from "@/data/skills";

// ============================================================
// AboutSection — Animated Counters + Marquee Skills
// ============================================================

// Animated counter hook
function useCounter(end: number, duration: number = 2000, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    let start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [end, duration, inView]);

  return count;
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
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
      className="text-center px-6 py-4"
    >
      <div className="font-heading text-4xl md:text-5xl font-black gradient-text mb-2">
        {count}{suffix}
      </div>
      <div className="font-mono text-xs text-text-muted uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const allSkills = skillGroups.flatMap((g) => g.skills);

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
          className="font-heading text-3xl md:text-5xl font-bold text-text mb-12 leading-tight max-w-2xl"
        >
          Membangun pengalaman digital yang{" "}
          <span className="gradient-text">fungsional & estetis</span>
        </motion.h2>

        {/* Bio + Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-sm md:text-base text-text-muted leading-[1.8] whitespace-pre-line">
              {ABOUT_CONTENT.bio}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {ABOUT_CONTENT.stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>

        {/* Skills Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden py-8 border-y border-border"
        >
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10" />

          <div className="marquee-track flex gap-8 whitespace-nowrap w-max">
            {/* Duplicate for infinite loop */}
            {[...allSkills, ...allSkills].map((skill, i) => (
              <div
                key={`${skill.name}-${i}`}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border hover:border-accent/30 transition-all duration-300 group cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-accent group-hover:bg-accent-cyan transition-colors" />
                <span className="font-mono text-sm text-text-muted group-hover:text-text transition-colors">
                  {skill.name}
                </span>
                <span className="font-mono text-[10px] text-text-dim">
                  {skill.level}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
