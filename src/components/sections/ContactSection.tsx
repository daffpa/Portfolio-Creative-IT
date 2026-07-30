"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/constants";

// ============================================================
// ContactSection — Split Layout + Social Cards
// ============================================================

const socialIcons: Record<string, string> = {
  github: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  email: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
};

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-section">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-4"
        >
          03 — Kontak
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: CTA + Socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-text mb-6 leading-tight">
              Mari{" "}
              <span className="gradient-text">berkolaborasi</span>
            </h2>
            <p className="font-mono text-sm text-text-muted leading-relaxed mb-10 max-w-md">
              Punya ide proyek menarik atau ingin berdiskusi? Saya selalu terbuka untuk kesempatan baru. Kirim pesan dan mari kita wujudkan bersama.
            </p>

            {/* Social Cards */}
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.icon === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl border border-border hover:border-accent/30 hover:bg-bg-elevated transition-all duration-300 group"
                >
                  <svg
                    className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors"
                    fill="currentColor"
                    viewBox={link.icon === "email" ? "0 0 24 24" : "0 0 24 24"}
                  >
                    <path d={socialIcons[link.icon]} />
                  </svg>
                  <span className="font-mono text-sm text-text-muted group-hover:text-text transition-colors">
                    {link.label}
                  </span>
                  <span className="ml-auto font-mono text-xs text-text-dim group-hover:text-accent-cyan transition-colors">
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              action="mailto:daffagyanza@gmail.com"
              method="POST"
              encType="text/plain"
              className="glass-card p-8 rounded-2xl space-y-6"
            >
              <div>
                <label className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                  Nama
                </label>
                <input
                  name="Name"
                  type="text"
                  placeholder="Nama lengkap Anda"
                  className="w-full bg-bg-elevated border border-border rounded-xl font-mono text-sm text-text py-3.5 px-4 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-text-dim"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  name="Email"
                  type="email"
                  placeholder="email@contoh.com"
                  className="w-full bg-bg-elevated border border-border rounded-xl font-mono text-sm text-text py-3.5 px-4 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-text-dim"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                  Pesan
                </label>
                <textarea
                  name="Message"
                  placeholder="Ceritakan ide proyek Anda..."
                  rows={5}
                  className="w-full bg-bg-elevated border border-border rounded-xl font-mono text-sm text-text py-3.5 px-4 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-text-dim resize-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-accent to-accent-cyan text-white font-heading font-semibold text-sm tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-shadow"
              >
                Kirim Pesan
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
