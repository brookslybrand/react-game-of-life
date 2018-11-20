import React from 'react'
import styled, { css } from 'styled-components'

const Rect = styled.rect`
  stroke: black;
  stroke-width: 1;
  opacity: 0.7;

  ${({ active }) => css`
      fill: ${active ? 'yellow' : '#909090'};
  `}
`

// creates a square cell
const Cell = ({ activate, active, length, x, y, cellKey }) => {
  return (
    <Rect
      active={active}
      width={length}
      height={length}
      x={x}
      y={y}
      onClick={() => activate(cellKey)}
    />
  )
}

export default React.memo(Cell)