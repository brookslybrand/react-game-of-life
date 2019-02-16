import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from 'react'

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

const timeIt = f => {
  const t0 = performance.now()
  const result = f()
  console.log(
    `${f.toString()} took ${performance.now() - t0} milliseconds to run`
  )
  return result
}

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
  const tickerStarted = useRef()

  const ticker = () => {
    if (tickerStarted.current) {
      dispatch({ type: STEP })
      window.requestAnimationFrame(ticker)
    }
  }

  useEffect(() => {
    // I don't like this...but give the tickerStarted value to the window
    // so that it has access to it inside of ticker
    tickerStarted.current = state.tickerStarted
    if (state.tickerStarted) ticker()
  }, [state.tickerStarted])

  const applyUseCallback = useMemo(() => f => useCallback(f, [dispatch]), [
    dispatch
  ])
  const startTicker = applyUseCallback(() => dispatch({ type: START_TICKER }))
  const stopTicker = applyUseCallback(() => dispatch({ type: STOP_TICKER }))
  const randomizeGrid = applyUseCallback(() =>
    dispatch({ type: RANDOMIZE_GRID })
  )
  const activate = applyUseCallback(key => dispatch({ type: ACTIVATE, key }))
  const clearGrid = applyUseCallback(() => dispatch({ type: ClEAR_GRID }))

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
