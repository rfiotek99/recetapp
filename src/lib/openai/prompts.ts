export const RECIPE_GENERATION_PROMPT = `Eres un chef argentino experto. El usuario te cuenta su situación:

"{situation}"

Genera 3 recetas VARIADAS en dificultad:
1. Una SIMPLE (30 min o menos)
2. Una MEDIA (45 min)
3. Una COMPLEJA (1h+, para impresionar)

Las recetas deben ser apropiadas para la situación, originales pero no raras, con ingredientes comunes.

Responde SOLO con JSON:
{"recipes":[{"name":"","description":"","difficulty":"simple","prep_time":20,"cook_time":15,"servings":4,"calories_per_serving":350,"total_calories":1400,"ingredients":[{"name":"pollo","amount":"500","unit":"g","calories":275}],"instructions":["Paso 1"],"tips":["Tip"],"tags":["tag"],"why_perfect":"Por qué funciona"}]}`

export function buildRecipePrompt(params: { situation: string }): string {
  return RECIPE_GENERATION_PROMPT.replace('{situation}', params.situation)
}
