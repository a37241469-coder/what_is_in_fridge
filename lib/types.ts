export type CategoryId =
  | "meat"
  | "seafood"
  | "eggTofu"
  | "carb"
  | "vegetable"
  | "fruit";

export type Accent =
  | "terracotta"
  | "ocean"
  | "butter"
  | "wheat"
  | "sage"
  | "berry";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  accent: Accent;
}

export interface Ingredient {
  id: string;
  name: string;
  categoryId: CategoryId;
}

export type Difficulty = "簡單" | "適中" | "費工";

export interface Recipe {
  id: string;
  name: string;
  tagline: string;
  time: string;
  servings: string;
  difficulty: Difficulty;
  requiredIds: string[];
  optionalIds?: string[];
  steps: string[];
  tip?: string;
}
