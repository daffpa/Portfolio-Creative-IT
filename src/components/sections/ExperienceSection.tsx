"use client";

import { motion } from "framer-motion";
import { EDUCATION, EXPERIENCE } from "@/lib/constants";

// ============================================================
// ExperienceSection — Timeline Cards + Education
// Inspired by 21st.dev Features sections
// ============================================================

const TYPE_COLORS = {
  kerja: "#2563ff",
  organisasi: "#48ff91",
} as const;

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-section">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-label mb-4"
        >
          02 — Pengalaman
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="font-heading text-3xl md:text-5xl font-bold text-text mb-4 leading-tight"
        >
          Perjalanan{" "}
          <span style={{ color: "#ffc23a" }}>karir</span> &{" "}
          <span style={{ color: "#2563ff" }}>pendidikan</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-mono text-sm text-text-muted max-w-xl mb-14"
        >
          Dari SMK Multimedia hingga Universitas Bakrie, dari intern Art Director hingga Humas Himpunan — setiap langkah membentuk siapa saya hari ini.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Experience Timeline */}
          <div className="lg:col-span-3">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-heading text-lg font-bold text-text mb-8 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl" style={{ color: "#ff4757" }}>
                work
              </span>
              Pengalaman Kerja & Organisasi
            </motion.h3>

            <div className="relative pl-8 border-l border-border/50">
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    delay: i * 0.12,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="relative mb-10 last:mb-0"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute -left-[41px] top-1 w-4 h-4 rounded-full border-2"
                    style={{
                      borderColor: TYPE_COLORS[exp.type],
                      background: `${TYPE_COLORS[exp.type]}25`,
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.2, type: "spring", stiffness: 300, damping: 15 }}
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{
                      borderColor: `${TYPE_COLORS[exp.type]}40`,
                      boxShadow: `0 0 25px -8px ${TYPE_COLORS[exp.type]}20`,
                    }}
                    className="glass-card p-5 rounded-xl transition-colors"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider border"
                        style={{
                          color: TYPE_COLORS[exp.type],
                          borderColor: `${TYPE_COLORS[exp.type]}40`,
                          background: `${TYPE_COLORS[exp.type]}10`,
                        }}
                      >
                        {exp.type === "kerja" ? "Kerja" : "Organisasi"}
                      </span>
                      <span className="font-mono text-[11px] text-text-dim">
                        {exp.period}
                      </span>
                    </div>
                    <h4 className="font-heading text-base font-bold text-text mb-0.5">
                      {exp.role}
                    </h4>
                    <p className="font-mono text-xs text-text-muted mb-2" style={{ color: TYPE_COLORS[exp.type] }}>
                      {exp.organization}
                    </p>
                    <p className="font-mono text-xs text-text-dim leading-relaxed">
                      {exp.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Education */}
          <div className="lg:col-span-2">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-heading text-lg font-bold text-text mb-8 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl" style={{ color: "#ffc23a" }}>
                school
              </span>
              Pendidikan
            </motion.h3>

            <div className="space-y-5">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.15,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  whileHover={{
                    borderColor: "rgba(255,194,58,0.4)",
                    boxShadow: "0 0 25px -8px rgba(255,194,58,0.2)",
                  }}
                  className="glass-card p-5 rounded-xl transition-colors"
                >
                  <span className="font-mono text-[11px] text-text-dim">
                    {edu.period}
                  </span>
                  <h4 className="font-heading text-base font-bold text-text mt-1 mb-0.5">
                    {edu.institution}
                  </h4>
                  <p className="font-mono text-xs mb-2" style={{ color: "#ffc23a" }}>
                    {edu.degree}
                  </p>
                  <p className="font-mono text-xs text-text-dim leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
