import React from 'react'
import Grid from '@material-ui/core/Grid'

import ControlButton from './Button'

// returns a simple grid of four buttons
const Controls = ({ randomizeGrid, clearGrid, startTicker, stopTicker }) => 
  <div>
    <Grid item xs={12}>
      <ControlButton onClick={randomizeGrid} title="Random Cells"> </ControlButton>
      <ControlButton onClick={clearGrid} title="Clear Cells"> </ControlButton>
    </Grid>
    <Grid item xs={12}>
      <ControlButton onClick={startTicker} title="Start Simulation"> </ControlButton>
      <ControlButton onClick={stopTicker} title="Stop Simulation"> </ControlButton>
    </Grid>
  </div>

export default React.memo(Controls)