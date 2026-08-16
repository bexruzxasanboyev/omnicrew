import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

type Mode = "in" | "up";

export function Auth({ mode }: { mode: Mode }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Ishchi emailni to‘g‘ri kiriting.");
      return;
    }
    if (password.length < 8) {
      setStatus("error");
      setMessage("Parol kamida 8 belgidan iborat bo‘lsin.");
      return;
    }

    setStatus("loading");
    setMessage("");
    window.setTimeout(() => {
      setStatus("ok");
      setMessage(
        mode === "up"
          ? "Hisob ochildi. Tasdiqlash uchun pochtani tekshiring."
          : "Kirdingiz. Bu demo shu sahifada qoladi.",
      );
    }, 700);
  }

  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-md flex-col justify-center px-5 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {mode === "up" ? "Boshlash" : "Kirish"}
      </h1>
      <p className="mt-2 text-muted">
        {mode === "up"
          ? "Ish joyini oching va birinchi agentni oling."
          : "Ekipajingizga qaytdingiz."}
      </p>
      <form onSubmit={onSubmit} className="mt-8 grid gap-4" noValidate>
        <label className="grid gap-2 text-sm">
          Ish emaili
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="h-11 rounded-xl border border-line bg-white px-3 outline-none ring-cobalt/30 focus:ring-4"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Parol
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
          {status === "loading" ? "Kuting..." : mode === "up" ? "Boshlash" : "Kirish"}
        </button>
      </form>
      <p className="mt-6 text-sm text-muted">
        {mode === "up" ? (
          <>
            Ish joyingiz bormi?{" "}
            <Link to="/sign-in" className="text-cobalt">
              Kirish
            </Link>
          </>
        ) : (
          <>
            Yangimisiz?{" "}
            <Link to="/get-started" className="text-cobalt">
              Boshlash
            </Link>
          </>
        )}
      </p>
    </main>
  );
}
