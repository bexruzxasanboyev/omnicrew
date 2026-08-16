import { useState, type FormEvent } from "react";

export function BookDemo() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();

    if (!name || !email.includes("@")) {
      setStatus("error");
      setMessage("Ism va ish emailini yozing.");
      return;
    }

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("ok");
      setMessage("So‘rov ketdi. 20 daqiqalik slotni emailga yuboramiz.");
    }, 700);
  }

  return (
    <main className="mx-auto grid min-h-[70dvh] max-w-[980px] items-center gap-10 px-5 py-16 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Demo band qilish</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          20 daqiqada jonli ekipaj pochta, qidiruv va Slackni qanday yuritishini ko‘ring.
        </p>
        <img
          src="/images/agent-setup.jpg"
          alt="OmniCrew robot agenti"
          className="mt-8 w-full max-w-sm rounded-[28px]"
        />
      </div>
      <form onSubmit={onSubmit} className="grid gap-4 rounded-[28px] bg-white p-6" noValidate>
        <label className="grid gap-2 text-sm">
          Ism
          <input
            name="name"
            className="h-11 rounded-xl border border-line bg-fog px-3 outline-none ring-cobalt/30 focus:ring-4"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Ish emaili
          <input
            name="email"
            type="email"
            className="h-11 rounded-xl border border-line bg-fog px-3 outline-none ring-cobalt/30 focus:ring-4"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Kompaniya
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
          {status === "loading" ? "Yuboryapmiz..." : status === "ok" ? "Yuborildi" : "Demo band qilish"}
        </button>
      </form>
    </main>
  );
}
