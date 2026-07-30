"use client";

import { motion } from "framer-motion";

// ============================================================
// GlowButton — Creative-Tech styled CTA button
// ============================================================

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

export default function GlowButton({
  children,
  href = "#",
  variant = "primary",
  className = "",
  onClick,
}: GlowButtonProps) {
  const isPrimary = variant === "primary";

  const base = `
    relative inline-flex items-center justify-center gap-2
    px-7 py-3 rounded-full font-medium text-sm tracking-wide
    overflow-hidden cursor-pointer
    transition-all duration-300 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet/50
  `;

  const variants = isPrimary
    ? `
      bg-gradient-to-r from-accent-violet to-accent-indigo text-white
      hover:shadow-[0_0_25px_rgba(139,92,246,0.35)]
      hover:scale-[1.03]
      active:scale-[0.97]
    `
    : `
      border border-white/10 text-text-secondary bg-white/[0.03]
      hover:border-accent-violet/30 hover:text-text-primary hover:bg-white/[0.06]
      hover:scale-[1.03]
      active:scale-[0.97]
    `;

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`${base} ${variants} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Shimmer overlay for primary */}
      {isPrimary && (
        <span
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        >
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
              animation: "shimmer 2s ease-in-out infinite",
            }}
          />
        </span>
      )}

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
