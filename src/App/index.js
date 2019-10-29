import React, { useCallback, useEffect, useReducer } from 'react'

import Game from './Game.js'

import {
  createRandomGrid,
  updateGrid,
  activateCell,
  clearCells
} from '../resources/helpers'
import {
  START_TICKER,
  STOP_TICKER,
  RANDOMIZE_GRID,
  STEP,
  ACTIVATE,
  ClEAR_GRID
} from '../resources/constants'

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
        cells: createRandomGrid(state.n, state.probActive, state.length)
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

const initialState = {
  tickerStarted: false,
  n: 54,
  probActive: 0.3,
  width: 500,
  length: Math.floor(500 / 54),
  init: function() {
    this.length = Math.floor(this.width / this.n)
    this.cells = createRandomGrid(this.n, this.probActive, this.length)
    return this
  }
}.init()

const App = () => {
  // setup the reducer with the initial state, and randomize the grid
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

  const startTicker = useCallback(() => dispatch({ type: START_TICKER }), [])
  const stopTicker = useCallback(() => dispatch({ type: STOP_TICKER }), [])
  const randomizeGrid = useCallback(
    () => dispatch({ type: RANDOMIZE_GRID }),
    []
  )
  const activate = useCallback(key => dispatch({ type: ACTIVATE, key }), [])
  const clearGrid = useCallback(() => dispatch({ type: ClEAR_GRID }), [])

  // render the app and pass along the state and action functions
  return (
    <Game
      state={state}
      startTicker={startTicker}
      stopTicker={stopTicker}
      randomizeGrid={randomizeGrid}
      activate={activate}
      clearGrid={clearGrid}
    />
  )
}

export default App
