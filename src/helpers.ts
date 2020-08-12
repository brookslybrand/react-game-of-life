type Grid = boolean[][]
type NumberGrid = (0 | 1)[][]

/**
 * Assign all the cells random values for whether they are active or not
 * using the probActive value
 */
export function createRandomGrid(n: number, probActive: number): Grid {
  const grid = []
  for (let i = 0; i < n; i++) {
    const row: boolean[] = []
    for (let j = 0; j < n; j++) {
      row.push(Math.random() < probActive)
    }
    grid.push(row)
  }
  return grid
}

// calculate how many of the neighbors are active

function numberOfActiveNeighbors(
  numberGrid: NumberGrid,
  row: number,
  col: number
) {
  const gridSize = numberGrid.length
  let count = 0

  const prevRowIndex = wrapIndex(row - 1, gridSize)
  const nextRowIndex = wrapIndex(row + 1, gridSize)
  const prevColIndex = wrapIndex(col - 1, gridSize)
  const nextColIndex = wrapIndex(col + 1, gridSize)

  const prevRow = numberGrid[prevRowIndex]
  const nextRow = numberGrid[nextRowIndex]
  count += numberGrid[row][prevColIndex] + numberGrid[row][nextColIndex]
  count += prevRow[prevColIndex] + prevRow[col] + prevRow[nextColIndex]
  count += nextRow[prevColIndex] + nextRow[col] + nextRow[nextColIndex]

  return count
}
/**
 * If an index that is too small (< 0) or too large (> gridSize)
 * return the wrapped value.
 */
function wrapIndex(index: number, gridSize: number) {
  if (0 <= index && index < gridSize) return index
  else if (index === -1) {
    return gridSize - 1
  } else if (index === gridSize) {
    return 0
  } else {
    throw Error(`No logic for cases where index is ${index}`)
  }
}

/**
 * Update all cells in the grid according to the Game of Life rules:
 * - Any live cell with fewer than two live neighbours dies, as if by underpopulation.
 * - Any live cell with two or three live neighbours lives on to the next generation.
 * - Any live cell with more than three live neighbours dies, as if by overpopulation.
 * - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 *
 * source: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 */
export function updateGrid(grid: Grid): Grid {
  const numberGrid = grid.map(row => row.map(active => (active ? 1 : 0)))
  return grid.map((row, i) => {
    return row.map((active, j) => {
      const neighbors = numberOfActiveNeighbors(numberGrid, i, j)
      // Whether dead or alive, exactly 3 neighbors means you're alive
      // otherwise, only if you were alive and have 2 neighbors will you
      // still be alive. Beyond that all other cells should be dead
      return neighbors === 3 || (active && neighbors === 2)
    })
  })
}
/**
 * Activate (or deactivate) a single cell
 */
export function toggleCell(grid: Grid, row: number, col: number): Grid {
  const gridCopy = grid.map(row => [...row])
  gridCopy[row][col] = !gridCopy[row][col]
  return gridCopy
}

/**
 * Deactivate all cells
 */
export function clearCells(grid: Grid): Grid {
  return grid.map(row => row.map(() => false))
}
