import { useReducer, useEffect } from 'react'
import { createRandomGrid, updateGrid, toggleCell, clearCells } from './helpers'
import {
  START_TICKER,
  STOP_TICKER,
  RANDOMIZE_GRID,
  STEP,
  TOGGLE_CELL,
  ClEAR_GRID,
} from './constants'
import { AppState, Action, Dispatch } from './types'

export function useGameState(): [AppState, Dispatch] {
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

    return () => {
      cancel = true
    }
  }, [state.tickerStarted])

  return [state, dispatch]
}

const n = 54
const probActive = 0.3
const width = 500
const initialState = {
  tickerStarted: false,
  n,
  probActive,
  width,
  length: Math.floor(width / n),
  cells: createRandomGrid(n, probActive),
}

/*
  n: the row/column length for the grid
  probActive: probability that a cell becomes active when randomizing
  width: the width of the svg
  length: length is the length of each cell
  cells: an object containing the active state and a key
*/
function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case START_TICKER:
      return { ...state, tickerStarted: true }
    case STOP_TICKER:
      return { ...state, tickerStarted: false }
    case RANDOMIZE_GRID:
      return {
        ...state,
        cells: createRandomGrid(state.n, state.probActive),
      }
    case STEP:
      return { ...state, cells: updateGrid(state.cells) }
    case TOGGLE_CELL:
      return {
        ...state,
        cells: toggleCell(state.cells, action.row, action.col),
      }
    case ClEAR_GRID:
      return { ...state, cells: clearCells(state.cells) }
    default:
      return state
  }
}
