import React from 'react'
import Grid from '@material-ui/core/Grid'

import ControlButton from './Button'

// returns a simple grid of four buttons
const Controls = ({
  randomizeGrid,
  clearGrid,
  startTicker,
  stopTicker,
  className
}) => (
  <div className={className}>
    <Grid item xs={12}>
      <ControlButton onClick={randomizeGrid} title="Random Cells" />
      <ControlButton onClick={clearGrid} title="Clear Cells" />
    </Grid>
    <Grid item xs={12}>
      <ControlButton onClick={startTicker} title="Start Simulation" />
      <ControlButton onClick={stopTicker} title="Stop Simulation" />
    </Grid>
  </div>
)

export default React.memo(Controls)
