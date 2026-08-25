import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Fisness — Fish + business, all in your phone",
  description:
    "Fisness digitises every boat, trip and tali bill — from crew advances to season profit. Offline-first, end-to-end encrypted.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
