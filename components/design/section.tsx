import type { ReactNode } from "react";
import { Container } from "@/components/design/container";
import { cn } from "@/utils/cn";

export function Section({
  children,
  className,
  id
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      <Container>{children}</Container>
    </section>
  );
}
