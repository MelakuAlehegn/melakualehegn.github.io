import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ArrowRight, ArrowDown, Play } from "lucide-react";
import { caseStudies } from "@/lib/data";
import { Footer } from "@/components/footer";

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
  const title = `${study.title} — Case Study`;
  return {
    title,
    description: study.tagline,
    // Override the homepage OpenGraph/Twitter titles so link-preview cards
    // (and social unfurls) show this case study, not the site's default.
    openGraph: {
      title,
      description: study.tagline,
      type: "article",
    },
    twitter: {
      title,
      description: study.tagline,
    },
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

  const embedUrl = study.video
    ? study.video.provider === "loom"
      ? `https://www.loom.com/embed/${study.video.id}`
      : `https://www.youtube.com/embed/${study.video.id}`
    : null;

  return (
    <>
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {/* Back link (sticks to the top on scroll) */}
        <Link
          href="/#work"
          className="group sticky top-4 z-20 inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-bg/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-accent backdrop-blur transition-colors duration-150 hover:border-accent hover:text-accent-hover"
        >
          <ArrowLeft className="h-3 w-3 transition-transform duration-150 group-hover:-translate-x-0.5" />
          All Projects
        </Link>

        {/* Header */}
        <header className="mt-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
            Case Study{study.kind ? ` · ${study.kind}` : ""}
          </p>
          <h1
            className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-text"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {study.title}
          </h1>
          <p className="mt-3 text-base md:text-lg text-text-muted">{study.tagline}</p>

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
                Watch demo
              </a>
            ) : null}
          </div>
        </header>

        {/* Video */}
        {embedUrl ? (
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface/40">
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={embedUrl}
                title={`${study.title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        ) : null}

        {/* Overview */}
        <p className="mt-10 text-base leading-relaxed text-text-muted">{study.overview}</p>

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
              <div className="mt-1 text-xs leading-snug text-text-subtle">{h.label}</div>
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
                  <p key={i} className="text-sm leading-relaxed md:text-base text-text-muted">
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
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                {study.architecture.agent}
              </p>
              {study.architecture.agentNote ? (
                <p className="mt-1.5 text-sm text-text-muted">{study.architecture.agentNote}</p>
              ) : null}
            </div>

            {/* Connector */}
            <div className="my-4 flex items-center justify-center gap-2 text-text-subtle">
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
                    <div className="mt-1 text-xs leading-snug text-text-subtle">{stage.detail}</div>
                  </div>
                  {i < study.architecture!.stages.length - 1 ? (
                    <div className="flex items-center justify-center text-text-subtle">
                      <ArrowRight className="h-4 w-4 rotate-90 md:rotate-0" />
                    </div>
                  ) : null}
                </Fragment>
              ))}
            </div>

            {/* Grounding note */}
            {study.architecture.note ? (
              <p className="mt-5 text-sm leading-relaxed text-text-muted">
                <span className="font-semibold text-accent">Grounding check</span>{" "}
                {study.architecture.note}
              </p>
            ) : null}
          </div>
        ) : null}

        {/* Stack */}
        <div className="mt-14 border-t border-border pt-8">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-text-subtle">
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
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent transition-colors duration-150 hover:text-accent-hover"
          >
            <ArrowLeft className="h-3 w-3 transition-transform duration-150 group-hover:-translate-x-0.5" />
            Back to All Projects
          </Link>
        </div>
      </article>

      <Footer />
    </>
  );
}
