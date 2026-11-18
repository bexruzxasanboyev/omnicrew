import { useState, type FormEvent } from "react";
import { useI18n } from "../i18n";

export function BookDemo() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();

    if (!name || !email.includes("@")) {
      setStatus("error");
      setMessage(t.demo.err);
      return;
    }

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("ok");
      setMessage(t.demo.ok);
    }, 700);
  }

  return (
    <main className="mx-auto grid min-h-[70dvh] max-w-[980px] items-center gap-10 px-5 py-16 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">{t.demo.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{t.demo.lead}</p>
        <img
          src="/images/agent-setup.jpg"
          alt={t.demo.alt}
          className="mt-8 w-full max-w-sm rounded-[28px]"
        />
      </div>
      <form onSubmit={onSubmit} className="grid gap-4 rounded-[28px] bg-white p-6" noValidate>
        <label className="grid gap-2 text-sm">
          {t.demo.name}
          <input
            name="name"
            className="h-11 rounded-xl border border-line bg-fog px-3 outline-none ring-cobalt/30 focus:ring-4"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t.demo.email}
          <input
            name="email"
            type="email"
            className="h-11 rounded-xl border border-line bg-fog px-3 outline-none ring-cobalt/30 focus:ring-4"
          />
        </label>
        <label className="grid gap-2 text-sm">
          {t.demo.company}
          <input
            name="company"
            className="h-11 rounded-xl border border-line bg-fog px-3 outline-none ring-cobalt/30 focus:ring-4"
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
          disabled={status === "loading" || status === "ok"}
          className="h-11 rounded-full bg-cobalt text-sm font-medium text-white hover:bg-cobalt-deep disabled:opacity-60"
        >
          {status === "loading" ? t.demo.loading : status === "ok" ? t.demo.sent : t.demo.submit}
        </button>
      </form>
    </main>
  );
}
