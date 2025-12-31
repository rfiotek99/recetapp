import type { RecipeGenerationParams } from '@/types/recipe'

export const RECIPE_GENERATION_PROMPT = `Chef argentino: 3 recetas con {ingredients}.

JSON SOLO (sin markdown):
{"recipes":[{"name":"","description":"","difficulty":"fácil|media|difícil","prep_time":30,"cook_time":20,"servings":4,"calories_per_serving":400,"total_calories":1600,"ingredients":[{"name":"","amount":"","unit":"","is_available":true,"calories":100}],"instructions":["Paso 1","Paso 2","Paso 3"],"tips":["Tip"],"tags":["tag"],"match_score":90}]}`

export function buildRecipePrompt(params: RecipeGenerationParams): string {
  const { ingredients } = params
  return RECIPE_GENERATION_PROMPT.replace('{ingredients}', ingredients.join(', '))
}
