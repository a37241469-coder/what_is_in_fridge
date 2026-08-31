"use client";

import Link from "next/link";
import { getCategory, getIngredientsByCategory } from "@/lib/ingredients";
import { useFridge } from "@/context/fridge-context";
import { accentCheckClass, accentSolidClass } from "@/lib/theme";
import { SelectionDock } from "@/components/selection-dock";
import { AddCustomIngredient } from "@/components/add-custom-ingredient";

export function CategoryClient({ categoryId }: { categoryId: string }) {
  const category = getCategory(categoryId);
  const { selected, custom, toggle, removeCustom } = useFridge();

  if (!category) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-ink-soft">找不到這個分類。</p>
        <Link href="/fridge" className="mt-4 inline-block text-terracotta-deep underline">
          回冰箱分類
        </Link>
      </div>
    );
  }

  const items = getIngredientsByCategory(category.id);
  const customItems = custom.filter((item) => item.categoryId === category.id);
  const selectedInCategory =
    items.filter((i) => selected.has(i.id)).length + customItems.filter((i) => selected.has(i.id)).length;
  const totalInCategory = items.length + customItems.length;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 pb-32 sm:px-6 sm:py-12">
      <Link href="/fridge" className="text-sm text-ink-soft transition hover:text-ink">
        ← 回所有分類
      </Link>

      <div className="mt-4 mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">{category.name}</h1>
          <p className="mt-1 text-ink-soft">
            {category.description} · 已選 {selectedInCategory}/{totalInCategory}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item) => {
          const active = selected.has(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              aria-pressed={active}
              className={`glass-panel flex items-center justify-between gap-2 rounded-2xl px-4 py-3.5 text-left text-sm font-medium transition ${
                active ? `${accentSolidClass[category.accent]} border-transparent shadow-md` : "text-ink hover:-translate-y-0.5"
              }`}
            >
              <span>{item.name}</span>
              <span
                className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border text-xs ${
                  active ? accentCheckClass[category.accent] : "border-ink/20"
                }`}
              >
                {active ? "✓" : ""}
              </span>
            </button>
          );
        })}

        {customItems.map((item) => {
          const active = selected.has(item.id);
          return (
            <div key={item.id} className="relative">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-pressed={active}
                className={`glass-panel flex w-full items-center justify-between gap-2 rounded-2xl px-4 py-3.5 text-left text-sm font-medium transition ${
                  active ? `${accentSolidClass[category.accent]} border-transparent shadow-md` : "text-ink hover:-translate-y-0.5"
                }`}
              >
                <span className="truncate pr-1">{item.name}</span>
                <span
                  className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border text-xs ${
                    active ? accentCheckClass[category.accent] : "border-ink/20"
                  }`}
                >
                  {active ? "✓" : ""}
                </span>
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  removeCustom(item.id);
                }}
                aria-label={`移除 ${item.name}`}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink/70 text-[10px] text-cream shadow transition hover:bg-ink"
              >
                ×
              </button>
            </div>
          );
        })}

        <AddCustomIngredient categoryId={category.id} />
      </div>

      <SelectionDock />
    </div>
  );
}
