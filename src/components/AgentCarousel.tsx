import { agentVisuals } from "../data";
import { useI18n } from "../i18n";
import { FlipCard } from "./FlipCard";

export function AgentCarousel() {
  const { t } = useI18n();

  return (
    <div className="mx-auto mt-8 grid max-w-[960px] grid-cols-1 gap-4 px-4 pb-4 md:mt-12 md:grid-cols-2 md:gap-5">
      {agentVisuals.map((visual, index) => (
        <FlipCard key={visual.id} agent={{ ...visual, ...t.agents[index] }} />
      ))}
    </div>
  );
}
