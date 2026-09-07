"use client";

import { motion } from "framer-motion";

interface SegmentedOption {
  value: string;
  label: string;
}

interface SegmentedTabsProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  /** Unique id so the sliding highlight doesn't bleed between instances */
  layoutId: string;
  size?: "sm" | "md";
  ariaLabel?: string;
  className?: string;
}

/**
 * A rounded "pill track" segmented control: a soft container holding tabs,
 * with the active tab shown as a filled accent pill that slides between items.
 */
export function SegmentedTabs({
  options,
  value,
  onChange,
  layoutId,
  size = "md",
  ariaLabel,
  className = "",
}: SegmentedTabsProps) {
  const pad =
    size === "sm" ? "px-3 py-1.5 text-[10px]" : "px-3.5 py-1.5 text-[11px]";

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`inline-flex flex-wrap items-center gap-1 rounded-full border border-border bg-surface/60 p-1 backdrop-blur-md ${className}`}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={`relative rounded-full font-mono uppercase tracking-widest transition-colors duration-200 ${pad} ${
              active ? "text-white" : "text-text-subtle hover:text-text"
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-accent shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
