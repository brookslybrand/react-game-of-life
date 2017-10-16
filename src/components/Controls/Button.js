import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    buttonStyle: {
        textTransform: 'none',
        width: '150px',
        marginLeft: '1.5em',
        marginTop: '1.2em',
        marginBottom: '1.3em'
    }
});

// simple button using material-ui's Button component
const ControlButton = (props) => {
    const { classes, onClick, title } = props;
    return (
             <Button
                raised
                disableRipple={true}
                className={classes.buttonStyle}
                onClick={onClick}
                color= {
                    title === 'Start Simulation' ? 'primary' : 
                    title === 'Stop Simulation' ? 'accent' :
                              null
                }
                >
                {title}
            </Button>
    )
}

ControlButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ControlButton);