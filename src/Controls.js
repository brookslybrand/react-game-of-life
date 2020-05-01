import React from 'react'
import classNames from 'classnames'

// returns a simple grid of four buttons
function Controls({ randomizeGrid, clearGrid, startTicker, stopTicker }) {
  return (
    <div className="max-w-md grid grid-cols-2 grid-rows-2 gap-4">
      <Button onClick={randomizeGrid}>Random Cells</Button>
      <Button onClick={clearGrid}>Clear Cells</Button>
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

function Button({ className, ...props }) {
  return (
    <button
      className={classNames(
        buttonClassName,
        className ?? 'bg-gray-300 hover:bg-gray-500 text-gray-900 '
      )}
      {...props}
    />
  )
}

const buttonClassName = 'py-2 px-4 rounded font-bold'

export default React.memo(Controls)
