import type { Metadata } from "next";
import Link from "next/link";

import { LegalSection as Section, LegalTable as DataTable } from "@/components/ui/LegalSection";

export const metadata: Metadata = {
  title: "FishToken Privacy Policy — Fisness",
  description:
    "What the FishToken phone app, FishToken Manager desktop app and FishToken server collect about plants, supervisors and members — and how it is used, protected and deleted.",
};

const SUPPORT = "support@fisness.com";

const processors = [
  {
    provider: "Amazon Web Services (AWS)",
    gets: "All plant data held on the FishToken server",
    why: "Hosting the server and database (Asia Pacific – Mumbai)",
  },
  {
    provider: "Cloudflare",
    gets: "Network traffic to the server, including IP addresses",
    why: "Secure connection (TLS) and protection from attacks",
  },
  {
    provider: "Expo (EAS Update)",
    gets: "App version and basic device information when the phone checks for an update",
    why: "Delivering app updates to the phone app",
  },
  {
    provider: "Google Play",
    gets: "What Google collects under its own policy when you install the app",
    why: "Distributing the Android app",
  },
];

const dataSafety = [
  ["Name", "Yes — members, supervisors, plant owner", "Yes", "App functionality, account management", "No"],
  ["Phone number", "Yes — members (optional), licence contact", "Yes", "App functionality, account management", "No"],
  ["Email address", "Yes — licence contact (optional)", "Yes", "Account management", "No"],
  ["Financial info (bank account, IFSC)", "Yes — members (optional), entered by the plant", "Yes", "App functionality (member payouts)", "No"],
  ["Other financial info (earnings, payments)", "Yes — token amounts and payouts", "Yes", "App functionality", "No"],
  ["Photos / videos", "No — camera frames are read on the phone and never saved or sent", "—", "—", "No"],
  ["Location", "No", "—", "—", "No"],
  ["Contacts", "No", "—", "—", "No"],
  ["App info & performance (crash logs, diagnostics)", "Minimal — app version only", "Yes", "App functionality, security", "No"],
  ["Device or other IDs", "No (an app-generated device code only)", "—", "—", "No"],
];

export default function FishTokenPrivacyPolicyPage() {
  return (
    <main className="max-w-[840px] mx-auto px-6 pt-20 pb-24">
      <p className="font-mono text-sm text-teal tracking-wide mb-4">
        LAST UPDATED: NOVEMBER 9, 2026
      </p>
      <h1 className="font-display font-bold text-[clamp(33px,4.2vw,48px)] tracking-[-0.03em] leading-[1.05] mb-8">
        FishToken — Privacy Policy
      </h1>

      <div className="rounded-2xl bg-teal/[0.06] border border-teal/[0.15] px-6 py-5 mb-14">
        <p className="font-mono text-xs text-teal tracking-wide mb-2">
          IN SHORT
        </p>
        <p className="text-[15.5px] text-ink/80 leading-[1.7]">
          FishToken keeps a fish-cutting plant&apos;s members, token slips and
          payouts on our server so the phones and the office stay in sync.
          Each plant&apos;s data is walled off from every other plant. The
          plant decides what it records; we store it, protect it and delete
          it when asked. We don&apos;t sell data, show ads, or track anyone
          — and the camera is used only to read QR cards.
        </p>
      </div>

      <div className="divide-y divide-ink/[0.08]">
        <Section number={1} title="Who We Are and What This Covers">
          <p>
            FishToken is a product of Fisness, operated by Dipang Bhadrecha, a
            sole proprietorship registered under Udyam Registration Number
            UDYAM-GJ-11-0057704.
          </p>
          <p>This policy covers:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              the <strong className="text-ink">FishToken</strong> Android app
              used by supervisors (package{" "}
              <span className="font-mono text-[14px]">com.fisness.fishcuttingtoken</span>);
            </li>
            <li>
              the <strong className="text-ink">FishToken Manager</strong>{" "}
              Windows app used by the plant owner and office;
            </li>
            <li>
              the FishToken server that both apps sync with
              (token-api.fisness.com).
            </li>
          </ul>
          <p>
            The Fisness boat logbook app has its own, separate{" "}
            <Link href="/privacy-policy" className="text-teal hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </Section>

        <Section number={2} title="Who Is Responsible for Which Data">
          <p>
            FishToken is a business tool that a plant licenses from us. Under
            the Digital Personal Data Protection Act, 2023 (&quot;DPDP
            Act&quot;):
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-ink">The plant</strong> is the Data
              Fiduciary for its members&apos; and supervisors&apos; data. It
              decides who to add, what to record and why.
            </li>
            <li>
              <strong className="text-ink">Fisness</strong> acts as the
              plant&apos;s Data Processor for that data — we store and
              process it only to run FishToken for the plant.
            </li>
            <li>
              <strong className="text-ink">Fisness</strong> is the Data
              Fiduciary for licence and client details (the business name and
              contact person we sell the licence to).
            </li>
          </ul>
        </Section>

        <Section number={3} title="What Data We Collect">
          <p className="font-semibold text-ink">Licence and client details</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Business (plant) name, contact person&apos;s name, mobile number and, optionally, email</li>
            <li>Licence number, trial / licence dates, the number of phones allowed</li>
          </ul>
          <p className="font-semibold text-ink">Logins</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Plant owner: name and a 4-digit PIN used with the licence key</li>
            <li>Supervisors: name (and Gujarati name printed on tokens), username and password</li>
            <li>
              Passwords, PINs, licence keys and session tokens are stored only
              as one-way hashes — never in readable form
            </li>
          </ul>
          <p className="font-semibold text-ink">
            Member details (entered by the plant)
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Member code, name and Gujarati name, group, rate per token</li>
            <li>
              Optional: mobile number, bank account number, IFSC code and
              account holder&apos;s name — used only so the plant can pay
              the member
            </li>
            <li>A QR code ID printed on the member&apos;s card</li>
          </ul>
          <p className="font-semibold text-ink">Work and payment records</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Token slips: serial number, member, fish, besan / jali count,
              tokens, rate, amount, time, and which supervisor and phone
              printed it
            </li>
            <li>Cancelled (voided) slips with the reason given</li>
            <li>Payments to members: amount, date, method (bank / UPI / cash), reference number and note</li>
          </ul>
          <p className="font-semibold text-ink">Technical data</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>App version and when each login was last used</li>
            <li>
              IP address — used briefly in memory to limit repeated login
              attempts; not saved in our database
            </li>
            <li>Basic server request logs (time, request type) for security and fault-finding</li>
          </ul>
          <p>
            We do <strong className="text-ink">not</strong> collect location,
            contacts, photos, audio, advertising IDs, or use any analytics or
            advertising SDKs.
          </p>
        </Section>

        <Section number={4} title="Phone and Computer Permissions">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-ink">Camera</strong> — only to scan a
              member&apos;s QR card. The image is read on the phone; no photo
              or video is saved or sent anywhere.
            </li>
            <li>
              <strong className="text-ink">Bluetooth</strong> — only to
              connect to the plant&apos;s token printer.
            </li>
            <li>
              <strong className="text-ink">Storage on the phone</strong> — the
              plant&apos;s member and fish lists and any token slips not yet
              synced are kept in the app, so it can keep printing without
              internet. They are sent to the server when the phone
              reconnects.
            </li>
            <li>
              <strong className="text-ink">Desktop app</strong> — keeps your
              login on that computer. Excel backups, CSV exports and printouts
              are saved only where you choose.
            </li>
          </ul>
        </Section>

        <Section number={5} title="How We Use the Data">
          <ul className="list-disc pl-5 space-y-1">
            <li>Print token slips and keep phones and the office in sync</li>
            <li>Show the plant its reports, totals, attendance and what each member is due</li>
            <li>Run logins, licences and the free trial, and limit the number of phones per plant</li>
            <li>Provide support when the plant asks for it</li>
            <li>Keep the service secure and detect misuse</li>
            <li>Meet legal obligations</li>
          </ul>
          <p>
            We do not use any of it for advertising or profiling, and we never
            sell it.
          </p>
        </Section>

        <Section number={6} title="Who Can See the Data">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-ink">The plant</strong> — the owner sees
              all of the plant&apos;s data on the desktop app. Supervisors see
              the member and fish lists and their own token counts on the
              phone.
            </li>
            <li>
              <strong className="text-ink">Other plants</strong> — never.
              Every login belongs to one plant and the server only reads and
              writes that plant&apos;s records.
            </li>
            <li>
              <strong className="text-ink">Fisness</strong> — our console
              shows licence status and usage (last use, days worked, token
              counts, app versions). Console logins need a password and an
              authenticator code. Unlike the Fisness logbook app, FishToken
              data is not end-to-end encrypted, because the server has to add
              up tokens and payouts. We open a plant&apos;s detailed records
              only to give support the plant has asked for, to keep the
              service running, or when the law requires it.
            </li>
          </ul>
        </Section>

        <Section number={7} title="Service Providers">
          <p>We share data only with these providers, and only what they need:</p>
          <DataTable
            head={["Provider", "What they get", "Why"]}
            rows={processors.map((p) => [p.provider, p.gets, p.why])}
          />
          <p>
            We may disclose data if an Indian government or judicial
            authority lawfully requires it.
          </p>
        </Section>

        <Section number={8} title="Where Data Is Stored and How It Is Protected">
          <ul className="list-disc pl-5 space-y-1">
            <li>Stored in India, on AWS Asia Pacific (Mumbai), with automatic daily backups.</li>
            <li>All traffic between the apps and the server is encrypted (TLS).</li>
            <li>Passwords, PINs, licence keys and session tokens are stored only as hashes.</li>
            <li>Repeated wrong logins are slowed down and blocked for a while.</li>
            <li>Each supervisor login works on one phone at a time; the owner can take a login away at any time.</li>
            <li>The owner can turn on a PIN lock when the desktop app starts.</li>
          </ul>
        </Section>

        <Section number={9} title="How Long We Keep Data">
          <ul className="list-disc pl-5 space-y-1">
            <li>Plant data is kept while the plant&apos;s licence or trial is active.</li>
            <li>
              A member the plant deletes is moved to the Archive: off every
              list and phone, with their past records kept for the
              plant&apos;s accounts until the plant asks us to remove them.
            </li>
            <li>
              When a plant asks us to delete its data, or 90 days after a
              licence ends without renewal, we delete it from our active
              systems within 30 days. Backup copies expire on their normal
              cycle shortly after.
            </li>
            <li>We may keep licence and billing records longer where tax or other law requires.</li>
          </ul>
        </Section>

        <Section number={10} title="Your Rights and Deleting Data" id="delete">
          <p>Under the DPDP Act you can ask to see, correct or erase your data.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-ink">Members and supervisors</strong> —
              please ask the plant first: the owner can correct or remove your
              details in the desktop app. If the plant does not help, email us
              and we will work with the plant to sort it out.
            </li>
            <li>
              <strong className="text-ink">Plant owners</strong> — you can
              download all your data as an Excel file at any time (Backup &
              import). To close your plant and delete all its data, email us
              from the contact on your licence.
            </li>
          </ul>
          <p>
            Write to{" "}
            <a href={`mailto:${SUPPORT}`} className="text-teal hover:underline">
              {SUPPORT}
            </a>{" "}
            with the subject &quot;FishToken data request&quot;. We will reply
            within the time required by law.
          </p>
        </Section>

        <Section number={11} title="The Plant's Responsibilities">
          <p>
            If you run a plant on FishToken, you confirm that you are allowed
            to record your members&apos; and supervisors&apos; details, that
            you will tell them their name, work records and (if entered) bank
            details are kept in FishToken, and that you will collect bank
            details only to pay them.
          </p>
        </Section>

        <Section number={12} title="Children">
          <p>
            FishToken is a business tool. It is not meant for children, and
            plants must not record anyone under 18 in it.
          </p>
        </Section>

        <Section number={13} title="Grievance Officer">
          <p>Name: Dipang Bhadrecha</p>
          <p>
            Email:{" "}
            <a href={`mailto:${SUPPORT}`} className="text-teal hover:underline">
              {SUPPORT}
            </a>
          </p>
        </Section>

        <Section number={14} title="Changes to This Policy">
          <p>
            We will update the date at the top whenever this policy changes,
            and tell plant owners in advance of any change that meaningfully
            affects how their data is handled.
          </p>
        </Section>

        <Section number={15} title="Governing Law and Contact">
          <p>This policy is governed by the laws of India.</p>
          <p>Fisness — operated by Dipang Bhadrecha (Udyam Reg. No. UDYAM-GJ-11-0057704)</p>
          <p>
            <a href={`mailto:${SUPPORT}`} className="text-teal hover:underline">
              {SUPPORT}
            </a>
          </p>
        </Section>
      </div>

      <div className="pt-14 mt-14 border-t border-ink/[0.08]">
        <p className="font-mono text-sm text-teal tracking-wide mb-4">
          APPENDIX
        </p>
        <h2 className="font-display font-bold text-2xl text-ink mb-2">
          Google Play Data Safety Reference
        </h2>
        <p className="text-[15.5px] text-muted leading-[1.7] mb-4">
          How the above maps to the Play Console Data safety form. All data
          is encrypted in transit, nothing is shared with third parties for
          their own use, and deletion can be requested (Section 10).
        </p>
        <DataTable
          head={["Data type", "Collected?", "Linked to a person?", "Purpose", "Used for tracking?"]}
          rows={dataSafety}
        />
      </div>
    </main>
  );
}
