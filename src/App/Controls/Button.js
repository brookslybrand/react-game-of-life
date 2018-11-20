import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

const CustomButton = styled(Button)`
  text-transform: none !important;
  width: 150px !important;
  margin-left: 1.5em !important;
  margin-top: 1.2em !important;
  margin-bottom: 1.3em !important;
`

// simple button using material-ui's Button component
const ControlButton = (props) => {
    const { onClick, title } = props
    return <CustomButton
      disableRipple={true}
      onClick={onClick}
      variant="contained"
      color= {
          title === 'Start Simulation' ? 'primary' : 
          title === 'Stop Simulation' ? 'secondary' :
                    null
      }
      >
      {title}
    </CustomButton>
}

export default React.memo(ControlButton)