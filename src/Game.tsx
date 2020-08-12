import * as React from 'react'

import CellsGrid from './CellsGrid'
import { AppState, Dispatch } from './types'

// main app consists of header, buttons, description, and the grid of cells
type GameProps = {
  state: AppState
  dispatch: Dispatch
}
const Game = ({ state, dispatch }: GameProps) => {
  const { n, width, grid } = state

  return (
    <div className="mt-2 space-y-4">
      <div
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
