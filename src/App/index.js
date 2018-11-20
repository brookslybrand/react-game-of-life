import React, { useReducer, useMutationEffect } from 'react'

import App from './Game.js'

import { createRandomGrid, updateGrid, activateCell, clearCells } from '../resources/helpers'
import { START_TICKER, STOP_TICKER, RANDOMIZE_GRID, STEP, ACTIVATE, ClEAR_GRID, } from '../resources/constants'

/*
  n: the row/column length for the grid
  probActive: probability that a cell becomes active when randomizing
  width: the width of the svg
  length: length is the length of each cell
  cells: an object containing the active state and x and y value
*/
function reducer(state, action) {
  switch (action.type) {
    case START_TICKER:
      return {...state, tickerStarted: true}
    case STOP_TICKER:
      return {...state, tickerStarted: false}
    case RANDOMIZE_GRID:
      return {...state, cells: createRandomGrid(state.n, state.probActive, state.length)}
    case STEP:
      return {...state, cells: updateGrid(state.cells, state.n)}
    case ACTIVATE:
      return {...state, cells: activateCell(state.cells.slice(0))(action.key)}
    case ClEAR_GRID:
      return {...state, cells: clearCells(state.cells)}
    default:
      return state
  }
}

const AppContainer = () => {
  // setup the reducer with the initial state, and randomize the grid
  const [state, dispatch] = useReducer(reducer, {
    tickerStarted: false,
    n: 54,
    probActive: 0.3,
    width: 500,
    length: Math.floor(500/54),
    cells: []
  }, { type: RANDOMIZE_GRID })

  const ticker = () => {
    if (window.tickerStarted) {
      dispatch({ type: STEP })
      window.requestAnimationFrame(ticker)
    }
  }

  useMutationEffect(() => {
    // I don't like this...but give the tickerStarted value to the window
    // so that it has access to it inside of ticker
    window.tickerStarted = state.tickerStarted
    if (state.tickerStarted) ticker()
  }, [state.tickerStarted])

  const startTicker = () => dispatch({type: START_TICKER})
  const stopTicker = () => dispatch({type: STOP_TICKER}) 
  const randomizeGrid = () => dispatch({type: RANDOMIZE_GRID})
  const activate = key => dispatch({type: ACTIVATE, key})
  const clearGrid = () => dispatch({type: ClEAR_GRID})

  // render the app and pass along the state and action functions
  return (
    <App reduxState={state}
      startTicker={startTicker}
      stopTicker={stopTicker}
      randomizeGrid={randomizeGrid}
      activate={activate}
      clearGrid={clearGrid}
    />
  )
}

export default AppContainer
