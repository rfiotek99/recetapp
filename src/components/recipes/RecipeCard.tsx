'use client'

import { useState } from 'react'
import { Recipe } from '@/types/recipe'
import { formatTime } from '@/lib/utils/formatters'

interface RecipeCardProps {
  recipe: Recipe
  userIngredients: string[]
}

export default function RecipeCard({ recipe, userIngredients }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Calcular ingredientes que faltan
  const missingIngredients = recipe.ingredients
    .filter(ing => !ing.is_available)
    .slice(0, 3) // Máximo 3 sugerencias

  const totalTime = recipe.prep_time + recipe.cook_time

  // Color del badge según match score
  const getMatchColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-700 border-green-300'
    if (score >= 60) return 'bg-yellow-100 text-yellow-700 border-yellow-300'
    return 'bg-orange-100 text-orange-700 border-orange-300'
  }

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'fácil') return 'text-green-600'
    if (difficulty === 'media') return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* Header con match score */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getMatchColor(recipe.match_score)}`}>
            {recipe.match_score}% Match
          </div>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="text-2xl transition-transform hover:scale-110"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {recipe.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {recipe.description}
        </p>
      </div>

      {/* Info rápida */}
      <div className="px-6 pb-4 flex items-center gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          ⏱️ {formatTime(totalTime)}
        </span>
        <span className="flex items-center gap-1">
          👥 {recipe.servings}
        </span>
        <span className={`flex items-center gap-1 font-medium ${getDifficultyColor(recipe.difficulty)}`}>
          📊 {recipe.difficulty}
        </span>
        {recipe.calories_per_serving && (
          <span className="flex items-center gap-1 text-orange-600 font-semibold">
            🔥 {recipe.calories_per_serving} cal
          </span>
        )}
      </div>

      {/* Sugerencia de ingredientes faltantes */}
      {missingIngredients.length > 0 && (
        <div className="px-6 pb-4">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
            <p className="text-sm font-semibold text-orange-800 mb-2">
              💡 Agregá para mejorar:
            </p>
            <div className="flex flex-wrap gap-2">
              {missingIngredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-white px-3 py-1 rounded-full border border-orange-200 text-orange-700"
                >
                  {ing.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Expandible - Ingredientes e instrucciones */}
      <div className="px-6 pb-6 mt-auto">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isExpanded ? '👆 Ver menos' : '👀 Ver receta completa'}
        </button>

        {isExpanded && (
          <div className="mt-6 space-y-6 animate-in fade-in duration-300">
            {/* Info nutricional */}
            {recipe.calories_per_serving && (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  🔥 Información Nutricional
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Por porción</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {recipe.calories_per_serving} cal
                    </p>
                  </div>
                  {recipe.total_calories && (
                    <div>
                      <p className="text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-gray-700">
                        {recipe.total_calories} cal
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Ingredientes */}
            <div>
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                🛒 Ingredientes
              </h4>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start justify-between gap-2 text-sm ${
                      ing.is_available ? 'text-gray-700' : 'text-orange-600 font-medium'
                    }`}
                  >
                    <span className="flex items-start gap-2 flex-1">
                      <span className="mt-1">{ing.is_available ? '✅' : '🔸'}</span>
                      <span>
                        {ing.amount} {ing.unit} {ing.name}
                      </span>
                    </span>
                    {ing.calories && (
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {ing.calories} cal
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instrucciones */}
            <div>
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                👨‍🍳 Preparación
              </h4>
              <ol className="space-y-3">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-700">
                    <span className="font-bold text-orange-600 min-w-[24px]">
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  💡 Tips
                </h4>
                <ul className="space-y-2">
                  {recipe.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-gray-600">
                      <span>•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                {recipe.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
