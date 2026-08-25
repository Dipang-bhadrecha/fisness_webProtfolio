import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Fisness",
  description:
    "How Fisness collects, encrypts, and handles data — phone number, sealed business records, and what we can and cannot see.",
};

const processors = [
  {
    provider: "Twilio",
    gets: "Your phone number",
    why: "To deliver the OTP SMS at login",
  },
  {
    provider: "Amazon Web Services (AWS)",
    gets: "Your sealed (encrypted) business data",
    why: "To host our servers and store your data",
  },
];

const privacyLabel = [
  {
    type: "Phone Number",
    collected: "Yes",
    linked: "Yes",
    purpose: "Login / account",
    tracking: "No",
  },
  {
    type: "Business Records (tali/ledger/crew/trip)",
    collected: "Yes, encrypted — unreadable by us",
    linked: "No (sealed)",
    purpose: "App functionality",
    tracking: "No",
  },
  {
    type: "Device/App diagnostics",
    collected: "Minimal, server logs only",
    linked: "No",
    purpose: "Security / stability",
    tracking: "No",
  },
  {
    type: "Location",
    collected: "No",
    linked: "—",
    purpose: "—",
    tracking: "No",
  },
  {
    type: "Photos/Videos",
    collected: "No",
    linked: "—",
    purpose: "—",
    tracking: "No",
  },
  {
    type: "Payment info",
    collected: "Not yet (planned)",
    linked: "—",
    purpose: "—",
    tracking: "No",
  },
];

function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pt-10 first:pt-0">
      <h2 className="font-display font-bold text-2xl text-ink mb-4">
        {number}. {title}
      </h2>
      <div className="space-y-4 text-[15.5px] text-muted leading-[1.7]">
        {children}
      </div>
    </section>
  );
}

function DataTable({
  head,
  rows,
}: {
  head: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink/[0.08] my-2">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="bg-teal/[0.06]">
            {head.map((h) => (
              <th
                key={h}
                className="font-mono text-xs text-muted-faint tracking-wide font-medium px-4 py-3 border-b border-ink/[0.08]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-ink/[0.06]">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-muted align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-[840px] mx-auto px-6 pt-20 pb-24">
      <p className="font-mono text-sm text-teal tracking-wide mb-4">
        LAST UPDATED: JULY 10, 2026
      </p>
      <h1 className="font-display font-bold text-[clamp(33px,4.2vw,48px)] tracking-[-0.03em] leading-[1.05] mb-8">
        Fisness — Privacy Policy
      </h1>

      <div className="rounded-2xl bg-teal/[0.06] border border-teal/[0.15] px-6 py-5 mb-14">
        <p className="font-mono text-xs text-teal tracking-wide mb-2">
          IN SHORT
        </p>
        <p className="text-[15.5px] text-ink/80 leading-[1.7]">
          Fisness stores your boats, crew, trips, tali, and ledger records
          encrypted on your device before we ever see them. We only ever hold
          your phone number (for login) and the sealed, unreadable version of
          your business data. We don&apos;t sell data, run ads, or track you
          across other apps.
        </p>
      </div>

      <div className="divide-y divide-ink/[0.08]">
        <Section number={1} title="Who We Are">
          <p>
            Fisness is operated by Dipang Bhadrecha, a sole proprietorship
            registered under Udyam Registration Number
            UDYAM-GJ-11-0057704, currently completing formal business
            registration. For the purposes of Indian data protection law —
            the Digital Personal Data Protection Act, 2023 (&quot;DPDP
            Act&quot;) and the Information Technology Act, 2000 — Fisness
            acts as the Data Fiduciary for the account data described below.
          </p>
          <p>
            This policy applies to the Fisness mobile app and website
            (fisness.app).
          </p>
        </Section>

        <Section number={2} title="What Data We Collect">
          <p className="font-semibold text-ink">
            Account data (visible to us):
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Phone number — used for OTP login and as your account identifier</li>
            <li>Basic account metadata — account creation date, last sync time, device/app version</li>
          </ul>
          <p className="font-semibold text-ink">
            Business data (sealed, not visible to us):
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Boat names and settings</li>
            <li>Crew names, roles, and invitation status</li>
            <li>Trip records</li>
            <li>Tali (catch/settlement) entries</li>
            <li>Ledger and payment amounts</li>
          </ul>
          <p className="font-semibold text-ink">Technical data:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>IP address and device information, collected only in server logs needed to operate and secure the Service</li>
          </ul>
          <p>
            We do not collect your name, email, location, or photos unless
            you choose to add them in a future feature — and this policy
            will be updated first if that changes.
          </p>
        </Section>

        <Section number={3} title="What We Cannot See — How Encryption Works Here">
          <p>
            This is the part that makes Fisness different from a typical
            app, so it&apos;s worth being precise about:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Every business record — tali, ledger, crew, trip — is
              encrypted on your phone with AES-256 before it is ever sent
              anywhere.
            </li>
            <li>It travels to our servers already sealed, over an encrypted (TLS) connection.</li>
            <li>
              It is stored sealed on AWS. AWS is a storage provider only —
              it cannot read the contents.
            </li>
            <li>
              The key that unlocks your data lives with your account/device,
              not on our servers. We cannot decrypt your business records —
              not to help you, not for support, not under normal operation.
            </li>
          </ul>
          <p className="font-semibold text-ink">What this means practically:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              If you contact support about a tali entry, we can see that a
              record exists and when it synced, but not what&apos;s inside
              it.
            </li>
            <li>
              If you lose access to your account in a way that breaks your
              key, we cannot recover the contents of your sealed data. Keep
              your phone number/device access secure.
            </li>
            <li>
              We can, and do, still see your phone number and metadata like
              sync timestamps — this policy governs that data honestly
              rather than overclaiming &quot;we see nothing at all.&quot;
            </li>
          </ul>
        </Section>

        <Section number={4} title="How We Use Your Data">
          <p>We use the data we can actually access to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Authenticate you via OTP and manage your account</li>
            <li>Sync your sealed data across your own devices</li>
            <li>Provide customer support</li>
            <li>Detect abuse and keep the Service secure</li>
            <li>Comply with legal obligations (e.g. responding to a lawful government request)</li>
          </ul>
          <p>
            We do not use your data for advertising, profiling, or resale,
            and — for your encrypted business content — we structurally
            cannot.
          </p>
        </Section>

        <Section number={5} title="Legal Basis for Processing">
          <p>
            Under the DPDP Act, we process your phone number on the basis of
            your consent, given when you sign up, and to the extent
            necessary to perform our contract with you (i.e., provide the
            app). You may withdraw consent at any time by deleting your
            account (see Section 9).
          </p>
        </Section>

        <Section number={6} title="Who We Share Data With">
          <p>
            We do not sell your data. We share the minimum necessary with
            two processors:
          </p>
          <DataTable
            head={["Provider", "What they get", "Why"]}
            rows={processors.map((p) => [p.provider, p.gets, p.why])}
          />
          <p>
            We may also disclose account data (phone number, metadata) if
            legally required to do so by an Indian government or judicial
            authority.
          </p>
        </Section>

        <Section number={7} title="Where and How Your Data Is Stored">
          <p>
            Your sealed data is stored on AWS infrastructure — AWS Asia
            Pacific (Mumbai), region ap-south-1. Access to production
            systems is restricted to what&apos;s necessary to operate the
            Service.
          </p>
        </Section>

        <Section number={8} title="Data Retention">
          <ul className="list-disc pl-5 space-y-1">
            <li>Account and sealed business data are retained as long as your account is active.</li>
            <li>
              On account deletion, we remove your data from active systems
              within 30 days, except where retention is required for legal,
              tax, or dispute-resolution purposes.
            </li>
            <li>
              Sealed data that&apos;s already unrecoverable (see Section 3)
              has no independent retention concern for us — we hold
              ciphertext we cannot read either way.
            </li>
          </ul>
        </Section>

        <Section number={9} title="Your Rights">
          <p>As a Data Principal under the DPDP Act, you can:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Access the account data we hold (phone number, metadata — we
              cannot show you decrypted business content ourselves, since we
              don&apos;t have it)
            </li>
            <li>Correct your phone number or account details</li>
            <li>Withdraw consent / delete your account and all associated data</li>
            <li>
              Nominate another person to exercise these rights on your
              behalf in the event of your death or incapacity
            </li>
            <li>File a grievance about how your data is handled</li>
          </ul>
          <p>
            To exercise any of these, email{" "}
            <a href="mailto:support@fisness.com" className="text-teal hover:underline">
              support@fisness.com
            </a>
            . We will respond within the timeline required by law.
          </p>
        </Section>

        <Section number={10} title="Grievance Officer">
          <p>Name: Dipang Bhadrecha</p>
          <p>
            Email:{" "}
            <a href="mailto:support@fisness.com" className="text-teal hover:underline">
              support@fisness.com
            </a>
          </p>
          <p>
            Available to address any complaints or questions regarding this
            policy or how your data is processed.
          </p>
        </Section>

        <Section number={11} title="Crew and Multi-User Data">
          <p>
            Boat owners typically add crew names and details to the app on
            their crew&apos;s behalf. If you do this, you confirm that
            you&apos;re authorized to record this information and that
            you&apos;ll let your crew know their name and role are stored in
            Fisness under your account. Crew members can ask you, as the
            boat owner, to correct or remove their details at any time.
          </p>
        </Section>

        <Section number={12} title="Children's Privacy">
          <p>
            Fisness is a business tool for boat owners and crew aged 18+. We
            do not knowingly collect data from anyone under 18.
          </p>
        </Section>

        <Section number={13} title="Planned Features">
          <p>
            We plan to add push notifications (e.g. crew invite updates,
            sync reminders) and, later, in-app billing through a
            third-party payment gateway. Neither is live yet. When they
            ship, this policy will be updated to name the specific providers
            and describe exactly what they can access — we won&apos;t
            quietly expand data collection without updating this document
            first.
          </p>
        </Section>

        <Section number={14} title="Cookies (Website Only)">
          <p>
            Our website may use minimal cookies to keep the site functional
            and understand basic traffic. The app itself does not use
            cookies.
          </p>
        </Section>

        <Section number={15} title="No Sale of Data, No Tracking">
          <p>
            Fisness does not sell personal data, does not share data with
            data brokers, and does not track you across other companies&apos;
            apps or websites for advertising purposes.
          </p>
        </Section>

        <Section number={16} title="Changes to This Policy">
          <p>
            We&apos;ll update the date at the top of this page whenever this
            policy changes, and notify you in-app for any change that
            meaningfully affects how your data is handled.
          </p>
        </Section>

        <Section number={17} title="Governing Law">
          <p>This policy is governed by the laws of India.</p>
        </Section>

        <Section number={18} title="Contact Us">
          <p>Fisness</p>
          <p>Operated by Dipang Bhadrecha (Udyam Reg. No. UDYAM-GJ-11-0057704)</p>
          <p>
            <a href="mailto:support@fisness.com" className="text-teal hover:underline">
              support@fisness.com
            </a>
          </p>
        </Section>
      </div>

      <div className="pt-14 mt-14 border-t border-ink/[0.08]">
        <p className="font-mono text-sm text-teal tracking-wide mb-4">
          APPENDIX
        </p>
        <h2 className="font-display font-bold text-2xl text-ink mb-2">
          App Store Privacy Label Reference
        </h2>
        <p className="text-[15.5px] text-muted leading-[1.7] mb-4">
          For when you submit to Apple App Store / Google Play, this maps
          directly to their privacy questionnaires:
        </p>
        <DataTable
          head={["Data Type", "Collected?", "Linked to identity?", "Purpose", "Used for tracking?"]}
          rows={privacyLabel.map((r) => [
            r.type,
            r.collected,
            r.linked,
            r.purpose,
            r.tracking,
          ])}
        />
      </div>
    </main>
  );
}
