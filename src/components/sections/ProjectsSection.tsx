"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { projects, PROJECT_CATEGORIES, type ProjectCategory } from "@/data/projects";

// ============================================================
// ProjectsSection — Bento Grid + Category Filter
// ============================================================

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

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
          02 — Proyek
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-5xl font-bold text-text mb-12 leading-tight"
        >
          Karya <span className="gradient-text">terpilih</span>
        </motion.h2>

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
              onClick={() => setActiveFilter(cat.value)}
              className={`filter-pill rounded-full border transition-all duration-300 ${
                activeFilter === cat.value
                  ? "active border-accent/40 bg-accent/10 text-text"
                  : "border-border hover:border-border-hover"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          key={activeFilter} // Re-trigger animation on filter change
        >
          {filtered.map((project, index) => (
            <motion.article
              key={project.id}
              variants={itemVariants}
              className={`glass-card glow-border overflow-hidden group flex flex-col ${
                project.featured && index < 2 ? "md:col-span-2" : ""
              }`}
            >
              {/* Image / Gradient Placeholder */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                {project.image ? (
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                ) : (
                  <div
                    className="w-full h-full transition-all duration-700 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, 
                        ${index % 3 === 0 ? "rgba(124,92,255,0.2)" : index % 3 === 1 ? "rgba(0,212,255,0.2)" : "rgba(255,107,157,0.2)"} 0%, 
                        var(--color-bg-elevated) 100%)`,
                    }}
                  />
                )}
                {/* Year badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-bg/70 backdrop-blur-sm font-mono text-[11px] text-text-muted border border-border">
                  {project.year}
                </div>
                {/* Category badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/20 backdrop-blur-sm font-mono text-[11px] text-accent-light border border-accent/20">
                  {PROJECT_CATEGORIES.find(c => c.value === project.category)?.label}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-heading text-xl font-bold text-text mb-3 group-hover:text-accent-light transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-mono text-sm text-text-muted leading-relaxed flex-grow mb-5">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] text-text-dim px-2.5 py-1 rounded-full border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 text-center font-mono text-xs uppercase tracking-wider rounded-lg bg-accent/10 text-accent-light border border-accent/20 hover:bg-accent/20 transition-all"
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
                  {!project.liveUrl && !project.repoUrl && (
                    <div className="flex-1 py-2.5 text-center font-mono text-xs uppercase tracking-wider rounded-lg border border-border text-text-dim">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
