import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  KeyRound,
  Monitor,
  ShieldCheck,
  Smartphone,
  Ticket,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  fishTokenFeatures,
  fishTokenLinks,
  fishTokenSteps,
} from "@/data/fishtoken";

export const metadata: Metadata = {
  title: "FishToken — Token slips for fish-cutting plants | Fisness",
  description:
    "FishToken prints numbered token slips for every member at your fish-cutting plant, works offline, and settles every payout to the paisa. Android app for supervisors, Windows app for the office.",
};

/** Printed token slip shown in the hero. */
function TokenSlip() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] mx-auto md:mr-0 animate-softFloat">
      <Image
        src="/assets/fishtoken/token-slip.png"
        alt="A printed FishToken slip in Gujarati showing member number, fish type and a token count of 1.5"
        width={402}
        height={650}
        priority
        className="w-full h-auto drop-shadow-[0_30px_40px_rgba(15,125,132,0.28)]"
      />
    </div>
  );
}

function DownloadCard({
  icon: Icon,
  platform,
  title,
  audience,
  version,
  href,
  cta,
  external,
}: {
  icon: typeof Smartphone;
  platform: string;
  title: string;
  audience: string;
  version: string;
  href: string;
  cta: string;
  external?: boolean;
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-white border border-ink/[0.08] p-6 text-left">
      <div className="flex items-center gap-3 mb-4">
        <span className="grid place-items-center w-11 h-11 rounded-xl bg-teal/[0.08] text-teal">
          <Icon size={22} strokeWidth={2} />
        </span>
        <div>
          <p className="font-mono text-[11px] text-muted-faint tracking-wider">
            {platform}
          </p>
          <p className="font-display font-bold text-lg leading-tight">
            {title}
          </p>
        </div>
      </div>
      <p className="text-[15px] text-muted leading-[1.6] mb-5 flex-1">
        {audience}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          href={href}
          icon={Download}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="px-5 py-3 text-[15px]"
        >
          {cta}
        </Button>
        <span className="font-mono text-xs text-muted-faint">v{version}</span>
      </div>
    </div>
  );
}

export default function FishTokenPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef7f7] to-white pointer-events-none" />
        <div className="relative max-w-[1240px] mx-auto px-6 pt-16 md:pt-20 pb-16 grid md:grid-cols-[1.15fr_1fr] gap-14 items-center">
          <div>
            <Badge
              icon={Ticket}
              mono
              className="bg-teal/[0.1] text-teal mb-6"
            >
              A FISNESS PRODUCT
            </Badge>
            <h1 className="font-display font-bold text-[clamp(44px,6.4vw,78px)] leading-[1.0] tracking-[-0.035em] mb-6">
              <span className="text-gradient-teal">FishToken</span>
            </h1>
            <p className="font-display text-[clamp(21px,2.4vw,28px)] font-medium leading-[1.3] tracking-[-0.01em] mb-5 text-balance">
              Token slips for fish-cutting plants — printed in seconds,
              settled to the paisa.
            </p>
            <p className="text-[16.5px] text-muted leading-[1.65] max-w-[540px] mb-8">
              Supervisors print a numbered token for every member right at
              the cutting table. The office sees every token, report and
              payout on one desktop app. No paper registers, no adding up at
              night.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="#download" icon={Download}>
                Download FishToken
              </Button>
              <Link
                href={fishTokenLinks.licenceWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-ink no-underline px-4 py-4 hover:text-teal transition-colors"
              >
                Get a licence key
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <TokenSlip />
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-[1240px] mx-auto px-6 pt-16">
        <p className="font-mono text-sm text-teal tracking-wide mb-3">
          HOW IT WORKS
        </p>
        <h2 className="font-display font-semibold text-[clamp(28px,3.6vw,40px)] tracking-[-0.02em] leading-[1.15] mb-10 max-w-[640px]">
          Three taps at the table. One ledger in the office.
        </h2>
        <ol className="grid md:grid-cols-3 gap-5">
          {fishTokenSteps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-ink/[0.08] p-6 bg-white"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-ink text-cream">
                  <step.icon size={21} strokeWidth={2} />
                </span>
                <span className="font-mono text-sm text-muted-faint">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-[15px] text-muted leading-[1.6]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Features */}
      <section className="max-w-[1240px] mx-auto px-6 pt-20">
        <p className="font-mono text-sm text-teal tracking-wide mb-3">
          FISHTOKEN MANAGER
        </p>
        <h2 className="font-display font-semibold text-[clamp(28px,3.6vw,40px)] tracking-[-0.02em] leading-[1.15] mb-10 max-w-[640px]">
          Everything the office needs, on one Windows app.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-9">
          {fishTokenFeatures.map((f) => (
            <div key={f.title} className="flex gap-4">
              <span className="grid place-items-center flex-shrink-0 w-10 h-10 rounded-xl bg-teal/[0.08] text-teal">
                <f.icon size={20} strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-display font-bold text-[17px] mb-1">
                  {f.title}
                </h3>
                <p className="text-[15px] text-muted leading-[1.6]">
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download */}
      <section
        id="download"
        className="max-w-[1240px] mx-auto px-6 mt-24 scroll-mt-24"
      >
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-teal to-[#0b5960] py-14 px-6 md:px-12">
          <div className="absolute -top-[30%] -left-[8%] w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(232,158,90,0.35),transparent_62%)] pointer-events-none" />
          <div className="absolute -bottom-[40%] -right-[6%] w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(140,220,225,0.35),transparent_62%)] pointer-events-none" />
          <div className="relative">
            <h2 className="font-display font-bold text-[clamp(30px,4vw,44px)] tracking-[-0.03em] leading-[1.08] mb-3 text-white text-center">
              Download FishToken
            </h2>
            <p className="text-white/80 text-center text-[16px] mb-10 max-w-[560px] mx-auto">
              Two apps, one plant. Install the desktop app in the office, then
              the phone app for each supervisor.
            </p>
            <div className="grid md:grid-cols-2 gap-5 max-w-[880px] mx-auto">
              <DownloadCard
                icon={Monitor}
                platform="WINDOWS 10 / 11"
                title="FishToken Manager"
                audience="For the plant owner and office. Activate once with your licence key, then manage members, fish, reports, payments and backups."
                version={fishTokenLinks.desktopVersion}
                href={fishTokenLinks.desktopInstaller}
                cta="Download for Windows"
              />
              <DownloadCard
                icon={Smartphone}
                platform="ANDROID"
                title="FishToken"
                audience="For supervisors at the cutting table. Scan member cards, print token slips on a Bluetooth printer, keep working offline."
                version={fishTokenLinks.androidVersion}
                href={fishTokenLinks.playStore}
                cta="Get it on Google Play"
                external
              />
            </div>
          </div>
        </div>
      </section>

      {/* Licence + privacy */}
      <section className="max-w-[1240px] mx-auto px-6 pt-16 grid md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-ink/[0.08] p-7">
          <KeyRound size={24} className="text-teal mb-4" />
          <h3 className="font-display font-bold text-xl mb-2">
            Getting started
          </h3>
          <p className="text-[15px] text-muted leading-[1.65] mb-4">
            FishToken is licensed per plant and starts with a free trial.
            Write to us for a licence key — we&apos;ll help you set up your
            members, fish list and printer.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={fishTokenLinks.licenceWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal no-underline hover:underline"
            >
              Chat on WhatsApp
            </a>
            <a
              href={fishTokenLinks.support}
              className="font-semibold text-teal no-underline hover:underline"
            >
              support@fisness.com
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-ink/[0.08] p-7">
          <ShieldCheck size={24} className="text-teal mb-4" />
          <h3 className="font-display font-bold text-xl mb-2">
            Your plant&apos;s data stays your plant&apos;s
          </h3>
          <p className="text-[15px] text-muted leading-[1.65] mb-4">
            Every plant is walled off from every other. No ads, no tracking,
            no selling data. Read exactly what we store and why.
          </p>
          <Link
            href={fishTokenLinks.privacyPolicy}
            className="font-semibold text-teal no-underline hover:underline"
          >
            FishToken privacy policy
          </Link>
        </div>
      </section>
    </main>
  );
}
