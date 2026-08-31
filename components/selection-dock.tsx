"use client";

import Link from "next/link";
import { useFridge } from "@/context/fridge-context";

export function SelectionDock({
  href = "/cart",
  label = "查看購物車 →",
}: {
  href?: string;
  label?: string;
}) {
  const { count, hydrated, clear } = useFridge();

  if (!hydrated || count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 sm:bottom-6">
      <div className="glass-panel-deep flex max-w-full items-center gap-2 rounded-full px-3.5 py-2.5 sm:gap-4 sm:px-5 sm:py-3">
        <span className="whitespace-nowrap text-xs font-medium text-ink sm:text-sm">
          已選 <span className="text-terracotta-deep">{count}</span> 項
        </span>
        <button
          type="button"
          onClick={clear}
          className="whitespace-nowrap text-xs text-ink-soft underline decoration-dotted underline-offset-2 hover:text-ink"
        >
          清空
        </button>
        <Link
          href={href}
          className="whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-cream transition hover:bg-terracotta-deep sm:px-4 sm:py-2 sm:text-sm"
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
