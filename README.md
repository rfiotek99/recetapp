# 🍳 Recetas IA

App de recetas inteligentes que sugiere recetas personalizadas basadas en los ingredientes que tenés disponibles.

## ✨ Concepto de UX

**Flujo ultra-simple en 3 pasos:**

1. **Input inteligente** 
   - Usuario escribe o habla sus ingredientes
   - Se transforman automáticamente en tags
   - Puede agregar/eliminar con un click

2. **Generación IA** 
   - Presiona "Generar Recetas"
   - IA crea 3 recetas personalizadas
   - Ordenadas por % de match

3. **Resultados inteligentes**
   - Match score visual (verde/amarillo/naranja)
   - **💡 Sugerencias**: "Agregá X para mejorar"
   - Receta completa expandible
   - Sistema de favoritos

## 🚀 Stack

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **IA:** OpenAI GPT-4
- **Deploy:** Vercel

## 📋 Features Implementadas

- ✅ Input de ingredientes con tags interactivos
- ✅ Reconocimiento de voz (Web Speech API)
- ✅ Generación de recetas con IA
- ✅ Match score visual (1-100%)
- ✅ Sugerencias de ingredientes adicionales
- ✅ Recetas expandibles con instrucciones detalladas
- ✅ Sistema de favoritos
- ✅ Design moderno con gradientes
- ✅ Responsive design completo

## 🛠️ Setup Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Copiar `.env.local.example` a `.env.local`:
```bash
cp .env.local.example .env.local
```

Editar `.env.local`:
```env
# Supabase (opcional por ahora)
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_de_supabase

# OpenAI (OBLIGATORIO)
OPENAI_API_KEY=tu_api_key_de_openai

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Crear proyecto en Supabase (opcional para MVP)
1. Ir a [supabase.com](https://supabase.com)
2. Crear nuevo proyecto
3. Ir a SQL Editor
4. Copiar y ejecutar: `supabase/migrations/001_initial_schema.sql`

### 4. Correr el proyecto
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 🎨 Componentes Principales

```
src/
├── app/
│   ├── page.tsx                    # Home con input y resultados
│   └── api/recipes/generate/       # API de generación
│
├── components/
│   ├── recipes/
│   │   ├── IngredientInput.tsx    # Input con tags + voz
│   │   ├── RecipeCard.tsx         # Card con match y sugerencias
│   │   └── RecipeList.tsx         # Grid de recetas
│   └── voice/
│       └── VoiceInput.tsx         # Botón de micrófono
│
└── lib/
    ├── openai/
    │   ├── client.ts              # Cliente OpenAI
    │   └── prompts.ts             # Prompt optimizado
    └── utils/
        ├── formatters.ts          # Helpers de formato
        └── validators.ts          # Validaciones Zod
```

## 🎯 Funcionalidades Clave

### 💡 Sistema de Sugerencias
Cada receta muestra ingredientes faltantes:
- **Si tenés 80%+ match**: solo muestra ingredientes que mejorarían la receta
- **Si tenés 60-80% match**: sugiere ingredientes clave
- **Si tenés <60% match**: muestra los 3 ingredientes más importantes

### 🎤 Input por Voz
- Compatible con Chrome, Edge, Safari
- Reconocimiento en español argentino
- Separa automáticamente por comas y "y"

### 📊 Match Score
- **Verde (80-100%)**: Podés hacer la receta ahora
- **Amarillo (60-79%)**: Te falta poco
- **Naranja (<60%)**: Necesitás más ingredientes

## 📝 Próximos Pasos (Semana 2-3)

- [ ] Auth con Supabase
- [ ] Guardar recetas en DB
- [ ] Sistema de favoritos persistente
- [ ] Historial de búsquedas
- [ ] Página de perfil
- [ ] PWA features
- [ ] Deploy a Vercel

## 🐛 Troubleshooting

**Error: OPENAI_API_KEY no definida**
- Asegurate de tener `.env.local` con tu API key
- Reiniciá el servidor después de crear `.env.local`

**Micrófono no funciona**
- Usá Chrome o Edge (Safari tiene soporte limitado)
- Permitir acceso al micrófono cuando lo pida el navegador

**Recetas no se generan**
- Verificá que tengas créditos en tu cuenta de OpenAI
- Revisá la consola del navegador para ver errores

## 👨‍💻 Autor

Ramiro - RF Analytics
Proyecto desarrollado en 3 semanas | Diciembre 2025
