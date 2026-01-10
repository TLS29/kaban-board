export type Priority = 'low' | 'medium' | 'high' | 'urgent'

export interface Label {
  id: string
  name: string
  color: string
}

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
  cardIds: string[]
}

export interface Board {
  id: string
  title: string
  columns: Column[]
  cards: Record<string, Card>
}

export interface BoardState {
  board: Board
  draggedCardId: string | null
  activeFilters: {
    labels: string[]
    priority: Priority | null
    search: string
  }
  history: HistoryEntry[]
  historyIndex: number
}

export interface HistoryEntry {
  action: BoardAction
  previousState: Board
}

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
