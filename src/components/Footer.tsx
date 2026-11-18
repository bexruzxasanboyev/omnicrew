import { format, useI18n } from "../i18n";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-line/70 bg-fog">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 text-sm leading-relaxed text-muted">{t.footer.blurb}</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <a href="#agents" className="text-muted hover:text-ink">
            {t.nav.agents}
          </a>
          <a href="#scenarios" className="text-muted hover:text-ink">
            {t.nav.problems}
          </a>
          <a href="#faq" className="text-muted hover:text-ink">
            {t.nav.faq}
          </a>
          <a
            href="#register"
            className="btn-3d inline-flex h-12 items-center rounded-full bg-cobalt px-6 text-lg font-semibold text-white"
          >
            {t.footer.register}
          </a>
        </div>
      </div>
      <div className="border-t border-line/70">
        <p className="mx-auto max-w-[1180px] px-5 py-5 text-xs text-muted">
          {format(t.footer.rights, { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
