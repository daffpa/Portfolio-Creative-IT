"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import GlowButton from "../ui/GlowButton";
import {
  HERO_CONTENT,
  TYPEWRITER_ROLES,
  PARTICLE_CONFIG,
} from "@/lib/constants";

// Dynamic Three.js import to avoid SSR
const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-primary" />,
});

// ============================================================
// Typewriter Hook
// ============================================================

function useTypewriter(phrases: readonly string[]) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");

  const phrase = phrases[phraseIdx];

  const tick = useCallback(() => {
    if (!isDeleting) {
      setText(phrase.slice(0, charIdx + 1));
      setCharIdx((p) => p + 1);
      if (charIdx + 1 >= phrase.length) {
        setTimeout(() => setIsDeleting(true), 2200);
        return;
      }
    } else {
      setText(phrase.slice(0, charIdx - 1));
      setCharIdx((p) => p - 1);
      if (charIdx <= 1) {
        setIsDeleting(false);
        setCharIdx(0);
        setPhraseIdx((p) => (p + 1) % phrases.length);
        return;
      }
    }
  }, [charIdx, isDeleting, phrase, phrases.length]);

  useEffect(() => {
    const speed = isDeleting ? 35 : 70;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return text;
}

// ============================================================
// Container animation variants
// ============================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

// ============================================================
// HeroSection
// ============================================================

export default function HeroSection() {
  const typewriterText = useTypewriter(TYPEWRITER_ROLES);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(6,182,212,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Dot grid subtle overlay */}
      <div className="absolute inset-0 z-[1] dot-grid opacity-40 pointer-events-none" aria-hidden="true" />

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting tag */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] font-mono text-xs text-text-secondary tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-[glow-pulse_3s_ease-in-out_infinite]" />
            {HERO_CONTENT.greeting}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 variants={itemVariants} className="mb-2">
          <span className="gradient-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            {HERO_CONTENT.name}
          </span>
        </motion.h1>

        {/* Headline */}
        <motion.p
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight leading-[1.15] mb-5 whitespace-pre-line"
        >
          {HERO_CONTENT.headline}
        </motion.p>

        {/* Typewriter */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-8">
          <span className="font-mono text-text-muted text-sm">{">"}</span>
          <span className="font-mono text-accent-cyan text-base md:text-lg">
            {typewriterText}
          </span>
          <motion.span
            className="inline-block w-[2px] h-5 bg-accent-cyan rounded-sm"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {HERO_CONTENT.subheadline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GlowButton href={HERO_CONTENT.cta.href} variant="primary">
            {HERO_CONTENT.cta.label}
          </GlowButton>
          <GlowButton href={HERO_CONTENT.ctaSecondary.href} variant="secondary">
            {HERO_CONTENT.ctaSecondary.label}
          </GlowButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="font-mono text-[10px] text-text-muted tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5"
          aria-hidden="true"
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-accent-violet"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
