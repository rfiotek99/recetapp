# 🔥 Sistema de Calorías - Recetas IA

## ✨ Qué agregamos

Cada receta ahora incluye información nutricional completa:

### 1. En la vista de Card (compacta)
```
┌──────────────────────────────────┐
│ 95% Match ❤️                     │
│                                  │
│ Arroz con Pollo                  │
│ Clásico arroz con pollo...       │
│                                  │
│ ⏱️ 35min  👥 4  📊 fácil         │
│ 🔥 420 cal  ← NUEVO!             │
│                                  │
└──────────────────────────────────┘
```

### 2. En la vista expandida (detallada)
```
┌──────────────────────────────────┐
│ [Ver receta completa] ✓          │
│                                  │
│ 🔥 Información Nutricional       │
│ ┌──────────────────────────────┐│
│ │ Por porción    Total         ││
│ │ 420 cal        1680 cal      ││
│ └──────────────────────────────┘│
│                                  │
│ 🛒 Ingredientes                  │
│ ✅ 2 tazas arroz      290 cal    │
│ ✅ 500g pollo         275 cal    │
│ ✅ 1 tomate            22 cal    │
│ 🔸 1 limón              8 cal    │
│                                  │
└──────────────────────────────────┘
```

## 📊 Cómo funciona

### OpenAI calcula automáticamente:
1. **Calorías por ingrediente** - basado en cantidad y tipo
2. **Total de calorías** - suma de todos los ingredientes
3. **Calorías por porción** - total dividido por cantidad de porciones

### Ejemplo de cálculo:
```
Arroz con Pollo (4 porciones):
- 2 tazas arroz (crudo)    = ~680 cal
- 500g pechuga pollo       = ~550 cal  
- 200g tomate              =  ~36 cal
- 2 cucharadas aceite      = ~240 cal
- Condimentos              =  ~20 cal
--------------------------------
TOTAL:                      1526 cal
Por porción (÷4):           ~381 cal
```

## 🎨 Visual en la UI

### Badge en card:
- **Color**: Naranja fuego 🔥
- **Posición**: Después de dificultad
- **Formato**: "420 cal" (redondeado)

### Panel expandido:
- **Fondo**: Gradiente naranja-amber
- **Layout**: Grid 2 columnas
  - Columna 1: Calorías por porción (grande, destacado)
  - Columna 2: Calorías totales (información adicional)

### En cada ingrediente:
- **Alineación**: A la derecha
- **Color**: Gris claro
- **Formato**: "290 cal" en texto pequeño

## 💡 Casos de uso

### Para tu mamá:
- "Quiero algo liviano" → filtra por <400 cal/porción
- "Puedo comer normal" → cualquier valor
- Control de porciones más preciso

### Para vos:
- Track de macros si estás en algún plan
- Comparar entre recetas similares
- Tomar decisiones informadas

## 🔧 Implementación técnica

### 1. Tipo TypeScript actualizado:
```typescript
export interface Recipe {
  // ... campos existentes
  calories_per_serving?: number
  total_calories?: number
}

export interface Ingredient {
  // ... campos existentes
  calories?: number
}
```

### 2. Prompt de OpenAI:
```
"CALCULA las calorías aproximadas:
- Por cada ingrediente (basado en cantidad)
- Total de la receta
- Por porción (total ÷ porciones)

Ejemplo: pollo 250g ≈ 275 cal"
```

### 3. Validación:
- Valores opcionales (no rompe si faltan)
- Solo se muestran si están presentes
- Formato siempre redondeado sin decimales

## 📈 Ejemplos reales

### Receta liviana:
```
Ensalada de Pollo Grillado
Por porción: 285 cal
Total: 570 cal (2 porciones)
```

### Receta media:
```
Arroz con Pollo
Por porción: 420 cal  
Total: 1680 cal (4 porciones)
```

### Receta completa:
```
Milanesa Napolitana con Papas
Por porción: 680 cal
Total: 2720 cal (4 porciones)
```

## 🎯 Futuras mejoras

Podrías agregar:
- Filtro por rango de calorías
- Gráfico de distribución (carbos/proteína/grasa)
- Comparador entre recetas
- Sugerencias de "versión light"
- Guardar objetivo calórico diario

## ⚠️ Nota importante

Las calorías son **aproximadas** - OpenAI calcula basado en:
- Bases de datos nutricionales estándar
- Cantidades exactas en la receta
- Métodos de cocción

Para valores exactos, siempre consultar tablas nutricionales oficiales.

---

**¡Ahora tu app de recetas es mucho más completa! 🎉**
