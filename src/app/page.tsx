import { CTA } from "@/components/sections/CTA";
import { EncryptionShowcase } from "@/components/sections/EncryptionShowcase";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <EncryptionShowcase />
      <CTA />
    </main>
  );
}
