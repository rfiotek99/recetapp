import { z } from 'zod'

export const ingredientSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  amount: z.string().min(1, 'La cantidad es requerida'),
  unit: z.string().min(1, 'La unidad es requerida'),
  is_available: z.boolean(),
})

export const recipeSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  difficulty: z.enum(['fácil', 'media', 'difícil']),
  prep_time: z.number().min(1, 'El tiempo de preparación debe ser mayor a 0'),
  cook_time: z.number().min(0, 'El tiempo de cocción no puede ser negativo'),
  servings: z.number().min(1, 'Debe haber al menos 1 porción'),
  ingredients: z.array(ingredientSchema).min(1, 'Debe haber al menos 1 ingrediente'),
  instructions: z.array(z.string()).min(1, 'Debe haber al menos 1 instrucción'),
  tips: z.array(z.string()),
  tags: z.array(z.string()),
  match_score: z.number().min(1).max(100),
})

export const recipeGenerationParamsSchema = z.object({
  ingredients: z.array(z.string()).min(1, 'Debe proporcionar al menos 1 ingrediente'),
  dietaryPreferences: z.array(z.string()).optional(),
  timeAvailable: z.number().min(5).max(300).optional(),
  skillLevel: z.enum(['principiante', 'intermedio', 'avanzado']).optional(),
})

export function validateRecipe(data: unknown) {
  return recipeSchema.safeParse(data)
}

export function validateRecipeGenerationParams(data: unknown) {
  return recipeGenerationParamsSchema.safeParse(data)
}
