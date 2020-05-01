import React from 'react'

// description of the game of life rules
const Description = () => (
  <div className="max-w-md rounded overflow-hidden shadow-lg mt-4 p-4">
    <h3 className="text-3xl mb-2">Rules of the Game:</h3>
    <p>
      An inactive (gray) cell will become active (yellow) in the next iteration,
      if and only if it has 3 active neighbors.
    </p>
    <br />
    <p>
      An active cell will only survive if it has exactly 2 or 3 active neighbors
      (diagonals included). Otherwise it will die from underpopulation or
      overpopulation.
    </p>
    <br />
    <p>Click on any cells you like to turn them active/inactive.</p>
  </div>
)

export default React.memo(Description)
