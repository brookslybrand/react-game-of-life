import React from 'react';

import Cell from './Cell'

// // rows
// test.map( (j) => {
//     // columns
//     return test.map( (i) => {
//         const { active, x, y } = cells[i + j*n];
//         return <Cell active={active} length={length} x={x} y={y} key={i + j*n} />;
//     })
// })

const Grid = ({ n, width, length, cells }) => {
    const test = [...Array(n).keys()];
    return (
        <g>
            {
                cells.map( (c) => {
                    const { active, x, y, key } = c;
                    return <Cell active={active} length={length} x={x} y={y} key={key} />
                })
            }
        </g>
    )
}

export default Grid