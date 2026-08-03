"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  external?: boolean;
  download?: string | boolean;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  href,
  external = false,
  download,
  onClick,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg shadow-xs";

  const variantStyles = {
    primary:
      "border border-text bg-text text-bg hover:border-accent hover:bg-accent hover:text-white shadow-md shadow-text/10",
    secondary:
      "border border-border/90 bg-surface/60 backdrop-blur-md text-text-muted hover:border-border-strong hover:bg-surface hover:text-text",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    const linkProps = {
      ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
      ...(download !== undefined ? { download } : {}),
    };

    return (
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        href={href}
        className={combinedClassName}
        {...linkProps}
      >
        <span>{children}</span>
        {external && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={combinedClassName}
    >
      <span>{children}</span>
    </motion.button>
  );
}

