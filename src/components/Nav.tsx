import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "./Logo";

const links = [
  { to: "/security", label: "Xavfsizlik" },
  { to: "/pricing", label: "Narxlar" },
  { to: "/#faq", label: "Savollar" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between rounded-full border border-white/80 bg-white/85 px-4 shadow-[0_8px_30px_rgba(20,24,32,0.06)] backdrop-blur-md">
        <Logo />
        <nav className="hidden items-center gap-7 text-[15px] text-ink/80 lg:flex">
          {links.map((link) =>
            link.to.startsWith("/#") ? (
              <a key={link.to} href={link.to} className="hover:text-ink">
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "text-ink" : "hover:text-ink"
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/sign-in" className="px-3 text-[15px] text-ink/80 hover:text-ink">
            Kirish
          </Link>
          <Link
            to="/get-started"
            className="inline-flex h-10 items-center rounded-full bg-cobalt px-5 text-[15px] font-medium text-white transition hover:bg-cobalt-deep active:scale-[0.98]"
          >
            Boshlash
          </Link>
        </div>
        <button
          type="button"
          className="grid size-10 place-items-center rounded-full text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Menuni yopish" : "Menuni ochish"}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>
      {open ? (
        <div className="mx-auto mt-2 max-w-[1240px] rounded-3xl border border-white bg-white p-4 shadow-lg lg:hidden">
          <div className="grid gap-2">
            {links.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="rounded-xl px-3 py-2 text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/sign-in"
              className="rounded-xl px-3 py-2 text-ink"
              onClick={() => setOpen(false)}
            >
              Kirish
            </Link>
            <Link
              to="/get-started"
              className="mt-1 inline-flex h-11 items-center justify-center rounded-full bg-cobalt font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Boshlash
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
