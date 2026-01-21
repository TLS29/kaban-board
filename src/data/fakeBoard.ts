import { faker } from '@faker-js/faker'
import type {
  Board,
  Card,
  Column,
  Label,
  Priority,
} from '@features/board/types'

// =============================================================================
// CONSTANTS
// =============================================================================

// Labels predefinidos - los exportamos porque los necesitaremos en los filtros
export const DEFAULT_LABELS: Label[] = [
  { id: 'label-bug', name: 'Bug', color: '#ef4444' },
  { id: 'label-feature', name: 'Feature', color: '#22c55e' },
  { id: 'label-docs', name: 'Documentation', color: '#3b82f6' },
  { id: 'label-refactor', name: 'Refactor', color: '#a855f7' },
  { id: 'label-urgent', name: 'Urgent', color: '#f97316' },
]

const PRIORITIES: Priority[] = ['low', 'medium', 'high', 'urgent']

// Configuración de cuántas cards generar por columna
const CARDS_PER_COLUMN = { min: 2, max: 5 }

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Selects random items from an array
 * Usamos generics <T> para que funcione con cualquier tipo de array
 */
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

/**
 * Creates a single fake card
 */
function createFakeCard(id: string): Card {
  const now = new Date()
  const createdAt = faker.date.recent({ days: 30 })

  return {
    id,
    title: faker.hacker.phrase(),
    description: faker.helpers.maybe(() => faker.lorem.paragraph(), {
      probability: 0.7,
    }),
    labels: getRandomItems(DEFAULT_LABELS, faker.number.int({ min: 0, max: 2 })),
    priority: faker.helpers.arrayElement(PRIORITIES),
    assignee: faker.helpers.maybe(() => faker.person.firstName(), {
      probability: 0.6,
    }),
    createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: now }),
  }
}

/**
 * Creates a column with its card IDs
 * Retorna la columna Y las cards generadas (necesitamos ambas)
 */
function createColumnWithCards(
  columnId: string,
  title: string
): { column: Column; cards: Card[] } {
  const cardCount = faker.number.int(CARDS_PER_COLUMN)
  const cards: Card[] = []
  const cardIds: string[] = []

  for (let i = 0; i < cardCount; i++) {
    const cardId = faker.string.uuid()
    cardIds.push(cardId)
    cards.push(createFakeCard(cardId))
  }

  return {
    column: {
      id: columnId,
      title,
      cardIds,
    },
    cards,
  }
}

// =============================================================================
// MAIN EXPORT
// =============================================================================

/**
 * Generates a complete fake board with columns and cards
 *
 * Estructura normalizada:
 * - columns: array de columnas, cada una con cardIds (solo IDs, no objetos)
 * - cards: objeto donde la key es el ID y el value es la Card
 *
 * ¿Por qué normalizar?
 * 1. Acceso O(1): cards['abc123'] es instantáneo vs cards.find(c => c.id === 'abc123')
 * 2. Updates simples: para editar una card solo haces cards[id] = {...cards[id], title: 'new'}
 * 3. Sin duplicados: es imposible tener la misma card en dos lugares
 * 4. Reordenar es barato: solo mueves strings en cardIds, no objetos completos
 */
export function createFakeBoard(): Board {
  const columnDefinitions = [
    { id: 'column-todo', title: 'To Do' },
    { id: 'column-in-progress', title: 'In Progress' },
    { id: 'column-review', title: 'Review' },
    { id: 'column-done', title: 'Done' },
  ]

  const columns: Column[] = []
  const cards: Record<string, Card> = {}

  for (const def of columnDefinitions) {
    const result = createColumnWithCards(def.id, def.title)
    columns.push(result.column)

    for (const card of result.cards) {
      cards[card.id] = card
    }
  }

  return {
    id: faker.string.uuid(),
    title: 'My Kanban Board',
    columns,
    cards,
  }
}
