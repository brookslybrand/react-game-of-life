import React, { Component } from 'react';

import Grid from './Grid';

const style = {
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '2em',
  padding: '5px',
  display: 'block'
}

class App extends Component {

  render() {
    const { n, probActive, width, length, cells } = this.props.reduxState;
    return (
      <div>
        <button type="button" onClick={this.props.randomizeGrid}>Click Me!</button>
        <button type="button" onClick={this.props.step}>Increment Simulation</button>
        <button type="button" onClick={this.props.startTicker}>Start Simulation</button>
        <button type="button" onClick={this.props.tickerStopped}>Stop Simulation</button>
        <svg width={width} height={width} style={style}>
          <Grid n={n} cells={cells} width={width} length={length} activate={this.props.activate} />
        </svg>
      </div>
    );
  }
}

export default App;
