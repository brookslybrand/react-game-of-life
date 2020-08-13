import * as React from 'react'

import { Grid, Dispatch } from './types'
import { useCell, useGetGrid } from './game-state'

type CellsGridProps = {
  grid: Grid
  dispatch: Dispatch
}

function CellsGrid({ grid, dispatch }: CellsGridProps) {
  const myGrid = useGetGrid()
  console.log(myGrid)
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
  const [cell, setCell] = useCell(`${row}-${col}`)

  // React.useEffect(() => {
  //   setCell(active)
  // }, [active, setCell])

  return (
    <button
      className={`border border-black opacity-75 ${
        cell ? 'bg-yellow-400' : 'bg-gray-500'
      }`}
      onClick={() => dispatch({ type: 'TOGGLE_CELL', row, col })}
    />
  )
})

export default CellsGrid
