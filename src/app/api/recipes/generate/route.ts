import { NextRequest, NextResponse } from 'next/server'
import { openai, OPENAI_MODEL } from '@/lib/openai/client'
import { buildRecipePrompt } from '@/lib/openai/prompts'
import { validateRecipeGenerationParams } from '@/lib/utils/validators'
import type { Recipe } from '@/types/recipe'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = validateRecipeGenerationParams(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Datos inválidos' },
        { status: 400 }
      )
    }

    const { ingredients } = validation.data
    const prompt = buildRecipePrompt({ ingredients })

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: 'system', content: 'Sos un chef. Responde SOLO JSON.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 1200,
    })

    const responseText = completion.choices[0]?.message?.content?.trim()
    if (!responseText) throw new Error('Sin respuesta')

    const parsedResponse = JSON.parse(responseText)
    if (!parsedResponse.recipes) throw new Error('Formato inválido')

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
      data: { recipes },
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error generando recetas' },
      { status: 500 }
    )
  }
}
