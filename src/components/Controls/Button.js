import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  buttonStyle: {
    textTransform: 'none',
    width: '150px',
    marginLeft: '1.5em',
    marginTop: '1.2em',
    marginBottom: '1.3em'
  }
})

// simple button using material-ui's Button component
const ControlButton = (props) => {
    const { classes, onClick, title } = props
    return <Button
      disableRipple={true}
      className={classes.buttonStyle}
      onClick={onClick}
      variant="contained"
      color= {
          title === 'Start Simulation' ? 'primary' : 
          title === 'Stop Simulation' ? 'secondary' :
                    null
      }
      >
      {title}
    </Button>
}

ControlButton.propTypes = {
    classes: PropTypes.object.isRequired,
  }

export default React.memo(withStyles(styles)(ControlButton))