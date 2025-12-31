'use client'

import RecipeCard from './RecipeCard'
import { Recipe } from '@/types/recipe'

interface RecipeListProps {
  recipes: Recipe[]
  userIngredients: string[]
}

export default function RecipeList({ recipes, userIngredients }: RecipeListProps) {
  // Ordenar por match_score
  const sortedRecipes = [...recipes].sort((a, b) => b.match_score - a.match_score)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedRecipes.map((recipe, index) => (
        <RecipeCard 
          key={recipe.id || index} 
          recipe={recipe}
          userIngredients={userIngredients}
        />
      ))}
    </div>
  )
}
