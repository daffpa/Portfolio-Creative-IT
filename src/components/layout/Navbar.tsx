"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

// ============================================================
// Navbar — Floating pill navigation with scroll awareness
// ============================================================

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Show navbar after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach((link) => {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 px-2 py-2 rounded-full glass-panel pointer-events-auto">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`
                    relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300
                    ${
                      isActive
                        ? "text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }
                  `}
                  onClick={() => setActiveSection(id)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full bg-accent-violet/20 border border-accent-violet/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden pointer-events-auto">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="w-11 h-11 rounded-full glass-panel flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                {isMobileOpen ? (
                  <>
                    <line x1="4" y1="4" x2="14" y2="14" />
                    <line x1="14" y1="4" x2="4" y2="14" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="5" x2="15" y2="5" />
                    <line x1="3" y1="9" x2="15" y2="9" />
                    <line x1="3" y1="13" x2="15" y2="13" />
                  </>
                )}
              </svg>
            </button>

            {/* Mobile dropdown */}
            <AnimatePresence>
              {isMobileOpen && (
                <motion.div
                  className="absolute top-14 right-0 w-44 py-2 rounded-2xl glass-panel overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {NAV_LINKS.map((link) => {
                    const id = link.href.replace("#", "");
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`
                          block px-5 py-2.5 text-sm transition-colors
                          ${
                            activeSection === id
                              ? "text-accent-violet bg-accent-violet/10"
                              : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"
                          }
                        `}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
