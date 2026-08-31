"use client";

import Link from "next/link";
import { categories, getIngredientsByCategory } from "@/lib/ingredients";
import { useFridge } from "@/context/fridge-context";
import { CategoryIcon } from "@/components/category-icon";
import { SelectionDock } from "@/components/selection-dock";
import { accentSoftBadgeClass, accentTextClass } from "@/lib/theme";

export default function FridgePage() {
  const { selected, custom, hydrated } = useFridge();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 pb-32 sm:px-6 sm:py-12">
      <div className="mb-10 flex flex-col gap-2">
        <span className="text-sm font-medium text-terracotta-deep">Step 1</span>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          你的冰箱裡有哪些分類？
        </h1>
        <p className="text-ink-soft">先選一個分類，再勾選裡面實際有的食材，可以重複進出每個分類。</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const items = getIngredientsByCategory(category.id);
          const customItems = custom.filter((i) => i.categoryId === category.id);
          const selectedCount = hydrated
            ? items.filter((i) => selected.has(i.id)).length +
              customItems.filter((i) => selected.has(i.id)).length
            : 0;

          return (
            <Link
              key={category.id}
              href={`/fridge/${category.id}`}
              className="glass-panel group flex flex-col gap-4 rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <CategoryIcon id={category.id} className={`h-9 w-9 ${accentTextClass[category.accent]}`} />
                {selectedCount > 0 && (
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${accentSoftBadgeClass[category.accent]}`}>
                    已選 {selectedCount}
                  </span>
                )}
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">{category.name}</h2>
                <p className="mt-1 text-sm text-ink-soft">{category.description}</p>
              </div>
              <span className="mt-auto text-sm font-medium text-ink-soft transition group-hover:text-ink">
                查看食材 →
              </span>
            </Link>
          );
        })}
      </div>

      <SelectionDock />
    </div>
  );
}
