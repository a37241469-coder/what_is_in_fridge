"use client";

import Link from "next/link";
import { useFridge } from "@/context/fridge-context";
import { matchRecipes } from "@/lib/recipes";
import { resolveIngredient } from "@/lib/ingredients";
import { composeRecipes, encodeComposedId, type ComposedRecipe } from "@/lib/compose";
import type { Ingredient } from "@/lib/types";

export default function RecipesPage() {
  const { selected, custom, count } = useFridge();

  if (count === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">還沒有選食材</h1>
        <p className="mt-3 text-ink-soft">先回冰箱勾選手邊有的食材，我們才能幫你配對料理。</p>
        <Link
          href="/fridge"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-terracotta-deep"
        >
          去挑食材 →
        </Link>
      </div>
    );
  }

  const curated = matchRecipes(selected).filter((m) => m.isComplete);

  const selectedItems = Array.from(selected)
    .map((id) => resolveIngredient(id, custom))
    .filter((item): item is Ingredient => Boolean(item));
  const composed = composeRecipes(selectedItems);

  const hasAny = curated.length > 0 || composed.length > 0;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="mb-8">
        <span className="text-sm font-medium text-terracotta-deep">Step 3</span>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          用你選的食材，能做這些料理
        </h1>
        <p className="mt-2 text-ink-soft">只用你實際選到的食材搭配，不會出現手邊沒有的東西。</p>
      </div>

      {!hasAny ? (
        <div className="glass-panel rounded-3xl p-8 text-center">
          <p className="text-ink-soft">目前選的食材還不夠搭出一道菜。</p>
          <p className="mt-1 text-ink-soft">建議至少挑一款主食、蛋白質或蔬菜，我們就能幫你組合。</p>
          <Link
            href="/fridge"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-terracotta-deep"
          >
            回冰箱補選食材 →
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          {composed.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-lg font-semibold text-ink">為你搭配的組合</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {composed.map((recipe) => (
                  <ComposedCard key={recipe.id} recipe={recipe} custom={custom} />
                ))}
              </div>
            </section>
          )}

          {curated.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-lg font-semibold text-ink">經典食譜</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {curated.map((m) => (
                  <Link
                    key={m.recipe.id}
                    href={`/recipes/${m.recipe.id}`}
                    className="glass-panel flex flex-col gap-3 rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="text-xs text-ink-soft">
                      {m.recipe.difficulty} · {m.recipe.time}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-ink">{m.recipe.name}</h3>
                    <p className="text-sm text-ink-soft">{m.recipe.tagline}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      {m.recipe.requiredIds.map((id) => (
                        <span
                          key={id}
                          className="rounded-full border border-sage/40 bg-sage/10 px-2 py-0.5 text-xs text-sage-deep"
                        >
                          {resolveIngredient(id, custom)?.name}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function ComposedCard({ recipe, custom }: { recipe: ComposedRecipe; custom: Ingredient[] }) {
  return (
    <Link
      href={`/recipes/${encodeComposedId(recipe.id)}`}
      className="glass-panel flex flex-col gap-3 rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <span className="text-xs text-ink-soft">
        {recipe.difficulty} · {recipe.time}
      </span>
      <h3 className="font-display text-xl font-semibold text-ink">{recipe.name}</h3>
      <p className="text-sm text-ink-soft">{recipe.tagline}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {recipe.usedIds.map((id) => (
          <span
            key={id}
            className="rounded-full border border-sage/40 bg-sage/10 px-2 py-0.5 text-xs text-sage-deep"
          >
            {resolveIngredient(id, custom)?.name}
          </span>
        ))}
      </div>
    </Link>
  );
}
