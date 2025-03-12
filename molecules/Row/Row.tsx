import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

const Row = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export default Row
