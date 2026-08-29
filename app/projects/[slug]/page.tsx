import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { ArrowLeft, ArrowUpRight, ArrowRight, ArrowDown, Play } from "lucide-react";
import { caseStudies } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return {};
  return {
    title: `${study.title} — Case Study`,
    description: study.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      {/* Back link */}
      <Link
        href="/#work"
        className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-subtle transition-colors duration-150 hover:text-accent"
      >
        <ArrowLeft className="h-3 w-3 transition-transform duration-150 group-hover:-translate-x-0.5" />
        Selected Work
      </Link>

      {/* Header */}
      <header className="mt-8">
        <p
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: "var(--color-accent)" }}
        >
          Case Study
        </p>
        <h1
          className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-text"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {study.title}
        </h1>
        <p
          className="mt-3 text-base md:text-lg"
          style={{ color: "var(--color-text-muted)" }}
        >
          {study.tagline}
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={study.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            GitHub
            <ArrowUpRight className="h-3 w-3 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          {study.demoUrl ? (
            <a
              href={study.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              <Play className="h-3 w-3" />
              Watch on YouTube
            </a>
          ) : null}
        </div>
      </header>

      {/* Video */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface/40">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${study.youtubeId}`}
            title={`${study.title} demo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {/* Overview */}
      <p
        className="mt-10 text-base leading-relaxed"
        style={{ color: "var(--color-text-muted)" }}
      >
        {study.overview}
      </p>

      {/* Highlights */}
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {study.highlights.map((h) => (
          <div key={h.label} className="border-t border-border pt-3">
            <div
              className="text-2xl font-bold tracking-tight text-text"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {h.value}
            </div>
            <div
              className="mt-1 text-xs leading-snug"
              style={{ color: "var(--color-text-subtle)" }}
            >
              {h.label}
            </div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div className="mt-14 space-y-12">
        {study.sections.map((section) => (
          <section key={section.heading}>
            <h2
              className="text-xl font-bold tracking-tight text-text"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3">
              {section.body.map((para, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed md:text-base"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Architecture */}
      {study.architecture ? (
        <div className="mt-14 border-t border-border pt-8">
          <h2
            className="text-xl font-bold tracking-tight text-text"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How it fits together
          </h2>

          {/* Agent band */}
          <div className="mt-6 rounded-2xl border border-accent/40 bg-accent/5 p-5">
            <p
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              {study.architecture.agent}
            </p>
            {study.architecture.agentNote ? (
              <p className="mt-1.5 text-sm" style={{ color: "var(--color-text-muted)" }}>
                {study.architecture.agentNote}
              </p>
            ) : null}
          </div>

          {/* Connector */}
          <div
            className="my-4 flex items-center justify-center gap-2"
            style={{ color: "var(--color-text-subtle)" }}
          >
            <ArrowDown className="h-3.5 w-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-widest">
              runs the steps below, reads the results back
            </span>
          </div>

          {/* Pipeline stages */}
          <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
            {study.architecture.stages.map((stage, i) => (
              <Fragment key={stage.name}>
                <div className="flex-1 rounded-xl border border-border bg-surface/40 p-4">
                  <div className="font-semibold text-text">{stage.name}</div>
                  <div className="mt-1 text-xs leading-snug" style={{ color: "var(--color-text-subtle)" }}>
                    {stage.detail}
                  </div>
                </div>
                {i < study.architecture!.stages.length - 1 ? (
                  <div
                    className="flex items-center justify-center"
                    style={{ color: "var(--color-text-subtle)" }}
                  >
                    <ArrowRight className="h-4 w-4 rotate-90 md:rotate-0" />
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>

          {/* Grounding note */}
          {study.architecture.note ? (
            <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              <span className="font-semibold" style={{ color: "var(--color-accent)" }}>
                Grounding check
              </span>{" "}
              {study.architecture.note}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Stack */}
      <div className="mt-14 border-t border-border pt-8">
        <p
          className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "var(--color-text-subtle)" }}
        >
          Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {study.stack.map((item) => (
            <span key={item} className="skill-tag">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Footer back link */}
      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-subtle transition-colors duration-150 hover:text-accent"
        >
          <ArrowLeft className="h-3 w-3 transition-transform duration-150 group-hover:-translate-x-0.5" />
          Back to Selected Work
        </Link>
      </div>
    </article>
  );
}
