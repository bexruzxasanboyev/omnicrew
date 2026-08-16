import { useRef } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { FlipCard } from "./FlipCard";
import { agents } from "../data";

export function AgentCarousel() {
  const scroller = useRef<HTMLDivElement>(null);

  function move(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = (card?.clientWidth ?? 440) + 20;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="relative mt-8 md:mt-12">
      <button
        type="button"
        aria-label="Oldingi agentlar"
        onClick={() => move(-1)}
        className="absolute left-3 top-1/2 z-20 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg md:grid"
      >
        <CaretLeft size={22} weight="bold" />
      </button>
      <button
        type="button"
        aria-label="Keyingi agentlar"
        onClick={() => move(1)}
        className="absolute right-3 top-1/2 z-20 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg md:grid"
      >
        <CaretRight size={22} weight="bold" />
      </button>
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 hide-scroll md:gap-5 md:px-16"
      >
        {agents.map((agent) => (
          <FlipCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
