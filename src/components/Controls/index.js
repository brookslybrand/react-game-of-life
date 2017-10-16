import React from 'react';
import Grid from 'material-ui/Grid';

import ControlButton from './Button';

// returns a simple grid of four buttons
const Controls = (props) => {

    const { randomizeGrid, clearGrid, startTicker, tickerStopped } = props;

    return (
        <div>
            <Grid item xs={12}>
                <ControlButton onClick={randomizeGrid} title="Random Cells"> </ControlButton>
                <ControlButton onClick={clearGrid} title="Clear Cells"> </ControlButton>
            </Grid>
            <Grid item xs={12}>
                <ControlButton onClick={startTicker} title="Start Simulation"> </ControlButton>
                <ControlButton onClick={tickerStopped} title="Stop Simulation"> </ControlButton>
            </Grid>
        </div>
    )
}

export default Controls