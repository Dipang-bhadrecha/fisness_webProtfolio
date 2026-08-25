import type { Metadata } from "next";

import "./globals.css";

// A generic fallback — the routes that actually render (the (marketing)
// group, admin/) each set their own title via their own layout's metadata,
// which Next.js merges over this. This only surfaces if something renders
// with neither (e.g. a genuinely route-less error boundary).
export const metadata: Metadata = {
  title: "Fisness",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body bg-cream text-ink min-h-screen">
        {children}
      </body>
    </html>
  );
}
