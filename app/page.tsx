import Link from "next/link";
import { FridgeHero } from "@/components/fridge-hero";
import { categories, ingredients } from "@/lib/ingredients";
import { recipes } from "@/lib/recipes";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-5">
          <span className="rounded-full border border-ink/10 bg-white/50 px-4 py-1.5 text-sm tracking-wide text-ink-soft backdrop-blur">
            打開冰箱，開始找靈感
          </span>
          <h1 className="text-balance font-display text-5xl font-semibold leading-tight text-ink sm:text-6xl">
            冰箱裡有什麼？
          </h1>
          <p className="max-w-xl text-balance text-lg leading-8 text-ink-soft">
            勾選手邊有的食材，交給我們配對能做的家常菜，
            <br className="hidden sm:block" />
            直接附上完整食譜，不用再煩惱今天吃什麼。
          </p>
        </div>

        <FridgeHero />

        <Link
          href="/fridge"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-base font-medium text-cream shadow-lg shadow-ink/20 transition hover:bg-terracotta-deep"
        >
          打開冰箱看看
          <span aria-hidden>→</span>
        </Link>

        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          <StatChip value={`${recipes.length}`} label="道家常食譜" />
          <StatChip value={`${categories.length}`} label="大食材分類" />
          <StatChip value={`${ingredients.length}+`} label="種常備食材" />
        </div>
      </div>
    </main>
  );
}

function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-panel flex flex-col items-center gap-1 rounded-2xl px-5 py-4 sm:px-7">
      <span className="font-display text-2xl font-semibold text-ink">{value}</span>
      <span className="text-xs text-ink-soft">{label}</span>
    </div>
  );
}
