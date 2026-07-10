import { Download } from "lucide-react";

import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="max-w-[1240px] mx-auto px-6 mt-24">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-teal to-[#0b5960] py-16 px-6 md:px-12 text-center">
        <div className="absolute -top-[30%] -left-[8%] w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(232,158,90,0.4),transparent_62%)] pointer-events-none" />
        <div className="absolute -bottom-[40%] -right-[6%] w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(140,220,225,0.35),transparent_62%)] pointer-events-none" />
        <div className="relative">
          <h2 className="font-display font-bold text-[clamp(31px,4.2vw,46px)] tracking-[-0.03em] leading-[1.08] mb-8 text-white">
            Bring your whole fleet on board.
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="#" icon={Download} variant="light" shape="pill">
              Download the app
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
