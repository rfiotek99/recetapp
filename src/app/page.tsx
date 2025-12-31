'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import IngredientInput from '@/components/recipes/IngredientInput'
import RecipeList from '@/components/recipes/RecipeList'
import { Recipe } from '@/types/recipe'

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('recetapp-favorites')
    if (stored) {
      setFavoritesCount(JSON.parse(stored).length)
    }
  }, [])

  const handleGenerateRecipes = async () => {
    if (ingredients.length === 0) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      })

      const data = await response.json()
      if (data.success) {
        setRecipes(data.data.recipes)
      }
    } catch (error) {
      console.error('Error generating recipes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <header className="bg-white shadow-md sticky top-0 z-50 border-b-4 border-primary-500">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-food-gradient rounded-2xl flex items-center justify-center shadow-food transform rotate-3">
              <span className="text-3xl">🍳</span>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-food-gradient bg-clip-text text-transparent">
                RecetApp
              </h1>
              <p className="text-xs text-gray-600">Tu chef con IA</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/favoritas"
              className="flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full font-semibold hover:bg-accent-200 transition-colors"
            >
              ❤️ Favoritas
              {favoritesCount > 0 && (
                <span className="bg-accent-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <span className="hidden md:flex px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full font-semibold">
              ✨ Gratis
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {recipes.length === 0 && (
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold animate-pulse shadow-lg">
                🔥 Nuevo: Con contador de calorías
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-4">
              <span className="bg-food-gradient bg-clip-text text-transparent">
                ¿Qué cocinamos
              </span>
              <br />
              <span className="text-gray-800">
                hoy?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
              Decinos qué tenés en la heladera y te damos 
              <span className="text-primary-600 font-bold"> 3 recetas increíbles</span> al instante
            </p>
          </div>
        )}

        {recipes.length === 0 && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-primary-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-100 rounded-full -ml-24 -mb-24 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-food-gradient rounded-2xl flex items-center justify-center shadow-food">
                    <span className="text-4xl">🥘</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      ¿Qué ingredientes tenés?
                    </h3>
                    <p className="text-gray-600">Escribí o hablá</p>
                  </div>
                </div>
                
                <IngredientInput
                  ingredients={ingredients}
                  onIngredientsChange={setIngredients}
                />

                <button
                  onClick={handleGenerateRecipes}
                  disabled={ingredients.length === 0 || isLoading}
                  className="w-full mt-6 bg-food-gradient hover:shadow-food text-white font-black py-5 px-8 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creando tu menú mágico...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      ✨ Generar Mis Recetas
                      {ingredients.length > 0 && (
                        <span className="bg-white/30 px-3 py-1 rounded-full text-sm">
                          {ingredients.length}
                        </span>
                      )}
                    </span>
                  )}
                </button>

                {ingredients.length === 0 && (
                  <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
                    <p className="text-center text-sm text-yellow-800 font-semibold flex items-center justify-center gap-2">
                      <span>💡</span>
                      Agregá al menos 1 ingrediente para empezar
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4 font-semibold">🚀 Probá con estos:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { emoji: '🍗', name: 'pollo', color: 'bg-yellow-400 hover:bg-yellow-500' },
                  { emoji: '🍚', name: 'arroz', color: 'bg-green-400 hover:bg-green-500' },
                  { emoji: '🍅', name: 'tomate', color: 'bg-red-400 hover:bg-red-500' },
                  { emoji: '🧅', name: 'cebolla', color: 'bg-purple-400 hover:bg-purple-500' },
                ].map((ingredient) => (
                  <button
                    key={ingredient.name}
                    onClick={() => {
                      if (!ingredients.includes(ingredient.name)) {
                        setIngredients(prev => [...prev, ingredient.name])
                      }
                    }}
                    className={`${ingredient.color} text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2`}
                  >
                    <span className="text-2xl">{ingredient.emoji}</span>
                    {ingredient.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {recipes.length > 0 && (
          <div>
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-4xl font-black bg-food-gradient bg-clip-text text-transparent mb-2">
                  Tus Recetas Personalizadas
                </h2>
                <p className="text-gray-600">
                  Ordenadas por match con tus ingredientes
                </p>
              </div>
              <button
                onClick={() => {
                  setRecipes([])
                  setIngredients([])
                }}
                className="bg-white hover:bg-gray-50 text-primary-600 font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-primary-500 flex items-center gap-2"
              >
                <span>←</span> Nueva Búsqueda
              </button>
            </div>

            <RecipeList recipes={recipes} userIngredients={ingredients} />
          </div>
        )}
      </div>

      {recipes.length === 0 && (
        <footer className="text-center py-8 text-gray-600">
          <p className="text-sm">
            Hecho con ❤️ y mucha 🍕 por RecetApp
          </p>
        </footer>
      )}
    </main>
  )
}
