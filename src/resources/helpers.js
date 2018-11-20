// assign all the cells random values for whether they are active or not
// using an array of arrays really might have been the wisest option... wouldn't be too hard to implement,
// good to think a little more ahead next time
export const createRandomGrid = (n, probActive, length) => {
  const cells = [],
        l = [...Array(n).keys()]
  // rows
  l.map( (i) => {
    // columns
    return l.map( (j) => {
      // randomly assign if a cell is active or not
      return cells[i + j*n] = {
        active: Math.random() < probActive ? true: false,
        x: i*length,
        y: j*length,
        key: i + j*n
      }
    })
  })
  return cells
}

// l, r, t, b mean the cell is on the left, right, top, and bottom respectively
const neighbors = (cells) => (n) => (key) => (l, r, t, b) => {

  const neighbors = [
    // left
    !l ? cells[key - 1] : [],
    // right
    !r ? cells[key + 1] : [],
    // above
    !t ? cells.slice(
      // include left?
      !l ? key - n - 1 : key - n ,
      // include right?
      !r ? key - n + 2 : key - n + 1
    ) : [],
    // below
    !b ? cells.slice(
      // include left?
      !l ? key + n - 1 : key + n ,
      // include right?
      !r ? key + n + 2 : key + n + 1
    ) : []
  ].reduce( ( acc, cur ) => acc.concat(cur), [] )

  return neighbors.filter( (c) => c.active ).length
}

// calculate how many of the neighbors are active
const neighborsActive = (cells, cell, n) => {
  const { key } = cell
  const leftCond = key % n  === 0,
        rightCond = (key+1) % n === 0,
        topCond = key < n,
        botCond = n*n - key <= n

  return neighbors(cells)(n)(key)(leftCond, rightCond, topCond, botCond)
}

// update a cell according to the Game of Life rules
const updateCell = (cells, cell, n) => {
  const neighbors = neighborsActive( cells, cell, n )
  return cell.active ? 
          neighbors === 2 || neighbors === 3 :
          neighbors === 3
}

// update all cells in the grid
export const updateGrid = (cells, n) => cells.map(c => ({...c, active: updateCell(cells, c, n)}))

// activate (or deactivate) a single cell
export const activateCell = (cells) => (key) => {
  const cell = cells[key]
  cells[key] = {...cell, active: !cell.active}
  return cells
}

// deactivate all cells
export const clearCells = (cells) => {
  return cells.map( (c) => {
    return {...c, active: false }
  })
}