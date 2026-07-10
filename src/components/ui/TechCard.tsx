import type { TechGroup } from "@/types";

export function TechCard({ group }: { group: TechGroup }) {
  const Icon = group.icon;

  return (
    <div className="bg-white border border-ink/[0.09] rounded-[22px] p-[26px]">
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="grid place-items-center w-[38px] h-[38px] rounded-xl bg-[#eef6f5]">
          <Icon size={18} className="text-teal" />
        </span>
        <h3 className="font-display font-semibold text-[17px]">{group.label}</h3>
      </div>
      <p className="text-[13.5px] text-muted-light leading-relaxed my-3 mb-[18px]">
        {group.why}
      </p>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center font-mono text-[12.5px] text-[#2b3a37] bg-[#f7f4ee] border border-ink/[0.09] py-1.5 px-[11px] rounded-lg"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
