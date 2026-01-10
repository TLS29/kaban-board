# 📋 KANBAN BOARD - Documento de Contexto

> **Versión:** 1.1
> **Última actualización:** 2025-01-10
> **Autor:** Jonathan García (con mentoría de Claude)
> **Objetivo:** Practicar conceptos de React nivel senior sin backend

---

## ⚠️ REGLAS IMPORTANTES PARA CLAUDE CODE

1. **TODO el código y comentarios en INGLÉS**
2. **Respetar arquitectura de componentes** — si ves algo que no cumple, dímelo
3. **Respuestas cortas y simples** — si necesito más detalle, pregunto
4. **Cuando toquemos un CONCEPTO DE SENIOR**, explícame brevemente qué es y por qué lo usamos aquí
5. **Seguir el flujo de desarrollo** — no saltar pasos
6. **Unit tests obligatorios** — cada feature debe tener tests
7. **Sin backend** — usar Faker.js para datos y localStorage para persistencia
8. **TypeScript estricto** — no usar `any`, tipar todo correctamente
9. **Functional components only** — no class components
10. **Accesibilidad** — siempre considerar a11y en los componentes

---

## 📍 ESTADO ACTUAL

```
┌─────────────────────────────────────────────────────────┐
│  FASE ACTUAL: 2 - Estado Global (Context + Reducer)     │
│  PASO ACTUAL: ⬚ Crear BoardContext con useReducer      │
│  SIGUIENTE:   ⬚ Definir actions tipadas                │
└─────────────────────────────────────────────────────────┘
```

**Completado hasta ahora:**

- ✅ FASE 1 COMPLETA
  - Setup Vite + React 19 + TypeScript + Tailwind v4
  - ESLint + Prettier + eslint-plugin-jsx-a11y
  - Tipos/interfaces del board (Discriminated Unions)
  - Estructura feature-based
  - Fake data con Faker.js (estructura normalizada)

---

## 🎯 Objetivo del Proyecto

Construir un **Kanban Board** (tipo Trello/Jira) que permita:

- Crear, editar y eliminar tarjetas
- Arrastrar tarjetas entre columnas
- Reordenar tarjetas dentro de una columna
- Filtrar y buscar tarjetas
- Persistir estado en localStorage
- Navegar con teclado (accesibilidad)
- Deshacer/rehacer acciones

**¿Por qué un Kanban?**  
Es uno de los ejercicios más comunes en entrevistas técnicas para React Senior porque toca casi todos los conceptos avanzados: state management, performance, drag and drop, patrones de composición, y accesibilidad.

---

## 🏗️ Stack Tecnológico

- **React 19** (Vite 7)
- **TypeScript 5.9** (modo estricto)
- **Tailwind CSS v4** (estilos)
- **Faker.js** (datos de prueba)
- **Vitest + React Testing Library** (testing)
- **localStorage** (persistencia)

**Sin dependencias de drag and drop** — implementaremos con HTML5 Drag and Drop API nativo para entender el concepto a fondo. Opcionalmente podemos migrar a `@dnd-kit` después.

---

## 🧠 CONCEPTOS DE SENIOR A PRACTICAR

### Resumen Rápido

| Concepto                  | Qué es (1 línea)                                           | Dónde se usa                                      |
| ------------------------- | ---------------------------------------------------------- | ------------------------------------------------- |
| **Custom Hooks**          | Extraer lógica reutilizable fuera de componentes           | `useBoard`, `useDragAndDrop`, `useLocalStorage`   |
| **Compound Components**   | Componentes que comparten estado implícito entre sí        | `<Board>`, `<Column>`, `<Card>` trabajando juntos |
| **Context + Reducer**     | Estado complejo con acciones predecibles tipo Redux        | Estado global del board                           |
| **Optimistic Updates**    | Actualizar UI inmediatamente antes de "confirmar"          | Mover tarjeta → UI cambia al instante             |
| **Memoization**           | Evitar re-renders innecesarios cacheando valores/funciones | `useMemo`, `useCallback`, `React.memo`            |
| **Drag and Drop**         | API nativa de HTML5 para arrastrar elementos               | Arrastrar cards entre columnas                    |
| **Controlled Components** | Componentes cuyo estado es controlado por el padre         | Inputs de edición inline                          |
| **Error Boundaries**      | Capturar errores en el árbol de componentes                | Evitar que un error rompa toda la app             |
| **Virtualization**        | Renderizar solo elementos visibles en viewport             | Listas con muchas tarjetas                        |
| **Debounce**              | Retrasar ejecución hasta que el usuario deje de escribir   | Búsqueda de tarjetas                              |
| **Command Pattern**       | Encapsular acciones como objetos para undo/redo            | Historial de acciones                             |
| **Derived State**         | Calcular estado a partir de otro estado existente          | Filtros activos                                   |
| **Referential Equality**  | Comparación por referencia en memoria                      | Optimización de re-renders                        |
| **TypeScript Generics**   | Tipos reutilizables con parámetros                         | Hooks y utilidades tipadas                        |

---

## 🛤️ FLUJO DE DESARROLLO (Orden Real)

> **Leyenda:** ✅ = completado | 🔄 = en progreso | ⬚ = pendiente

### FASE 1: Setup y Estructura Base ✅

| #   | Tarea                                  | Estado | Concepto Senior          |
| --- | -------------------------------------- | ------ | ------------------------ |
| 1.1 | Setup Vite + TypeScript + Tailwind     | ✅      | —                        |
| 1.2 | Configurar ESLint + Prettier           | ✅      | —                        |
| 1.3 | Definir tipos/interfaces del board     | ✅      | **TypeScript Generics**  |
| 1.4 | Estructura de carpetas (feature-based) | ✅      | **Project Architecture** |
| 1.5 | Crear fake data con Faker.js           | ✅      | —                        |

> 💡 **Nota sobre TypeScript Generics (1.3):**  
> Cuando lleguemos aquí, Claude debe explicar: "Generics permiten crear tipos reutilizables con parámetros. En vez de `function getItem(arr: Card[]): Card`, usamos `function getItem<T>(arr: T[]): T` — funciona con cualquier tipo. Esto nos permite crear hooks y utilidades que funcionan con diferentes entidades."

> 💡 **Nota sobre Project Architecture (1.4):**  
> Cuando lleguemos aquí, Claude debe explicar: "Feature-based structure agrupa archivos por funcionalidad, no por tipo. En vez de `/components`, `/hooks`, `/utils` globales, tenemos `/features/board/components`, `/features/board/hooks`. Esto mejora la cohesión y hace más fácil encontrar código relacionado."

---

### FASE 2: Estado Global (Context + Reducer)

| #   | Tarea                                               | Estado | Concepto Senior          |
| --- | --------------------------------------------------- | ------ | ------------------------ |
| 2.1 | Crear BoardContext con useReducer                   | ⬚      | **Flux Pattern**         |
| 2.2 | Definir actions tipadas (add, move, delete, update) | ⬚      | **Discriminated Unions** |
| 2.3 | Implementar reducer con lógica inmutable            | ⬚      | **Immutability**         |
| 2.4 | Custom hook `useBoard()`                            | ⬚      | **Custom Hooks**         |
| 2.5 | Custom hook `useLocalStorage()`                     | ⬚      | **Custom Hooks**         |
| 2.6 | Sincronizar estado con localStorage                 | ⬚      | **Side Effects**         |

> 💡 **Nota sobre Flux Pattern (2.1):**  
> Cuando lleguemos aquí, Claude debe explicar: "Flux es un patrón de flujo de datos unidireccional: View → Action → Dispatcher → Store → View. useReducer implementa este patrón: el componente dispara una action, el reducer la procesa y actualiza el state, el componente re-renderiza. Esto hace el estado predecible y debuggeable."

> 💡 **Nota sobre Discriminated Unions (2.2):**  
> Cuando lleguemos aquí, Claude debe explicar: "Discriminated Unions usan una propiedad común (como `type`) para distinguir entre variantes. TypeScript puede inferir el tipo correcto en cada branch del switch. Ejemplo: `{ type: 'ADD_CARD', payload: Card }` vs `{ type: 'DELETE_CARD', payload: string }` — TS sabe qué payload esperar según el type."

> 💡 **Nota sobre Immutability (2.3):**  
> Cuando lleguemos aquí, Claude debe explicar: "En React, NUNCA mutamos el estado directamente. Siempre creamos copias nuevas con spread operator o métodos como `.map()`, `.filter()`. Esto permite a React detectar cambios por referencia y optimizar re-renders. `state.cards.push(card)` ❌ vs `[...state.cards, card]` ✅"

> 💡 **Nota sobre Custom Hooks (2.4):**  
> Cuando lleguemos aquí, Claude debe explicar: "Custom Hooks extraen lógica stateful reutilizable. Empiezan con `use` y pueden usar otros hooks. `useBoard()` encapsula el acceso al contexto + acciones comunes, evitando que cada componente importe useContext + las acciones manualmente."

---

### FASE 3: Componentes Base

| #   | Tarea                                      | Estado | Concepto Senior           |
| --- | ------------------------------------------ | ------ | ------------------------- |
| 3.1 | Componente `<Board>` (container principal) | ⬚      | **Compound Components**   |
| 3.2 | Componente `<Column>` con header y lista   | ⬚      | **Composition Pattern**   |
| 3.3 | Componente `<Card>` con info básica        | ⬚      | **Single Responsibility** |
| 3.4 | Edición inline del título de card          | ⬚      | **Controlled Components** |
| 3.5 | Modal para editar card completa            | ⬚      | **Portal Pattern**        |
| 3.6 | Componente `<AddCard>` con form            | ⬚      | **Form Handling**         |

> 💡 **Nota sobre Compound Components (3.1):**  
> Cuando lleguemos aquí, Claude debe explicar: "Compound Components son un grupo de componentes que trabajan juntos compartiendo estado implícito. Como `<select>` y `<option>` en HTML — el select sabe qué option está seleccionada sin que tú lo conectes manualmente. Aquí, Board provee contexto que Column y Card consumen automáticamente."

> 💡 **Nota sobre Controlled Components (3.4):**  
> Cuando lleguemos aquí, Claude debe explicar: "Un Controlled Component tiene su valor controlado por React state, no por el DOM. El input no 'recuerda' lo que escribiste — React lo controla via `value` y `onChange`. Esto nos da control total: validación en tiempo real, formateo automático, etc."

> 💡 **Nota sobre Portal Pattern (3.5):**  
> Cuando lleguemos aquí, Claude debe explicar: "React Portal renderiza un componente fuera de su padre en el DOM, pero mantiene el contexto de React. Útil para modales que necesitan escapar del `overflow: hidden` de sus ancestros. Usamos `createPortal(children, document.body)`."

---

### FASE 4: Drag and Drop 🔥

| #   | Tarea                                   | Estado | Concepto Senior              |
| --- | --------------------------------------- | ------ | ---------------------------- |
| 4.1 | Hacer cards draggables                  | ⬚      | **HTML5 DnD API**            |
| 4.2 | Implementar drop zones en columns       | ⬚      | **Event Delegation**         |
| 4.3 | Transferir data durante drag            | ⬚      | **DataTransfer API**         |
| 4.4 | Reordenar cards dentro de misma columna | ⬚      | **Array Manipulation**       |
| 4.5 | Mover cards entre columnas              | ⬚      | **Cross-component State**    |
| 4.6 | Visual feedback (placeholder/ghost)     | ⬚      | **CSS + Conditional Render** |
| 4.7 | Optimistic update al soltar             | ⬚      | **Optimistic Updates**       |
| 4.8 | Custom hook `useDragAndDrop()`          | ⬚      | **Hook Composition**         |

> 💡 **Nota sobre HTML5 DnD API (4.1):**  
> Cuando lleguemos aquí, Claude debe explicar: "HTML5 Drag and Drop usa eventos nativos del browser: `dragstart`, `dragover`, `drop`, `dragend`. En el elemento draggable ponemos `draggable="true"` y `onDragStart`. En el drop zone ponemos `onDragOver` (con `e.preventDefault()` para permitir drop) y `onDrop` para procesar."

> 💡 **Nota sobre DataTransfer API (4.3):**  
> Cuando lleguemos aquí, Claude debe explicar: "DataTransfer es el objeto que lleva información durante el drag. En `dragstart` guardamos datos con `e.dataTransfer.setData('text/plain', cardId)`. En `drop` los recuperamos con `e.dataTransfer.getData('text/plain')`. Es como un clipboard temporal del drag."

> 💡 **Nota sobre Optimistic Updates (4.7):**  
> Cuando lleguemos aquí, Claude debe explicar: "Optimistic Update significa actualizar la UI inmediatamente, asumiendo que la operación va a funcionar. Si el 'backend' (localStorage en nuestro caso) falla, revertimos. El usuario ve feedback instantáneo en vez de esperar. Clave para UX fluida en drag and drop."

---

### FASE 5: Performance 🔥

| #   | Tarea                                     | Estado | Concepto Senior          |
| --- | ----------------------------------------- | ------ | ------------------------ |
| 5.1 | Identificar re-renders con React DevTools | ⬚      | **Profiler**             |
| 5.2 | Memoizar Card con `React.memo()`          | ⬚      | **Memoization**          |
| 5.3 | Optimizar handlers con `useCallback()`    | ⬚      | **Referential Equality** |
| 5.4 | Cachear cálculos con `useMemo()`          | ⬚      | **Computed Values**      |
| 5.5 | Evitar prop drilling innecesario          | ⬚      | **Context Optimization** |
| 5.6 | Virtualizar lista si hay >100 cards       | ⬚      | **Virtualization**       |

> 💡 **Nota sobre Memoization (5.2):**  
> Cuando lleguemos aquí, Claude debe explicar: "`React.memo()` es un HOC que evita re-renders si las props no cambian. Por defecto compara por referencia (shallow). Una Card solo debe re-renderizar si SUS datos cambian, no si otra card en otra columna cambió. Cuidado: si le pasas funciones como props, usa useCallback."

> 💡 **Nota sobre Referential Equality (5.3):**  
> Cuando lleguemos aquí, Claude debe explicar: "En JavaScript, `{} !== {}` — dos objetos/funciones son diferentes aunque tengan el mismo contenido. React compara props por referencia. Si creas una función inline `onClick={() => delete(id)}` en cada render, React ve una función 'nueva' y re-renderiza el hijo. `useCallback` mantiene la misma referencia entre renders."

> 💡 **Nota sobre Virtualization (5.6):**  
> Cuando lleguemos aquí, Claude debe explicar: "Virtualization renderiza SOLO los elementos visibles en el viewport, no los 1000 items de la lista. Cuando scrolleas, destruye los que salen y crea los que entran. Librerías: `react-window`, `@tanstack/virtual`. Reduce drásticamente el DOM y mejora performance."

---

### FASE 6: Features Avanzados

| #   | Tarea                             | Estado | Concepto Senior      |
| --- | --------------------------------- | ------ | -------------------- |
| 6.1 | Filtros por label/prioridad       | ⬚      | **Derived State**    |
| 6.2 | Búsqueda de tarjetas con debounce | ⬚      | **Debounce**         |
| 6.3 | Navegación con teclado (a11y)     | ⬚      | **Accessibility**    |
| 6.4 | Undo/Redo de acciones             | ⬚      | **Command Pattern**  |
| 6.5 | Error Boundary global             | ⬚      | **Error Boundaries** |
| 6.6 | Drag de columnas completas        | ⬚      | **Advanced DnD**     |

> 💡 **Nota sobre Derived State (6.1):**  
> Cuando lleguemos aquí, Claude debe explicar: "Derived State es estado que se calcula a partir de otro estado. NO lo guardamos por separado — lo computamos. Si tenemos `cards` y `filterByLabel`, las `filteredCards` se calculan con `useMemo(() => cards.filter(...), [cards, filterByLabel])`. Evita inconsistencias entre estado 'original' y 'filtrado'."

> 💡 **Nota sobre Debounce (6.2):**  
> Cuando lleguemos aquí, Claude debe explicar: "Debounce retrasa la ejecución de una función hasta que el usuario deje de hacer algo por X milisegundos. En búsqueda: no queremos filtrar en cada keystroke, sino esperar 300ms después del último teclazo. Evita trabajo innecesario y mejora UX."

> 💡 **Nota sobre Command Pattern (6.4):**  
> Cuando lleguemos aquí, Claude debe explicar: "Command Pattern encapsula una acción como un objeto con `execute()` y `undo()`. Guardamos un historial de commands. Para undo, ejecutamos el `undo()` del último command. Para redo, ejecutamos el `execute()` del command que deshicimos. Cada acción sabe cómo revertirse."

> 💡 **Nota sobre Error Boundaries (6.5):**  
> Cuando lleguemos aquí, Claude debe explicar: "Error Boundary es un componente que captura errores de JavaScript en su árbol de hijos y muestra un fallback UI en vez de crashear toda la app. Se implementa con `componentDidCatch` (class component) o librerías como `react-error-boundary`. Un error en una Card no debería romper todo el Board."

> 💡 **Nota sobre Accessibility (6.3):**  
> Cuando lleguemos aquí, Claude debe explicar: "Accesibilidad (a11y) significa que usuarios con discapacidades pueden usar la app. Para Kanban: navegación con Tab entre cards, Enter para seleccionar, Arrow keys para mover, Escape para cancelar. Usamos `role`, `aria-label`, `aria-grabbed`, `tabIndex`. Screen readers deben poder anunciar acciones."

---

### FASE 7: Testing

| #   | Tarea                                | Estado | Concepto Senior           |
| --- | ------------------------------------ | ------ | ------------------------- |
| 7.1 | Setup Vitest + React Testing Library | ⬚      | —                         |
| 7.2 | Unit tests del reducer               | ⬚      | **Pure Function Testing** |
| 7.3 | Tests de custom hooks                | ⬚      | **renderHook**            |
| 7.4 | Integration tests del Board          | ⬚      | **Component Integration** |
| 7.5 | Tests de drag and drop               | ⬚      | **User Event Testing**    |
| 7.6 | Coverage report                      | ⬚      | —                         |

> 💡 **Nota sobre Pure Function Testing (7.2):**  
> Cuando lleguemos aquí, Claude debe explicar: "Un reducer es una función pura: mismo input → mismo output, sin side effects. Esto lo hace trivial de testear: `expect(reducer(initialState, action)).toEqual(expectedState)`. No necesitas mocks, no necesitas setup complicado. Por eso separamos lógica en el reducer."

> 💡 **Nota sobre renderHook (7.3):**  
> Cuando lleguemos aquí, Claude debe explicar: "`renderHook` de @testing-library/react permite testear hooks en aislamiento, fuera de un componente. Retorna `result.current` con el valor actual del hook. Podemos llamar funciones del hook con `act()` y verificar que el estado cambió correctamente."

---

## 📦 Tipos e Interfaces

```typescript
// types/board.types.ts

export interface Card {
  id: string
  title: string
  description?: string
  labels: Label[]
  priority: Priority
  assignee?: string
  createdAt: Date
  updatedAt: Date
}

export interface Column {
  id: string
  title: string
  cardIds: string[] // IDs ordenados de cards en esta columna
}

export interface Board {
  id: string
  title: string
  columns: Column[]
  cards: Record<string, Card> // Normalizado por ID para O(1) lookup
}

export interface Label {
  id: string
  name: string
  color: string
}

export type Priority = 'low' | 'medium' | 'high' | 'urgent'

// Estado global
export interface BoardState {
  board: Board
  draggedCardId: string | null
  activeFilters: {
    labels: string[]
    priority: Priority | null
    search: string
  }
  history: HistoryEntry[] // Para undo/redo
  historyIndex: number
}

// Actions (Discriminated Union)
export type BoardAction =
  | { type: 'ADD_CARD'; payload: { columnId: string; card: Card } }
  | { type: 'UPDATE_CARD'; payload: { cardId: string; updates: Partial<Card> } }
  | { type: 'DELETE_CARD'; payload: { cardId: string; columnId: string } }
  | {
      type: 'MOVE_CARD'
      payload: {
        cardId: string
        fromColumnId: string
        toColumnId: string
        toIndex: number
      }
    }
  | {
      type: 'REORDER_CARD'
      payload: { columnId: string; fromIndex: number; toIndex: number }
    }
  | { type: 'ADD_COLUMN'; payload: { column: Column } }
  | { type: 'UPDATE_COLUMN'; payload: { columnId: string; title: string } }
  | { type: 'DELETE_COLUMN'; payload: { columnId: string } }
  | { type: 'SET_DRAGGED_CARD'; payload: string | null }
  | { type: 'SET_FILTER'; payload: Partial<BoardState['activeFilters']> }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'LOAD_BOARD'; payload: Board }

// Para undo/redo
export interface HistoryEntry {
  action: BoardAction
  previousState: Board
}
```

---

## 🗂️ Estructura de Carpetas

```
src/
├── components/
│   └── ui/                      # Componentes genéricos reutilizables
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── index.ts
├── features/
│   └── board/
│       ├── components/          # Componentes específicos del board
│       │   ├── Board.tsx
│       │   ├── Column.tsx
│       │   ├── Card.tsx
│       │   ├── CardForm.tsx
│       │   ├── CardModal.tsx
│       │   ├── FilterBar.tsx
│       │   └── index.ts
│       ├── hooks/               # Hooks del feature
│       │   ├── useBoard.ts
│       │   ├── useDragAndDrop.ts
│       │   ├── useCardActions.ts
│       │   └── index.ts
│       ├── context/             # Estado global del board
│       │   ├── BoardContext.tsx
│       │   ├── boardReducer.ts
│       │   └── index.ts
│       ├── types/               # Tipos específicos
│       │   └── board.types.ts
│       └── utils/               # Helpers
│           ├── boardHelpers.ts
│           └── index.ts
├── hooks/                       # Hooks globales
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   └── index.ts
├── data/                        # Datos de prueba
│   ├── fakeBoard.ts
│   └── index.ts
├── lib/                         # Configuraciones externas
│   └── faker.ts
├── styles/                      # Estilos globales si los hay
│   └── index.css
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

---

## 🎨 Diseño Visual (Referencia)

```
┌──────────────────────────────────────────────────────────────────────┐
│  📋 Mi Kanban Board                              [🔍 Search] [Filter]│
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌──────────┐ │
│  │ 📥 To Do    │   │ 🔄 In Progress│  │ 👀 Review   │   │ ✅ Done  │ │
│  │ (3 cards)   │   │ (2 cards)   │   │ (1 card)    │   │ (4 cards)│ │
│  ├─────────────┤   ├─────────────┤   ├─────────────┤   ├──────────┤ │
│  │ ┌─────────┐ │   │ ┌─────────┐ │   │ ┌─────────┐ │   │┌────────┐│ │
│  │ │ Card 1  │ │   │ │ Card 4  │ │   │ │ Card 6  │ │   ││ Card 7 ││ │
│  │ │ 🔴 High │ │   │ │ 🟡 Med  │ │   │ │ 🟢 Low  │ │   ││ ✓ Done ││ │
│  │ └─────────┘ │   │ └─────────┘ │   │ └─────────┘ │   │└────────┘│ │
│  │ ┌─────────┐ │   │ ┌─────────┐ │   │             │   │┌────────┐│ │
│  │ │ Card 2  │ │   │ │ Card 5  │ │   │             │   ││ Card 8 ││ │
│  │ │ 🟡 Med  │ │   │ └─────────┘ │   │             │   │└────────┘│ │
│  │ └─────────┘ │   │             │   │             │   │          │ │
│  │ ┌─────────┐ │   │             │   │             │   │          │ │
│  │ │ Card 3  │ │   │             │   │             │   │          │ │
│  │ └─────────┘ │   │             │   │             │   │          │ │
│  │ + Add card  │   │ + Add card  │   │ + Add card  │   │+ Add card│ │
│  └─────────────┘   └─────────────┘   └─────────────┘   └──────────┘ │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Configuraciones Iniciales

### tsconfig.json (opciones importantes)

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@features/*": ["./src/features/*"],
      "@hooks/*": ["./src/hooks/*"]
    }
  }
}
```

### Prettier + ESLint ✅

- Prettier para formateo
- ESLint con reglas de React Hooks
- `eslint-plugin-jsx-a11y` para accesibilidad (instalado y configurado)

---

## ❓ Preguntas de Verificación

1. **¿Por qué normalizar cards en un objeto en vez de array?**
   - Acceso O(1) por ID, evita `.find()` en cada operación

2. **¿Por qué cardIds en Column en vez de cards directamente?**
   - Permite reordenar sin modificar los objetos Card, mantiene el orden explícito

3. **¿Por qué useReducer en vez de useState?**
   - Lógica compleja centralizada, acciones predecibles, fácil de testear

4. **¿Por qué implementar DnD nativo en vez de usar librería?**
   - Entender el concepto a fondo, luego migrar a librería es trivial

5. **¿Por qué feature-based structure?**
   - Cohesión: todo lo relacionado al board está junto, fácil de encontrar y mantener

---

## 📝 HISTORIAL DE SESIONES

| Fecha      | Qué se hizo                  | Siguiente paso          |
| ---------- | ---------------------------- | ----------------------- |
| 2025-12-30 | Documento de contexto creado | Setup Vite + TypeScript |
| 2025-01-10 | FASE 1 completada: Setup, tipos, estructura, fake data | Fase 2: Context + Reducer |

---

## 🚀 Comandos Útiles

```bash
# Crear proyecto
npm create vite@latest kanban-board -- --template react-ts

# Instalar dependencias
npm install @faker-js/faker
npm install -D tailwindcss postcss autoprefixer
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @types/node

# Iniciar dev server
npm run dev

# Correr tests
npm run test

# Coverage
npm run test -- --coverage
```

---

> **Versión:** 1.0  
> **Notas:** Documento inicial del proyecto Kanban Board para práctica de React Senior.
