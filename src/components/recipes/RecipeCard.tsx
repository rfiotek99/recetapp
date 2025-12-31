'use client'

import { useState, useEffect } from 'react'
import { Recipe } from '@/types/recipe'
import { formatTime } from '@/lib/utils/formatters'

interface RecipeCardProps {
  recipe: Recipe
  userIngredients: string[]
}

export default function RecipeCard({ recipe, userIngredients }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('recetapp-favorites')
    if (stored) {
      const favorites = JSON.parse(stored)
      setIsFavorite(favorites.some((r: Recipe) => r.name === recipe.name))
    }
  }, [recipe.name])

  const toggleFavorite = () => {
    const stored = localStorage.getItem('recetapp-favorites')
    let favorites = stored ? JSON.parse(stored) : []
    
    if (isFavorite) {
      favorites = favorites.filter((r: Recipe) => r.name !== recipe.name)
    } else {
      favorites.push({ ...recipe, id: Date.now().toString() })
    }
    
    localStorage.setItem('recetapp-favorites', JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  const missingIngredients = recipe.ingredients
    .filter(ing => !ing.is_available)
    .slice(0, 3)

  const totalTime = recipe.prep_time + recipe.cook_time

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'bg-secondary-500 text-white border-secondary-600 shadow-lg'
    if (score >= 60) return 'bg-yellow-400 text-yellow-900 border-yellow-500 shadow-md'
    return 'bg-primary-500 text-white border-primary-600 shadow-md'
  }

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'fácil') return 'text-secondary-600'
    if (difficulty === 'media') return 'text-yellow-600'
    return 'text-accent-600'
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-4 border-primary-200 hover:border-primary-400 flex flex-col transform hover:-translate-y-1">
      <div className="relative p-6 pb-4 bg-gradient-to-br from-primary-50 to-yellow-50">
        <div className="flex items-start justify-between mb-3">
          <div className={`px-4 py-2 rounded-full text-sm font-black border-3 ${getMatchColor(recipe.match_score)}`}>
            ✨ {recipe.match_score}% Match
          </div>
          <button
            onClick={toggleFavorite}
            className="text-3xl transition-transform hover:scale-125 active:scale-95"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        <h3 className="text-2xl font-black text-gray-800 mb-2 leading-tight">
          {recipe.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 font-medium">
          {recipe.description}
        </p>
      </div>

      <div className="px-6 pb-4 flex flex-wrap items-center gap-3 text-sm font-bold">
        <span className="flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full">
          ⏱️ {formatTime(totalTime)}
        </span>
        <span className="flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full">
          👥 {recipe.servings}
        </span>
        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
          recipe.difficulty === 'fácil' ? 'bg-secondary-100 text-secondary-700' :
          recipe.difficulty === 'media' ? 'bg-yellow-100 text-yellow-700' :
          'bg-accent-100 text-accent-700'
        }`}>
          📊 {recipe.difficulty}
        </span>
        {recipe.calories_per_serving && (
          <span className="flex items-center gap-1.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1.5 rounded-full shadow-md">
            🔥 {recipe.calories_per_serving} cal
          </span>
        )}
      </div>

      {missingIngredients.length > 0 && (
        <div className="px-6 pb-4">
          <div className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-orange-100 rounded-2xl p-5 border-3 border-yellow-400 shadow-md">
            <p className="text-sm font-black text-yellow-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Agregá para mejorar esta receta:
            </p>
            <div className="flex flex-wrap gap-2">
              {missingIngredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="text-sm bg-white px-4 py-2 rounded-full border-2 border-yellow-500 text-yellow-800 font-bold shadow-sm hover:shadow-md transition-shadow"
                >
                  + {ing.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="px-6 pb-6 mt-auto">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-4 bg-food-gradient hover:shadow-food text-white font-black rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {isExpanded ? (
            <>
              <span>👆</span> Ocultar receta
            </>
          ) : (
            <>
              <span>👀</span> Ver receta completa
            </>
          )}
        </button>

        {isExpanded && (
          <div className="mt-6 space-y-6 animate-in fade-in duration-300">
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
