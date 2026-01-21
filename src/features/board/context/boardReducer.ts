import type { BoardState, BoardAction } from '../types'

export function boardReducer(
  state: BoardState,
  action: BoardAction
): BoardState {
  switch (action.type) {
    case 'LOAD_BOARD':
      return { ...state, board: action.payload }
    case 'SET_DRAGGED_CARD':
      return { ...state, draggedCardId: action.payload }
    case 'SET_FILTER':
      return {
        ...state,
        activeFilters: { ...state.activeFilters, ...action.payload },
      }
    case 'ADD_CARD': {
      const { columnId, card } = action.payload

      return {
        ...state,
        board: {
          ...state.board,
          cards: {
            ...state.board.cards,
            [card.id]: card,
          },
          columns: state.board.columns.map((col) =>
            col.id === columnId
              ? { ...col, cardIds: [...col.cardIds, card.id] }
              : col
          ),
        },
      }
    }
    case 'DELETE_CARD': {
      const { cardId, columnId } = action.payload
      const { [cardId]: _, ...remainingCards } = state.board.cards
      return {
        ...state,
        board: {
          ...state.board,
          cards: remainingCards,
          columns: state.board.columns.map((col) =>
            col.id === columnId
              ? { ...col, cardIds: col.cardIds.filter((id) => id !== cardId) }
              : col
          ),
        },
      }
    }
    case 'UPDATE_CARD': {
      const { cardId, updates } = action.payload
      return {
        ...state,
        board: {
          ...state.board,
          cards: {
            ...state.board.cards,
            [cardId]: {
              ...state.board.cards[cardId],
              ...updates,
            },
          },
        },
      }
    }
    case 'MOVE_CARD': {
      const { cardId, fromColumnId, toColumnId, toIndex } = action.payload

      // Remove cardId from the source column
      const fromColumn = state.board.columns.find(
        (col) => col.id === fromColumnId
      )
      const toColumn = state.board.columns.find((col) => col.id === toColumnId)

      if (!fromColumn || !toColumn) return state

      const newFromCardIds = fromColumn.cardIds.filter((id) => id !== cardId)
      const newToCardIds = [...toColumn.cardIds]
      newToCardIds.splice(toIndex, 0, cardId)

      return {
        ...state,
        board: {
          ...state.board,
          columns: state.board.columns.map((col) => {
            if (col.id === fromColumnId) {
              return { ...col, cardIds: newFromCardIds }
            } else if (col.id === toColumnId) {
              return { ...col, cardIds: newToCardIds }
            }
            return col
          }),
        },
      }
    }
    case 'REORDER_CARD': {
      const { columnId, fromIndex, toIndex } = action.payload
      const column = state.board.columns.find((col) => col.id === columnId)
      if (!column) return state

      const newCardIds = [...column.cardIds]
      const [movedCardId] = newCardIds.splice(fromIndex, 1)
      newCardIds.splice(toIndex, 0, movedCardId)

      return {
        ...state,
        board: {
          ...state.board,
          columns: state.board.columns.map((col) =>
            col.id === columnId ? { ...col, cardIds: newCardIds } : col
          ),
        },
      }
    }
    case 'ADD_COLUMN': {
      const { column } = action.payload
      return {
        ...state,
        board: {
          ...state.board,
          columns: [...state.board.columns, column],
        },
      }
    }
    case 'UPDATE_COLUMN': {
      const { columnId, title } = action.payload
      return {
        ...state,
        board: {
          ...state.board,
          columns: state.board.columns.map((col) =>
            col.id === columnId ? { ...col, title } : col
          ),
        },
      }
    }
    case 'DELETE_COLUMN': {
      const { columnId } = action.payload
      return {
        ...state,
        board: {
          ...state.board,
          columns: state.board.columns.filter((col) => col.id !== columnId),
        },
      }
    }
    case 'UNDO': {
      const { history, historyIndex } = state
      if (historyIndex < 0) return state

      const previousEntry = history[historyIndex]
      return {
        ...state,
        board: previousEntry.previousState,
        historyIndex: historyIndex - 1,
      }
    }
    case 'REDO': {
      const { history, historyIndex } = state
      if (historyIndex >= history.length - 1) return state

      const nextEntry = history[historyIndex + 1]
      return {
        ...state,
        board: nextEntry.previousState,
        historyIndex: historyIndex + 1,
      }
    }
    default:
      return state
  }
}
