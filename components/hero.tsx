"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { resume } from "@/lib/data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
});

export function Hero() {
  return (
    <section
      id="about"
      className="relative scroll-mt-14 min-h-[92vh] flex flex-col justify-end px-6 md:px-12 pb-16 pt-28"
    >


      <div className="mx-auto w-full max-w-6xl">
        {/* Label + Availability badge */}
        <motion.div {...fadeUp(0.0)} className="mb-6 flex flex-wrap items-center gap-4">
          <p className="section-num">Applied AI &amp; ML Engineer</p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 pulse-dot" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
              Available
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.08)}
          className="max-w-4xl leading-[1.05] tracking-tight text-text"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
          }}
        >
          I build AI and ML
          <br />
          systems that{" "}
          <span style={{ color: "var(--color-accent)" }}>ship.</span>
        </motion.h1>

        {/* Horizontal rule */}
        <motion.div
          {...fadeUp(0.14)}
          className="mt-10 mb-10 rule"
        />

        {/* Sub-copy + CTAs */}
        <motion.div {...fadeUp(0.18)} className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <p
            className="max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--color-text-muted)" }}
          >
            End-to-end from ingestion to model behavior — pipelines, evaluation
            loops, retrieval systems, FastAPI backends, and the infrastructure
            that keeps them readable once real users arrive. Software clear enough
            to maintain and useful enough to survive production.
          </p>

          <div className="flex flex-wrap gap-3 md:flex-col md:items-end">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest border border-accent text-accent px-5 py-2.5 hover:bg-accent hover:text-bg transition-all duration-200"
            >
              View work
              <ArrowDownRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Bottom footnote row */}
        <motion.div {...fadeUp(0.22)} className="mt-12 flex flex-wrap items-center gap-6">
          {["Airflow", "dbt", "Snowflake", "FastAPI", "MLflow", "LangChain", "Qdrant"].map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: "var(--color-text-subtle)" }}
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
