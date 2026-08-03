"use client";

import { motion } from "framer-motion";

interface PillProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
}

export function Pill({ children, variant = "default" }: PillProps) {
  const baseClassName =
    "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-mono font-medium transition-all duration-200";

  if (variant === "accent") {
    return (
      <motion.span
        whileHover={{ y: -1 }}
        className={`${baseClassName} border-accent/30 bg-accent-soft text-accent shadow-xs`}
      >
        {children}
      </motion.span>
    );
  }

  if (variant === "muted") {
    return (
      <motion.span
        whileHover={{ y: -1 }}
        className={`${baseClassName} border-border/70 bg-surface/40 text-text-subtle hover:border-border-strong hover:text-text`}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.span
      whileHover={{ y: -1 }}
      className={`${baseClassName} border-border/80 bg-surface/60 backdrop-blur-md text-text-muted hover:border-border-strong hover:text-text`}
    >
      {children}
    </motion.span>
  );
}

