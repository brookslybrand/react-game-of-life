import React, { useReducer, useMutationEffect } from 'react'

import App from '../components/App.js'

export const START_TICKER = 'START_TICKER'
export const STOP_TICKER = 'STOP_TICKER'
export const RANDOMIZE_GRID = 'RANDOMIZE_GRID'
export const STEP = 'STEP'
export const ACTIVATE = 'ACTIVATE'
export const ClEAR_GRID = 'ClEAR_GRID'

// assign all the cells random values for whether they are active or not
// using an array of arrays really might have been the wisest option... wouldn't be too hard to implement,
// good to think a little more ahead next time
const createRandomGrid = (n, probActive, length) => {
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
const updateGrid = (cells, n) => cells.map(c => Object.assign(c, {active: updateCell(cells, c, n)}))

// activate (or deactivate) a single cell
const activateCell = (cells) => (key) => {
  const cell = cells[key]
  cells[key] = {...cell, active: !cell.active}
  return cells
}

// deactivate all cells
const clearCells = (cells) => {
  return cells.map( (c) => {
    return {...c, active: false }
  })
}

/*
  n is the row/column length for the grid
  probActive is the probability that a cell becomes active when randomizing
  width is the width of the svg
  in init:
    length is the length of each cell
    cells is an object containing the active state and x and y value
*/
const initialState = {
  tickerStarted: false,
  n: 54,
  probActive: 0.3,
  width: 500,
  init: function() {
    this.length = Math.floor(this.width/this.n)
    return this
  }
 }.init()

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

  const [state, dispatch] = useReducer(reducer, initialState, { type: RANDOMIZE_GRID })

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
