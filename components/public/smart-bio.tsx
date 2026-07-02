"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/design/button";
import { cn } from "@/utils/cn";

type SmartBioProps = {
  text: string;
};

export function SmartBio({ text }: SmartBioProps) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = text.split(/\n\n+/).filter(Boolean);
  const visibleParagraphs = expanded ? paragraphs : paragraphs.slice(0, 2);

  return (
    <div className="space-y-5">
      <div className="space-y-4 text-base leading-8 text-[var(--muted)]">
        {visibleParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {paragraphs.length > 2 ? (
        <Button
          type="button"
          variant="secondary"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
          className="min-h-10 px-4 py-2"
        >
          {expanded ? "Show less" : "Read more"}
          <ChevronDown
            aria-hidden="true"
            className={cn("size-4 transition-transform", expanded && "rotate-180")}
          />
        </Button>
      ) : null}
    </div>
  );
}
