"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./ui/section";
import { featuredPosts, writingLinks } from "@/lib/data";

export function Writing() {
  return (
    <Section id="writing" num="05" title="Writing">
      <div className="divide-y divide-border">
        {featuredPosts.map((post, index) => (
          <motion.a
            key={post.title}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: index * 0.06 }}
            className="group flex items-start justify-between gap-6 py-8 hover:bg-surface/40 transition-colors duration-200 -mx-6 px-6 md:-mx-12 md:px-12"
          >
            <div className="min-w-0">
              <h3
                className="text-lg md:text-xl font-bold tracking-tight text-text group-hover:text-accent transition-colors duration-200 mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--color-text-muted)" }}>
                {post.excerpt}
              </p>
            </div>
            <ArrowUpRight
              className="h-4 w-4 shrink-0 mt-1 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              style={{ color: "var(--color-text-subtle)" }}
            />
          </motion.a>
        ))}
      </div>

      {/* All posts links */}
      <div className="mt-8 flex flex-wrap gap-6">
        {writingLinks.map((link) => (
          <a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-text-subtle hover:text-accent transition-colors duration-150"
          >
            {link.title}
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ))}
      </div>
    </Section>
  );
}
