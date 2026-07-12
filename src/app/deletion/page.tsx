import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete Your Account — Fisness",
  description:
    "How to delete your Fisness account and what happens to your data — in-app deletion, request-by-email, and our data retention timeline.",
};

const dataFate = [
  {
    type: "Phone number & account profile",
    fate: "Permanently deleted",
  },
  {
    type: "Sealed business records (boats, crew, trips, tali, ledger)",
    fate: "Permanently deleted",
  },
  {
    type: "Server logs (IP, device info)",
    fate: "Deleted or anonymized on the same cycle",
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

function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
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

export default function DeletionPage() {
  return (
    <main className="max-w-[840px] mx-auto px-6 pt-20 pb-24">
      <p className="font-mono text-sm text-teal tracking-wide mb-4">
        LAST UPDATED: JULY 12, 2026
      </p>
      <h1 className="font-display font-bold text-[clamp(33px,4.2vw,48px)] tracking-[-0.03em] leading-[1.05] mb-8">
        Delete Your Fisness Account
      </h1>

      <div className="rounded-2xl bg-teal/[0.06] border border-teal/[0.15] px-6 py-5 mb-14">
        <p className="font-mono text-xs text-teal tracking-wide mb-2">
          IN SHORT
        </p>
        <p className="text-[15.5px] text-ink/80 leading-[1.7]">
          You can delete your Fisness account and all associated data either
          directly in the app or by emailing our support team. Once a
          deletion request is confirmed, your account and data are
          permanently removed within 7 days.
        </p>
      </div>

      <div className="divide-y divide-ink/[0.08]">
        <Section number={1} title="Delete In-App">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Open the Fisness app and log in</li>
            <li>Go to Profile → Settings</li>
            <li>Tap &quot;Delete Account&quot;</li>
            <li>Confirm via the OTP sent to your registered phone number</li>
          </ol>
          <p>
            Your account is deactivated immediately, and full deletion
            completes within 7 days as described in Section 3.
          </p>
        </Section>

        <Section number={2} title="Delete by Request (Email)">
          <p>
            If you can&apos;t access the app, email{" "}
            <a
              href="mailto:support@fisness.com"
              className="text-teal hover:underline"
            >
              support@fisness.com
            </a>{" "}
            with the subject line &quot;Delete My Account&quot; and include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your registered phone number</li>
            <li>Your name</li>
            <li>
              Any other basic account details that help us locate and verify
              your account (e.g. boat name, account creation date)
            </li>
          </ul>
          <p>
            We use this to confirm the request is really yours before
            deleting anything. We&apos;ll respond to confirm once the request
            is verified and processed.
          </p>
        </Section>

        <Section number={3} title="What Gets Deleted">
          <p>
            Once a deletion request is confirmed, everything below is removed
            within 7 days:
          </p>
          <DataTable
            head={["Data", "What happens"]}
            rows={dataFate.map((d) => [d.type, d.fate])}
          />
          <p>
            This is permanent — deleted accounts and data cannot be
            recovered. If you just want a break, consider not deleting; there
            is currently no separate &quot;deactivate&quot; option.
          </p>
        </Section>

        <Section number={4} title="Questions">
          <p>
            For anything else about account deletion or your data, see our{" "}
            <a href="/privacy-policy" className="text-teal hover:underline">
              Privacy Policy
            </a>{" "}
            or email{" "}
            <a
              href="mailto:support@fisness.com"
              className="text-teal hover:underline"
            >
              support@fisness.com
            </a>
            .
          </p>
        </Section>
      </div>
    </main>
  );
}
