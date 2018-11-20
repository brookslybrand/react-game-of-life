import React, { useReducer, useMutationEffect } from 'react'

import App from './Game.js'

import { createRandomGrid, updateGrid, activateCell, clearCells } from '../resources/helpers'
import { START_TICKER, STOP_TICKER, RANDOMIZE_GRID, STEP, ACTIVATE, ClEAR_GRID, } from '../resources/constants'

/*
  n is the row/column length for the grid
  probActive is the probability that a cell becomes active when randomizing
  width is the width of the svg
  in init:
    length is the length of each cell
    cells is an object containing the active state and x and y value
*/
function reducer(state, action) {
  switch (action.type) {
    case START_TICKER:
      return {...state, tickerStarted: true}
    case STOP_TICKER:
      return {...state, tickerStarted: false}
    case RANDOMIZE_GRID:
      return {...state, cells: createRandomGrid(state.n, state.probActive, state.length)}
    case STEP:{
      return {...state, cells: updateGrid(state.cells, state.n)}
    }
    case ACTIVATE:
      return {...state, cells: activateCell(state.cells.slice(0))(action.key)}
    case ClEAR_GRID:
      return {...state, cells: clearCells(state.cells)}
    default:
      return state
  }
}

function AppContainer() {
  // setup the reducer with the initial state, and randomize the grid
  const [state, dispatch] = useReducer(reducer, {
    tickerStarted: false,
    n: 54,
    probActive: 0.3,
    width: 500,
    length: Math.floor(500/54)
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

  // render the app and pass along the state and action functions
  return (
    <App reduxState={state}
      startTicker={ () => dispatch({type: START_TICKER})  }
      stopTicker={() => dispatch({type: STOP_TICKER}) }
      randomizeGrid={() => dispatch({type: RANDOMIZE_GRID}) }
      activate={key => dispatch({type: ACTIVATE, key}) }
      clearGrid={() => dispatch({type: ClEAR_GRID}) }
    />
  )
}

export default AppContainer
