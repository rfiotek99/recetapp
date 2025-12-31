import { NextRequest, NextResponse } from 'next/server'
import { openai, OPENAI_MODEL } from '@/lib/openai/client'
import { buildRecipePrompt } from '@/lib/openai/prompts'
import { validateRecipeGenerationParams } from '@/lib/utils/validators'
import type { Recipe } from '@/types/recipe'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = validateRecipeGenerationParams(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Datos inválidos', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { ingredients, dietaryPreferences, timeAvailable, skillLevel } = validation.data
    const prompt = buildRecipePrompt({ ingredients, dietaryPreferences, timeAvailable, skillLevel })

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: 'system', content: 'Eres un chef experto argentino especializado en crear recetas prácticas y deliciosas.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    })

    const responseText = completion.choices[0]?.message?.content

    if (!responseText) {
      throw new Error('No se recibió respuesta de OpenAI')
    }

    let parsedResponse
    try {
      parsedResponse = JSON.parse(responseText)
    } catch {
      console.error('Error parsing:', responseText)
      throw new Error('Error al parsear respuesta de IA')
    }

    if (!parsedResponse.recipes || !Array.isArray(parsedResponse.recipes)) {
      throw new Error('Formato de respuesta inválido')
    }

    const recipes: Recipe[] = parsedResponse.recipes.map((recipe: any) => ({
      ...recipe,
      ingredients: recipe.ingredients.map((ing: any) => ({
        ...ing,
        is_available: ingredients.some(
          (userIng) => 
            userIng.toLowerCase().includes(ing.name.toLowerCase()) ||
            ing.name.toLowerCase().includes(userIng.toLowerCase())
        ),
      })),
    }))

    return NextResponse.json({
      success: true,
      data: { recipes, metadata: { model: OPENAI_MODEL, timestamp: new Date().toISOString(), inputIngredients: ingredients } },
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Error desconocido', message: 'No se pudieron generar las recetas.' },
      { status: 500 }
    )
  }
}
