"use client";

import { useEffect, useState } from "react";

export function RecipeImage({
  recipeId,
  name,
  tagline,
}: {
  recipeId: string;
  name: string;
  tagline: string;
}) {
  const [result, setResult] = useState<{ forId: string; status: "ready" | "error"; url?: string } | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;

    fetch("/api/recipe-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: recipeId, name, tagline }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("failed");
        const data: { url: string } = await res.json();
        if (!cancelled) setResult({ forId: recipeId, status: "ready", url: data.url });
      })
      .catch(() => {
        if (!cancelled) setResult({ forId: recipeId, status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [recipeId, name, tagline]);

  const current = result?.forId === recipeId ? result : null;

  if (current?.status === "error") return null;

  return (
    <div className="mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-ink/5">
      {current?.status === "ready" && current.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={current.url} alt={`${name} 料理示意圖`} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center gap-2 text-sm text-ink-soft">
          <span className="h-2 w-2 animate-pulse rounded-full bg-ink-soft/50" />
          AI 生成料理示意圖中…
        </div>
      )}
    </div>
  );
}
