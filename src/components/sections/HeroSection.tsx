"use client";

import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { HERO_CONTENT, TYPEWRITER_ROLES } from "@/lib/constants";
import { useState, useEffect, useRef } from "react";

// ============================================================
// HeroSection — Spring Text Reveal + Cursor Glow + Scroll Parallax
// Inspired by 21st.dev Animated Heroes
// ============================================================

const LETTER_COLORS = ["#2563ff", "#ff4757", "#48ff91", "#ffc23a", "#ff2d87"];

function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 hidden md:block"
      style={{
        x: springX,
        y: springY,
        width: 400,
        height: 400,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, rgba(37,99,255,0.08) 0%, transparent 70%)",
        borderRadius: "50%",
      }}
    />
  );
}

function FloatingShape({ delay, x, y, size, color }: { delay: number; x: string; y: string; size: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      animate={{
        y: [0, -20, 0, 15, 0],
        x: [0, 10, -5, 8, 0],
        scale: [1, 1.05, 0.97, 1.02, 1],
      }}
      transition={{
        duration: 12 + delay * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-triggered fade out
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  // Typewriter
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

  // Stagger animation variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1.2,
      },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <CursorGlow />

      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingShape delay={0} x="-5%" y="15%" size={400} color="rgba(37,99,255,0.07)" />
        <FloatingShape delay={2} x="75%" y="60%" size={350} color="rgba(255,71,87,0.06)" />
        <FloatingShape delay={4} x="50%" y="10%" size={250} color="rgba(72,255,145,0.04)" />
        <FloatingShape delay={6} x="20%" y="70%" size={200} color="rgba(255,194,58,0.05)" />

        {/* Particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${12 + i * 11}%`,
              top: `${20 + (i * 17) % 60}%`,
              background: LETTER_COLORS[i % LETTER_COLORS.length],
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content with scroll parallax */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative z-10 max-w-[1200px] mx-auto px-6 w-full"
      >
        <div className="flex flex-col items-center text-center">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-label mb-8"
          >
            — Portfolio 2026 —
          </motion.p>

          {/* Multi-color Name — Spring Physics per letter */}
          <div className="flex gap-2 md:gap-5 mb-6">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 100, rotateX: -90, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.2 + i * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                }}
                whileHover={{
                  scale: 1.15,
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                style={{ color: LETTER_COLORS[i], display: "inline-block" }}
                className="font-heading text-[56px] sm:text-[72px] md:text-[110px] lg:text-[140px] font-bold leading-none cursor-default"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Staggered content entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            {/* Headline */}
            <motion.h1
              variants={fadeUpVariant}
              className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-text mb-4 max-w-2xl leading-snug"
            >
              Mengubah masalah kompleks menjadi{" "}
              <span className="gradient-text-animated">solusi yang jelas</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={fadeUpVariant} className="h-8 flex items-center justify-center mb-8">
              <span className="font-mono text-base md:text-lg text-text-muted tracking-widest">
                {displayText}
              </span>
              <motion.span
                className="w-[2px] h-5 bg-coral ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUpVariant}
              className="font-mono text-sm text-text-muted max-w-lg leading-relaxed mb-10"
            >
              {HERO_CONTENT.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.06, boxShadow: "0 0 30px rgba(37,99,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="px-8 py-3.5 rounded-full bg-blue text-white font-heading font-semibold text-sm tracking-wide shadow-lg shadow-blue/25"
              >
                Lihat Karya Saya
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.06, borderColor: "rgba(255,71,87,0.5)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="px-8 py-3.5 rounded-full border border-border text-text-muted hover:text-text font-heading font-semibold text-sm tracking-wide transition-colors"
              >
                Hubungi Saya
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-text-dim uppercase tracking-[0.3em]">
            Scroll
          </span>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-blue/50 to-transparent"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
