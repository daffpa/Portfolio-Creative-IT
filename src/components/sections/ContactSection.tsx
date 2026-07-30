"use client";

import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import GlowButton from "../ui/GlowButton";
import { SOCIAL_LINKS } from "@/lib/constants";

// ============================================================
// Social icon SVGs
// ============================================================

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
        </svg>
      );
    default:
      return null;
  }
}

// ============================================================
// ContactSection — Form + social links + footer
// ============================================================

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 section-padding bg-bg-secondary">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.06) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <SectionHeading
          label="// kontak"
          title="Let's Connect"
          description="Punya proyek menarik atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya."
          align="center"
        />

        <GlassCard padding="lg" className="max-w-2xl mx-auto">
          <form
            action="mailto:daffagyanza@gmail.com"
            method="POST"
            encType="text/plain"
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block font-mono text-xs text-text-muted mb-2 tracking-wider uppercase">
                Nama
              </label>
              <input
                id="contact-name"
                name="Nama"
                type="text"
                placeholder="Nama lengkap Anda"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-violet/40 focus:ring-1 focus:ring-accent-violet/20 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block font-mono text-xs text-text-muted mb-2 tracking-wider uppercase">
                Email
              </label>
              <input
                id="contact-email"
                name="Email"
                type="email"
                placeholder="email@contoh.com"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-violet/40 focus:ring-1 focus:ring-accent-violet/20 transition-all"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block font-mono text-xs text-text-muted mb-2 tracking-wider uppercase">
                Pesan
              </label>
              <textarea
                id="contact-message"
                name="Pesan"
                rows={4}
                placeholder="Ceritakan tentang proyek atau ide Anda..."
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-violet/40 focus:ring-1 focus:ring-accent-violet/20 transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button type="submit" className="w-full">
              <GlowButton variant="primary" className="w-full">
                Kirim Pesan
              </GlowButton>
            </button>
          </form>
        </GlassCard>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-text-muted hover:text-accent-violet hover:border-accent-violet/30 hover:bg-accent-violet/10 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={link.label}
            >
              <SocialIcon icon={link.icon} />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-16 pt-8 border-t border-white/[0.04]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-accent-violet/30" />
            <span className="font-mono text-[10px] text-text-muted tracking-[0.3em]">
              BUILT WITH PASSION
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-accent-violet/30" />
          </div>
          <p className="text-text-muted text-xs font-mono">
            © {new Date().getFullYear()} — Designed & Developed with{" "}
            <span className="text-accent-rose">♥</span> and{" "}
            <span className="text-accent-violet">Next.js</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
