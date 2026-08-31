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
    <div className="fixed inset-x-0 bottom-6 z-30 flex justify-center px-4">
      <div className="glass-panel-deep flex items-center gap-4 rounded-full px-5 py-3">
        <span className="text-sm font-medium text-ink">
          已選 <span className="text-terracotta-deep">{count}</span> 項食材
        </span>
        <button
          type="button"
          onClick={clear}
          className="text-xs text-ink-soft underline decoration-dotted underline-offset-2 hover:text-ink"
        >
          清空
        </button>
        <Link
          href={href}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream transition hover:bg-terracotta-deep"
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
