//@ts-nocheck
import React, { useEffect, useReducer, Fragment } from 'react'

import Game from './Game'

import { updateGrid, activateCell, clearCells } from './helpers'
import { createRandomGrid } from './createRandomGrid'
import {
  START_TICKER,
  STOP_TICKER,
  RANDOMIZE_GRID,
  STEP,
  ACTIVATE,
  ClEAR_GRID,
} from './constants'
import Controls from './Controls'

const App = () => {
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
    <Fragment>
      <Controls dispatch={dispatch} />
      <Game state={state} dispatch={dispatch} />
    </Fragment>
  )
}

function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let cancel = false
    if (state.tickerStarted) {
      const ticker = () => {
        if (state.tickerStarted) {
          dispatch({ type: STEP })
          if (!cancel) window.requestAnimationFrame(ticker)
        }
      }
      ticker()
    }

    return () => (cancel = true)
  }, [state.tickerStarted])

  return [state, dispatch]
}

const initialState = {
  tickerStarted: false,
  n: 54,
  probActive: 0.3,
  width: 500,
  length: Math.floor(500 / 54),
  init: function () {
    this.length = Math.floor(this.width / this.n)
    this.cells = createRandomGrid(this.n, this.probActive, this.length)
    return this
  },
}.init()

/*
  n: the row/column length for the grid
  probActive: probability that a cell becomes active when randomizing
  width: the width of the svg
  length: length is the length of each cell
  cells: an object containing the active state and a key
*/
function reducer(state, action) {
  switch (action.type) {
    case START_TICKER:
      return { ...state, tickerStarted: true }
    case STOP_TICKER:
      return { ...state, tickerStarted: false }
    case RANDOMIZE_GRID:
      return {
        ...state,
        cells: createRandomGrid(state.n, state.probActive, state.length),
      }
    case STEP:
      return { ...state, cells: updateGrid(state.cells, state.n) }
    case ACTIVATE:
      return { ...state, cells: activateCell(state.cells.slice(0))(action.key) }
    case ClEAR_GRID:
      return { ...state, cells: clearCells(state.cells) }
    default:
      return state
  }
}

export default App
