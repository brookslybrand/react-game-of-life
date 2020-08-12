import * as React from 'react'

import { Grid, Dispatch } from './types'

type CellsGridProps = {
  grid: Grid
  dispatch: Dispatch
}

function CellsGrid({ grid, dispatch }: CellsGridProps) {
  return (
    <>
      {grid
        .map((row, i) =>
          row.map((active, j) => (
            <Cell
              key={`${i}-${j}`}
              row={i}
              col={j}
              active={active}
              dispatch={dispatch}
            />
          ))
        )
        .flat()}
    </>
  )
}

type CellProps = {
  active: boolean
  row: number
  col: number
  dispatch: Dispatch
}

const Cell = React.memo(function Cell({
  active,
  row,
  col,
  dispatch,
}: CellProps) {
  return (
    <button
      className={`border border-black opacity-75 ${
        active ? 'bg-yellow-400' : 'bg-gray-500'
      }`}
      onClick={() => dispatch({ type: 'TOGGLE_CELL', row, col })}
    />
  )
})

export default CellsGrid
