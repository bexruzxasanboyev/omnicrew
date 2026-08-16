import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import type { Agent } from "../data";

function FlipButton() {
  return (
    <span className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-[7px] text-[14px] font-medium text-ink shadow-[0_1px_3px_rgba(20,24,32,0.08)]">
      <ArrowCounterClockwise size={15} weight="bold" />
      O‘gir
    </span>
  );
}

export function FlipCard({ agent }: { agent: Agent }) {
  const [flipped, setFlipped] = useState(false);

  function flip() {
    setFlipped((value) => !value);
  }

  return (
    <article
      className={`flip-scene h-[500px] w-[400px] shrink-0 cursor-pointer snap-start md:h-[520px] md:w-[440px] ${
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
          aria-label={`${agent.name} kartasini o‘girish`}
        >
          <FlipButton />
          <div className="relative z-10 flex h-[42%] flex-col px-7 pb-2 pt-8">
            <p className="pr-20 text-[16px] leading-snug text-ink/55">{agent.blurb}</p>
            <h3 className="mt-3 text-[3.35rem] font-semibold leading-[0.88] tracking-tight text-ink md:text-[3.6rem]">
              {agent.name}
            </h3>
          </div>
          <div className="relative min-h-0 flex-1">
            <img
              src={`${agent.image}?v=12`}
              alt={`${agent.name} OmniCrew agenti`}
              className={`absolute inset-x-0 bottom-0 ${
                agent.image.endsWith(".png")
                  ? "left-1/2 h-[115%] w-auto max-w-[88%] -translate-x-1/2 object-contain object-bottom"
                  : "h-full w-full object-cover object-[center_35%]"
              }`}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-5">
              <p className="text-[14px] font-medium text-ink/50">Qayerga mos</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {agent.goodFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/90 px-3.5 py-1.5 text-[14px] text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className="flip-face flip-back absolute inset-0 flex flex-col rounded-[28px] px-7 pb-6 pt-8 text-ink"
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
          aria-label={`${agent.name} kartasini qaytarish`}
        >
          <FlipButton />
          <h3 className="pr-24 text-[2.35rem] font-semibold leading-[0.95] tracking-tight">
            {agent.name}
          </h3>
          <dl className="mt-7 grid flex-1 gap-6 text-[16px] leading-relaxed text-ink/80">
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink/40">
                Nima qiladi
              </dt>
              <dd className="mt-1.5">{agent.does}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink/40">
                Qanday ishlatasiz
              </dt>
              <dd className="mt-1.5">{agent.used}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink/40">
                Nima olasiz
              </dt>
              <dd className="mt-1.5">{agent.gets}</dd>
            </div>
          </dl>
          <Link
            to="/get-started"
            className="mt-4 inline-flex h-14 items-center justify-center rounded-full bg-[#1a1d24] text-[15px] font-medium text-white"
            onClick={(event) => event.stopPropagation()}
          >
            {agent.cta}
          </Link>
        </div>
      </div>
    </article>
  );
}
