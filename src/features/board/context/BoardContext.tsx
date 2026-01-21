import { createContext, useReducer, useContext, type ReactNode } from 'react'
import { useEffect } from 'react'
import type { BoardState, BoardAction } from '../types'
import { boardReducer as reducer } from './boardReducer'
import { createFakeBoard } from '../../../data/fakeBoard'

const initialState: BoardState = {
  board: {
    id: '',
    title: '',
    columns: [],
    cards: {},
  },
  draggedCardId: null,
  activeFilters: {
    labels: [],
    priority: null,
    search: '',
  },
  history: [],
  historyIndex: -1,
}

type BoardContextType = {
  state: BoardState
  dispatch: React.Dispatch<BoardAction>
}

const BoardContext = createContext<BoardContextType | null>(null)

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const stored = localStorage.getItem('kanban-board')
    if (stored) {
      dispatch({ type: 'LOAD_BOARD', payload: JSON.parse(stored) })
    } else {
      dispatch({ type: 'LOAD_BOARD', payload: createFakeBoard() })
    }
  }, [])

  useEffect(() => {
    if (state.board.id) {
      localStorage.setItem('kanban-board', JSON.stringify(state.board))
    }
  }, [state.board])

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  )
}

export function useBoard() {
  const context = useContext(BoardContext)
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider')
  }
  return context
}
