import { Download } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { heroRotatingWords } from "@/data/nav";

export function Hero() {
  return (
    <section className="relative text-center">
      <div className="relative max-w-[920px] mx-auto px-6 pt-[88px]">
        <h1 className="font-display font-bold text-[clamp(46px,7.4vw,90px)] leading-[1.0] tracking-[-0.035em] mb-14 text-balance">
          <span className="inline-flex items-baseline gap-[0.28em] justify-center flex-wrap">
            <span className="text-gradient-flow animate-gradFlow">Fish +</span>
            <span className="inline-block h-[1em] overflow-hidden align-bottom">
              <span className="flex flex-col animate-wordRotate">
                {heroRotatingWords.map((word, i) => (
                  <span key={`${word}-${i}`} className="h-[1em] leading-[1em] block">
                    {word}
                  </span>
                ))}
              </span>
            </span>
          </span>
          <span className="block mt-4 md:mt-5 text-[0.72em] font-medium tracking-normal [word-spacing:0.14em]">All in your phone.</span>
        </h1>
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          <Button
            href="https://play.google.com/store/apps/details?id=com.fisness.app"
            target="_blank"
            rel="noopener noreferrer"
            icon={Download}
          >
            Download the app
          </Button>
        </div>
      </div>
    </section>
  );
}
