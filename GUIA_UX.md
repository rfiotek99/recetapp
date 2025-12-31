# 🎨 Guía Visual de UX - Recetas IA

## 📱 Flujo de Usuario

### 1️⃣ PANTALLA INICIAL (Home)
```
┌─────────────────────────────────────────┐
│     🍳 Recetas IA                       │
│  Decime qué tenés y te digo qué cocinar │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ ¿Qué tenés en la heladera?        │ │
│  │                                   │ │
│  │ [Input con micrófono]        🎤  │ │
│  │                                   │ │
│  │ ┌─────────┐ ┌──────┐ ┌──────┐   │ │
│  │ │ pollo   │ │arroz │ │tomate│   │ │
│  │ └─────────┘ └──────┘ └──────┘   │ │
│  │                                   │ │
│  │ [✨ Generar Recetas (3 ing.)]    │ │
│  │                                   │ │
│  │ 💡 Tip: Podés escribir o hablar  │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Probá con: +pollo +arroz +tomate      │
└─────────────────────────────────────────┘
```

### 2️⃣ RESULTADOS (Grid de Recetas)
```
┌─────────────────────────────────────────────────────────────────┐
│  Tus recetas personalizadas          ← Nueva búsqueda           │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                     │
│  │ 95% ❤️  │  │ 82% 🤍  │  │ 68% 🤍  │                     │
│  │          │  │          │  │          │                     │
│  │ Arroz    │  │ Pollo al │  │ Salteado │                     │
│  │ con      │  │ Horno    │  │ Oriental │                     │
│  │ Pollo    │  │          │  │          │                     │
│  │          │  │          │  │          │                     │
│  │ ⏱️ 35min │  │ ⏱️ 45min │  │ ⏱️ 25min │                     │
│  │ 👥 4     │  │ 👥 4     │  │ 👥 2     │                     │
│  │ 📊 fácil │  │ 📊 media │  │ 📊 fácil │                     │
│  │          │  │          │  │          │                     │
│  │ 💡 Agregá│  │ 💡 Agregá│  │          │                     │
│  │ limón,   │  │ romero,  │  │          │                     │
│  │ perejil  │  │ ajo      │  │          │                     │
│  │          │  │          │  │          │                     │
│  │[Ver rec.]│  │[Ver rec.]│  │[Ver rec.]│                     │
│  └──────────┘  └──────────┘  └──────────┘                     │
└─────────────────────────────────────────────────────────────────┘
```

### 3️⃣ RECETA EXPANDIDA
```
┌──────────────────────────────────────┐
│ 95% Match ❤️                         │
│                                      │
│ Arroz con Pollo Argentino            │
│ Clásico arroz con pollo al estilo... │
│                                      │
│ ⏱️ 35min  👥 4  📊 fácil            │
│                                      │
│ 💡 Agregá para mejorar:              │
│ ┌─────┐ ┌────────┐                  │
│ │limón│ │perejil │                  │
│ └─────┘ └────────┘                  │
│                                      │
│ [👆 Ver menos]                       │
│                                      │
│ 🛒 Ingredientes                      │
│ ✅ 2 tazas arroz                     │
│ ✅ 500g pollo                        │
│ ✅ 1 tomate                          │
│ 🔸 1 limón (opcional)                │
│ 🔸 perejil (opcional)                │
│                                      │
│ 👨‍🍳 Preparación                      │
│ 1. Cortar el pollo en trozos...     │
│ 2. Calentar aceite en una olla...   │
│ 3. Agregar el arroz y mezclar...    │
│                                      │
│ 💡 Tips                              │
│ • Usá caldo en vez de agua          │
│ • Dejá reposar 5min antes de servir │
│                                      │
│ #argentino #fácil #economico         │
└──────────────────────────────────────┘
```

## 🎨 Paleta de Colores

### Gradientes Principales
- **Header**: `from-orange-600 to-red-600`
- **Botones**: `from-orange-500 to-red-500`
- **Background**: `from-orange-50 via-white to-red-50`

### Match Score
- **Verde (80-100%)**: `bg-green-100 text-green-700 border-green-300`
- **Amarillo (60-79%)**: `bg-yellow-100 text-yellow-700 border-yellow-300`
- **Naranja (<60%)**: `bg-orange-100 text-orange-700 border-orange-300`

### Elementos
- **Tags ingredientes**: `bg-white border-orange-200 text-orange-700`
- **Sugerencias**: `from-orange-50 to-red-50` con `border-orange-200`
- **Cards**: `bg-white` con `shadow-lg hover:shadow-xl`

## 🔄 Interacciones

### Input de Ingredientes
1. Usuario escribe → Enter → se crea tag
2. Usuario habla → automático → se crean múltiples tags
3. Click en X → elimina tag
4. "Limpiar todo" → vacía todos

### Generación
1. Click "Generar" → loading spinner
2. Espera ~3-5 segundos
3. Fade-in de resultados ordenados por match

### Ver Receta
1. Click "Ver receta completa"
2. Expand animation
3. Muestra todo el contenido
4. "Ver menos" colapsa

### Favoritos
1. Click en 🤍 → cambia a ❤️
2. Animación scale
3. (Futuro: se guarda en DB)

## 📊 Lógica de Match Score

```typescript
// Cálculo en el prompt de OpenAI
match_score = (ingredientes_disponibles / total_ingredientes) * 100

Ejemplos:
- 3/3 ingredientes = 100%
- 4/5 ingredientes = 80%
- 2/5 ingredientes = 40%
```

## 💡 Sistema de Sugerencias

```typescript
// Lógica en RecipeCard.tsx
const missingIngredients = recipe.ingredients
  .filter(ing => !ing.is_available)
  .slice(0, 3) // Máximo 3 sugerencias

// Solo muestra si hay ingredientes faltantes
// Prioriza los primeros 3 (los más importantes según IA)
```

## 🎤 Input por Voz

### Comportamiento
1. Click en micrófono → se pone rojo y pulsa
2. Hablar ingredientes: "pollo, arroz, tomate"
3. Automático → separa por comas, "y", puntos
4. Crea tags sin duplicados
5. Feedback visual → microphone color

### Separadores reconocidos
- Comas: `,`
- Punto: `.`
- "y": palabra
- Espacios múltiples

Ejemplo input: "pollo y arroz, tomate. cebolla"
Resultado: `['pollo', 'arroz', 'tomate', 'cebolla']`

## 📱 Responsive

### Mobile (<768px)
- Grid: 1 columna
- Cards: full width
- Header: text-4xl
- Padding reducido

### Tablet (768px-1024px)
- Grid: 2 columnas
- Cards: más espaciadas

### Desktop (>1024px)
- Grid: 3 columnas
- Max-width: 6xl (1280px)
- Hover effects completos

## ✨ Animaciones

- **Loading**: spinner rotation + pulse en botón
- **Cards**: hover shadow + translate-y
- **Expand**: fade-in con duration-300
- **Voice button**: pulse animation cuando activo
- **Tags**: hover scale en X (eliminar)

## 🎯 Próximas Mejoras UX

1. **Toast notifications** para feedback
2. **Skeleton loading** mientras carga
3. **Empty states** con ilustraciones
4. **Filtros** por tiempo/dificultad
5. **Compartir** receta (copy link)
6. **Print** receta (CSS print-friendly)
