import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/40 bg-cream/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 px-6 py-8 text-sm text-ink-soft sm:flex-row sm:justify-between">
        <p className="font-display text-ink">冰箱裡有什麼</p>
        <nav className="flex items-center gap-5">
          <Link href="/fridge" className="transition hover:text-ink">
            挑食材
          </Link>
          <Link href="/recipes" className="transition hover:text-ink">
            看料理
          </Link>
          <Link href="/cart" className="transition hover:text-ink">
            購物車
          </Link>
        </nav>
        <p className="text-xs text-ink-soft/70">&copy; {new Date().getFullYear()} 冰箱裡有什麼</p>
      </div>
    </footer>
  );
}
