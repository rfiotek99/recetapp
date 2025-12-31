'use client'

import { useState, KeyboardEvent } from 'react'
import VoiceInput from '@/components/voice/VoiceInput'

interface IngredientInputProps {
  ingredients: string[]
  onIngredientsChange: (ingredients: string[]) => void
}

export default function IngredientInput({ ingredients, onIngredientsChange }: IngredientInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      addIngredient(inputValue.trim())
    }
  }

  const addIngredient = (ingredient: string) => {
    const cleaned = ingredient.toLowerCase().trim()
    if (cleaned && !ingredients.includes(cleaned)) {
      onIngredientsChange([...ingredients, cleaned])
      setInputValue('')
    }
  }

  const removeIngredient = (index: number) => {
    onIngredientsChange(ingredients.filter((_, i) => i !== index))
  }

  const handleVoiceResult = (transcript: string) => {
    const newIngredients = transcript
      .toLowerCase()
      .split(/[,.\sy]+/)
      .map(i => i.trim())
      .filter(i => i.length > 2 && !ingredients.includes(i))
    
    onIngredientsChange([...ingredients, ...newIngredients])
  }

  return (
    <div className="space-y-4">
      {/* Input con voz */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (inputValue.trim()) {
              addIngredient(inputValue.trim())
            }
          }}
          placeholder="Ej: lechuga, tomate, pollo... (presioná Enter)"
          className="w-full px-6 py-5 pr-16 text-lg text-gray-800 placeholder-gray-400 border-3 border-primary-300 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-200 focus:outline-none transition-all shadow-sm bg-white"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <VoiceInput onResult={handleVoiceResult} />
        </div>
      </div>

      {/* Tags de ingredientes */}
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-3 p-5 bg-gradient-to-br from-primary-50 to-yellow-50 rounded-2xl min-h-[80px] border-2 border-primary-200">
          {ingredients.map((ingredient, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-3 border-primary-400 text-primary-700 rounded-full font-bold hover:border-primary-500 hover:shadow-md transition-all group"
            >
              <span className="text-lg">🥗</span>
              {ingredient}
              <button
                onClick={() => removeIngredient(index)}
                className="text-accent-400 hover:text-accent-600 transition-colors ml-1 hover:scale-110 transform"
                aria-label={`Eliminar ${ingredient}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Contador */}
      <div className="flex items-center justify-between text-sm">
        <span className={`font-semibold ${ingredients.length > 0 ? 'text-primary-600' : 'text-gray-500'}`}>
          {ingredients.length === 0 
            ? '👆 Agregá tus ingredientes (Enter para agregar)' 
            : `✅ ${ingredients.length} ingrediente${ingredients.length > 1 ? 's' : ''} listo${ingredients.length > 1 ? 's' : ''}`
          }
        </span>
        {ingredients.length > 0 && (
          <button
            onClick={() => onIngredientsChange([])}
            className="text-accent-500 hover:text-accent-600 font-bold flex items-center gap-1 hover:underline"
          >
            🗑️ Limpiar todo
          </button>
        )}
      </div>
    </div>
  )
}
