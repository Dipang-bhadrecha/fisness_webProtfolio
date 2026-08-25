import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { footerLinks } from "@/data/nav";

export function Footer() {
  return (
    <footer className="max-w-[1240px] mx-auto px-6 pt-[68px] pb-11">
      <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr] gap-8 pb-[38px] border-b border-ink/[0.08]">
        <div className="col-span-2 md:col-span-1">
          <Logo className="mb-3.5" />
          <p className="text-sm text-muted-light leading-[1.55] max-w-[280px] mb-4">
            The digital logbook for fishing boat businesses. Boats, crew,
            trips, tali and ledgers — offline-first.
          </p>
          <span className="font-mono text-xs text-muted-faint">
            support@fisness.com
          </span>
        </div>

        <div>
          <p className="font-mono text-[11px] text-muted-faint tracking-wider mb-3.5">
            PRODUCT
          </p>
          <div className="flex flex-col gap-2.5">
            {footerLinks.product.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-muted text-[14.5px] no-underline hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] text-muted-faint tracking-wider mb-3.5">
            COMPANY
          </p>
          <div className="flex flex-col gap-2.5">
            {footerLinks.company.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted text-[14.5px] no-underline hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-3 pt-6">
        <span className="text-[13px] text-muted-faint">
          © {new Date().getFullYear()} Fisness. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
