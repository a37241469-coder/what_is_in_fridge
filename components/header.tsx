import Link from "next/link";
import { CartCount } from "./cart-count";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-cream/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex-none font-display text-base font-semibold text-ink sm:text-lg">
          冰箱裡有什麼
        </Link>
        <nav className="flex items-center gap-3 text-xs text-ink-soft sm:gap-5 sm:text-sm">
          <Link href="/fridge" className="transition hover:text-ink">
            挑食材
          </Link>
          <Link href="/cart" className="flex items-center gap-1.5 transition hover:text-ink">
            購物車
            <CartCount />
          </Link>
          <Link href="/recipes" className="transition hover:text-ink">
            看料理
          </Link>
        </nav>
      </div>
    </header>
  );
}
