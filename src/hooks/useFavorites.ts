'use client'

import { useState, useEffect } from 'react'
import { Recipe } from '@/types/recipe'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('recetapp-favorites')
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  const addFavorite = (recipe: Recipe) => {
    const newFavorites = [...favorites, { ...recipe, id: Date.now().toString() }]
    setFavorites(newFavorites)
    localStorage.setItem('recetapp-favorites', JSON.stringify(newFavorites))
  }

  const removeFavorite = (recipeId: string) => {
    const newFavorites = favorites.filter(r => r.id !== recipeId)
    setFavorites(newFavorites)
    localStorage.setItem('recetapp-favorites', JSON.stringify(newFavorites))
  }

  const isFavorite = (recipeName: string) => {
    return favorites.some(r => r.name === recipeName)
  }

  const toggleFavorite = (recipe: Recipe) => {
    const existing = favorites.find(r => r.name === recipe.name)
    if (existing) {
      removeFavorite(existing.id!)
    } else {
      addFavorite(recipe)
    }
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    count: favorites.length
  }
}
