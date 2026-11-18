import { Link } from "react-router-dom";
import { Check } from "@phosphor-icons/react";
import { useI18n } from "../i18n";

export function Pricing() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-[1180px] px-5 py-16">
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">{t.pricing.title}</h1>
      <p className="mt-4 max-w-[48ch] text-lg text-muted">{t.pricing.lead}</p>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {t.pricing.plans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-[28px] p-7 ${plan.featured ? "bg-ink text-white" : "bg-white"}`}
          >
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mt-6 text-4xl font-semibold tracking-tight">{plan.price}</p>
            <p className={`mt-1 text-sm ${plan.featured ? "text-white/70" : "text-muted"}`}>
              {plan.note}
            </p>
            <ul className="mt-8 grid gap-3 text-sm">
              {plan.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <Check size={16} className={plan.featured ? "text-sky" : "text-cobalt"} />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              to="/get-started"
              className={`mt-8 inline-flex h-11 items-center rounded-full px-5 text-sm font-medium ${
                plan.featured ? "bg-white text-ink" : "bg-cobalt text-white hover:bg-cobalt-deep"
              }`}
            >
              {t.pricing.start}
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
