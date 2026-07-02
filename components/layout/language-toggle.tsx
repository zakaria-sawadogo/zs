"use client";

import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { IconButton } from "@/components/design/icon-button";

export function LanguageToggle() {
  const [language, setLanguage] = useState<"en" | "fr">("en");

  useEffect(() => {
    setLanguage(window.localStorage.getItem("site-language") === "fr" ? "fr" : "en");
  }, []);

  function toggleLanguage() {
    const next = language === "en" ? "fr" : "en";
    setLanguage(next);
    window.localStorage.setItem("site-language", next);
    window.dispatchEvent(new CustomEvent("site-language-change", { detail: next }));
  }

  return (
    <IconButton label={language === "en" ? "Passer en français" : "Switch to English"} onClick={toggleLanguage}>
      <span className="flex items-center gap-1 text-[11px] font-bold">
        <Languages size={16} />
        {language.toUpperCase()}
      </span>
    </IconButton>
  );
}
