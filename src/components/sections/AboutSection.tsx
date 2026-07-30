"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { ABOUT_CONTENT } from "@/lib/constants";

// ============================================================
// Animated counter hook
// ============================================================

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span ref={ref} className="gradient-text-static text-3xl md:text-4xl font-bold">
      {count}{suffix}
    </span>
  );
}

// ============================================================
// AboutSection
// ============================================================

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 section-padding bg-bg-primary">
      {/* Subtle gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.04) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          label="// tentang saya"
          title="Who Am I?"
          description="Sedikit tentang diri saya dan perjalanan saya di dunia digital."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Bio - takes 3 cols */}
          <GlassCard className="lg:col-span-3" padding="lg">
            <div className="space-y-4">
              {ABOUT_CONTENT.bio.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-text-secondary text-sm md:text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tech stack badges */}
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <span className="font-mono text-xs text-text-muted tracking-wider uppercase block mb-4">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {ABOUT_CONTENT.techStack.map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1.5 rounded-full bg-accent-violet/[0.08] border border-accent-violet/[0.12] font-mono text-xs text-accent-violet/80 hover:bg-accent-violet/15 hover:text-accent-violet transition-colors cursor-default"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Stats - takes 2 cols */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {ABOUT_CONTENT.stats.map((stat, i) => (
              <GlassCard key={stat.label} padding="md" className="flex flex-col items-center justify-center text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <span className="text-text-muted text-xs md:text-sm mt-2 font-mono">
                  {stat.label}
                </span>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
