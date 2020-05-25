import React, { memo, Fragment } from 'react'
import { ACTIVATE } from './constants'

import { CellObject } from './types'

type CellsGridProps = {
  cells: CellObject[]
  dispatch: () => void
}

function CellsGrid({ cells, dispatch }: CellsGridProps) {
  return (
    <Fragment>
      {cells.map(({ active, key }, i) => (
        <Cell key={key} cellKey={key} active={active} dispatch={dispatch} />
      ))}
    </Fragment>
  )
}

type CellProps = {
  cellKey: number
  active: boolean
  dispatch: (action: any) => void
}

const Cell = memo(function Cell({ cellKey, active, dispatch }: CellProps) {
  return (
    <div
      className={`border border-black opacity-75 ${
        active ? 'bg-yellow-400' : 'bg-gray-500'
      }`}
      onClick={() => dispatch({ type: ACTIVATE, key: cellKey })}
    />
  )
})

export default CellsGrid
