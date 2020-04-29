import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const Title = styled(Typography)`
  padding-top: 0.5em;
  padding-left: 0.5em;
`

const SubTitle = styled(Typography)`
  width: 100%;
  padding: 10px;
  margin-top: -0.3em !important;
  margin-left: 1em !important;
`

// header to high light what this is and what it was made in
const Header = () => {
  return (
    <div>
      <Title variant="h4" gutterBottom>
        John Conway's Game of Life
      </Title>
      <SubTitle variant="h5" gutterBottom>
        Implemented using React
      </SubTitle>
    </div>
  )
}

export default React.memo(Header)
