import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n";

type Mode = "in" | "up";

export function Auth({ mode }: { mode: Mode }) {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage(t.auth.errEmail);
      return;
    }
    if (password.length < 8) {
      setStatus("error");
      setMessage(t.auth.errPassword);
      return;
    }

    setStatus("loading");
    setMessage("");
    window.setTimeout(() => {
      setStatus("ok");
      setMessage(mode === "up" ? t.auth.okUp : t.auth.okIn);
    }, 700);
  }

  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-md flex-col justify-center px-5 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {mode === "up" ? t.auth.titleUp : t.auth.titleIn}
      </h1>
      <p className="mt-2 text-muted">{mode === "up" ? t.auth.leadUp : t.auth.leadIn}</p>
      <form onSubmit={onSubmit} className="mt-8 grid gap-4" noValidate>
        <label className="grid gap-2 text-sm">
          {t.auth.email}
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="h-11 rounded-xl border border-line bg-white px-3 outline-none ring-cobalt/30 focus:ring-4"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t.auth.password}
          <input
            name="password"
            type="password"
            autoComplete={mode === "up" ? "new-password" : "current-password"}
            className="h-11 rounded-xl border border-line bg-white px-3 outline-none ring-cobalt/30 focus:ring-4"
          />
        </label>
        {status === "error" ? (
          <p className="text-sm text-red-600" role="alert">
            {message}
          </p>
        ) : null}
        {status === "ok" ? (
          <p className="text-sm text-cobalt-deep" role="status">
            {message}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-11 rounded-full bg-cobalt text-sm font-medium text-white hover:bg-cobalt-deep disabled:opacity-60"
        >
          {status === "loading" ? t.auth.loading : mode === "up" ? t.auth.submitUp : t.auth.submitIn}
        </button>
      </form>
      <p className="mt-6 text-sm text-muted">
        {mode === "up" ? (
          <>
            {t.auth.hasAccount}{" "}
            <Link to="/sign-in" className="text-cobalt">
              {t.auth.signIn}
            </Link>
          </>
        ) : (
          <>
            {t.auth.newHere}{" "}
            <Link to="/get-started" className="text-cobalt">
              {t.auth.start}
            </Link>
          </>
        )}
      </p>
    </main>
  );
}
