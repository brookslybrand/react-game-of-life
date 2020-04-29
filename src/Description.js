import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const CustomPaper = styled(Paper)`
  padding: 1.5em 2em !important;
  margin-top: 2em !important;
  margin-left: 1.5em !important;
  max-width: 500px !important;
`
// description of the game of life rules
const Description = () => (
  <CustomPaper>
    <Typography variant="h3">Rules of the Game:</Typography>
    <p>
      An inactive (gray) cell will become active (yellow) in the next iteration,
      if and only if it has 3 active neighbors.
    </p>
    <br />
    <p>
      An active cell will only survive if it has exactly 2 or 3 active neighbors
      (diagonals included). Otherwise it will die from underpopulation or
      overpopulation.
    </p>
    <br />
    <p>Click on any cells you like to turn them active/inactive.</p>
  </CustomPaper>
)

export default React.memo(Description)
