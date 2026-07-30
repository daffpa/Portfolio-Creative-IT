"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

// ============================================================
// ProjectCard — Individual project showcase card
// ============================================================

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      className={`
        group relative glass-card overflow-hidden cursor-pointer
        ${featured ? "md:col-span-2 md:row-span-2" : ""}
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      {/* Image / Gradient placeholder */}
      <div
        className={`relative w-full overflow-hidden bg-bg-tertiary ${
          featured ? "h-48 md:h-64" : "h-40 md:h-48"
        }`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Gradient placeholder when no image */
          <div className="w-full h-full bg-gradient-to-br from-accent-violet/20 via-bg-tertiary to-accent-cyan/20 flex items-center justify-center">
            <span className="font-mono text-3xl md:text-4xl text-white/10 font-bold select-none">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-5">
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full bg-accent-violet/20 border border-accent-violet/30 text-xs font-mono text-accent-violet hover:bg-accent-violet/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Live ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-text-secondary hover:bg-white/10 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Code ↗
              </a>
            )}
          </div>
        </div>

        {/* Year badge */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-bg-primary/70 backdrop-blur-sm border border-white/5 font-mono text-[10px] text-text-muted">
          {project.year}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Title */}
        <h3 className={`font-bold text-text-primary mb-2 group-hover:text-accent-violet transition-colors duration-300 ${
          featured ? "text-lg md:text-xl" : "text-base"
        }`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className={`text-text-secondary leading-relaxed mb-4 ${
          featured ? "text-sm" : "text-xs md:text-sm"
        } line-clamp-2`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] font-mono text-[10px] text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
