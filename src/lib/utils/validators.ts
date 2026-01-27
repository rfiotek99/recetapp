import { z } from 'zod'

export const recipeGenerationSchema = z.object({
  situation: z.string().min(3, 'Contanos tu situación (mínimo 3 caracteres)'),
  dietaryPreferences: z.array(z.string()).optional(),
  servings: z.number().min(1).max(20).optional(),
})

export function validateRecipeGenerationParams(data: unknown) {
  return recipeGenerationSchema.safeParse(data)
}
