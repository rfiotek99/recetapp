export interface Ingredient {
  id?: string
  recipe_id?: string
  name: string
  amount: string
  unit: string
  is_available: boolean
  calories?: number // calorías por ingrediente
}

export interface Recipe {
  id?: string
  user_id?: string
  name: string
  description: string
  difficulty: 'fácil' | 'media' | 'difícil'
  prep_time: number
  cook_time: number
  servings: number
  ingredients: Ingredient[]
  instructions: string[]
  tips: string[]
  tags: string[]
  match_score: number
  calories_per_serving?: number // NUEVO: calorías por porción
  total_calories?: number // NUEVO: calorías totales
  created_at?: string
}

export interface RecipeGenerationParams {
  ingredients: string[]
  dietaryPreferences?: string[]
  timeAvailable?: number
  skillLevel?: 'principiante' | 'intermedio' | 'avanzado'
}

export interface RecipeGenerationResponse {
  recipes: Recipe[]
}
