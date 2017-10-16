import React, { Component } from 'react';

// creates a square cell
class Cell extends Component {

    // don't rerender the cell if it didn't change
    shouldComponentUpdate(nextProps) {
        return nextProps.active !== this.props.active;
    }

    render() {
        const { activate, active, length, x, y, cellKey } = this.props;
        return (
            <rect
                ref="cell"
                style={{
                    fill: active ? 'yellow': '#909090',
                    stroke: 'black',
                    strokeWidth: 1,
                    opacity: 0.7
                }}
                width={length}
                height={length}
                x={ x }
                y={ y }
                onClick={ () => activate(cellKey) } >
            </rect>
        )
    }
}

export default Cell;