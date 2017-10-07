import React from 'react';

// simple styling to be added to the cell
const style = {
    fill: 'yellow',
    stroke: 'black',
    strokeWidth: 1,
    opacity: 0.7
}

// creates a square cell
const Cell = ({ active, length, x, y }) => {
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
            ry={ rounding } >
        </rect>
    )
}

export default Cell;