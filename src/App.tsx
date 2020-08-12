import * as React from 'react'

import Game from './Game'

import Controls from './Controls'
import { useGameState } from './game-state'

function App() {
  // render the app and pass along the state and action functions
  return (
    <div className="antialiased font-sans p-6 bg-gray-100">
      <h1 className="text-4xl text-gray-800">John Conway's Game of Life</h1>
      <h2 className="text-ls text-gray-800">Implemented using React</h2>
      <Description />
      <ControlsAndGame />
    </div>
  )
}

// this is another component just to reduce some of the noise
function Description() {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg mt-4 p-4">
      <h3 className="text-xl font-bold">Rules of the Game:</h3>
      <p>
        An inactive (gray) cell will become active (yellow) in the next
        iteration, if and only if it has 3 active neighbors.
      </p>
      <p>
        An active cell will only survive if it has exactly 2 or 3 active
        neighbors (diagonals included). Otherwise it will die from
        underpopulation or overpopulation.
      </p>
      <p>Click on any cells you like to turn them active/inactive.</p>
    </div>
  )
}

// TODO: rename
function ControlsAndGame() {
  // setup the reducer with the initial state, and randomize the grid
  const [state, dispatch] = useGameState()
  return (
    <>
      <Controls dispatch={dispatch} />
      <Game state={state} dispatch={dispatch} />
    </>
  )
}

export default App
