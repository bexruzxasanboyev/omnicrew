import { Logo } from "./Logo";
import { useI18n } from "../i18n";
import type { Lang } from "../i18n/types";

const codes: Lang[] = ["uz", "ru", "en"];

function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="flex h-8 items-center rounded-full bg-[#e8edf4] p-0.5 md:h-10"
    >
      {codes.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`h-7 rounded-full px-2 text-[11px] font-bold uppercase tracking-wide md:h-9 md:px-2.5 md:text-xs ${
            lang === code ? "bg-ink text-white" : "text-ink/55 hover:text-ink"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const { t } = useI18n();
  const links = [
    { href: "#agents", label: t.nav.agents },
    { href: "#scenarios", label: t.nav.problems },
    { href: "#faq", label: t.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-40 px-4 pt-2 md:pt-4">
      <div className="mx-auto flex h-12 max-w-[1240px] items-center justify-between rounded-full border border-white/80 bg-white/85 pl-4 pr-1.5 shadow-[0_8px_30px_rgba(20,24,32,0.06)] backdrop-blur-md md:h-16 md:pl-5 md:pr-3">
        <Logo />
        <nav className="hidden items-center gap-7 text-[15px] text-ink/80 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1.5 md:gap-2">
          <LanguageSwitch />
          <a
            href="#register"
            className="inline-flex h-9 items-center rounded-full bg-cobalt px-3.5 text-sm font-semibold text-white md:h-11 md:px-6 md:text-lg"
          >
            <span className="sm:hidden">{t.nav.auditShort}</span>
            <span className="hidden sm:inline">{t.nav.audit}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
