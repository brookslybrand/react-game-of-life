import React from 'react'

import Cell from './Cell'


const cellsObject = {
  cellsComponents: [],
  oldCells: null
}

// map through all the cells and create a Cell instance for each one
const CellsGrid = ({ length, cells, activate }) => {
    
  // find which cells need to update. Update all if oldCells has not been initialized
  const cellsToUpdate = cellsObject.oldCells ?
    cells.map((c, i) => c.active !== cellsObject.oldCells[i].active) :
    Array.from(cells, () => true)

  cellsObject.cellsComponents = cells.map((c, i) => {
    // if an update is needed, recreate the Cell object, otherwise return the old one
    return cellsToUpdate[i] ?
      <Cell activate={activate} length={length} {...c} cellKey={c.key} /> :
      cellsObject.cellsComponents[i]
  })

  // update the oldCells in the object
  cellsObject.oldCells = cells

  return (
    <g>
      {cellsObject.cellsComponents}
    </g>
  )
}

export default CellsGrid