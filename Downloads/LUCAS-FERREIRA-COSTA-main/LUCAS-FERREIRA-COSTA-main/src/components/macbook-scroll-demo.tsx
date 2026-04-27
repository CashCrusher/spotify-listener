import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function MacbookScrollDemo() {
  return (
    <div className="w-full overflow-hidden bg-bg-light border-y border-border-light">
      <MacbookScroll
        title={
          <h2 className="font-display font-bold text-[clamp(2rem,5vw,4.5rem)] tracking-tighter leading-[0.9]">
            <span className="block text-primary">Concevoir le futur de la</span>
            <span className="block text-accent mt-2">digitalisation B2B.</span>
          </h2>
        }
        badge={
          <div className="h-10 w-10 -rotate-12 transform bg-primary rounded-xl flex items-center justify-center text-white font-bold shadow-2xl overflow-hidden">
            <span className="text-[10px] font-mono tracking-tighter">PREMIUM</span>
          </div>
        }
        src="/lucas-mac.png"
        onError={(e: any) => {
          e.target.src = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1000";
        }}
        showGradient={false}
      />
    </div>
  );
}
