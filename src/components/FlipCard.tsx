import { useState } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import { format, useI18n } from "../i18n";

export type FlipAgent = {
  id: string;
  image: string;
  tone: string;
  name: string;
  blurb: string;
  goodFor: string[];
  does: string;
  used: string;
  gets: string;
};

function FlipButton({ label }: { label: string }) {
  return (
    <span className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-[7px] text-[14px] font-medium text-ink shadow-[0_1px_3px_rgba(20,24,32,0.08)]">
      <ArrowCounterClockwise size={15} weight="bold" />
      {label}
    </span>
  );
}

export function FlipCard({ agent }: { agent: FlipAgent }) {
  const [flipped, setFlipped] = useState(false);
  const { t } = useI18n();

  function flip() {
    setFlipped((value) => !value);
  }

  const rows = [
    { label: t.flip.does, text: agent.does },
    { label: t.flip.how, text: agent.used },
    { label: t.flip.gets, text: agent.gets },
  ];

  return (
    <article
      className={`flip-scene h-[460px] w-full cursor-pointer md:h-[520px] ${
        flipped ? "is-flipped" : ""
      }`}
    >
      <div className="flip-card relative h-full">
        <div
          className="flip-face absolute inset-0 flex flex-col overflow-hidden rounded-[28px]"
          style={{ background: agent.tone }}
          onClick={flip}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              flip();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={format(t.flip.flipAria, { name: agent.name })}
        >
          <FlipButton label={t.flip.turn} />
          <div className="relative z-10 flex shrink-0 flex-col px-5 pb-2 pt-6 md:px-7 md:pt-8">
            <p className="pr-16 text-[13px] leading-snug text-ink/55 md:pr-20 md:text-[16px]">
              {agent.blurb}
            </p>
            <h3 className="mt-2 text-[2.15rem] font-semibold leading-[0.92] tracking-tight text-ink md:mt-3 md:text-[3.6rem]">
              {agent.name}
            </h3>
          </div>
          <div className="relative min-h-0 flex-1">
            <img
              src={`${agent.image}?v=12`}
              alt={format(t.flip.imageAlt, { name: agent.name })}
              className={`absolute inset-x-0 bottom-0 ${
                agent.image.endsWith(".png")
                  ? "left-1/2 h-[102%] w-auto max-w-[88%] -translate-x-1/2 object-contain object-bottom md:h-[115%]"
                  : "h-full w-full object-cover object-[center_35%]"
              }`}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-4 pb-4 md:px-6 md:pb-5">
              <p className="text-[13px] font-medium text-ink/50 md:text-[14px]">{t.flip.fits}</p>
              <div className="mt-2 flex flex-wrap gap-1.5 md:gap-2">
                {agent.goodFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/90 px-2.5 py-1 text-[12px] text-ink md:px-3.5 md:py-1.5 md:text-[14px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className="flip-face flip-back absolute inset-0 flex flex-col overflow-hidden rounded-[28px] px-5 pb-5 pt-6 text-ink md:px-7 md:pb-6 md:pt-8"
          style={{ background: agent.tone }}
          onClick={flip}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              flip();
            }
          }}
          role="button"
          tabIndex={-1}
          aria-label={format(t.flip.backAria, { name: agent.name })}
        >
          <FlipButton label={t.flip.turn} />
          <h3 className="pr-16 text-[1.6rem] font-semibold leading-[0.95] tracking-tight md:pr-24 md:text-[2.35rem]">
            {agent.name}
          </h3>
          <dl className="mt-4 grid flex-1 content-start gap-3 text-[13.5px] leading-snug text-ink/80 md:mt-7 md:gap-6 md:text-[16px] md:leading-relaxed">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink/40 md:text-[11px]">
                  {row.label}
                </dt>
                <dd className="mt-1 md:mt-1.5">{row.text}</dd>
              </div>
            ))}
          </dl>
          <a
            href="#register"
            className="mt-3 inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#1a1d24] text-[14px] font-medium text-white md:mt-4 md:h-14 md:text-[15px]"
            onClick={(event) => event.stopPropagation()}
          >
            {t.flip.register}
          </a>
        </div>
      </div>
    </article>
  );
}
