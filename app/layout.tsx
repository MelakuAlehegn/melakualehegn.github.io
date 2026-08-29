import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Melaku Alehegn — AI · ML · Data Engineer",
  description:
    "AI / ML / Data engineer building production systems at the intersection of data, machine learning, and agentic AI.",
  metadataBase: new URL("https://melakualehegn.com"),
  openGraph: {
    title: "Melaku Alehegn — AI · ML · Data Engineer",
    description: "Building data and AI systems that ship to production.",
    url: "https://melakualehegn.com",
    siteName: "Melaku Alehegn",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Melaku Alehegn — AI · ML · Data Engineer",
    description: "Building data and AI systems that ship to production.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full flex flex-col bg-bg text-text">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
        >
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <main id="main" className="relative z-10 flex-1">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
