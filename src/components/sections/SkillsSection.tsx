"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { skillGroups } from "@/data/skills";

// ============================================================
// SkillsSection — 3D Tilt Cards + Animated Progress + Category Glow
// Inspired by 21st.dev Cards & Grids
// ============================================================

function TiltSkillCard({ group, index }: { group: typeof skillGroups[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  // 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / (rect.width / 2);
    const dy = (e.clientY - centerY) / (rect.height / 2);
    rotateX.set(-dy * 8);
    rotateY.set(dx * 8);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.12,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{
        borderColor: `${group.color}50`,
        boxShadow: `0 0 40px -10px ${group.color}30`,
      }}
      className={`glass-card ${group.colorClass} p-6 rounded-xl transition-colors will-change-transform`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${group.color}15` }}
          animate={inView ? {
            scale: [0.8, 1.1, 1],
            rotate: [0, 5, 0],
          } : {}}
          transition={{ delay: index * 0.12 + 0.3, duration: 0.5 }}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ color: group.color }}
          >
            {group.icon}
          </span>
        </motion.div>
        <div>
          <h3 className="font-heading text-lg font-bold text-text">
            {group.category}
          </h3>
          <p className="font-mono text-[11px] text-text-dim">
            {group.description}
          </p>
        </div>
      </div>

      {/* Skills with staggered progress bars */}
      <div className="space-y-3 mt-5">
        {group.skills.map((skill, si) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-1.5">
              <motion.span
                className="font-mono text-xs text-text-muted"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 + si * 0.06 }}
              >
                {skill.name}
              </motion.span>
              <span className="font-mono text-[10px] text-text-dim">
                {skill.level}%
              </span>
            </div>
            <div className="skill-progress">
              <motion.div
                className="skill-progress-fill"
                style={{ background: group.color }}
                initial={{ width: "0%" }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12 + si * 0.08 + 0.3,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-section">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-label mb-4"
        >
          03 — Kompetensi
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-3xl md:text-5xl font-bold text-text mb-4 leading-tight"
        >
          Keahlian{" "}
          <span style={{ color: "#48ff91" }}>lintas</span>{" "}
          <span style={{ color: "#ffc23a" }}>bidang</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-mono text-sm text-text-muted max-w-xl mb-12"
        >
          Dari desain grafis & branding hingga strategi media sosial dan leadership — dikelompokkan berdasarkan domain keahlian.
        </motion.p>

        {/* 3D Tilt Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: 1000 }}>
          {skillGroups.map((group, i) => (
            <TiltSkillCard key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
