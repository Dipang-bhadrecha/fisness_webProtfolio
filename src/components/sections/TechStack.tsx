import { TechCard } from "@/components/ui/TechCard";
import { techGroups } from "@/data/techStack";

export function TechStack() {
  return (
    <section id="tech" className="max-w-[1240px] mx-auto px-6 pt-24 pb-5 scroll-mt-24">
      <div className="text-center max-w-[720px] mx-auto mb-12">
        <h2 className="font-display font-bold text-[clamp(33px,4.2vw,50px)] tracking-[-0.03em] leading-[1.05] mb-4">
          A modern, offline-first stack.
        </h2>
        <p className="text-xl text-muted leading-[1.55]">
          Chosen for reliability on low-end phones and patchy coastal networks.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
        {techGroups.map((group) => (
          <TechCard key={group.label} group={group} />
        ))}
      </div>
    </section>
  );
}
