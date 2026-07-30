"use client";

import { motion } from "framer-motion";

// ============================================================
// SkillRing — Circular SVG progress indicator
// ============================================================

interface SkillRingProps {
  name: string;
  level: number;
  index?: number;
}

export default function SkillRing({ name, level, index = 0 }: SkillRingProps) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      {/* Ring */}
      <div className="relative w-14 h-14 flex-shrink-0">
        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="url(#skill-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="skill-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        {/* Percentage text */}
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-text-secondary">
          {level}
        </span>
      </div>

      {/* Skill name */}
      <span className="text-sm text-text-primary">{name}</span>
    </motion.div>
  );
}
