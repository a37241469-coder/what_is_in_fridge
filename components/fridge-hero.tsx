"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function FridgeHero() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  function handleOpen() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => router.push("/fridge"), 480);
  }

  return (
    <button
      type="button"
      onClick={handleOpen}
      aria-label="打開冰箱，開始挑選食材"
      className="group relative mx-auto block h-[300px] w-[210px] cursor-pointer select-none sm:h-[360px] sm:w-[250px]"
    >
      <div className="absolute inset-0 rounded-[28px] bg-linear-to-b from-sage to-sage-deep shadow-[0_30px_60px_-18px_rgba(44,42,34,0.4)]" />
      <div className="absolute inset-[9px] rounded-[20px] bg-linear-to-b from-butter/60 via-cream to-cream" />
      <div className="absolute left-4 right-4 top-[33%] h-[3px] rounded-full bg-black/10" />

      <div
        className={`absolute left-[9px] right-[9px] top-[9px] h-[calc(33%-9px)] rounded-t-[20px] rounded-b-[6px] border border-white/20 bg-linear-to-b from-sage to-sage-deep shadow-inner transition-all duration-500 ease-out ${
          opening ? "-translate-y-8 -rotate-3 opacity-0" : "group-hover:-translate-y-1"
        }`}
      >
        <span className="absolute right-3 top-1/2 h-7 w-[6px] -translate-y-1/2 rounded-full bg-cream/85" />
      </div>

      <div
        className={`absolute bottom-[9px] left-[9px] top-[calc(33%+4px)] w-[calc(50%-11px)] rounded-bl-[20px] rounded-tl-[6px] border border-white/20 bg-linear-to-b from-sage to-sage-deep transition-all duration-500 ease-out ${
          opening ? "-translate-x-10 -rotate-6 opacity-0" : "group-hover:-translate-x-1"
        }`}
      >
        <span className="absolute right-2 top-1/2 h-9 w-[6px] -translate-y-1/2 rounded-full bg-cream/85" />
      </div>

      <div
        className={`absolute bottom-[9px] right-[9px] top-[calc(33%+4px)] w-[calc(50%-11px)] rounded-br-[20px] rounded-tr-[6px] border border-white/20 bg-linear-to-b from-sage to-sage-deep transition-all duration-500 ease-out ${
          opening ? "translate-x-10 rotate-6 opacity-0" : "group-hover:translate-x-1"
        }`}
      >
        <span className="absolute left-2 top-1/2 h-9 w-[6px] -translate-y-1/2 rounded-full bg-cream/85" />
      </div>
    </button>
  );
}
