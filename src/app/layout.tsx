import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "Fisness — Fish + business, all in your phone",
  description:
    "Fisness digitises every boat, trip and tali bill — from crew advances to season profit. Offline-first, end-to-end encrypted.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body bg-cream text-ink min-h-screen">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
