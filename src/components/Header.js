import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const style = {
    width: '100%',
    padding: '10px'
};

const styles = theme => ({
    title: {
        paddingTop: '0.5em',
        paddingLeft: '0.5em'
    },
    subTitle: {
        marginLeft: '1em',
        marginTop: '-0.3em'
    },
});
  
// header to high light what this is and what it was made in
const Header = ({ classes }) => {
    return (
        <div>
            <Typography className={classes.title} type="display2" gutterBottom>
                John Conway's Game of Life
            </Typography>
            <Typography className={classes.subTitle} style={style} type="display1" gutterBottom>
                Implemented using React + Redux
            </Typography>
        </div>
    )
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
  
export default withStyles(styles)(Header);