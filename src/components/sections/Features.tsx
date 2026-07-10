import { FeatureCoverflow } from "@/components/ui/FeatureCoverflow";

export function Features() {
  return (
    <section id="features" className="max-w-[1240px] mx-auto px-6 pt-14 pb-10 scroll-mt-24">
      <div className="text-center max-w-[900px] mx-auto mb-6">
        <h2 className="font-display font-semibold text-[clamp(32px,4.4vw,48px)] tracking-[-0.02em] leading-[1.12]">
          Everything to run your fishing business.
        </h2>
      </div>

      <FeatureCoverflow />
    </section>
  );
}
