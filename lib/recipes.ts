import type { Recipe } from "./types";

export const recipes: Recipe[] = [
  {
    id: "tomato-egg",
    name: "番茄炒蛋",
    tagline: "酸甜開胃，十五分鐘上桌的家常味",
    time: "15 分鐘",
    servings: "2 人份",
    difficulty: "簡單",
    requiredIds: ["egg", "tomato"],
    optionalIds: ["scallion", "onion"],
    steps: [
      "番茄切滾刀塊，雞蛋打散加一小撮鹽拌勻。",
      "熱鍋下油，倒入蛋液快速炒至半凝固後盛起。",
      "鍋中留底油，放入番茄拌炒至軟出汁，加少許糖與鹽調味。",
      "倒回炒蛋拌勻收汁，撒上蔥花即可起鍋。",
    ],
    tip: "番茄先炒出茄紅素再回鍋炒蛋，湯汁會更濃郁。",
  },
  {
    id: "scallion-beef",
    name: "蔥爆牛肉",
    tagline: "大火快炒，鎖住牛肉的嫩與香氣",
    time: "20 分鐘",
    servings: "2 人份",
    difficulty: "適中",
    requiredIds: ["beef", "scallion"],
    optionalIds: ["garlic", "rice"],
    steps: [
      "牛肉逆紋切薄片，用醬油、米酒、太白粉抓醃 10 分鐘。",
      "蔥切段，蔥白與蔥綠分開放。",
      "熱鍋大火快炒牛肉至變色即盛起，避免炒老。",
      "爆香蒜末與蔥白，回鍋牛肉與蔥綠快速拌炒出鍋。",
    ],
    tip: "全程大火快炒，牛肉才會軟嫩多汁。",
  },
  {
    id: "kung-pao-chicken",
    name: "宮保雞丁",
    tagline: "微辣鹹香，下飯的經典熱炒",
    time: "25 分鐘",
    servings: "2-3 人份",
    difficulty: "適中",
    requiredIds: ["chicken", "scallion", "garlic"],
    optionalIds: ["chili", "carrot"],
    steps: [
      "雞胸肉切丁，加醬油、太白粉抓醃備用。",
      "蒜末、蔥段、乾辣椒段爆香。",
      "雞丁下鍋炒至變色，加入醬油、烏醋、糖調成的醬汁。",
      "大火收汁，撒上花生或蔥花即可。",
    ],
  },
  {
    id: "mapo-tofu",
    name: "麻婆豆腐",
    tagline: "滑嫩豆腐配肉燥，開胃又下飯",
    time: "25 分鐘",
    servings: "3 人份",
    difficulty: "適中",
    requiredIds: ["tofu", "groundPork", "scallion", "garlic"],
    optionalIds: ["chili"],
    steps: [
      "板豆腐切塊，放入滾水汆燙去豆腥後瀝乾。",
      "爆香蒜末、蔥白，下豬絞肉炒至變色出油。",
      "加入辣豆瓣醬拌炒出紅油，倒入高湯或水煮滾。",
      "放入豆腐塊輕輕拌煮 5 分鐘，太白粉水勾芡，撒蔥花起鍋。",
    ],
    tip: "豆腐先燙過再煮，比較不容易碎裂。",
  },
  {
    id: "shrimp-egg",
    name: "蝦仁炒蛋",
    tagline: "鮮甜滑嫩，快手海鮮料理",
    time: "15 分鐘",
    servings: "2 人份",
    difficulty: "簡單",
    requiredIds: ["shrimp", "egg"],
    optionalIds: ["scallion"],
    steps: [
      "蝦仁去腸泥，用鹽、米酒略醃 5 分鐘。",
      "雞蛋打散加少許鹽拌勻。",
      "熱鍋下油，先炒蝦仁至變色盛起。",
      "倒入蛋液，蝦仁回鍋一起炒至蛋液凝固，撒蔥花即可。",
    ],
  },
  {
    id: "garlic-shrimp",
    name: "蒜蓉蝦",
    tagline: "滿滿蒜香，餐桌上的人氣主菜",
    time: "15 分鐘",
    servings: "2 人份",
    difficulty: "簡單",
    requiredIds: ["shrimp", "garlic"],
    optionalIds: ["chili", "lemon"],
    steps: [
      "蝦仁開背去腸泥，用鹽、米酒醃 5 分鐘。",
      "蒜末用少許油小火煸至金黃微焦，取一半盛起備用。",
      "轉大火，放入蝦仁快速煎炒至兩面變色。",
      "撒上剩下的蒜酥與辣椒，擠上檸檬汁提味即可。",
    ],
  },
  {
    id: "tuna-tomato-pasta",
    name: "番茄鮪魚義大利麵",
    tagline: "櫥櫃常備食材就能做的義式家常麵",
    time: "25 分鐘",
    servings: "2 人份",
    difficulty: "適中",
    requiredIds: ["tuna", "tomato", "pasta"],
    optionalIds: ["garlic", "onion"],
    steps: [
      "義大利麵依包裝時間煮至彈牙，撈起前留一杯煮麵水。",
      "橄欖油爆香蒜末與洋蔥丁，放入番茄丁炒軟出汁。",
      "加入鮪魚罐頭（連少許油）拌炒，用鹽、黑胡椒調味。",
      "倒入麵條與少許煮麵水拌勻收汁即可盛盤。",
    ],
  },
  {
    id: "salmon-fried-rice",
    name: "鮭魚炒飯",
    tagline: "香煎鮭魚配蛋炒飯，一鍋滿足",
    time: "20 分鐘",
    servings: "2 人份",
    difficulty: "簡單",
    requiredIds: ["salmon", "rice", "egg"],
    optionalIds: ["scallion", "carrot"],
    steps: [
      "鮭魚灑鹽煎熟後剝成大塊，去皮去刺。",
      "白飯用手稍微捏散，蛋液打散備用。",
      "熱鍋下油炒蛋至半熟，加入白飯炒開炒鬆。",
      "拌入鮭魚與紅蘿蔔丁，加鹽、醬油調味，撒蔥花即可。",
    ],
  },
  {
    id: "squid-celery",
    name: "花枝炒芹菜",
    tagline: "清脆爽口，海鮮控必點小炒",
    time: "20 分鐘",
    servings: "2 人份",
    difficulty: "適中",
    requiredIds: ["squid", "celery"],
    optionalIds: ["garlic", "chili"],
    steps: [
      "花枝切花刀後切片，滾水汆燙至捲曲立即撈起。",
      "芹菜切斜段，蒜末、辣椒切片備用。",
      "熱鍋爆香蒜末辣椒，放入芹菜大火拌炒至微軟。",
      "加入花枝快速拌炒，鹽與米酒調味即可起鍋。",
    ],
    tip: "花枝燙過再炒可縮短拌炒時間，肉質更脆嫩。",
  },
  {
    id: "beef-potato-stew",
    name: "番茄馬鈴薯燉牛肉",
    tagline: "小火慢燉，湯汁濃郁的暖心料理",
    time: "60 分鐘",
    servings: "4 人份",
    difficulty: "費工",
    requiredIds: ["beef", "potato", "tomato", "onion"],
    optionalIds: ["carrot"],
    steps: [
      "牛肉切塊，汆燙去血水後洗淨。",
      "洋蔥切絲炒軟炒香，加入牛肉塊略煎上色。",
      "放入番茄塊、馬鈴薯與紅蘿蔔，加水淹過食材。",
      "煮滾後轉小火燉 40-50 分鐘至牛肉軟爛，鹽調味即可。",
    ],
  },
  {
    id: "niku-jaga",
    name: "馬鈴薯燉肉",
    tagline: "日式家庭料理，甜鹹交織的溫暖滋味",
    time: "45 分鐘",
    servings: "3 人份",
    difficulty: "適中",
    requiredIds: ["pork", "potato", "onion"],
    optionalIds: ["carrot"],
    steps: [
      "豬肉切片，馬鈴薯、紅蘿蔔滾刀切塊，洋蔥切絲。",
      "熱鍋炒香洋蔥與豬肉至變色。",
      "加入馬鈴薯、紅蘿蔔略炒，倒入醬油、味醂、糖與水。",
      "煮滾後轉小火燉 20-25 分鐘至馬鈴薯鬆軟收汁。",
    ],
  },
  {
    id: "garlic-cabbage",
    name: "蒜炒高麗菜",
    tagline: "十分鐘完成的清爽家常菜",
    time: "10 分鐘",
    servings: "2 人份",
    difficulty: "簡單",
    requiredIds: ["cabbage", "garlic"],
    optionalIds: ["chili"],
    steps: [
      "高麗菜剝片洗淨瀝乾，蒜切片。",
      "熱鍋下油爆香蒜片至香氣出來。",
      "轉大火放入高麗菜快速拌炒。",
      "加鹽與少許水，蓋鍋燜 1-2 分鐘至軟即可。",
    ],
  },
  {
    id: "bacon-cabbage",
    name: "培根炒高麗菜",
    tagline: "培根油脂香煎出高麗菜的甜味",
    time: "15 分鐘",
    servings: "2 人份",
    difficulty: "簡單",
    requiredIds: ["bacon", "cabbage"],
    optionalIds: ["garlic"],
    steps: [
      "培根切段，高麗菜剝片備用。",
      "冷鍋放入培根，小火煸出油脂至微焦。",
      "放入蒜片爆香，轉大火加入高麗菜拌炒。",
      "炒至高麗菜軟身，用鹽與黑胡椒調味即可。",
    ],
  },
  {
    id: "scallion-oil-chicken",
    name: "蔥油雞腿",
    tagline: "外皮微焦、肉汁豐富的簡易烤雞腿",
    time: "40 分鐘",
    servings: "2 人份",
    difficulty: "適中",
    requiredIds: ["chickenThigh", "scallion", "ginger"],
    optionalIds: ["garlic"],
    steps: [
      "雞腿肉用鹽、米酒醃 15 分鐘。",
      "蔥切末、薑切末，與少許鹽拌勻做成蔥油醬。",
      "雞皮朝下入平底鍋煎至金黃酥脆，翻面煎熟。",
      "雞腿切片盛盤，淋上蔥油醬即可享用。",
    ],
  },
  {
    id: "sausage-fried-rice",
    name: "香腸炒飯",
    tagline: "冰箱剩飯的最佳去處",
    time: "20 分鐘",
    servings: "2 人份",
    difficulty: "簡單",
    requiredIds: ["sausage", "rice", "egg"],
    optionalIds: ["scallion", "carrot"],
    steps: [
      "香腸切丁煎香出油，盛起備用。",
      "利用鍋中香腸油炒蛋液至半熟。",
      "加入白飯，用鍋鏟壓散拌炒至粒粒分明。",
      "拌入香腸丁與紅蘿蔔丁，鹽與醬油調味，撒蔥花即可。",
    ],
  },
  {
    id: "spinach-garlic",
    name: "蒜炒菠菜",
    tagline: "簡單快速的深綠色蔬菜料理",
    time: "10 分鐘",
    servings: "2 人份",
    difficulty: "簡單",
    requiredIds: ["spinach", "garlic"],
    steps: [
      "菠菜洗淨切段，蒜切片。",
      "熱鍋下油爆香蒜片。",
      "轉大火放入菠菜快速拌炒至軟。",
      "加鹽調味，炒約 1 分鐘即可起鍋。",
    ],
    tip: "菠菜下鍋後全程大火快炒，顏色會更翠綠。",
  },
  {
    id: "cold-tofu",
    name: "涼拌豆腐",
    tagline: "不開火也能上桌的清爽小菜",
    time: "10 分鐘",
    servings: "2 人份",
    difficulty: "簡單",
    requiredIds: ["silkenTofu", "scallion"],
    optionalIds: ["garlic"],
    steps: [
      "嫩豆腐輕輕倒扣在盤中，瀝除多餘水分。",
      "蔥切末，蒜切末（如果有的話）。",
      "淋上醬油膏或醬油、香油拌成的醬汁。",
      "撒上蔥花與蒜末即可享用。",
    ],
  },
  {
    id: "mushroom-egg",
    name: "香菇炒蛋",
    tagline: "香氣十足的家常快炒",
    time: "15 分鐘",
    servings: "2 人份",
    difficulty: "簡單",
    requiredIds: ["mushroom", "egg"],
    optionalIds: ["scallion"],
    steps: [
      "香菇切片，雞蛋打散加鹽拌勻。",
      "熱鍋下油，將香菇片煸炒至香氣釋出。",
      "倒入蛋液，輕輕拌炒至蛋液凝固成塊。",
      "撒上蔥花即可起鍋。",
    ],
  },
  {
    id: "bell-pepper-chicken",
    name: "甜椒炒雞肉",
    tagline: "色彩繽紛又均衡的一道快炒",
    time: "20 分鐘",
    servings: "2 人份",
    difficulty: "適中",
    requiredIds: ["chicken", "bellPepper"],
    optionalIds: ["onion", "garlic"],
    steps: [
      "雞胸肉切條，用醬油、太白粉抓醃 10 分鐘。",
      "甜椒切條，洋蔥切絲備用。",
      "熱鍋下油，雞肉條炒至變色盛起。",
      "爆香蒜末與洋蔥，加入甜椒與雞肉快速拌炒調味即可。",
    ],
  },
  {
    id: "sweet-potato-chicken-soup",
    name: "地瓜燉雞湯",
    tagline: "溫潤回甘的暖胃湯品",
    time: "50 分鐘",
    servings: "3-4 人份",
    difficulty: "適中",
    requiredIds: ["chickenThigh", "sweetPotato"],
    optionalIds: ["ginger", "carrot"],
    steps: [
      "雞腿肉切塊，汆燙去血水洗淨。",
      "地瓜削皮切塊，薑切片備用。",
      "雞肉、薑片入鍋加水煮滾，撈去浮沫。",
      "轉小火燉 25 分鐘後加入地瓜，續煮 10-15 分鐘至軟，鹽調味即可。",
    ],
  },
  {
    id: "avocado-toast",
    name: "酪梨吐司",
    tagline: "早午餐咖啡廳等級的簡單美味",
    time: "10 分鐘",
    servings: "1 人份",
    difficulty: "簡單",
    requiredIds: ["avocado", "bread"],
    optionalIds: ["egg", "lemon"],
    steps: [
      "吐司放入烤箱或平底鍋烤至酥脆。",
      "酪梨去皮去籽，用叉子壓成泥，擠入檸檬汁防止氧化。",
      "加鹽與黑胡椒調味後均勻抹在吐司上。",
      "可搭配一顆太陽蛋或水波蛋一起享用。",
    ],
  },
  {
    id: "banana-oat-porridge",
    name: "香蕉燕麥粥",
    tagline: "五分鐘搞定的暖心早餐",
    time: "10 分鐘",
    servings: "1 人份",
    difficulty: "簡單",
    requiredIds: ["banana", "oat"],
    steps: [
      "燕麥加牛奶或水，小火煮至濃稠，中途持續攪拌。",
      "香蕉切片，一半拌入粥中增加香甜。",
      "盛碗後鋪上剩下的香蕉片。",
      "喜歡的話可以再淋一點蜂蜜享用。",
    ],
  },
  {
    id: "broccoli-garlic-shrimp",
    name: "蒜炒花椰菜蝦仁",
    tagline: "高蛋白高纖維的健身系料理",
    time: "20 分鐘",
    servings: "2 人份",
    difficulty: "適中",
    requiredIds: ["broccoli", "shrimp", "garlic"],
    optionalIds: ["chili"],
    steps: [
      "花椰菜切小朵，滾水加鹽汆燙 2 分鐘後撈起瀝乾。",
      "蝦仁去腸泥，用鹽、米酒略醃。",
      "熱鍋爆香蒜末，放入蝦仁炒至變色。",
      "加入花椰菜快速拌炒，鹽調味即可起鍋。",
    ],
  },
  {
    id: "vermicelli-pork",
    name: "冬粉肉末",
    tagline: "吸飽湯汁的冬粉配香噴噴的肉燥",
    time: "20 分鐘",
    servings: "2 人份",
    difficulty: "適中",
    requiredIds: ["vermicelli", "groundPork"],
    optionalIds: ["garlic", "scallion"],
    steps: [
      "冬粉泡冷水至軟，剪成適口長度。",
      "熱鍋爆香蒜末，放入豬絞肉炒至變色出香。",
      "加入醬油、水或高湯煮滾。",
      "放入冬粉煮至吸汁入味，撒蔥花即可起鍋。",
    ],
  },
];

export interface RecipeMatch {
  recipe: Recipe;
  matchedRequired: string[];
  missingRequired: string[];
  matchedOptional: string[];
  score: number;
  isComplete: boolean;
}

// Ranks recipes by how much of the selected ingredients they use.
// Fully-covered recipes always come first; when nothing is fully
// covered, the closest partial matches are still returned so the
// user can make do with what's already selected instead of hitting
// a dead end. A recipe never appears unless at least one of its
// required ingredients was actually picked.
export function matchRecipes(selected: Set<string>): RecipeMatch[] {
  return recipes
    .map((recipe) => {
      const matchedRequired = recipe.requiredIds.filter((id) => selected.has(id));
      const missingRequired = recipe.requiredIds.filter((id) => !selected.has(id));
      const matchedOptional = (recipe.optionalIds ?? []).filter((id) => selected.has(id));
      const score =
        recipe.requiredIds.length === 0 ? 0 : matchedRequired.length / recipe.requiredIds.length;

      return {
        recipe,
        matchedRequired,
        missingRequired,
        matchedOptional,
        score,
        isComplete: missingRequired.length === 0,
      };
    })
    .filter((match) => match.matchedRequired.length > 0)
    .sort((a, b) => {
      if (a.isComplete !== b.isComplete) return a.isComplete ? -1 : 1;
      if (b.score !== a.score) return b.score - a.score;
      return b.matchedOptional.length - a.matchedOptional.length;
    });
}

const recipeMap = new Map(recipes.map((r) => [r.id, r]));

export function getRecipe(id: string) {
  return recipeMap.get(id);
}
