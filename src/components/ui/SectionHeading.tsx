"use client";

import { motion } from "framer-motion";

// ============================================================
// SectionHeading — Reusable section title with mono label
// ============================================================

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      className={`flex flex-col gap-3 mb-12 md:mb-16 ${alignment}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Mono label */}
      <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent-violet">
        {label}
      </span>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
        {title}
      </h2>

      {/* Optional description */}
      {description && (
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mt-1 leading-relaxed">
          {description}
        </p>
      )}

      {/* Gradient line */}
      <div className="mt-2 flex items-center gap-3">
        <div className="h-px w-12 bg-gradient-to-r from-accent-violet to-accent-cyan" />
        <div className="h-1 w-1 rounded-full bg-accent-cyan" />
      </div>
    </motion.div>
  );
}
