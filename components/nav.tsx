"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { navLinks, resume } from "@/lib/data";

// Glass tint: the page's own background color at a given opacity, so the nav
// reads as frosted cream (or frosted dark) without ever changing the page bg.
const glass = (opacity: number) => ({
  backgroundColor: `color-mix(in oklab, var(--color-bg) ${opacity}%, transparent)`,
});

export function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

    const updateActive = () => {
      setScrolled(window.scrollY > 40);
      const scrollY = window.scrollY;
      const threshold = scrollY + window.innerHeight * 0.25;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + scrollY <= threshold) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  // Drive anchor scrolling ourselves so closing the mobile drawer never races the
  // browser's native hash jump (which, on mobile, would land back at the top).
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (!el) return;
    e.preventDefault();
    setIsMobileMenuOpen(false);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex flex-col items-center px-4">
      {/* Glass island */}
      <nav
        className={`pointer-events-auto flex h-16 w-full max-w-4xl items-center justify-between gap-4 rounded-full border border-border/50 px-5 md:px-7 backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/10 transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-black/10" : "shadow-md shadow-black/5"
        }`}
        style={glass(scrolled ? 62 : 42)}
      >
        {/* Logo */}
        <a
          href="#"
          style={{ fontFamily: "var(--font-display)" }}
          className="text-sm font-bold tracking-[0.2em] uppercase text-text hover:text-accent transition-colors duration-200"
        >
          Melaku
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-xs font-mono uppercase tracking-widest py-1 transition-colors duration-200"
                style={{
                  color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
                }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ backgroundColor: "var(--color-accent)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href={resume.href}
            download={resume.downloadName}
            className="text-xs font-mono uppercase tracking-widest rounded-full border border-border px-4 py-1.5 text-text-muted hover:border-accent hover:text-accent transition-colors duration-200"
          >
            Resume
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-text-muted hover:text-text transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer — matching glass panel below the island */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="pointer-events-auto mt-2 w-full max-w-4xl overflow-hidden rounded-2xl border border-border/50 shadow-lg shadow-black/10 ring-1 ring-white/10 backdrop-blur-2xl backdrop-saturate-150 md:hidden"
            style={glass(82)}
          >
            <div className="flex flex-col px-5 py-5 gap-4">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm font-mono uppercase tracking-widest transition-colors"
                    style={{ color: isActive ? "var(--color-accent)" : "var(--color-text-muted)" }}
                  >
                    {isActive ? "→ " : ""}{link.label}
                  </a>
                );
              })}
              <a
                href={resume.href}
                download={resume.downloadName}
                className="mt-1 self-start text-xs font-mono uppercase tracking-widest rounded-full border border-border px-4 py-1.5 text-text-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
