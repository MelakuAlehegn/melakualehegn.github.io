"use client";

import { motion } from "framer-motion";

interface TimelineItemProps {
  company: string;
  role: string;
  dates: string;
  location: string;
  achievements: string[];
  index: number;
}

export function TimelineItem({
  company,
  role,
  dates,
  location,
  achievements,
  index,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className="relative pl-7 md:pl-9 pb-10 last:pb-0"
    >
      {/* Timeline track line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-border-strong via-border to-transparent" />
      
      {/* Timeline glowing dot node */}
      <div className="absolute left-0 top-6 -translate-x-1/2 flex items-center justify-center">
        <span className="h-3 w-3 rounded-full border-2 border-accent bg-bg shadow-xs shadow-accent/50" />
      </div>

      {/* Card container */}
      <div className="rounded-2xl border border-border/80 bg-surface/50 p-6 md:p-7 backdrop-blur-md transition-all duration-300 hover:border-border-strong hover:bg-surface-elevated/70 hover:shadow-lg hover:shadow-black/5">
        <div className="space-y-4">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-xl font-normal leading-tight text-text md:text-2xl">
                {company}
              </h3>
              <span className="text-xs font-mono font-medium text-text-subtle">
                {dates}
              </span>
            </div>
            <p className="mt-1 text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              {role}
            </p>
            <p className="mt-1 text-xs font-mono text-text-subtle">
              {location}
            </p>
          </div>

          <ul className="space-y-2.5 pt-1">
            {achievements.map((achievement, i) => (
              <li key={i} className="relative pl-5 text-sm leading-relaxed text-text-muted md:text-base">
                <span className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-accent/60" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

