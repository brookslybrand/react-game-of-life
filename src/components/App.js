import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Controls from './Controls';
import CellsGrid from './CellsGrid';
import Header from './Header';
import Description from './Description';

const styles = theme => ({
	root: {
		flexGrow: 1,
		marginTop: 30
	},
		buttonRow: {
		textAlign: 'left',
		justifyContent: 'left'
	},
		grid: {
		display: 'inline-block',
		textAlign: 'left',
},
});

// main app consists of header, buttons, description, and the grid of cells
class App extends Component {

  render() {
    const { n, width, length, cells } = this.props.reduxState,
          { classes } = this.props;

	// pretty hacky, but don't display margins of two cells on all sides
    const cells_to_display = cells.slice(2*n, -2*n).filter( (c) => {
    	const { key } = c,
        	  mod = key % n;
    	return mod !== n-2 && mod !== n-1 && mod !== 0 && mod !== 1;
    });
	
	return (
		<div>
			<Header />
			
			<Grid className={classes.root} container spacing={24}>

				<Grid className={classes.buttonRow} item lg={3} xs={12}>
					<Controls className={classes.buttonRow} {...this.props}  />
					<Description />
				</Grid>

				<Grid className={classes.grid} item lg={9} xs={12}>
					<svg width={width} height={width} >
						<CellsGrid cells={cells_to_display} width={width} length={length} activate={this.props.activate} />
					</svg>
				</Grid>
          
        	</Grid>
      	</div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(App);