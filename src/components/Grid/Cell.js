import React from 'react';

// creates a square cell
const Cell = ({ activate, active, length, x, y, cellKey }) => {
    const rounding = Math.floor(length/10);
    return (
        <rect
            style={{
                fill: active ? 'yellow': 'gray',
                stroke: 'black',
                strokeWidth: 1,
                opacity: 0.7
            }}
            width={length}
            height={length}
            x={ x }
            y={ y }
            rx={ rounding }
            ry={ rounding } 
            onClick={ () => activate(cellKey) }>
        </rect>
    )
}

export default Cell;