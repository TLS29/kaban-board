import { useEffect } from 'react'
import { useBoard } from './features/board/context/BoardContext'
import { createFakeBoard } from './data/fakeBoard'

function App() {
  const { state, dispatch } = useBoard()

  useEffect(() => {
    const board = createFakeBoard()
    dispatch({ type: 'LOAD_BOARD', payload: board })
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {state.board.title || 'Loading...'}
      </h1>
      <p className="text-gray-600 mb-2">
        Columns: {state.board.columns.length}
      </p>
      <p className="text-gray-600 mb-4">
        Cards: {Object.keys(state.board.cards).length}
      </p>

      <div className="flex gap-4">
        {state.board.columns.map((col) => (
          <div key={col.id} className="bg-white p-4 rounded shadow min-w-48">
            <strong className="text-gray-800">{col.title}</strong>
            <p className="text-gray-500 text-sm">{col.cardIds.length} cards</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
