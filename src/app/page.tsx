import { CTA } from "@/components/sections/CTA";
import { EncryptionShowcase } from "@/components/sections/EncryptionShowcase";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <EncryptionShowcase />
      <Features />
      <TechStack />
      <CTA />
    </main>
  );
}
