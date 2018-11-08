import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    marginLeft: '1.5em',
    width: 'auto'
  }),
})

// description of the game of life rules
const Description = ({ classes }) =>
  <Paper className={classes.root}>
      <Typography variant="h3">
      Rules of the Game:
      </Typography>
      <p>
      An inactive (gray) cell will become active (yellow) in the next iteration, if and only if it has 3 active neighbors.
      </p>
      <br />
      <p>
      An active cell will only survive if it has exactly 2 or 3 active neighbors (diagonals included). Otherwise it will die from underpopulation or overpopulation.
      </p>
      <br />
      <p>
      Click on any cells you like to turn them active/inactive.
      </p>      
  </Paper>

Description.propTypes = {
  classes: PropTypes.object.isRequired,
}
  
  
export default withStyles(styles)(Description)