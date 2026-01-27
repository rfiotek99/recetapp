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
        { success: false, error: 'Contanos tu situación' },
        { status: 400 }
      )
    }

    const { situation } = validation.data
    const prompt = buildRecipePrompt({ situation })

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: 'system', content: 'Sos un chef argentino. Responde SOLO con JSON válido, sin markdown ni backticks.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    let responseText = completion.choices[0]?.message?.content?.trim()
    if (!responseText) throw new Error('Sin respuesta')

    // Limpiar markdown si viene con ```json
    responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    const parsedResponse = JSON.parse(responseText)
    if (!parsedResponse.recipes) throw new Error('Formato inválido')

    const recipes: Recipe[] = parsedResponse.recipes

    return NextResponse.json({
      success: true,
      data: { recipes },
    })
  } catch (error) {
    console.error('Error generando recetas:', error)
    return NextResponse.json(
      { success: false, error: 'Error generando recetas' },
      { status: 500 }
    )
  }
}
