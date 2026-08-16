import { Link } from "react-router-dom";
import { Check } from "@phosphor-icons/react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    note: "agent / oy",
    points: ["1 ta workspace", "2 ta umumiy agent", "Asosiy skill paketlar", "Email yordam"],
  },
  {
    name: "Team",
    price: "$79",
    note: "agent / oy",
    points: [
      "Cheksiz jamoa a'zolari",
      "Umumiy skill kutubxonasi",
      "Admin boshqaruvi",
      "Seyf tasdiqlari",
      "Ustuvor yordam",
    ],
    featured: true,
  },
  {
    name: "Company",
    price: "Biz bilan gaplashing",
    note: "maxsus hajm",
    points: ["SSO va SCIM", "Alohida izolyatsiya", "Xavfsizlik ko‘rigi", "Maxsus skill paketlar"],
  },
];

export function Pricing() {
  return (
    <main className="mx-auto max-w-[1180px] px-5 py-16">
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Narxlar</h1>
      <p className="mt-4 max-w-[48ch] text-lg text-muted">
        Kredit bilan boshlang. Ekipaj o‘ssa, agent qo‘shasiz. Istalgan vaqt bekor qilasiz.
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-[28px] p-7 ${
              plan.featured ? "bg-ink text-white" : "bg-white"
            }`}
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
                plan.featured
                  ? "bg-white text-ink"
                  : "bg-cobalt text-white hover:bg-cobalt-deep"
              }`}
            >
              Boshlash
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
