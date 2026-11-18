import { useEffect, useRef, useState, type FormEvent } from "react";
import { LockKey, Plus, ShieldCheck, UsersThree, Wall, X } from "@phosphor-icons/react";
import { AgentCarousel } from "../components/AgentCarousel";
import { Logo } from "../components/Logo";
import { PhoneInput } from "../components/PhoneInput";
import { Reveal } from "../components/Reveal";
import { employeeValues } from "../data";
import { AccentText, format, useI18n } from "../i18n";

function Media({
  src,
  poster,
  alt,
  className = "",
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const play = () => {
      el.muted = true;
      void el.play().catch(() => {});
    };
    play();
    const onVis = () => {
      if (!document.hidden) play();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      aria-label={alt}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

const LEAD_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyw51K_Z36_fX0XzOz8DeXkOuJmswj3ZjR_txZ_c5HceCzFl4EGAVPTPMOYYYyZAAJj/exec";

const securityIcons = [UsersThree, LockKey, Wall, ShieldCheck];

type FormCode = "" | "phone" | "required" | "network" | "company" | "generic";

export function Home() {
  const { t } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [formCode, setFormCode] = useState<FormCode>("");
  const [companyName, setCompanyName] = useState("");

  const formMessage =
    formCode === "phone"
      ? t.home.errPhone
      : formCode === "required"
        ? t.home.errRequired
        : formCode === "network"
          ? t.home.errNetwork
          : formCode === "company"
            ? format(t.home.okCompany, { company: companyName })
            : formCode === "generic"
              ? t.home.okGeneric
              : "";

  async function onRegisterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const company = String(data.get("company") || "").trim();
    const employees = String(data.get("employees") || "");

    if (!name || !contact) {
      setFormStatus("error");
      setFormCode(name && data.get("contactPartial") ? "phone" : "required");
      return;
    }

    setFormStatus("loading");
    setFormCode("");

    const sentAt = new Date()
      .toLocaleString("sv-SE", { timeZone: "Asia/Tashkent" })
      .replace(" ", " - ");
    const lead = new FormData();
    lead.append("sheetName", "Lead");
    lead.append("Ism", name);
    lead.append("Telefon raqam", contact.replace(/\D/g, ""));
    lead.append("Kompaniya", company);
    lead.append("Hodimlar", employees);
    lead.append("Royhatdan o'tgan vaqti", sentAt);

    try {
      await fetch(LEAD_SHEET_URL, { method: "POST", body: lead, mode: "no-cors" });
    } catch {
      setFormStatus("error");
      setFormCode("network");
      return;
    }

    setCompanyName(company);
    setFormStatus("ok");
    setFormCode(company ? "company" : "generic");
  }

  const cardLines = t.home.cardTitle.split("\n");

  return (
    <main>
      <section className="mx-auto grid max-w-[1180px] px-4 pb-4 pt-4 text-center md:pt-8 lg:grid-cols-[1.25fr_0.75fr] lg:grid-rows-[1fr_auto_auto_auto_1fr] lg:gap-x-14 lg:px-5 lg:pt-12 lg:text-left">
        <h2 className="mx-auto max-w-4xl text-3xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl lg:col-start-1 lg:row-start-2 lg:mx-0 lg:text-[2.6rem] xl:text-[3.25rem]">
          <AccentText template={t.home.heroTitle} accent={t.home.heroAccent} />
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-base leading-relaxed text-balance text-muted md:mt-5 md:text-xl lg:col-start-1 lg:row-start-3 lg:mx-0">
          {t.home.heroLead}
        </p>
        <div className="mx-auto mt-5 w-full max-w-[330px] overflow-hidden rounded-t-full bg-gradient-to-b from-[#cfe2ff] via-[#7eb6ff] to-[#1d6fff] pt-4 md:mt-10 md:max-w-[420px] md:pt-10 lg:col-start-2 lg:row-span-5 lg:row-start-1 lg:mt-0 lg:self-center">
          <img
            src="/images/founder.png"
            alt={t.home.founderAlt}
            width={640}
            height={567}
            className="block w-full"
          />
        </div>
        <a
          href="#register"
          className="relative z-10 mx-auto mt-3 flex h-14 w-full max-w-[420px] items-center justify-center whitespace-nowrap rounded-full bg-cobalt px-6 text-lg font-semibold text-white btn-3d sm:text-xl md:text-2xl lg:col-start-1 lg:row-start-4 lg:mx-0 lg:mt-8 lg:w-fit lg:max-w-none lg:px-10"
        >
          {t.home.heroCta}
        </a>
      </section>

      <section className="px-4 pb-6 pt-5 md:pt-6">
        <div className="mx-auto max-w-[1240px] md:relative md:overflow-hidden md:rounded-[28px]">
          <img
            src="/images/hero-crew.jpg"
            alt={t.home.crewAlt}
            className="aspect-[16/9] w-full rounded-[28px] object-cover object-center md:rounded-none"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-tr from-ink/20 via-transparent to-transparent md:block" />
          <div className="mt-4 rounded-[24px] bg-white p-5 shadow-[0_16px_50px_rgba(20,24,32,0.14)] md:absolute md:bottom-8 md:left-8 md:right-auto md:mt-0 md:max-w-xl md:bg-white/96 md:p-8">
            <div className="mb-4">
              <Logo />
            </div>
            <h1 className="text-3xl font-semibold leading-[1.05] tracking-tight text-ink md:text-5xl">
              {cardLines.map((line, index) => (
                <span key={index}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-muted md:text-base">
              {t.home.cardBody}
            </p>
            <div className="mt-5">
              <a
                href="#register"
                className="btn-3d flex h-14 w-full items-center justify-center rounded-full bg-cobalt px-6 text-xl font-semibold text-white"
              >
                {t.home.launchCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pt-20">
        <Reveal className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            <AccentText template={t.home.resultsTitle} accent={t.home.resultsAccent} />
          </h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-base leading-relaxed text-muted md:text-lg">
            {t.home.resultsLead}
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              "/icons/badge-secure.svg",
              "/icons/badge-customizable.svg",
              "/icons/badge-easy.svg",
              "/icons/badge-teams.svg",
            ].map((src, index) => (
              <div key={src} className="grid justify-items-center gap-3">
                <img src={src} alt="" className="h-11 w-11 object-contain md:h-12 md:w-12" />
                <p className="text-sm font-medium">{t.home.badges[index]}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <img
          src="/images/crew-banner.png?v=2"
          alt={t.home.bannerAlt}
          width={1168}
          height={266}
          className="mx-auto mt-8 block h-auto w-full max-w-[1168px] px-4"
        />
      </section>

      <section id="agents" className="bg-[#1a2332] py-14 text-white md:py-20">
        <Reveal className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-6xl">
            <AccentText
              template={t.home.agentsTitle}
              accent={t.home.agentsAccent}
              className="text-sky"
            />
          </h2>
        </Reveal>
        <AgentCarousel />
      </section>

      <section className="px-4 py-16">
        <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] bg-[#152033]">
          <img
            src="/images/always-on.jpg?v=2"
            alt={t.home.alwaysAlt}
            className="aspect-[16/9] w-full object-cover md:aspect-auto md:h-[520px] md:object-[center_right]"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#152033] from-0% via-[#152033]/88 via-[38%] to-transparent to-[72%] md:block" />
          <div className="relative z-10 p-7 pt-6 text-white md:absolute md:inset-y-0 md:left-0 md:flex md:max-w-[34rem] md:items-center md:p-14">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
                <AccentText
                  template={t.home.alwaysTitle}
                  accent={t.home.alwaysAccent}
                  className="text-sky"
                />
              </h2>
              <p className="mt-5 max-w-[32ch] text-lg leading-relaxed text-white/75">
                {t.home.alwaysBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef4fb] px-5 py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            <AccentText template={t.home.setupTitle} accent={t.home.setupAccent} />
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-lg text-muted">{t.home.setupLead}</p>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-[980px] items-start gap-8 md:grid-cols-3">
          {t.home.steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <img
                src={
                  [
                    "/images/skills-create.jpg?v=2",
                    "/images/skills-packs.jpg?v=2",
                    "/images/skills-share.jpg?v=2",
                  ][index]
                }
                alt={step.alt}
                className={`mx-auto aspect-square w-full rounded-[28px] object-cover ${
                  index === 1 ? "max-w-[280px]" : "max-w-[240px]"
                }`}
              />
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            <AccentText template={t.home.securityTitle} accent={t.home.securityAccent} />
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-lg text-muted">{t.home.securityLead}</p>
        </Reveal>
        <Reveal delay={0.08} className="mx-auto mt-10 max-w-[720px]">
          <Media
            src="/video/security-key.mp4"
            poster="/images/security-key.jpg"
            alt={t.home.securityAlt}
            className="w-full rounded-[28px]"
          />
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-[1080px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.security.map((item, index) => {
            const Icon = securityIcons[index];
            return (
              <div key={item.title} className="text-center">
                <Icon size={28} className="mx-auto text-cobalt" />
                <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="scenarios" className="bg-fog px-5 py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            <AccentText template={t.home.problemsTitle} accent={t.home.problemsAccent} />
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-lg text-muted">{t.home.problemsLead}</p>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-[1180px] items-start gap-5 md:grid-cols-2">
          {t.scenarios.map((item, i) => (
            <details
              key={item.title}
              className="group rounded-[28px] border border-line bg-white p-6 md:p-7"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="text-xs font-semibold tracking-wider text-cobalt">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-xl font-semibold tracking-tight text-ink">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-muted">
                    {item.hook}
                  </span>
                </span>
                <Plus
                  size={20}
                  weight="bold"
                  className="mt-1 shrink-0 text-cobalt transition-transform group-open:rotate-45"
                />
              </summary>
              <dl className="mt-5 grid gap-4 border-t border-line pt-5">
                {(
                  [
                    ["problem", item.problem],
                    ["impact", item.impact],
                    ["cause", item.cause],
                    ["solution", item.solution],
                  ] as const
                ).map(([key, text]) => (
                  <div key={key}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-cobalt">
                      {t.scenarioLabels[key]}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-ink">{text}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="#register"
                className="mt-5 block rounded-2xl bg-fog p-4 text-sm font-medium leading-relaxed text-cobalt-deep hover:text-cobalt"
              >
                {item.cta} →
              </a>
            </details>
          ))}
        </div>
      </section>

      <section
        id="faq"
        className="bg-[#8ec4ea] bg-cover bg-center px-4 py-20 md:px-6"
        style={{ backgroundImage: "url('/images/faq-bg.jpg')" }}
      >
        <div className="mx-auto grid max-w-[760px] gap-4">
          {t.faqs.map((item, i) => {
            const open = openFaq === i;
            return (
              <article
                key={item.q}
                className="rounded-[22px] bg-white px-6 py-5 shadow-[0_10px_30px_rgba(20,50,80,0.08)] md:px-7"
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 text-left"
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="text-lg font-semibold tracking-tight text-ink md:text-[1.35rem]">
                    {item.q}
                  </span>
                  <span className="mt-1 grid size-7 shrink-0 place-items-center text-cobalt">
                    {open ? <X size={20} weight="bold" /> : <Plus size={20} weight="bold" />}
                  </span>
                </button>
                {open ? (
                  <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-muted">
                    {item.a}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-5 py-20">
        <div className="mx-auto grid max-w-[980px] items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              <AccentText template={t.home.registerTitle} accent={t.home.registerAccent} />
            </h2>
            <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-muted">
              {t.home.registerLead}
            </p>
            <img
              src="/images/agent-setup.jpg"
              alt={t.home.registerAlt}
              className="mt-8 w-full max-w-sm rounded-[28px]"
            />
          </div>
          <form
            id="register"
            onSubmit={onRegisterSubmit}
            className="grid gap-4 rounded-[28px] border border-line bg-fog p-6 md:p-8"
            noValidate
          >
            <h3 className="text-2xl font-semibold tracking-tight text-ink">{t.home.formTitle}</h3>
            <label className="grid gap-2 text-sm font-medium text-ink">
              {t.home.name}
              <input
                name="name"
                placeholder={t.home.namePlaceholder}
                className="h-12 rounded-xl border border-line bg-white px-3.5 text-[18px] outline-none ring-cobalt/30 focus:ring-4"
              />
            </label>
            <div className="grid gap-2 text-sm font-medium text-ink">
              {t.home.phone}
              <PhoneInput name="contact" />
            </div>
            <label className="grid gap-2 text-sm font-medium text-ink">
              {t.home.company}
              <input
                name="company"
                placeholder={t.home.companyPlaceholder}
                className="h-12 rounded-xl border border-line bg-white px-3.5 text-[18px] outline-none ring-cobalt/30 focus:ring-4"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              {t.home.employees}
              <select
                name="employees"
                defaultValue=""
                className="h-12 rounded-xl border border-line bg-white px-3 text-[18px] outline-none ring-cobalt/30 invalid:text-muted focus:ring-4"
                required
              >
                <option value="" disabled>
                  {t.home.employeesPlaceholder}
                </option>
                {t.home.employeeOptions.map((label, index) => (
                  <option key={employeeValues[index]} value={employeeValues[index]}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            {formStatus === "error" ? (
              <p className="text-sm text-red-600" role="alert">
                {formMessage}
              </p>
            ) : null}
            {formStatus === "ok" ? (
              <p className="text-sm font-medium text-cobalt-deep" role="status">
                {formMessage}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={formStatus === "loading" || formStatus === "ok"}
              className="btn-3d mt-2 h-14 rounded-full bg-cobalt text-xl font-semibold text-white disabled:opacity-60"
            >
              {formStatus === "loading"
                ? t.home.sending
                : formStatus === "ok"
                  ? t.home.sent
                  : t.home.submit}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
