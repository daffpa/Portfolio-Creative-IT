"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

// ============================================================
// Navbar — Scroll-aware Glass + Active Indicator + Spring Menu
// Inspired by 21st.dev Navigation
// ============================================================

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(13,13,18,0)", "rgba(13,13,18,0.85)"]);
  const navBorder = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.07)"]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Track active section
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        style={{
          backgroundColor: navBg,
          borderBottomColor: navBorder,
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-6 md:px-12 border-b transition-[backdrop-filter] duration-500"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        {/* Logo with hover micro-animation */}
        <motion.a
          href="#hero"
          className="font-heading text-xl font-bold tracking-tight text-text"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>daffa</span>
          <motion.span
            style={{ color: "#2563ff", display: "inline-block" }}
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            .
          </motion.span>
        </motion.a>

        {/* Desktop Nav with active indicator */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative font-mono text-[13px] uppercase tracking-widest transition-colors duration-300 py-1"
              style={{
                color: activeSection === link.href ? "var(--color-text)" : "var(--color-text-muted)",
              }}
            >
              {link.label}
              {activeSection === link.href && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-[5px] w-7 h-7 justify-center items-center relative z-50"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-6 h-[2px] bg-text block origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="w-6 h-[2px] bg-text block"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-6 h-[2px] bg-text block origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile Menu with spring animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                }}
                whileHover={{ scale: 1.1, x: 10 }}
                className="font-heading text-3xl font-bold text-text hover:text-blue transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
