import React, { memo } from 'react'
import { ACTIVATE } from './constants'

function CellsGrid({ length, cells, dispatch }) {
  return cells.map(({ active, key }, i) => (
    <Cell key={key} cellKey={key} active={active} dispatch={dispatch} />
  ))
}

const Cell = memo(function Cell({ cellKey, active, dispatch }) {
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
