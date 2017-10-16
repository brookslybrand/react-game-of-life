import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      marginTop: theme.spacing.unit * 3,
      marginLeft: '1.5em',
      width: 'auto'
    }),
});

// description of the game of life rules
const Description = ({ classes }) => {
    return (
        <Paper className={classes.root} elevation={4}>
            <Typography type="headline" component="h3">
            Rules of the Game:
            </Typography>
            <Typography type="body1" component="p">
            An inactive (gray) cell will become active (yellow) in the next iteration, if and only if it has 3 active neighbors.
            </Typography>
            <br />
            <Typography type="body1" component="p">
            An active cell will only survive if it has exactly 2 or 3 active neighbors (diagonals included). Otherwise it will die from underpopulation or overpopulation.
            </Typography>
            <br />
            <Typography type="body1" component="p">
            Click on any cells you like to turn them active/inactive.
            </Typography>
            
        </Paper>
    )
}

Description.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
  
export default withStyles(styles)(Description);