"use client";

import { motion } from "framer-motion";
import { Section } from "./ui/section";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section id="experience" num="03" title="Where I've Worked">
      <div className="divide-y divide-border">
        {experience.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: index * 0.05 }}
            className="py-10 grid md:grid-cols-[260px_1fr] gap-6 md:gap-12"
          >
            {/* Left: company meta */}
            <div className="md:sticky md:top-20 md:self-start">
              <h3
                className="text-xl font-bold tracking-tight text-text"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.company}
              </h3>
              <p
                className="mt-1 font-mono text-[10px] uppercase tracking-widest"
                style={{ color: "var(--color-accent)" }}
              >
                {item.role}
              </p>
              <p className="mt-2 font-mono text-xs" style={{ color: "var(--color-text-subtle)" }}>
                {item.dates}
              </p>
              <p className="mt-0.5 font-mono text-xs" style={{ color: "var(--color-text-subtle)" }}>
                {item.location}
              </p>
            </div>

            {/* Right: achievements */}
            <ul className="space-y-3">
              {item.achievements.map((ach, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                  {ach}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
