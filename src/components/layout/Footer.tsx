"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/ui/Logo";
import { fishTokenFooter, footerLinks } from "@/data/nav";
import { company } from "@/data/products";
import { cn } from "@/lib/utils";

type FooterLink = { label: string; href: string; newTab?: boolean };
type FooterColumn = { title: string; links: FooterLink[] };

/** FishToken is its own product, so its pages get their own wordmark. */
function FishTokenWordmark() {
  return (
    <Link
      href="/fishtoken"
      className="flex items-center gap-2.5 text-ink no-underline mb-3.5"
    >
      <Image
        src="/assets/fishtoken/logo.png"
        alt=""
        width={44}
        height={44}
        className="w-11 h-11 rounded-xl flex-shrink-0"
      />
      <span className="font-display font-bold text-[24px] tracking-[-0.02em]">
        FishToken
      </span>
    </Link>
  );
}

export function Footer() {
  const onFishToken = usePathname()?.startsWith("/fishtoken") ?? false;

  const columns: FooterColumn[] = onFishToken
    ? fishTokenFooter.columns
    : [
        {
          title: "PRODUCTS",
          links: footerLinks.product.map((link) => ({
            ...link,
            newTab: link.href.startsWith("http"),
          })),
        },
        { title: "COMPANY", links: footerLinks.company },
      ];

  return (
    <footer className="max-w-[1240px] mx-auto px-6 pt-[68px] pb-11">
      <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr] gap-8 pb-[38px] border-b border-ink/[0.08]">
        <div className="col-span-2 md:col-span-1">
          {onFishToken ? <FishTokenWordmark /> : <Logo className="mb-3.5" />}
          <p className="text-sm text-muted-light leading-[1.55] max-w-[280px] mb-4">
            {onFishToken
              ? fishTokenFooter.about
              : `${company.about} Makers of FishToken and the Fisness App.`}
          </p>
          <span className="font-mono text-xs text-muted-faint">
            support@fisness.com
          </span>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p
              className={cn(
                "font-mono text-muted-faint tracking-wider mb-3.5",
                onFishToken ? "text-sm font-semibold" : "text-[11px]"
              )}
            >
              {column.title}
            </p>
            <div className="flex flex-col gap-2.5">
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.newTab ? "_blank" : undefined}
                  rel={link.newTab ? "noopener noreferrer" : undefined}
                  className="text-muted text-[14.5px] no-underline hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-between gap-3 pt-6">
        <span className="text-[13px] text-muted-faint">
          © {new Date().getFullYear()} {onFishToken ? "FishToken" : "Fisness"}.
          All rights reserved.
        </span>
      </div>
    </footer>
  );
}
