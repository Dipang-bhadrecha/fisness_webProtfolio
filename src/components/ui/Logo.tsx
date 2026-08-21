"use client";

import { useState } from "react";
import Link from "next/link";
import { Fish } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  iconSize?: number;
};

const LOGO_CANDIDATES = ["/assets/logo/fisness_logo.png"];

export function Logo({ className, iconSize = 22 }: LogoProps) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const logoSrc = LOGO_CANDIDATES[candidateIndex];

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 text-ink no-underline", className)}
    >
      {logoSrc ? (
        <img
          src={logoSrc}
          alt="Fisness"
          width={104}
          height={70}
          className="h-[48px] w-auto object-contain flex-shrink-0"
          onError={() => setCandidateIndex((i) => i + 1)}
        />
      ) : (
        <span className="grid place-items-center w-[38px] h-[38px] rounded-xl bg-gradient-to-br from-teal-light to-teal-dark">
          <Fish size={iconSize} strokeWidth={2.1} className="text-white" />
        </span>
      )}
      <span className="font-display font-semibold text-[24px] tracking-[-0.02em]">
        Fisness
      </span>
    </Link>
  );
}
