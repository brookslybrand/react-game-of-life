import * as React from 'react'
import classNames from 'classnames'

import { useGameDispatch } from './game-state'

// returns a simple grid of four buttons
const Controls = function Controls({ className }: { className?: string }) {
  const dispatch = useGameDispatch()
  const startTicker = () => dispatch({ type: 'START_TICKER' })
  const stopTicker = () => dispatch({ type: 'STOP_TICKER' })
  const randomizeGrid = () => dispatch({ type: 'RANDOMIZE_GRID' })
  const clearGrid = () => dispatch({ type: 'ClEAR_GRID' })

  return (
    <div
      className={classNames(
        'max-w-md mt-4 grid grid-cols-2 grid-rows-2 gap-4',
        className
      )}
    >
      <Button onClick={randomizeGrid}>Random Grid</Button>
      <Button onClick={clearGrid}>Clear Grid</Button>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white"
        onClick={startTicker}
      >
        Start Simulation
      </Button>
      <Button
        className="bg-red-500 hover:bg-red-700 text-white"
        onClick={stopTicker}
      >
        Stop Simulation
      </Button>
    </div>
  )
}

function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={classNames(
        buttonClassName,
        className ?? 'bg-gray-300 hover:bg-gray-500 text-gray-900'
      )}
      {...props}
    />
  )
}

const buttonClassName = 'py-2 px-4 rounded font-bold'

export default React.memo(Controls)
