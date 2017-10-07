import { RANDOMIZE_MAP } from '../actions'


// assign all the cells random values for whether they are active or not
const createRandomGrid = (n, probActive, length) => {
    const cells = [],
          l = [...Array(n).keys()];

    l.map( (j) => {
        // columns
        l.map( (i) => {
            // randomly assign if a cell is active or not
            cells[i + j*n] = {
                active: Math.random() < probActive ? true: false,
                x: i*length,
                y: j*length,
                key: i + j*n
            }
        })
    });
    return cells;
}

/*
    n is the row/column length for the grid
    probActive is the probability that a cell becomes active when randomizing
    width is the width of the svg
    in init:
        length is the length of each cell
        cells is an object containing the active state and x and y value
*/
const initialState = {
    n: 50,
    probActive: 0.3,
    width: 500,
    init: function() {
        this.length = Math.floor(this.width/this.n);
        this.cells = createRandomGrid(this.n, this.probActive, this.length);
        return this;
    }
 }.init();

// const initialState = {
//     n: 50,
//     probActive: 0.3,
//     width: 500,
//     length: Math.floor(500/50),
//     cells: randomizeCells(50, 0.3, Math.floor(500/50))
//  };


function reducers(state = initialState, action) {
    switch (action.type) {
        case RANDOMIZE_MAP:

            const cells = createRandomGrid(state.n, state.probActive, state.length);

            return Object.assign({}, {...state, cells})
        default:
            return state
    }
    
}

export default reducers;