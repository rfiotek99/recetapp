'use client'
import { useState } from 'react'

interface SituationInputProps {
  onGenerate: (situation: string) => void
  isLoading: boolean
}

export default function SituationInput({ onGenerate, isLoading }: SituationInputProps) {
  const [situation, setSituation] = useState('')

  const examples = [
    { icon: '👨‍👩‍👧', text: 'Vienen mis suegros a cenar' },
    { icon: '💕', text: 'Cena romántica con mi pareja' },
    { icon: '🎂', text: 'Cumpleaños de mi hijo (10 años)' },
    { icon: '⚡', text: 'Almuerzo rápido para hoy' },
    { icon: '👥', text: 'Asado con amigos este finde' },
    { icon: '🥗', text: 'Comida saludable para la semana' },
  ]

  return (
    <div className="space-y-6">
      <div className="relative">
        <textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder="Contame tu situación... Ej: Vienen mis padres a almorzar"
          rows={4}
          className="w-full px-6 py-5 text-lg text-gray-800 placeholder-gray-400 border-3 border-primary-300 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-200 focus:outline-none transition-all shadow-sm bg-white resize-none"
        />
      </div>

      <button
        onClick={() => situation.trim() && onGenerate(situation)}
        disabled={!situation.trim() || isLoading}
        className="w-full bg-food-gradient hover:shadow-food text-white font-black py-5 px-8 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Pensando opciones...
          </span>
        ) : (
          <span>✨ Dame Ideas de Recetas</span>
        )}
      </button>

      <div>
        <p className="text-sm text-gray-600 mb-4 font-semibold text-center">
          💡 O elegí una situación común:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setSituation(example.text)}
              className="flex items-center gap-3 p-4 bg-white border-2 border-primary-200 hover:border-primary-400 rounded-xl transition-all hover:shadow-md text-left"
            >
              <span className="text-3xl">{example.icon}</span>
              <span className="text-gray-700 font-medium">{example.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
