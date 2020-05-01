import React from 'react'

// header to high light what this is and what it was made in
const Header = () => {
  return (
    <div>
      <h1 className="text-4xl text-gray-800">John Conway's Game of Life</h1>
      <h2 className="text-ls text-gray-800">Implemented using React</h2>
    </div>
  )
}

export default React.memo(Header)
