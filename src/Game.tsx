import React from 'react'

import CellsGrid from './CellsGrid'
import { CellObject } from './types'

// main app consists of header, buttons, description, and the grid of cells
type GameProps = {
  state: {
    n: number
    width: number
    cells: CellObject[]
  }
  dispatch: () => void
}
const Game = ({ state, dispatch }: GameProps) => {
  const { n, width, cells } = state

  // Don't display margins of two cells on all sides
  const cells_to_display = cells
    .slice(2 * n, -2 * n)
    .filter((c: { key: number }) => {
      const { key } = c
      const mod = key % n
      return mod !== n - 2 && mod !== n - 1 && mod !== 0 && mod !== 1
    })

  const cellsPerRow = Math.sqrt(cells_to_display.length)

  return (
    <div className="mt-2 space-y-4">
      <div
        style={{
          width,
          height: width,
          display: 'grid',
          gridTemplateRows: `repeat(${cellsPerRow}, 1fr)`,
          gridTemplateColumns: `repeat(${cellsPerRow}, 1fr)`,
          gridGap: 1
        }}
      >
        <CellsGrid cells={cells_to_display} dispatch={dispatch} />
      </div>
    </div>
  )
}

export default Game