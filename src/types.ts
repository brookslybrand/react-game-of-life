import * as React from 'react'

export interface CellObject {
  active: boolean
  key: number
}

export type Grid = boolean[][]

export type AppState = {
  tickerStarted: boolean
  n: number
  probActive: number
  width: number
  length: number
  cells: Grid
}

export type Action =
  | { type: 'START_TICKER' }
  | { type: 'STOP_TICKER' }
  | { type: 'RANDOMIZE_GRID' }
  | { type: 'STEP' }
  | { type: 'TOGGLE_CELL'; row: number; col: number }
  | { type: 'ClEAR_GRID' }

export type Dispatch = React.Dispatch<Action>
