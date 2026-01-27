'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SituationInput from '@/components/recipes/SituationInput'
import RecipeList from '@/components/recipes/RecipeList'
import { Recipe } from '@/types/recipe'

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('recetapp-favorites')
    if (stored) {
      setFavoritesCount(JSON.parse(stored).length)
    }
  }, [])

  const handleGenerateRecipes = async (situation: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation }),
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
              <p className="text-xs text-gray-600">Tu chef personal con IA</p>
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
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {recipes.length === 0 && (
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold animate-pulse shadow-lg">
                🔥 Nuevo: Recetas según tu situación
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-4">
              <span className="bg-food-gradient bg-clip-text text-transparent">
                ¿Qué vas a
              </span>
              <br />
              <span className="text-gray-800">
                cocinar hoy?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
              Contanos tu situación y te sugerimos 
              <span className="text-primary-600 font-bold"> 3 recetas perfectas</span>: simple, media y compleja
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
                    <span className="text-4xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Contanos tu situación
                    </h3>
                    <p className="text-gray-600">Y te damos las mejores opciones</p>
                  </div>
                </div>
                
                <SituationInput
                  onGenerate={handleGenerateRecipes}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        )}

        {recipes.length > 0 && (
          <div>
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-4xl font-black bg-food-gradient bg-clip-text text-transparent mb-2">
                  Tus Opciones Perfectas
                </h2>
                <p className="text-gray-600">
                  De simple a compleja - elegí según tu tiempo y ganas
                </p>
              </div>
              <button
                onClick={() => setRecipes([])}
                className="bg-white hover:bg-gray-50 text-primary-600 font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-primary-500 flex items-center gap-2"
              >
                <span>←</span> Nueva Situación
              </button>
            </div>

            <RecipeList recipes={recipes} userIngredients={[]} />
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
