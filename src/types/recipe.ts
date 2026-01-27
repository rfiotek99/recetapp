export interface Ingredient {
  name: string
  amount: string
  unit: string
  is_available?: boolean
  calories?: number
}

export interface Recipe {
  id?: string
  name: string
  description: string
  difficulty: 'simple' | 'media' | 'compleja'
  prep_time: number
  cook_time: number
  servings: number
  calories_per_serving?: number
  total_calories?: number
  ingredients: Ingredient[]
  instructions: string[]
  tips?: string[]
  tags?: string[]
  match_score?: number
  why_perfect?: string
}

export interface RecipeGenerationParams {
  situation: string
  dietaryPreferences?: string[]
  servings?: number
}
