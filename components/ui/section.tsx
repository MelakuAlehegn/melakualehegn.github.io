"use client";

import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  num?: string;
  eyebrow?: string;
  title?: string;
  className?: string;
  centered?: boolean;
}

export function Section({
  id,
  children,
  num,
  eyebrow,
  title,
  className = "",
  centered = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-14 border-t border-border py-20 md:py-28 px-6 md:px-12 ${className}`}
    >
      <div className={`mx-auto max-w-6xl ${centered ? "" : ""}`}>
        {/* Section header row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className={`mb-12 md:mb-16 flex items-baseline gap-5 ${centered ? "justify-center" : ""}`}
        >
          {num && (
            <span className="font-mono text-[10px] font-500 tracking-[0.2em] uppercase text-text-subtle select-none">
              {num}
            </span>
          )}
          {eyebrow && !title && (
            <span className="section-num">{eyebrow}</span>
          )}
          {title && (
            <h2
              className="text-2xl md:text-3xl font-bold tracking-tight text-text"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h2>
          )}
        </motion.div>

        {children}
      </div>
    </section>
  );
}
