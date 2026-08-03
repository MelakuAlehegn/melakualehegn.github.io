"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./ui/section";
import { projects, projectCategories } from "@/lib/data";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category.split(" · ").includes(activeCategory));

  return (
    <Section id="work" num="02" title="Selected Work">
      {/* Filter row */}
      <div
        role="tablist"
        aria-label="Filter by category"
        className="mb-10 flex flex-wrap gap-3"
      >
        {projectCategories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat)}
              className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 border transition-colors duration-150"
              style={{
                borderColor: isActive ? "var(--color-accent)" : "var(--color-border)",
                color: isActive ? "var(--color-accent)" : "var(--color-text-subtle)",
                backgroundColor: "transparent",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Project list */}
      <div id="project-grid" role="tabpanel" className="divide-y divide-border">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: index * 0.04 }}
              className="group grid md:grid-cols-[3rem_1fr_auto] gap-4 md:gap-8 py-8 items-start hover:bg-surface/40 transition-colors duration-200 -mx-6 px-6 md:-mx-12 md:px-12"
            >
              {/* Index */}
              <div
                className="font-mono text-xs pt-1 tabular-nums"
                style={{ color: "var(--color-text-subtle)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <h3
                    className="text-lg md:text-xl font-bold tracking-tight text-text group-hover:text-accent transition-colors duration-200"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.name}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-subtle">
                    {project.category}
                  </span>
                </div>
                <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "var(--color-accent)" }}>
                  {project.tagline}
                </p>
                <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--color-text-muted)" }}>
                  {project.description}
                </p>
                {/* Tags as inline mono text */}
                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>
                  {project.tags.slice(0, 6).join(" · ")}
                  {project.tags.length > 6 ? ` · +${project.tags.length - 6}` : ""}
                </p>
              </div>

              {/* CTA */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name} on GitHub`}
                className="group/link flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-150 mt-1"
              >
                GitHub
                <ArrowUpRight className="h-3 w-3 transition-transform duration-150 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-end">
        <a
          href="https://github.com/MelakuAlehegn"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-subtle hover:text-accent transition-colors duration-150"
        >
          More on GitHub
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </Section>
  );
}
