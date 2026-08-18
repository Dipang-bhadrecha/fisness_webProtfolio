"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";

import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/data/nav";

import { InstagramIcon } from "./InstagramIcon";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 h-[88px] flex items-center justify-between gap-8">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink text-base font-semibold no-underline hover:text-teal transition-colors"
            >
              {link.label}
            </Link>
          ))}
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
            href="#"
            className="inline-flex items-center gap-2 bg-ink text-cream no-underline font-semibold text-base px-5 py-3 rounded-full hover:bg-teal transition-colors"
          >
            <Download size={18} strokeWidth={2.2} />
            Download
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-ink font-semibold no-underline py-3 px-1 text-base hover:text-teal transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center bg-ink text-cream no-underline font-semibold py-3.5 rounded-xl"
          >
            Download the app
          </Link>
        </div>
      ) : null}
    </header>
  );
}
