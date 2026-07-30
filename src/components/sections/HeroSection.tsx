"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT, TYPEWRITER_ROLES } from "@/lib/constants";
import { useState, useEffect } from "react";

// ============================================================
// HeroSection — Midnight Gradient: Text Reveal + Gradient Orb
// ============================================================

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const currentRole = TYPEWRITER_ROLES[roleIndex];
    let charIndex = 0;

    if (isTyping) {
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
        setDisplayText((prev) => prev.slice(0, -1));
        charIndex--;
        if (displayText.length <= 1) {
          clearInterval(deleteTimer);
          setRoleIndex((prev) => (prev + 1) % TYPEWRITER_ROLES.length);
          setIsTyping(true);
        }
      }, 40);
      return () => clearInterval(deleteTimer);
    }
  }, [roleIndex, isTyping, displayText.length]);

  // Letter-by-letter animation for name
  const nameLetters = "DAFFA".split("");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Orb Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,92,255,0.15) 0%, rgba(0,212,255,0.05) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: ["-50%", "-45%", "-55%", "-50%"],
            y: ["-50%", "-55%", "-45%", "-50%"],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,157,0.1) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${8 + i * 8}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
              background:
                i % 3 === 0
                  ? "var(--color-accent)"
                  : i % 3 === 1
                    ? "var(--color-accent-cyan)"
                    : "var(--color-accent-pink)",
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Section Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-label mb-6"
          >
            — Portfolio 2024 —
          </motion.p>

          {/* Name with letter animation */}
          <div className="flex gap-2 md:gap-4 mb-4">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.4 + i * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-heading text-[64px] sm:text-[80px] md:text-[120px] lg:text-[150px] font-black leading-none gradient-text-animated"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Typewriter Role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="h-10 flex items-center justify-center mb-8"
          >
            <span className="font-mono text-lg md:text-xl text-accent-light tracking-widest">
              {displayText}
            </span>
            <span className="w-[2px] h-6 bg-accent-cyan ml-1 animate-pulse" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="font-mono text-sm md:text-base text-text-muted max-w-xl leading-relaxed mb-10"
          >
            {HERO_CONTENT.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-accent to-accent-cyan text-white font-heading font-semibold text-sm tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-shadow"
            >
              Lihat Karya Saya
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full border border-border hover:border-accent/40 text-text-muted hover:text-text font-heading font-semibold text-sm tracking-wide transition-all"
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
          <div className="w-[1px] h-8 bg-gradient-to-b from-accent/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
