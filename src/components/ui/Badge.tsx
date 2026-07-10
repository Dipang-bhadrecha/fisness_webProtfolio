import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
  mono?: boolean;
};

export function Badge({ children, icon: Icon, className, mono }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold",
        mono && "font-mono text-xs font-medium",
        className
      )}
    >
      {Icon ? <Icon size={14} /> : null}
      {children}
    </span>
  );
}
