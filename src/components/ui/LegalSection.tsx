/** Numbered section + simple table used by the legal pages (privacy policies, deletion). */

export function LegalSection({
  number,
  title,
  id,
  children,
}: {
  number: number;
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="pt-10 first:pt-0 scroll-mt-28">
      <h2 className="font-display font-bold text-2xl text-ink mb-4">
        {number}. {title}
      </h2>
      <div className="space-y-4 text-[15.5px] text-muted leading-[1.7]">
        {children}
      </div>
    </section>
  );
}

export function LegalTable({ head, rows }: { head: string[]; rows: string[][] }) {
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
