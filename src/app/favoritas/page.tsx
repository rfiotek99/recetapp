'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import RecipeCard from '@/components/recipes/RecipeCard'
import { Recipe } from '@/types/recipe'

export default function FavoritasPage() {
  const [favorites, setFavorites] = useState<Recipe[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('recetapp-favorites')
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <header className="bg-white shadow-md border-b-4 border-primary-500">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-12 h-12 bg-food-gradient rounded-2xl flex items-center justify-center shadow-food transform rotate-3">
              <span className="text-3xl">🍳</span>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-food-gradient bg-clip-text text-transparent">
                RecetApp
              </h1>
              <p className="text-xs text-gray-600">Mis favoritas</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4 bg-food-gradient bg-clip-text text-transparent">
            ❤️ Mis Recetas Favoritas
          </h2>
          <p className="text-xl text-gray-600">
            {favorites.length === 0 
              ? 'Todavía no tenés favoritas. ¡Empezá a cocinar!'
              : `Tenés ${favorites.length} receta${favorites.length > 1 ? 's' : ''} guardada${favorites.length > 1 ? 's' : ''}`
            }
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-12 text-center border-4 border-primary-200">
            <div className="text-8xl mb-6">🤷‍♂️</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              No hay favoritas aún
            </h3>
            <p className="text-gray-600 mb-8">
              Marcá el corazón en las recetas que te gusten para guardarlas acá
            </p>
            <Link 
              href="/"
              className="inline-block bg-food-gradient text-white font-bold px-8 py-4 rounded-2xl hover:shadow-food transition-all"
            >
              ← Buscar Recetas
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((recipe, index) => (
              <RecipeCard 
                key={recipe.id || index}
                recipe={recipe}
                userIngredients={[]}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
