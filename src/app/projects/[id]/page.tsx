import { projects, PROJECT_CATEGORIES } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Proyek Tidak Ditemukan" };
  return {
    title: `${project.title} — Portfolio Daffa`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const categoryObj = PROJECT_CATEGORIES.find((c) => c.value === project.category);
  const catColor = categoryObj?.color || "#2563ff";

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 relative">
        {/* Background glow blob */}
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-20"
          style={{ background: catColor }}
        />

        <div className="max-w-[900px] mx-auto px-6 relative z-10">
          {/* Back button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text mb-8 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Kembali ke Portofolio
          </Link>

          {/* Category & Year */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="px-3.5 py-1 rounded-full font-mono text-xs font-semibold border"
              style={{
                color: catColor,
                borderColor: `${catColor}40`,
                background: `${catColor}15`,
              }}
            >
              {categoryObj?.label}
            </span>
            <span className="font-mono text-xs text-text-dim px-3 py-1 rounded-full border border-border">
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-6 leading-tight">
            {project.title}
          </h1>

          {/* Description Lead */}
          <p className="font-mono text-base md:text-lg text-text-muted leading-relaxed mb-10 pb-8 border-b border-border">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-text-muted px-3 py-1.5 rounded-full border border-border bg-bg-elevated"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Structured Case Study Grid */}
          <div className="space-y-8">
            {/* Context & Problem */}
            {project.context && (
              <div className="glass-card p-6 md:p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{ background: `${catColor}20`, color: catColor }}
                  >
                    01
                  </div>
                  <h2 className="font-heading text-xl font-bold text-text">
                    Konteks & Masalah
                  </h2>
                </div>
                <p className="font-mono text-sm text-text-muted leading-relaxed">
                  {project.context}
                </p>
              </div>
            )}

            {/* Role */}
            {project.role && (
              <div className="glass-card p-6 md:p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{ background: `${catColor}20`, color: catColor }}
                  >
                    02
                  </div>
                  <h2 className="font-heading text-xl font-bold text-text">
                    Peran Daffa
                  </h2>
                </div>
                <p className="font-mono text-sm text-text-muted leading-relaxed">
                  {project.role}
                </p>
              </div>
            )}

            {/* Process */}
            {project.process && (
              <div className="glass-card p-6 md:p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{ background: `${catColor}20`, color: catColor }}
                  >
                    03
                  </div>
                  <h2 className="font-heading text-xl font-bold text-text">
                    Proses & Pendekatan
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.process.split("→").map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 font-mono text-xs text-text-muted bg-bg-elevated px-4 py-2.5 rounded-xl border border-border"
                    >
                      <span className="text-text-dim">{idx + 1}.</span>
                      <span>{step.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Result & Impact */}
            {project.result && (
              <div
                className="p-6 md:p-8 rounded-2xl border"
                style={{
                  background: `linear-gradient(135deg, ${catColor}15 0%, var(--color-bg-card) 100%)`,
                  borderColor: `${catColor}40`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{ background: catColor, color: "#fff" }}
                  >
                    ✓
                  </div>
                  <h2 className="font-heading text-xl font-bold text-text">
                    Hasil & Dampak
                  </h2>
                </div>
                <p className="font-mono text-sm md:text-base leading-relaxed" style={{ color: catColor }}>
                  {project.result}
                </p>
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 text-center font-mono text-xs uppercase tracking-wider rounded-xl font-semibold text-white transition-shadow shadow-lg"
                style={{ background: catColor }}
              >
                Buka Live Demo ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 text-center font-mono text-xs uppercase tracking-wider rounded-xl border border-border text-text-muted hover:text-text hover:border-border-hover transition-all"
              >
                Lihat Source Code
              </a>
            )}
            <Link
              href="/#contact"
              className="flex-1 py-3.5 text-center font-mono text-xs uppercase tracking-wider rounded-xl border border-border text-text-muted hover:text-text hover:border-border-hover transition-all"
            >
              Diskusi Proyek Ini
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
