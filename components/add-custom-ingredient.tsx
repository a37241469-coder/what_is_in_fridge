"use client";

import { useState, type FormEvent } from "react";
import { useFridge } from "@/context/fridge-context";
import type { CategoryId } from "@/lib/types";

export function AddCustomIngredient({ categoryId }: { categoryId: CategoryId }) {
  const { addCustom } = useFridge();
  const [adding, setAdding] = useState(false);
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setAdding(false);
      return;
    }
    addCustom(categoryId, trimmed);
    setValue("");
  }

  if (adding) {
    return (
      <form
        onSubmit={handleSubmit}
        className="glass-panel flex items-center gap-2 rounded-2xl px-3.5 py-2.5"
      >
        <input
          autoFocus
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={() => {
            if (!value.trim()) setAdding(false);
          }}
          placeholder="輸入食材名稱"
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-ink placeholder:text-ink-soft/70 focus:outline-none"
        />
        <button
          type="submit"
          className="flex-none rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-cream transition hover:bg-terracotta-deep"
        >
          新增
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setAdding(true)}
      className="flex items-center justify-center gap-1.5 rounded-2xl border border-dashed border-ink/25 px-4 py-3.5 text-sm font-medium text-ink-soft transition hover:border-ink/40 hover:text-ink"
    >
      <span aria-hidden>＋</span>
      其他
    </button>
  );
}
