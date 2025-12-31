export interface UserProfile {
  id: string
  display_name?: string
  dietary_preferences?: string[]
  skill_level?: 'principiante' | 'intermedio' | 'avanzado'
  created_at?: string
  updated_at?: string
}

export interface SearchHistory {
  id: string
  user_id: string
  ingredients: string[]
  dietary_preferences?: string[]
  time_available?: number
  created_at: string
}

export interface Favorite {
  id: string
  user_id: string
  recipe_id: string
  created_at: string
}
