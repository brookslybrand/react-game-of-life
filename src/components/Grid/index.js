import React from 'react';

import Cell from './Cell'

const Grid = ({ n, width, length, cells, activate }) => {
    return (
        <g>
            {
                cells.map( (c) => {
                    const { active, x, y, key } = c;
                    return <Cell activate={activate} active={active} length={length} x={x} y={y} cellKey={key} key={key} />
                })
            }
        </g>
    )
}

export default Grid