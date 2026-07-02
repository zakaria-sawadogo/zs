"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

export function IconButton({ label, children, className, ...props }: Props) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-md border border-[var(--line)] bg-[var(--panel)] transition hover:border-[var(--brand)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
