import React, { memo } from 'react'

function CellsGrid({ length, cells, activate }) {
  return cells.map(({ active, key }, i) => (
    <Cell key={key} cellKey={key} active={active} activate={activate} />
  ))
}

const Cell = memo(function Cell({ cellKey, active, activate }) {
  return (
    <div
      className={`border border-black opacity-75 ${
        active ? 'bg-yellow-400' : 'bg-gray-500'
      }`}
      onClick={() => activate(cellKey)}
    />
  )
})

export default CellsGrid
