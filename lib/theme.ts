import type { Accent } from "./types";

// Tailwind scans this file's source text for these literal class names,
// so dynamic `text-${accent}` template strings are avoided on purpose.
export const accentTextClass: Record<Accent, string> = {
  terracotta: "text-terracotta-deep",
  ocean: "text-ocean-deep",
  butter: "text-butter-deep",
  wheat: "text-wheat-deep",
  sage: "text-sage-deep",
  berry: "text-berry-deep",
};

export const accentSolidClass: Record<Accent, string> = {
  terracotta: "bg-terracotta text-cream",
  ocean: "bg-ocean text-cream",
  butter: "bg-butter text-ink",
  wheat: "bg-wheat text-cream",
  sage: "bg-sage text-cream",
  berry: "bg-berry text-cream",
};

export const accentCheckClass: Record<Accent, string> = {
  terracotta: "border-cream/70 bg-cream/20",
  ocean: "border-cream/70 bg-cream/20",
  butter: "border-ink/30 bg-ink/10",
  wheat: "border-cream/70 bg-cream/20",
  sage: "border-cream/70 bg-cream/20",
  berry: "border-cream/70 bg-cream/20",
};

export const accentSoftBadgeClass: Record<Accent, string> = {
  terracotta: "bg-terracotta/15 text-terracotta-deep",
  ocean: "bg-ocean/15 text-ocean-deep",
  butter: "bg-butter/20 text-butter-deep",
  wheat: "bg-wheat/15 text-wheat-deep",
  sage: "bg-sage/15 text-sage-deep",
  berry: "bg-berry/15 text-berry-deep",
};
