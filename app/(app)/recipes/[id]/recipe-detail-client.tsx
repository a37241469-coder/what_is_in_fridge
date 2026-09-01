"use client";

import Link from "next/link";
import { getRecipe } from "@/lib/recipes";
import { composeRecipeFromId, decodeComposedId } from "@/lib/compose";
import { resolveIngredient } from "@/lib/ingredients";
import { useFridge } from "@/context/fridge-context";
import { RecipeImage } from "@/components/recipe-image";

export function RecipeDetailClient({ id }: { id: string }) {
  const { selected, custom } = useFridge();

  const curated = getRecipe(id);
  const canonicalId = curated ? null : decodeComposedId(id);
  const composed = canonicalId
    ? composeRecipeFromId(canonicalId, (ingredientId) => resolveIngredient(ingredientId, custom))
    : null;

  if (!curated && !composed) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="text-ink-soft">找不到這道食譜。</p>
        <Link href="/recipes" className="mt-4 inline-block text-terracotta-deep underline">
          回料理列表
        </Link>
      </div>
    );
  }

  const name = curated?.name ?? composed!.name;
  const tagline = curated?.tagline ?? composed!.tagline;
  const time = curated?.time ?? composed!.time;
  const servings = curated?.servings ?? composed!.servings;
  const difficulty = curated?.difficulty ?? composed!.difficulty;
  const steps = curated?.steps ?? composed!.steps;
  const tip = curated?.tip;
  const optionalIds = curated?.optionalIds ?? [];
  const allIds = curated ? [...curated.requiredIds, ...optionalIds] : composed!.usedIds;
  const missing = curated
    ? curated.requiredIds.filter((ingredientId) => !selected.has(ingredientId))
    : composed!.usedIds.filter((ingredientId) => !selected.has(ingredientId));

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 pb-20 sm:px-6 sm:py-12">
      <Link href="/recipes" className="text-sm text-ink-soft transition hover:text-ink">
        ← 回料理列表
      </Link>

      <div className="mt-4 glass-panel-deep rounded-3xl p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-soft">
          <span className="rounded-full bg-ink/5 px-2.5 py-1">{difficulty}</span>
          <span className="rounded-full bg-ink/5 px-2.5 py-1">{time}</span>
          <span className="rounded-full bg-ink/5 px-2.5 py-1">{servings}</span>
          {composed && (
            <span className="rounded-full bg-sage/15 px-2.5 py-1 font-medium text-sage-deep">依你的食材現搭</span>
          )}
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">{name}</h1>
        <p className="mt-2 text-ink-soft">{tagline}</p>

        {missing.length > 0 && (
          <div className="mt-5 rounded-2xl border border-butter/40 bg-butter/10 px-4 py-3 text-sm text-wheat-deep">
            還缺 {missing.map((ingredientId) => resolveIngredient(ingredientId, custom)?.name).join("、")}
            ，可以先省略或用手邊的湊著做，也能{" "}
            <Link href="/fridge" className="underline">
              回冰箱補上
            </Link>
            。
          </div>
        )}

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">食材</h2>
            <ul className="mt-3 space-y-2">
              {allIds.map((ingredientId) => {
                const ing = resolveIngredient(ingredientId, custom);
                const has = selected.has(ingredientId);
                const optional = optionalIds.includes(ingredientId);
                return (
                  <li key={ingredientId} className="flex items-center gap-2 text-sm">
                    <span
                      className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border text-xs ${
                        has ? "border-sage-deep bg-sage text-cream" : "border-ink/20 text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                    <span className={has ? "text-ink" : "text-ink-soft"}>
                      {ing?.name ?? "未知食材"}
                      {optional ? "（可選）" : ""}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">做法</h2>
            <RecipeImage recipeId={id} name={name} tagline={tagline} />
            <ol className="mt-3 space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-6 text-ink">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-terracotta/15 text-xs font-semibold text-terracotta-deep">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            {tip && <p className="mt-6 rounded-2xl bg-sage/10 px-4 py-3 text-sm text-sage-deep">💡 {tip}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
