"use client";

import { motion } from "framer-motion";

// ============================================================
// GlassCard — Reusable glassmorphism container (redesigned)
// ============================================================

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  padding = "md",
}: GlassCardProps) {
  const paddings = {
    none: "",
    sm: "p-4 md:p-5",
    md: "p-5 md:p-7",
    lg: "p-7 md:p-10",
  };

  return (
    <motion.div
      className={`
        glass-card ${paddings[padding]}
        ${hover ? "" : "hover:transform-none hover:shadow-none hover:border-glass-border"}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
