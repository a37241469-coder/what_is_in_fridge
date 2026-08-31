import type { Difficulty, Ingredient } from "./types";

export interface ComposedRecipe {
  id: string;
  name: string;
  tagline: string;
  time: string;
  servings: string;
  difficulty: Difficulty;
  usedIds: string[];
  steps: string[];
  tip?: string;
}

type Role = "protein" | "egg" | "carb" | "vegetable" | "aromatic" | "fruit";

// Aromatics season a dish but don't headline its name (e.g. nobody
// calls a stir-fry "garlic ginger beef", they call it "beef stir-fry").
const AROMATIC_IDS = new Set(["scallion", "garlic", "ginger", "chili"]);
const CARB_IDS = new Set(["rice", "pasta", "noodle", "bread", "potato", "sweetPotato", "vermicelli", "oat"]);

// Edamame is a legume side/mix-in in practice (毛豆炒飯, 涼拌毛豆), never
// a headline protein on its own, so it's bucketed with vegetables rather
// than lumped in with meat/seafood/tofu — that's what used to produce
// nonsense like "seared edamame, tilapia & tofu" as one dish.
function roleOf(item: Ingredient): Role {
  if (item.id === "egg") return "egg";
  if (item.id === "edamame") return "vegetable";
  if (item.categoryId === "fruit") return "fruit";
  if (CARB_IDS.has(item.id)) return "carb";
  if (item.categoryId === "meat" || item.categoryId === "seafood" || item.categoryId === "eggTofu") return "protein";
  if (item.categoryId === "vegetable") return AROMATIC_IDS.has(item.id) ? "aromatic" : "vegetable";
  return "vegetable";
}

interface Buckets {
  protein: Ingredient[];
  egg: Ingredient[];
  carb: Ingredient[];
  vegetable: Ingredient[];
  aromatic: Ingredient[];
  fruit: Ingredient[];
}

function bucketize(items: Ingredient[]): Buckets {
  const buckets: Buckets = { protein: [], egg: [], carb: [], vegetable: [], aromatic: [], fruit: [] };
  for (const item of items) buckets[roleOf(item)].push(item);
  return buckets;
}

// Dish titles stay short (capped), but step text always lists every
// ingredient actually used (no cap) — a title never trails off with a
// vague "etc.", and the method never silently drops something you
// selected.
function names(items: Ingredient[], max?: number) {
  const list = max ? items.slice(0, max) : items;
  return list.map((i) => i.name).join("、");
}

function nameJoin(items: Ingredient[], max?: number) {
  const list = max ? items.slice(0, max) : items;
  return list.map((i) => i.name).join("");
}

function usedIdsOf(...groups: Ingredient[][]) {
  const set = new Set<string>();
  for (const group of groups) for (const item of group) set.add(item.id);
  return Array.from(set);
}

interface TemplateResult {
  name: string;
  tagline: string;
  time: string;
  servings: string;
  difficulty: Difficulty;
  usedIds: string[];
  steps: string[];
  tip?: string;
}

type TemplateKey =
  | "fried-rice"
  | "noodle"
  | "pasta"
  | "vermicelli"
  | "toast"
  | "porridge"
  | "stew"
  | "egg-dish"
  | "stir-fry"
  | "veg-stir-fry"
  | "seared-protein";

const templates: Record<TemplateKey, (b: Buckets) => TemplateResult | null> = {
  "fried-rice": (b) => {
    const rice = b.carb.find((c) => c.id === "rice");
    if (!rice) return null;
    const namePrefix = [nameJoin(b.protein, 2), nameJoin(b.vegetable, 2), b.egg.length ? "蛋" : ""]
      .filter(Boolean)
      .join("");
    const steps: string[] = [];
    if (b.protein.length) steps.push(`${names(b.protein)}切成小丁，用少許鹽、米酒略醃 10 分鐘去腥提味。`);
    if (b.egg.length) steps.push("雞蛋打散，熱鍋下油炒至半凝固、邊緣微焦後先盛起備用。");
    if (b.aromatic.length) steps.push(`鍋中留底油，爆香${names(b.aromatic)}至香氣飄出。`);
    if (b.protein.length) steps.push(`放入${names(b.protein)}轉中大火炒至變色上色。`);
    if (b.vegetable.length) steps.push(`加入${names(b.vegetable)}拌炒至熟、顏色更鮮亮。`);
    steps.push("白飯下鍋，用鍋鏟壓散炒開，讓每粒米都均勻裹上鍋氣。");
    steps.push(
      b.egg.length
        ? "倒回炒蛋與飯拌勻，沿鍋邊淋一點醬油增香，鹽調味即可起鍋。"
        : "加鹽、少許醬油調味，拌炒均勻即可起鍋。"
    );
    return {
      name: (namePrefix || "家常") + "炒飯",
      tagline: "鑊氣十足，一鍋到底的家常炒飯",
      time: "20 分鐘",
      servings: "2 人份",
      difficulty: "簡單",
      usedIds: usedIdsOf(b.protein, b.vegetable, b.egg, [rice], b.aromatic),
      steps,
    };
  },
  noodle: (b) => {
    const noodle = b.carb.find((c) => c.id === "noodle");
    if (!noodle) return null;
    const namePrefix = [nameJoin(b.protein, 2), nameJoin(b.vegetable, 2)].filter(Boolean).join("");
    const steps: string[] = ["麵條依包裝時間煮熟，撈起前用冷水沖一下更彈牙，瀝乾備用。"];
    if (b.aromatic.length) steps.push(`熱鍋爆香${names(b.aromatic)}。`);
    if (b.protein.length) steps.push(`放入${names(b.protein)}炒至變色出香。`);
    if (b.vegetable.length) steps.push(`加入${names(b.vegetable)}拌炒至軟。`);
    if (b.egg.length) steps.push("撥開食材，打入雞蛋快速拌炒至凝固。");
    steps.push("放入麵條，加醬油、鹽拌炒均勻，讓麵條都吸附醬汁後即可起鍋。");
    return {
      name: (namePrefix || "家常") + "炒麵",
      tagline: "簡單一鍋炒麵，用手邊食材就能做",
      time: "20 分鐘",
      servings: "2 人份",
      difficulty: "簡單",
      usedIds: usedIdsOf(b.protein, b.vegetable, b.egg, [noodle], b.aromatic),
      steps,
    };
  },
  pasta: (b) => {
    const pasta = b.carb.find((c) => c.id === "pasta");
    if (!pasta) return null;
    const namePrefix = [nameJoin(b.protein, 2), nameJoin(b.vegetable, 2)].filter(Boolean).join("");
    const steps: string[] = ["義大利麵依包裝時間煮至彈牙，撈起前留一杯煮麵水。"];
    if (b.aromatic.length) steps.push(`橄欖油小火爆香${names(b.aromatic)}至微焦香。`);
    if (b.protein.length) steps.push(`放入${names(b.protein)}轉中大火炒熟上色。`);
    if (b.vegetable.length) steps.push(`加入${names(b.vegetable)}拌炒至軟。`);
    steps.push("倒入麵條與少許煮麵水拌勻收汁，鹽、黑胡椒調味即可盛盤。");
    return {
      name: (namePrefix || "家常") + "義大利麵",
      tagline: "櫥櫃常備食材就能做的義式家常麵",
      time: "25 分鐘",
      servings: "2 人份",
      difficulty: "適中",
      usedIds: usedIdsOf(b.protein, b.vegetable, b.egg, [pasta], b.aromatic),
      steps,
    };
  },
  vermicelli: (b) => {
    const vermicelli = b.carb.find((c) => c.id === "vermicelli");
    if (!vermicelli) return null;
    const namePrefix = nameJoin(b.protein, 2) || nameJoin(b.vegetable, 2);
    const steps: string[] = ["冬粉泡冷水至軟，剪成適口長度備用。"];
    if (b.aromatic.length) steps.push(`熱鍋爆香${names(b.aromatic)}。`);
    if (b.protein.length) steps.push(`放入${names(b.protein)}炒至變色出香。`);
    if (b.vegetable.length) steps.push(`加入${names(b.vegetable)}略炒。`);
    steps.push("加水或高湯煮滾，放入冬粉煮至完全吸附湯汁、變得透亮即可起鍋。");
    return {
      name: (namePrefix || "家常") + "冬粉",
      tagline: "吸飽湯汁的冬粉料理",
      time: "20 分鐘",
      servings: "2 人份",
      difficulty: "適中",
      usedIds: usedIdsOf(b.protein, b.vegetable, b.egg, [vermicelli], b.aromatic),
      steps,
    };
  },
  toast: (b) => {
    const bread = b.carb.find((c) => c.id === "bread");
    if (!bread) return null;
    const toppings = [...b.protein, ...b.vegetable, ...b.fruit];
    const steps: string[] = ["吐司放入烤箱或平底鍋烤至表面微酥、邊緣上色。"];
    if (b.egg.length) steps.push("煎一顆蛋（太陽蛋或水波蛋皆可，蛋黃半熟拌開更香）。");
    if (toppings.length) steps.push(`${names(toppings)}處理好鋪放在吐司上。`);
    steps.push("加鹽、黑胡椒調味，趁熱享用。");
    return {
      name: (nameJoin(toppings, 2) || "經典") + "吐司",
      tagline: "早午餐等級的簡單美味",
      time: "10 分鐘",
      servings: "1 人份",
      difficulty: "簡單",
      usedIds: usedIdsOf(b.protein, b.vegetable, b.egg, b.fruit, [bread]),
      steps,
    };
  },
  porridge: (b) => {
    const oat = b.carb.find((c) => c.id === "oat");
    if (!oat) return null;
    const steps: string[] = ["燕麥加牛奶或水，小火煮至濃稠，中途持續攪拌避免黏底。"];
    if (b.fruit.length) steps.push(`${names(b.fruit)}切片拌入或鋪在粥上。`);
    steps.push("喜歡的話可以再淋一點蜂蜜，增添香甜滋味。");
    return {
      name: (nameJoin(b.fruit, 2) || "溫暖") + "燕麥粥",
      tagline: "五分鐘搞定的暖心早餐",
      time: "10 分鐘",
      servings: "1 人份",
      difficulty: "簡單",
      usedIds: usedIdsOf(b.fruit, [oat]),
      steps,
    };
  },
  stew: (b) => {
    const root = b.carb.find((c) => c.id === "potato" || c.id === "sweetPotato");
    if (!root || b.protein.length === 0) return null;
    const proteinTitle = nameJoin(b.protein, 2);
    const steps: string[] = [`${names(b.protein)}切塊，汆燙去血水、洗淨浮沫後備用。`];
    if (b.aromatic.length) steps.push(`爆香${names(b.aromatic)}，放入${names(b.protein)}略炒上色。`);
    steps.push(`加入${root.name}${b.vegetable.length ? "與" + names(b.vegetable) : ""}，加水淹過食材。`);
    steps.push("煮滾後撈去浮沫，轉小火燉 30-40 分鐘至軟爛入味，起鍋前用鹽調整鹹淡。");
    return {
      name: proteinTitle + root.name + "燉湯",
      tagline: "小火慢燉，暖胃暖心的湯品",
      time: "50 分鐘",
      servings: "3 人份",
      difficulty: "適中",
      usedIds: usedIdsOf(b.protein, b.vegetable, [root], b.aromatic),
      steps,
    };
  },
  "egg-dish": (b) => {
    if (b.egg.length === 0 || b.carb.length > 0) return null;
    const mainPart = nameJoin([...b.vegetable, ...b.protein], 2);
    const steps: string[] = ["雞蛋打散，加一小撮鹽拌勻備用。"];
    if (b.aromatic.length) steps.push(`熱鍋爆香${names(b.aromatic)}。`);
    if (b.protein.length) steps.push(`放入${names(b.protein)}炒至變色。`);
    if (b.vegetable.length) steps.push(`加入${names(b.vegetable)}拌炒至軟。`);
    steps.push("倒入蛋液，稍微等蛋液凝固後再輕輕拌炒，起鍋前保留一點嫩滑口感。");
    return {
      name: (mainPart || "家常") + "炒蛋",
      tagline: "快手上桌的家常蛋料理",
      time: "15 分鐘",
      servings: "2 人份",
      difficulty: "簡單",
      usedIds: usedIdsOf(b.protein, b.vegetable, b.egg, b.aromatic),
      steps,
    };
  },
  "stir-fry": (b) => {
    if (b.carb.length > 0 || b.egg.length > 0) return null;
    if (b.protein.length === 0 || b.vegetable.length === 0) return null;
    const proteinTitle = nameJoin(b.protein, 2);
    const vegTitle = nameJoin(b.vegetable, 2);
    const steps: string[] = [`${names(b.protein)}切片或切丁，用鹽、太白粉略醃 10 分鐘鎖住水分。`];
    if (b.aromatic.length) steps.push(`熱鍋爆香${names(b.aromatic)}。`);
    steps.push(`轉中大火，放入${names(b.protein)}炒至變色八分熟先盛起。`);
    steps.push(`鍋中放入${names(b.vegetable)}大火拌炒至熟，倒回${names(b.protein)}快速拌勻，鹽調味即可起鍋。`);
    return {
      name: `${proteinTitle}炒${vegTitle}`,
      tagline: "大火快炒，鎖住食材鮮甜",
      time: "20 分鐘",
      servings: "2 人份",
      difficulty: "適中",
      usedIds: usedIdsOf(b.protein, b.vegetable, b.aromatic),
      steps,
    };
  },
  "veg-stir-fry": (b) => {
    if (b.carb.length > 0 || b.egg.length > 0 || b.protein.length > 0) return null;
    if (b.vegetable.length === 0) return null;
    const vegTitle = nameJoin(b.vegetable, 3);
    const steps: string[] = [];
    if (b.aromatic.length) steps.push(`熱鍋爆香${names(b.aromatic)}。`);
    steps.push(`轉大火放入${names(b.vegetable)}快速拌炒，讓鍋氣鎖住脆度。`);
    steps.push("加鹽調味，炒約 1-2 分鐘至熟即可起鍋，避免久炒出水。");
    return {
      name: (b.aromatic.length ? nameJoin(b.aromatic, 1) + "炒" : "清炒") + vegTitle,
      tagline: "清爽快炒，十分鐘上桌",
      time: "10 分鐘",
      servings: "2 人份",
      difficulty: "簡單",
      usedIds: usedIdsOf(b.vegetable, b.aromatic),
      steps,
    };
  },
  "seared-protein": (b) => {
    if (b.carb.length > 0 || b.egg.length > 0 || b.vegetable.length > 0) return null;
    if (b.protein.length === 0) return null;
    const proteinTitle = nameJoin(b.protein, 2);
    const steps: string[] = [`${names(b.protein)}用廚房紙巾拍乾表面水分，抹上鹽、米酒略醃 10 分鐘。`];
    if (b.aromatic.length) steps.push(`熱鍋爆香${names(b.aromatic)}後撥到鍋邊。`);
    steps.push(`鍋燒熱，放入${names(b.protein)}煎至底部金黃定型再翻面，煎熟上色。`);
    steps.push("鹽、黑胡椒調味，起鍋前可淋一點醬油提香即可盛盤。");
    return {
      name: (b.aromatic.length ? nameJoin(b.aromatic, 1) + "香煎" : "香煎") + proteinTitle,
      tagline: "簡單調味，突顯食材原味",
      time: "15 分鐘",
      servings: "2 人份",
      difficulty: "簡單",
      usedIds: usedIdsOf(b.protein, b.aromatic),
      steps,
    };
  },
};

const TEMPLATE_PRIORITY: TemplateKey[] = [
  "fried-rice",
  "noodle",
  "pasta",
  "vermicelli",
  "toast",
  "porridge",
  "stew",
  "stir-fry",
  "egg-dish",
  "veg-stir-fry",
  "seared-protein",
];

function buildFromTemplate(key: TemplateKey, buckets: Buckets): ComposedRecipe | null {
  const result = templates[key](buckets);
  if (!result) return null;
  return { id: `composed:${key}:${[...result.usedIds].sort().join(",")}`, ...result };
}

// Generates up to 3 dish suggestions built only from the ingredients
// actually passed in — nothing outside this list is ever referenced.
export function composeRecipes(items: Ingredient[]): ComposedRecipe[] {
  const buckets = bucketize(items);
  const results: ComposedRecipe[] = [];
  const seenNames = new Set<string>();

  for (const key of TEMPLATE_PRIORITY) {
    const recipe = buildFromTemplate(key, buckets);
    if (!recipe || seenNames.has(recipe.name)) continue;
    seenNames.add(recipe.name);
    results.push(recipe);
    if (results.length >= 3) break;
  }

  return results;
}

// Deterministically rebuilds a single composed recipe from its id,
// independent of the viewer's current selection — the ingredient ids
// are embedded in the id itself.
export function composeRecipeFromId(
  id: string,
  resolve: (ingredientId: string) => Ingredient | undefined
): ComposedRecipe | null {
  const [prefix, key, idsPart] = id.split(":");
  if (prefix !== "composed" || !key || !(key in templates)) return null;
  const usedIds = (idsPart ?? "").split(",").filter(Boolean);
  const items = usedIds.map(resolve).filter((item): item is Ingredient => Boolean(item));
  if (items.length === 0) return null;
  return buildFromTemplate(key as TemplateKey, bucketize(items));
}

// Composed ids contain ":" and "," which are valid in a URL path
// segment but not worth the risk of tripping up route matching, so
// they're packed into a plain base64url token (only [A-Za-z0-9_-])
// before ever going into an href.
export function encodeComposedId(id: string): string {
  return btoa(id).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeComposedId(token: string): string | null {
  try {
    const padded = token.replace(/-/g, "+").replace(/_/g, "/");
    const padding = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
    return atob(padded + padding);
  } catch {
    return null;
  }
}
