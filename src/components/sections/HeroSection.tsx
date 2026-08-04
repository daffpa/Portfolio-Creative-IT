"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT, TYPEWRITER_ROLES } from "@/lib/constants";
import { useState, useEffect } from "react";

// ============================================================
// HeroSection — Bold Multi-Color Letters + Statement
// ============================================================

const LETTER_COLORS = ["#2563ff", "#ff4757", "#48ff91", "#ffc23a", "#ff2d87"];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentRole = TYPEWRITER_ROLES[roleIndex];

    if (isTyping) {
      let charIndex = 0;
      const typeTimer = setInterval(() => {
        setDisplayText(currentRole.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex >= currentRole.length) {
          clearInterval(typeTimer);
          setTimeout(() => setIsTyping(false), 1500);
        }
      }, 80);
      return () => clearInterval(typeTimer);
    } else {
      const deleteTimer = setInterval(() => {
        setDisplayText((prev) => {
          if (prev.length <= 1) {
            clearInterval(deleteTimer);
            setRoleIndex((p) => (p + 1) % TYPEWRITER_ROLES.length);
            setIsTyping(true);
            return "";
          }
          return prev.slice(0, -1);
        });
      }, 40);
      return () => clearInterval(deleteTimer);
    }
  }, [roleIndex, isTyping]);

  const nameLetters = "DAFFA".split("");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Bold color blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bold-blob w-[500px] h-[500px] bg-blue top-[10%] left-[-10%]" style={{ background: "rgba(37,99,255,0.12)" }} />
        <div className="bold-blob w-[400px] h-[400px] top-[60%] right-[-5%]" style={{ background: "rgba(255,71,87,0.1)" }} />
        <div className="bold-blob w-[300px] h-[300px] top-[20%] right-[20%]" style={{ background: "rgba(72,255,145,0.06)" }} />

        {/* Particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${10 + i * 9}%`,
              animationDelay: `${i * 1.8}s`,
              animationDuration: `${9 + ((i * 3) % 6)}s`,
              background: LETTER_COLORS[i % LETTER_COLORS.length],
              width: `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-label mb-8"
          >
            — Portfolio 2026 —
          </motion.p>

          {/* Multi-color Name */}
          <div className="flex gap-2 md:gap-5 mb-6">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotate: -15 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ color: LETTER_COLORS[i] }}
                className="font-heading text-[56px] sm:text-[72px] md:text-[110px] lg:text-[140px] font-bold leading-none"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Bold headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-text mb-4 max-w-2xl leading-snug"
          >
            Mengubah masalah kompleks menjadi{" "}
            <span className="gradient-text-animated">solusi yang jelas</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="h-8 flex items-center justify-center mb-8"
          >
            <span className="font-mono text-base md:text-lg text-text-muted tracking-widest">
              {displayText}
            </span>
            <span className="w-[2px] h-5 bg-coral ml-1 animate-pulse" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="font-mono text-sm text-text-muted max-w-lg leading-relaxed mb-10"
          >
            {HERO_CONTENT.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full bg-blue text-white font-heading font-semibold text-sm tracking-wide shadow-lg shadow-blue/25 hover:shadow-blue/40 transition-shadow"
            >
              Lihat Karya Saya
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full border border-border hover:border-coral/40 text-text-muted hover:text-text font-heading font-semibold text-sm tracking-wide transition-all"
            >
              Hubungi Saya
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator"
        >
          <span className="font-mono text-[10px] text-text-dim uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-blue/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
