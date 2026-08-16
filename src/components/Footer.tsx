import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-fog">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Jamoangiz uchun AI ekipaji. Ishlagan joyingizda ishlaydigan agentlar.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div className="grid gap-2">
            <p className="font-medium text-ink">Mahsulot</p>
            <Link to="/pricing" className="text-muted hover:text-ink">
              Narxlar
            </Link>
            <Link to="/security" className="text-muted hover:text-ink">
              Xavfsizlik
            </Link>
            <a href="/#faq" className="text-muted hover:text-ink">
              Savollar
            </a>
          </div>
          <div className="grid gap-2">
            <p className="font-medium text-ink">Boshlash</p>
            <Link to="/get-started" className="text-muted hover:text-ink">
              Boshlash
            </Link>
            <Link to="/book-demo" className="text-muted hover:text-ink">
              Demo band qilish
            </Link>
            <Link to="/sign-in" className="text-muted hover:text-ink">
              Kirish
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-line/70">
        <p className="mx-auto max-w-[1180px] px-5 py-5 text-xs text-muted">
          © {new Date().getFullYear()} OmniCrew. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
}
