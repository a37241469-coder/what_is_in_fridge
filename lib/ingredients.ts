import type { Category, CategoryId, Ingredient } from "./types";

export const categories: Category[] = [
  { id: "meat", name: "肉類", description: "牛豬雞與加工肉品", accent: "terracotta" },
  { id: "seafood", name: "海鮮", description: "魚鮮蝦貝", accent: "ocean" },
  { id: "eggTofu", name: "蛋豆製品", description: "雞蛋、豆腐與豆製品", accent: "butter" },
  { id: "carb", name: "澱粉", description: "米麵薯類主食", accent: "wheat" },
  { id: "vegetable", name: "蔬菜", description: "葉菜、根莖與辛香料", accent: "sage" },
  { id: "fruit", name: "水果", description: "新鮮水果", accent: "berry" },
];

export const ingredients: Ingredient[] = [
  // 肉類
  { id: "beef", name: "牛肉", categoryId: "meat" },
  { id: "pork", name: "豬肉", categoryId: "meat" },
  { id: "groundPork", name: "豬絞肉", categoryId: "meat" },
  { id: "porkBelly", name: "五花肉", categoryId: "meat" },
  { id: "chicken", name: "雞胸肉", categoryId: "meat" },
  { id: "chickenThigh", name: "雞腿肉", categoryId: "meat" },
  { id: "bacon", name: "培根", categoryId: "meat" },
  { id: "sausage", name: "香腸", categoryId: "meat" },
  // 海鮮
  { id: "shrimp", name: "蝦仁", categoryId: "seafood" },
  { id: "salmon", name: "鮭魚", categoryId: "seafood" },
  { id: "tuna", name: "鮪魚", categoryId: "seafood" },
  { id: "squid", name: "花枝", categoryId: "seafood" },
  { id: "tilapia", name: "鯛魚", categoryId: "seafood" },
  // 蛋豆製品
  { id: "egg", name: "雞蛋", categoryId: "eggTofu" },
  { id: "tofu", name: "板豆腐", categoryId: "eggTofu" },
  { id: "silkenTofu", name: "嫩豆腐", categoryId: "eggTofu" },
  { id: "edamame", name: "毛豆", categoryId: "eggTofu" },
  // 澱粉
  { id: "rice", name: "白飯", categoryId: "carb" },
  { id: "pasta", name: "義大利麵", categoryId: "carb" },
  { id: "noodle", name: "麵條", categoryId: "carb" },
  { id: "bread", name: "吐司", categoryId: "carb" },
  { id: "potato", name: "馬鈴薯", categoryId: "carb" },
  { id: "sweetPotato", name: "地瓜", categoryId: "carb" },
  { id: "vermicelli", name: "冬粉", categoryId: "carb" },
  { id: "oat", name: "燕麥", categoryId: "carb" },
  // 蔬菜
  { id: "tomato", name: "番茄", categoryId: "vegetable" },
  { id: "onion", name: "洋蔥", categoryId: "vegetable" },
  { id: "scallion", name: "蔥", categoryId: "vegetable" },
  { id: "garlic", name: "大蒜", categoryId: "vegetable" },
  { id: "ginger", name: "薑", categoryId: "vegetable" },
  { id: "cabbage", name: "高麗菜", categoryId: "vegetable" },
  { id: "carrot", name: "紅蘿蔔", categoryId: "vegetable" },
  { id: "spinach", name: "菠菜", categoryId: "vegetable" },
  { id: "celery", name: "芹菜", categoryId: "vegetable" },
  { id: "broccoli", name: "花椰菜", categoryId: "vegetable" },
  { id: "bellPepper", name: "甜椒", categoryId: "vegetable" },
  { id: "mushroom", name: "香菇", categoryId: "vegetable" },
  { id: "chili", name: "辣椒", categoryId: "vegetable" },
  { id: "waterSpinach", name: "空心菜", categoryId: "vegetable" },
  // 水果
  { id: "apple", name: "蘋果", categoryId: "fruit" },
  { id: "banana", name: "香蕉", categoryId: "fruit" },
  { id: "lemon", name: "檸檬", categoryId: "fruit" },
  { id: "avocado", name: "酪梨", categoryId: "fruit" },
  { id: "mango", name: "芒果", categoryId: "fruit" },
];

const categoryMap = new Map(categories.map((c) => [c.id, c]));
const ingredientMap = new Map(ingredients.map((i) => [i.id, i]));

export function getCategory(id: string) {
  return categoryMap.get(id as CategoryId);
}

export function getIngredientsByCategory(categoryId: string) {
  return ingredients.filter((i) => i.categoryId === categoryId);
}

export function getIngredient(id: string) {
  return ingredientMap.get(id);
}

// Falls back to a viewer's custom "其他" entries when the id isn't
// in the static catalogue.
export function resolveIngredient(id: string, custom: Ingredient[] = []) {
  return ingredientMap.get(id) ?? custom.find((item) => item.id === id);
}
