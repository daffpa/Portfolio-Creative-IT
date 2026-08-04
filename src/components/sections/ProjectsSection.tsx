"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects, PROJECT_CATEGORIES, type ProjectCategory } from "@/data/projects";

// ============================================================
// ProjectsSection — Colorful Cards + Category Filter + Detail
// ============================================================

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const getCategoryColor = (cat: string) => {
    return PROJECT_CATEGORIES.find((c) => c.value === cat)?.color || "#f0f0f5";
  };

  return (
    <section id="projects" className="relative py-section">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-4"
        >
          03 — Proyek
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-2 mb-12 overflow-x-auto max-w-full pb-2 scrollbar-none flex-nowrap sm:flex-wrap"
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => { setActiveFilter(cat.value); setExpandedId(null); }}
              className={`filter-pill rounded-full border transition-all duration-300 ${
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
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          key={activeFilter}
        >
          {filtered.map((project, index) => {
            const catColor = getCategoryColor(project.category);
            const isExpanded = expandedId === project.id;

            return (
              <motion.article
                key={project.id}
                variants={itemVariants}
                className={`glass-card overflow-hidden group flex flex-col ${
                  project.featured && index < 2 ? "md:col-span-2" : ""
                }`}
                style={{
                  borderColor: isExpanded ? `${catColor}40` : undefined,
                }}
              >
                {/* Image / Colorful Gradient Placeholder */}
                <div className="relative h-44 md:h-52 overflow-hidden">
                  {project.image ? (
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${project.image}')` }}
                    />
                  ) : (
                    <div
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${catColor}25 0%, var(--color-bg-elevated) 100%)`,
                      }}
                    />
                  )}
                  {/* Year badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-bg/70 backdrop-blur-sm font-mono text-[11px] text-text-muted border border-border">
                    {project.year}
                  </div>
                  {/* Category badge */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-sm font-mono text-[11px] border"
                    style={{
                      color: catColor,
                      borderColor: `${catColor}30`,
                      background: `${catColor}15`,
                    }}
                  >
                    {PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label}
                  </div>
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

                  {/* Expand/Collapse Detail */}
                  {(project.context || project.role || project.process || project.result) && (
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : project.id)}
                      className="font-mono text-xs uppercase tracking-wider mb-4 flex items-center gap-1 transition-colors"
                      style={{ color: catColor }}
                    >
                      {isExpanded ? "Sembunyikan Detail" : "Lihat Detail"}
                      <span className="material-symbols-outlined text-sm" style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>
                        expand_more
                      </span>
                    </button>
                  )}

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mb-4"
                      >
                        <div className="space-y-3 pt-3 border-t border-border">
                          {project.context && (
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-wider text-text-dim mb-1">Konteks</p>
                              <p className="font-mono text-xs text-text-muted leading-relaxed">{project.context}</p>
                            </div>
                          )}
                          {project.role && (
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-wider text-text-dim mb-1">Peran</p>
                              <p className="font-mono text-xs text-text-muted leading-relaxed">{project.role}</p>
                            </div>
                          )}
                          {project.process && (
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-wider text-text-dim mb-1">Proses</p>
                              <p className="font-mono text-xs text-text-muted leading-relaxed">{project.process}</p>
                            </div>
                          )}
                          {project.result && (
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-wider text-text-dim mb-1">Hasil</p>
                              <p className="font-mono text-xs leading-relaxed" style={{ color: catColor }}>{project.result}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 text-center font-mono text-xs uppercase tracking-wider rounded-lg border transition-all"
                        style={{ borderColor: `${catColor}30`, color: catColor, background: `${catColor}10` }}
                      >
                        Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 text-center font-mono text-xs uppercase tracking-wider rounded-lg border border-border text-text-muted hover:border-border-hover hover:text-text transition-all"
                      >
                        Source Code
                      </a>
                    )}
                    {!project.liveUrl && !project.repoUrl && !project.context && (
                      <div className="flex-1 py-2.5 text-center font-mono text-xs uppercase tracking-wider rounded-lg border border-border text-text-dim">
                        Coming Soon
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
