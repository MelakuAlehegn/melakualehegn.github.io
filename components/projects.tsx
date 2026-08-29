"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Section } from "./ui/section";
import { projects, projectCategories, caseStudies } from "@/lib/data";

function ProjectTags({ tags }: { tags: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const hidden = tags.length - 6;
  const shown = expanded ? tags : tags.slice(0, 6);
  return (
    <p className="mt-4 font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>
      {shown.join(" · ")}
      {!expanded && hidden > 0 ? (
        <>
          {" · "}
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-accent transition-opacity duration-150 hover:opacity-80"
            aria-label={`Show ${hidden} more`}
          >
            +{hidden}
          </button>
        </>
      ) : null}
    </p>
  );
}

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
                  {caseStudies[project.id] ? (
                    <Link
                      href={`/projects/${project.id}`}
                      className="group/title inline-flex items-center gap-1.5 text-lg md:text-xl font-bold tracking-tight text-text group-hover:text-accent transition-colors duration-200"
                      style={{ fontFamily: "var(--font-display)" }}
                      aria-label={`Read the ${project.name} case study`}
                    >
                      <h3>{project.name}</h3>
                      <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  ) : (
                    <h3
                      className="text-lg md:text-xl font-bold tracking-tight text-text group-hover:text-accent transition-colors duration-200"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project.name}
                    </h3>
                  )}
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
                {/* Tags as inline mono text; overflow collapses into a clickable +N */}
                <ProjectTags tags={project.tags} />
              </div>

              {/* CTA */}
              <div className="mt-1 flex flex-col items-start gap-2 md:items-end">
                {caseStudies[project.id] ? (
                  <Link
                    href={`/projects/${project.id}`}
                    aria-label={`Read the ${project.name} case study`}
                    className="group/link flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent transition-opacity duration-150 hover:opacity-80"
                  >
                    Case study
                    <ArrowRight className="h-3 w-3 transition-transform duration-150 group-hover/link:translate-x-0.5" />
                  </Link>
                ) : null}
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch the ${project.name} demo`}
                    className="group/link flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent transition-opacity duration-150 hover:opacity-80"
                  >
                    Demo
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-150 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                ) : null}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.name} on GitHub`}
                  className="group/link flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-150"
                >
                  GitHub
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-150 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              </div>
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
