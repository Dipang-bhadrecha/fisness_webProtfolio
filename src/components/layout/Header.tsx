"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";

import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/data/nav";
import { cn } from "@/lib/utils";

import { InstagramIcon } from "./InstagramIcon";

function NavBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wide leading-none text-white bg-gradient-to-r from-teal to-teal-light rounded-full px-2 py-1">
      {children}
    </span>
  );
}

/**
 * A nav link with a badge (FishToken) gets the attention treatment:
 * a light spinning around its border, a soft pulsing glow, and a shine
 * sweeping across the label. All of it stops for reduced-motion users.
 */
function FeaturedNavLink({
  href,
  label,
  badge,
  onClick,
  className,
}: {
  href: string;
  label: string;
  badge: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex overflow-hidden rounded-full p-[1.5px] no-underline animate-badgeGlow motion-reduce:animate-none",
        className
      )}
    >
      {/* spinning light on the border */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 w-[300%] aspect-square -translate-x-1/2 -translate-y-1/2"
      >
        <span className="block w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,#12a3ad_310deg,#7ff3ea_350deg,transparent_360deg)] animate-borderSpin motion-reduce:animate-none" />
      </span>
      <span className="relative inline-flex items-center gap-2 rounded-full bg-cream group-hover:bg-[#f2fbfb] transition-colors pl-4 pr-1.5 py-1.5">
        <span className="text-shimmer animate-shimmer motion-reduce:animate-none text-lg font-semibold">
          {label}
        </span>
        <NavBadge>{badge}</NavBadge>
      </span>
    </Link>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const onFishToken = usePathname()?.startsWith("/fishtoken") ?? false;

  // On FishToken pages, "Download" means FishToken; everywhere else, the Fisness App.
  const download = onFishToken
    ? { href: "/fishtoken#download", external: false, label: "Download FishToken" }
    : { href: "https://play.google.com/store/apps/details?id=com.fisness.app", external: true, label: "Download the app" };
  const externalProps = download.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <header className="sticky top-0 z-50 bg-cream">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 h-[88px] flex items-center justify-between gap-8">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.badge ? (
              <FeaturedNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                badge={link.badge}
              />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 text-ink text-lg font-semibold no-underline hover:text-teal transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="https://www.instagram.com/fisness__?igsh=MXZsZ3RmY2pmZnRtYw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center hover:opacity-85 transition-opacity"
          >
            <InstagramIcon size={26} />
          </a>
          <Link
            href={download.href}
            {...externalProps}
            className="inline-flex items-center gap-2 bg-ink text-cream no-underline font-semibold text-base px-5 py-3 rounded-full hover:bg-teal transition-colors"
          >
            <Download size={18} strokeWidth={2.2} />
            {onFishToken ? "Download FishToken" : "Download"}
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          className="md:hidden flex items-center justify-center w-[46px] h-[46px] rounded-xl bg-white border border-ink/10 text-ink"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="md:hidden border-t border-ink/[0.08] px-6 pt-3 pb-[18px] flex flex-col gap-0.5 bg-cream">
          {navLinks.map((link) =>
            link.badge ? (
              <FeaturedNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                badge={link.badge}
                onClick={() => setMobileOpen(false)}
                className="my-1.5 self-start"
              />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 text-ink font-semibold no-underline py-3 px-1 text-lg hover:text-teal transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href={download.href}
            {...externalProps}
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center bg-ink text-cream no-underline font-semibold py-3.5 rounded-xl"
          >
            {download.label}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
