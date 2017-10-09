export const TICKER_STARTED = 'TICKER_STARTED';
export const TICKER_STOPPED = 'TICKER_STOPPED';
export const RANDOMIZE_GRID = 'RANDOMIZE_GRID';
export const STEP = 'STEP';
export const ACTIVATE = 'ACTIVATE';

export function tickerStarted() {
    return {
        type: TICKER_STARTED
    };
}

export function tickerStopped() {
    return {
        type: TICKER_STOPPED
    };
}

// randomly assign a new grid
export function randomizeGrid() {
    return {
        type: RANDOMIZE_GRID
    };
}

// change the cells for one step
export function step() {
    return {
        type: STEP
    };
}

// activate (or deactivate) an individual cell
export function activate(key) {
    return {
        type: ACTIVATE,
        key
    }
}