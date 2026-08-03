"use client";

import { motion } from "framer-motion";
import { Section } from "./ui/section";
import { skills, certifications } from "@/lib/data";

export function Skills() {
  const skillGroups = Object.entries(skills);

  return (
    <Section id="skills" num="04" title="Skills & Stack">
      {/* Skill groups */}
      <div className="space-y-10">
        <div className="divide-y divide-border">
          {skillGroups.map(([label, items], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
              className="py-6 grid md:grid-cols-[200px_1fr] gap-4 md:gap-12 items-start"
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.2em] pt-0.5"
                style={{ color: "var(--color-text-subtle)" }}
              >
                {label}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="skill-tag">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div className="pt-4">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.2em] mb-6"
            style={{ color: "var(--color-text-subtle)" }}
          >
            Certifications
          </p>
          <div className="divide-y divide-border">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.04 }}
                className="py-4 grid md:grid-cols-[200px_1fr_auto] gap-2 md:gap-8 items-center"
              >
                <span
                  className="font-mono text-[10px] tracking-widest"
                  style={{ color: "var(--color-accent)" }}
                >
                  {cert.date}
                </span>
                <span className="text-sm font-medium text-text">{cert.name}</span>
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: "var(--color-text-subtle)" }}
                >
                  {cert.issuer}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
