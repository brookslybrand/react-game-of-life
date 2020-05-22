//@ts-nocheck
export function createRandomGrid(n, probActive, length) {
  const cells = []
  const l = [...Array(n).keys()]
  // rows
  l.map(i => {
    // columns
    return l.map(j => {
      // randomly assign if a cell is active or not
      return (cells[i + j * n] = {
        active: Math.random() < probActive ? true : false,
        key: i + j * n
      })
    })
  })
  return cells
}
