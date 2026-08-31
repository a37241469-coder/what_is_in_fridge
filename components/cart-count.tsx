"use client";

import { useFridge } from "@/context/fridge-context";

export function CartCount() {
  const { count, hydrated } = useFridge();

  if (!hydrated || count === 0) return null;

  return (
    <span className="rounded-full bg-terracotta px-2 py-0.5 text-xs font-medium text-cream">
      {count}
    </span>
  );
}
