"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillGroups } from "@/data/skills";

// ============================================================
// SkillsSection — Grouped Cards per Bidang + Progress Bars
// ============================================================

function SkillCard({ group, index }: { group: typeof skillGroups[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`glass-card ${group.colorClass} p-6 rounded-xl transition-all duration-400`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${group.color}15` }}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ color: group.color }}
          >
            {group.icon}
          </span>
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-text">
            {group.category}
          </h3>
          <p className="font-mono text-[11px] text-text-dim">
            {group.description}
          </p>
        </div>
      </div>

      {/* Skills with progress bars */}
      <div className="space-y-3 mt-5">
        {group.skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-mono text-xs text-text-muted">
                {skill.name}
              </span>
              <span className="font-mono text-[10px] text-text-dim">
                {skill.level}%
              </span>
            </div>
            <div className="skill-progress">
              <div
                className="skill-progress-fill"
                style={{
                  width: inView ? `${skill.level}%` : "0%",
                  background: group.color,
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-4"
        >
          02 — Kompetensi
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-5xl font-bold text-text mb-4 leading-tight"
        >
          Keahlian{" "}
          <span style={{ color: "#48ff91" }}>lintas</span>{" "}
          <span style={{ color: "#ffc23a" }}>bidang</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-text-muted max-w-xl mb-12"
        >
          Dari analisis proses bisnis hingga visualisasi data dan desain presentasi — dikelompokkan berdasarkan domain keahlian.
        </motion.p>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
