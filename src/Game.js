import React from 'react'

import Controls from './Controls'
import CellsGrid from './CellsGrid'
import Header from './Header'
import Description from './Description'

// main app consists of header, buttons, description, and the grid of cells
const Game = ({
  state,
  randomizeGrid,
  clearGrid,
  startTicker,
  stopTicker,
  activate
}) => {
  const { n, width, length, cells } = state

  // Don't display margins of two cells on all sides
  const cells_to_display = cells.slice(2 * n, -2 * n).filter(c => {
    const { key } = c
    const mod = key % n
    return mod !== n - 2 && mod !== n - 1 && mod !== 0 && mod !== 1
  })

  const cellsPerRow = Math.sqrt(cells_to_display.length)

  return (
    <div className="mt-2 space-y-4">
      <Header />
      <Controls
        randomizeGrid={randomizeGrid}
        clearGrid={clearGrid}
        startTicker={startTicker}
        stopTicker={stopTicker}
      />
      <Description />

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
        <CellsGrid
          cells={cells_to_display}
          width={width}
          length={length}
          activate={activate}
        />
      </div>
    </div>
  )
}

export default Game