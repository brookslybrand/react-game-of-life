import React from 'react'

const borderStroke = 0.7

// creates a square cell
const Cell = ({ activate, active, length, cellKey }) => (
  <div
    style={{
      border: `${borderStroke}px solid black`,
      opacity: '0.7',
      width: length - borderStroke,
      height: length - borderStroke,
      background: active ? 'yellow' : '#909090'
    }}
    onClick={() => activate(cellKey)}
  />
)

export default Cell
