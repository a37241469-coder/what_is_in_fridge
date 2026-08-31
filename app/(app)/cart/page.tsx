"use client";

import Link from "next/link";
import { categories, getIngredientsByCategory } from "@/lib/ingredients";
import { useFridge } from "@/context/fridge-context";
import { accentSoftBadgeClass } from "@/lib/theme";
import { SelectionDock } from "@/components/selection-dock";

export default function CartPage() {
  const { selected, custom, toggle, count } = useFridge();

  if (count === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">購物車還是空的</h1>
        <p className="mt-3 text-ink-soft">去冰箱勾選手邊有的食材，加進購物車。</p>
        <Link
          href="/fridge"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-terracotta-deep"
        >
          去挑食材 →
        </Link>
      </div>
    );
  }

  const sections = categories
    .map((category) => {
      const items = [...getIngredientsByCategory(category.id), ...custom.filter((c) => c.categoryId === category.id)].filter(
        (item) => selected.has(item.id)
      );
      return { category, items };
    })
    .filter((section) => section.items.length > 0);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 pb-32">
      <div className="mb-8">
        <span className="text-sm font-medium text-terracotta-deep">Step 2</span>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">你的購物車</h1>
        <p className="mt-2 text-ink-soft">
          共選了 {count} 項食材，確認沒問題就去看能做的料理。點食材可以直接移除。
        </p>
      </div>

      <div className="space-y-6">
        {sections.map(({ category, items }) => (
          <div key={category.id} className="glass-panel rounded-3xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">{category.name}</h2>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${accentSoftBadgeClass[category.accent]}`}>
                {items.length} 項
              </span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="group flex items-center gap-1.5 rounded-full border border-ink/15 bg-white/50 px-3 py-1.5 text-sm text-ink transition hover:border-terracotta/50 hover:bg-terracotta/10"
                  >
                    {item.name}
                    <span aria-hidden className="text-ink-soft transition group-hover:text-terracotta-deep">
                      ×
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SelectionDock href="/recipes" label="看能做的料理 →" />
    </div>
  );
}
