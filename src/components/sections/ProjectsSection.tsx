"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../ui/ProjectCard";
import { projects, PROJECT_CATEGORIES, type ProjectCategory } from "@/data/projects";

// ============================================================
// ProjectsSection — Filterable Bento Grid
// ============================================================

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 md:py-32 section-padding bg-bg-secondary">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none dot-grid opacity-30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(6,182,212,0.04) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          label="// karya saya"
          title="Projects"
          description="Berikut beberapa proyek yang pernah saya kerjakan — dari sistem informasi, game development, hingga desain visual."
        />

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`
                px-4 py-2 rounded-full font-mono text-xs tracking-wide transition-all duration-300 cursor-pointer
                ${
                  activeFilter === cat.value
                    ? "bg-accent-violet text-white shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                    : "bg-white/[0.04] border border-white/[0.06] text-text-secondary hover:bg-white/[0.08] hover:text-text-primary"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Project Grid — Bento style */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={project.featured ? "md:col-span-2" : ""}
              >
                <ProjectCard
                  project={project}
                  index={i}
                  featured={project.featured}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.p
            className="text-center text-text-muted font-mono text-sm py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Belum ada proyek di kategori ini.
          </motion.p>
        )}
      </div>
    </section>
  );
}
