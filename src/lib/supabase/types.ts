// Este archivo será generado automáticamente por Supabase CLI
// Por ahora es un placeholder

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          dietary_preferences: string[] | null
          skill_level: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          dietary_preferences?: string[] | null
          skill_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          dietary_preferences?: string[] | null
          skill_level?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      recipes: {
        Row: {
          id: string
          user_id: string | null
          name: string
          description: string | null
          difficulty: string | null
          prep_time: number
          cook_time: number
          servings: number
          instructions: Json
          tips: Json | null
          tags: string[] | null
          match_score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          description?: string | null
          difficulty?: string | null
          prep_time: number
          cook_time: number
          servings: number
          instructions: Json
          tips?: Json | null
          tags?: string[] | null
          match_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          description?: string | null
          difficulty?: string | null
          prep_time?: number
          cook_time?: number
          servings?: number
          instructions?: Json
          tips?: Json | null
          tags?: string[] | null
          match_score?: number | null
          created_at?: string
        }
      }
      // Más tablas aquí...
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
