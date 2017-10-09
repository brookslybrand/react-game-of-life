import { TICKER_STARTED, TICKER_STOPPED, RANDOMIZE_GRID, STEP, ACTIVATE } from '../actions'

// assign all the cells random values for whether they are active or not
const createRandomGrid = (n, probActive, length) => {
    const cells = [],
          l = [...Array(n).keys()];
    // rows
    l.map( (i) => {
        // columns
        l.map( (j) => {
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

// l, r, t, b mean the cell is on the left, right, top, and bottom respectively
const neighbors = (cells) => (n) => (key) => (l, r, t, b) => {
    const neighbors = [
        // left
        !l ? cells[key - 1] : [],
        // right
        !r ? cells[key + 1] : [],
        // above
        !t ? cells.slice(
                // include left?
                !l ? key - n - 1 : key - n ,
                // include right?
                !r ? key - n + 2 : key - n + 1
            ) : [],
        // below
        !b ? cells.slice(
                // include left?
                !l ? key + n - 1 : key + n ,
                // include right?
                !r ? key + n + 2 : key + n + 1
            ) : []
    ].reduce( ( acc, cur ) => acc.concat(cur), [] );
    return neighbors.filter( (c) => c.active ).length;
};

const neighborsActive = (cells, cell, n) => {
    const { key } = cell;
    const leftCond = key % n === 0,
          rightCond = (key+1) % n === 0,
          topCond = key < n,
          botCond = n*n - key <= n;

    return neighbors(cells)(n)(key)(leftCond, rightCond, topCond, botCond)
}

const updateCell = (cells, cell, n) => {
    const neighbors = neighborsActive( cells, cell, n );
    return cell.active ? 
            neighbors === 2 || neighbors === 3 :
            neighbors === 3;
}

const updateGrid = (cells, n) => {
    return cells.map( (c) => {
        return { ...c, active: updateCell(cells, c, n) } 
    });
}

const activateCell = (cells) => (key) => {
    const cell = cells[key];
    cells[key] = {...cell, active: !cell.active};
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
    tickerStarted: false,
    n: 50,
    probActive: 0.3,
    width: 500,
    init: function() {
        this.length = Math.floor(this.width/this.n);
        this.cells = createRandomGrid(this.n, this.probActive, this.length);
        return this;
    }
 }.init();

initialState.cells[0].active = true;
initialState.cells[1].active = true;
initialState.cells[2].active = true;

function reducers(state = initialState, action) {
    switch (action.type) {
        case TICKER_STARTED:
            return {...state, tickerStarted: true}
        case TICKER_STOPPED:
            return {...state, tickerStarted: false}
        case RANDOMIZE_GRID:
            return {...state, cells: createRandomGrid(state.n, state.probActive, state.length)};
        case STEP:
            return {...state, cells: updateGrid( state.cells, state.n )}
        case ACTIVATE:
            return {...state, cells: activateCell(state.cells.slice(0))(action.key)}
        default:
            return state
    }
}

export default reducers;