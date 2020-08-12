import * as React from 'react'

import CellsGrid from './CellsGrid'
import { useGameState, useGameDispatch } from './game-state'

// main app consists of header, buttons, description, and the grid of cells
const Game = () => {
  const [{ n, width, grid }, dispatch] = [useGameState(), useGameDispatch()]

  return (
    <div className="mt-2 space-y-4">
      <div
        // use the style prop so because this would be difficult and un-purgeable with tailwind
        style={{
          width,
          height: width,
          display: 'grid',
          gridTemplateRows: `repeat(${n}, 1fr)`,
          gridTemplateColumns: `repeat(${n}, 1fr)`,
          gridGap: 1,
        }}
      >
        <CellsGrid grid={grid} dispatch={dispatch} />
      </div>
    </div>
  )
}

export default Game
