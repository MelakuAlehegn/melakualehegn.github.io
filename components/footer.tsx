export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-8 px-6 md:px-12">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>
          Melaku Alehegn · {year}
        </p>
        <p className="font-mono text-[10px]" style={{ color: "var(--color-text-subtle)" }}>
          Next.js · Tailwind · Framer Motion
        </p>
      </div>
    </footer>
  );
}
