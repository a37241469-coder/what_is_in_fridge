import Link from "next/link";
import { FridgeHero } from "@/components/fridge-hero";
import { ParallaxLayer } from "@/components/parallax-layer";
import { categories, ingredients } from "@/lib/ingredients";
import { recipes } from "@/lib/recipes";

const steps = [
  {
    n: "1",
    title: "打開冰箱，勾選食材",
    body: "依分類快速勾選手邊實際有的食材，隨時可以再回來補選。",
    href: "/fridge",
    speed: -0.06,
  },
  {
    n: "2",
    title: "確認購物車",
    body: "一眼看清所有已選食材，點一下就能移除選錯的項目。",
    href: "/cart",
    speed: 0.05,
  },
  {
    n: "3",
    title: "挑一道現成食譜",
    body: "只用你實際擁有的食材配對料理，直接附上完整做法。",
    href: "/recipes",
    speed: -0.06,
  },
] as const;

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
        {/* Decorative depth layer — drifts at a different rate than the page while scrolling */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <ParallaxLayer speed={0.12} className="absolute -left-16 top-0 sm:-left-10">
            <div className="h-56 w-56 rounded-full bg-sage/25 blur-3xl sm:h-72 sm:w-72" />
          </ParallaxLayer>
          <ParallaxLayer speed={-0.16} className="absolute -right-12 top-24 hidden sm:block">
            <div className="h-64 w-64 rounded-full bg-terracotta/20 blur-3xl" />
          </ParallaxLayer>
          <ParallaxLayer speed={0.2} className="absolute bottom-0 left-1/3">
            <div className="h-48 w-48 rounded-full bg-butter/25 blur-3xl sm:h-60 sm:w-60" />
          </ParallaxLayer>
        </div>

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 text-center sm:gap-12">
          <div className="flex flex-col items-center gap-4 sm:gap-5">
            <span className="rounded-full border border-ink/10 bg-white/50 px-4 py-1.5 text-xs tracking-wide text-ink-soft backdrop-blur sm:text-sm">
              打開冰箱，開始找靈感
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
              冰箱裡有什麼？
            </h1>
            <p className="max-w-xl text-balance text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
              勾選手邊有的食材，交給我們配對能做的家常菜，
              <br className="hidden sm:block" />
              直接附上完整食譜，不用再煩惱今天吃什麼。
            </p>
          </div>

          <ParallaxLayer speed={0.04}>
            <FridgeHero />
          </ParallaxLayer>

          <Link
            href="/fridge"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream shadow-lg shadow-ink/20 transition hover:bg-terracotta-deep sm:px-7 sm:text-base"
          >
            打開冰箱看看
            <span aria-hidden>→</span>
          </Link>

          <div className="grid w-full max-w-md grid-cols-3 gap-2.5 sm:gap-6">
            <StatChip value={`${recipes.length}`} label="道家常食譜" />
            <StatChip value={`${categories.length}`} label="大食材分類" />
            <StatChip value={`${ingredients.length}+`} label="種常備食材" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/40 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">怎麼用？三步驟就好</h2>
            <p className="mt-2 text-sm text-ink-soft sm:text-base">
              從勾選食材到端上桌，全程不用再想「今天要煮什麼」。
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-6">
            {steps.map((step) => (
              <ParallaxLayer key={step.n} speed={step.speed}>
                <Link
                  href={step.href}
                  className="glass-panel group flex h-full flex-col gap-3 rounded-3xl p-6 text-left transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-cream">
                    {step.n}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="text-sm leading-6 text-ink-soft">{step.body}</p>
                </Link>
              </ParallaxLayer>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-panel flex flex-col items-center gap-1 rounded-2xl px-3 py-3.5 sm:px-7 sm:py-4">
      <span className="font-display text-xl font-semibold text-ink sm:text-2xl">{value}</span>
      <span className="text-[11px] text-ink-soft sm:text-xs">{label}</span>
    </div>
  );
}
