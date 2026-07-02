import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

const variants = {
  primary: "bg-[var(--brand)] text-white shadow-lg shadow-teal-900/10 hover:bg-[var(--brand-dark)]",
  secondary: "border border-[var(--line)] bg-[var(--panel)] text-[var(--foreground)] hover:border-[var(--brand)]",
  ghost: "text-[var(--foreground)] hover:bg-black/5 dark:hover:bg-white/10"
};

export function Button({ href, variant = "primary", className, children, ...props }: Props) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
