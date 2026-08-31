"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function FridgeHero() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  function handleOpen() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => router.push("/fridge"), 600);
  }

  return (
    <button
      type="button"
      onClick={handleOpen}
      aria-label="打開冰箱，開始挑選食材"
      className="group relative mx-auto block h-[300px] w-[210px] cursor-pointer select-none [perspective:1200px] sm:h-[360px] sm:w-[250px]"
    >
      {/* Cabinet */}
      <div className="absolute inset-0 rounded-[28px] bg-linear-to-b from-sage to-sage-deep shadow-[0_30px_60px_-18px_rgba(44,42,34,0.4)]" />

      {/* Interior, revealed once the door swings open */}
      <div className="absolute inset-[9px] overflow-hidden rounded-[20px] bg-linear-to-b from-ink-soft/25 to-ink/40">
        <div className="absolute inset-x-3 top-[30%] h-px bg-white/15" />
        <div className="absolute inset-x-3 top-[58%] h-px bg-white/15" />
        <div className="absolute inset-x-3 top-[82%] h-px bg-white/15" />
        <span className="absolute left-4 top-[16%] h-5 w-5 rounded-full bg-terracotta shadow-sm" />
        <span className="absolute right-5 top-[18%] h-4 w-6 rounded-full bg-butter shadow-sm" />
        <span className="absolute left-5 top-[38%] h-4 w-9 rounded-full bg-sage shadow-sm" />
        <span className="absolute right-4 top-[62%] h-7 w-4 rounded-md bg-cream/80 shadow-sm" />
        <span className="absolute left-6 top-[86%] h-4 w-7 rounded-full bg-terracotta-deep shadow-sm" />
      </div>

      {/* Door, hinged on the left edge like a real fridge */}
      <div
        className={`absolute inset-[9px] origin-left rounded-[20px] border border-white/20 bg-linear-to-b from-butter/60 via-cream to-cream shadow-[8px_0_24px_-8px_rgba(44,42,34,0.35)] transition-transform duration-700 ease-in-out [backface-visibility:hidden] ${
          opening ? "[transform:rotateY(-112deg)]" : "group-hover:[transform:rotateY(-14deg)]"
        }`}
      >
        <div className="absolute left-3 right-3 top-[30%] h-[3px] rounded-full bg-black/10" />
        <span className="absolute right-3 top-1/2 h-16 w-[6px] -translate-y-1/2 rounded-full bg-ink/70 shadow-sm sm:h-20" />
      </div>
    </button>
  );
}
