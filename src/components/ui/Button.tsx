import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonVariant = "dark" | "light" | "outline";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  shape?: "rounded" | "pill";
  className?: string;
  target?: string;
  rel?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  dark: "bg-ink text-cream hover:bg-teal",
  light: "bg-white text-[#0d5960] hover:bg-[#eef6f5]",
  outline:
    "bg-transparent text-white border border-white/50 hover:bg-white/10",
};

export function Button({
  href,
  children,
  icon: Icon,
  variant = "dark",
  shape = "rounded",
  className,
  target,
  rel,
}: ButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "inline-flex items-center gap-2.5 no-underline font-semibold text-base px-7 py-4 transition-colors duration-150",
        shape === "pill" ? "rounded-full" : "rounded-xl",
        variantClasses[variant],
        className
      )}
    >
      {Icon ? <Icon size={20} strokeWidth={2.1} /> : null}
      {children}
    </Link>
  );
}
