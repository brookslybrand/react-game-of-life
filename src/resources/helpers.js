// assign all the cells random values for whether they are active or not
// using an array of arrays really might have been the wisest option... wouldn't be too hard to implement,
// good to think a little more ahead next time
export const createRandomGrid = (n, probActive, length) => {
  const cells = [],
    l = [...Array(n).keys()]
  // rows
  l.map(i => {
    // columns
    return l.map(j => {
      // randomly assign if a cell is active or not
      return (cells[i + j * n] = {
        active: Math.random() < probActive ? true : false,
        x: i * length,
        y: j * length,
        key: i + j * n
      })
    })
  })
  return cells
}

// l, r, t, b mean the cell is on the left, right, top, and bottom respectively
const neighbors = cells => n => key => (l, r, t, b) => {
  return [
    // if not a left cell, check cell to the left
    !l && cells[key - 1].active,
    // if not  right cell, check cell on right side
    !r && cells[key + 1].active,
    // if not on top check cells on top
    !t &&
      cells
        .slice(
          // include left?
          !l ? key - n - 1 : key - n,
          // include right?
          !r ? key - n + 2 : key - n + 1
        )
        .map(c => c.active),
    // if not on bottom check cells on top
    !b &&
      cells
        .slice(
          // include left?
          !l ? key + n - 1 : key + n,
          // include right?
          !r ? key + n + 2 : key + n + 1
        )
        .map(c => c.active)
  ]
    .flat()
    .reduce((count, active) => (active ? count + 1 : count), 0)
}

// calculate how many of the neighbors are active
const neighborsActive = (cells, cell, n) => {
  const { key } = cell
  const leftCond = key % n === 0
  // if the cell is on the left, it can't be on the right
  const rightCond = !leftCond && (key + 1) % n === 0
  // if the cell is on the top, it can't be on the bottom
  const topCond = key < n
  const botCond = !topCond && n * n - key <= n

  return neighbors(cells)(n)(key)(leftCond, rightCond, topCond, botCond)
}

// update a cell according to the Game of Life rules
const updateCell = (cells, cell, n) => {
  const neighbors = neighborsActive(cells, cell, n)
  return neighbors === 3 || (cell.active && neighbors === 2)
}

// update all cells in the grid
export const updateGrid = (cells, n) =>
  cells.map(c => ({ ...c, active: updateCell(cells, c, n) }))

// activate (or deactivate) a single cell
export const activateCell = cells => key => {
  const cell = cells[key]
  cells[key] = { ...cell, active: !cell.active }
  return cells
}

// deactivate all cells
export const clearCells = cells => {
  return cells.map(c => {
    return { ...c, active: false }
  })
}
