"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects, PROJECT_CATEGORIES, type ProjectCategory } from "@/data/projects";
import Link from "next/link";

// ============================================================
// ProjectsSection — Layout Animation Filter + Parallax Cards
// Inspired by 21st.dev Galleries
// ============================================================

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const getCategoryColor = (cat: string) =>
    PROJECT_CATEGORIES.find((c) => c.value === cat)?.color || "#f0f0f5";

  return (
    <section id="projects" className="relative py-section">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-label mb-4"
        >
          04 — Proyek
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-3xl md:text-5xl font-bold text-text mb-4 leading-tight"
        >
          Karya{" "}
          <span style={{ color: "#ff4757" }}>lintas</span>{" "}
          <span style={{ color: "#2563ff" }}>disiplin</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-text-muted max-w-xl mb-10"
        >
          Setiap proyek punya ceritanya sendiri — dari pemetaan proses bisnis, analisis data, hingga desain presentasi.
        </motion.p>

        {/* Category Filter with layout animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-2 mb-12 overflow-x-auto max-w-full pb-2 scrollbar-none flex-nowrap sm:flex-wrap"
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.value}
              onClick={() => { setActiveFilter(cat.value); setExpandedId(null); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`filter-pill rounded-full border transition-all duration-300 relative ${
                activeFilter === cat.value
                  ? "active text-text"
                  : "border-border hover:border-border-hover"
              }`}
              style={
                activeFilter === cat.value
                  ? { borderColor: `${cat.color}60`, background: `${cat.color}15` }
                  : {}
              }
            >
              {cat.label}
              {activeFilter === cat.value && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 rounded-full"
                  style={{ borderColor: `${cat.color}60`, background: `${cat.color}10` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid with layout animation */}
        <motion.div className="bento-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              const catColor = getCategoryColor(project.category);
              const isExpanded = expandedId === project.id;

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                  transition={{
                    layout: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: `0 20px 40px -15px ${catColor}20`,
                    borderColor: `${catColor}30`,
                  }}
                  className={`glass-card overflow-hidden group flex flex-col will-change-transform ${
                    project.featured && index < 2 ? "md:col-span-2" : ""
                  }`}
                  style={{
                    borderColor: isExpanded ? `${catColor}40` : undefined,
                  }}
                >
                  {/* Image area with hover scale */}
                  <div className="relative h-44 md:h-52 overflow-hidden">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        background: project.image
                          ? `url('${project.image}') center/cover`
                          : `linear-gradient(135deg, ${catColor}25 0%, var(--color-bg-elevated) 100%)`,
                      }}
                    />
                    {/* Year badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-bg/70 backdrop-blur-sm font-mono text-[11px] text-text-muted border border-border">
                      {project.year}
                    </div>
                    {/* Category badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                      className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-sm font-mono text-[11px] border"
                      style={{
                        color: catColor,
                        borderColor: `${catColor}30`,
                        background: `${catColor}15`,
                      }}
                    >
                      {PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-heading text-xl font-bold text-text mb-3 group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-mono text-sm text-text-muted leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] text-text-dim px-2.5 py-1 rounded-full border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expand Detail */}
                    {(project.context || project.role || project.process || project.result) && (
                      <motion.button
                        onClick={() => setExpandedId(isExpanded ? null : project.id)}
                        className="font-mono text-xs uppercase tracking-wider mb-4 flex items-center gap-1"
                        style={{ color: catColor }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isExpanded ? "Sembunyikan" : "Lihat Detail"}
                        <motion.span
                          className="material-symbols-outlined text-sm"
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          expand_more
                        </motion.span>
                      </motion.button>
                    )}

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="overflow-hidden mb-4"
                        >
                          <div className="space-y-3 pt-3 border-t border-border">
                            {project.context && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                              >
                                <p className="font-mono text-[10px] uppercase tracking-wider text-text-dim mb-1">Konteks</p>
                                <p className="font-mono text-xs text-text-muted leading-relaxed">{project.context}</p>
                              </motion.div>
                            )}
                            {project.role && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                <p className="font-mono text-[10px] uppercase tracking-wider text-text-dim mb-1">Peran</p>
                                <p className="font-mono text-xs text-text-muted leading-relaxed">{project.role}</p>
                              </motion.div>
                            )}
                            {project.process && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                              >
                                <p className="font-mono text-[10px] uppercase tracking-wider text-text-dim mb-1">Proses</p>
                                <p className="font-mono text-xs text-text-muted leading-relaxed">{project.process}</p>
                              </motion.div>
                            )}
                            {project.result && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                              >
                                <p className="font-mono text-[10px] uppercase tracking-wider text-text-dim mb-1">Hasil</p>
                                <p className="font-mono text-xs leading-relaxed" style={{ color: catColor }}>{project.result}</p>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2.5 mt-auto pt-3 border-t border-border/50">
                      <Link
                        href={`/projects/${project.id}`}
                        className="flex-1 py-2.5 px-3 text-center font-mono text-xs uppercase tracking-wider rounded-lg border transition-all hover:scale-[1.02]"
                        style={{ borderColor: `${catColor}40`, color: catColor, background: `${catColor}15` }}
                      >
                        Studi Kasus ↗
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 text-center font-mono text-xs uppercase tracking-wider rounded-lg border border-border text-text-muted hover:text-text hover:border-border-hover transition-all"
                        >
                          Demo
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 text-center font-mono text-xs uppercase tracking-wider rounded-lg border border-border text-text-muted hover:text-text hover:border-border-hover transition-all"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
