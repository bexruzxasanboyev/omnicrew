import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en } from "./en";
import { ru } from "./ru";
import type { Copy, Lang } from "./types";
import { uz } from "./uz";

const copy: Record<Lang, Copy> = { uz, ru, en };

const STORAGE_KEY = "omnicrew-lang";

function readLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "uz" || saved === "ru" || saved === "en") return saved;
  } catch {
    /* private mode */
  }
  const nav = (navigator.language || "uz").toLowerCase();
  if (nav.startsWith("ru")) return "ru";
  if (nav.startsWith("en")) return "en";
  return "uz";
}

for (const lang of ["uz", "ru", "en"] as const) {
  const item = copy[lang];
  const ok =
    item.agents.length === 8 &&
    item.faqs.length === 8 &&
    item.scenarios.length === 5 &&
    item.home.steps.length === 3 &&
    item.home.security.length === 4 &&
    item.home.badges.length === 4 &&
    item.home.employeeOptions.length === 5 &&
    item.pricing.plans.length === 3 &&
    item.securityPage.items.length === 4;
  if (!ok) throw new Error(`Incomplete ${lang} copy`);
}

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Copy;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      t: copy[lang],
      setLang(next) {
        setLangState(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* ignore */
        }
      },
    }),
    [lang],
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = value.t.meta.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", value.t.meta.description);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    ogLocale?.setAttribute("content", lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "uz_UZ");
  }, [lang, value.t.meta.description, value.t.meta.title]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}

export function format(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}

export function AccentText({
  template,
  accent,
  className = "text-cobalt",
}: {
  template: string;
  accent: string;
  className?: string;
}) {
  const [before, after = ""] = template.split("{accent}");
  return (
    <>
      {before}
      <span className={className}>{accent}</span>
      {after}
    </>
  );
}
