import { Typography } from '@mui/material'
import { XPItem } from '@/components/XPItemComponent/XPItemComponent'
import XPList from '@/components/XPList/XPList'
import Row from '@/molecules/Row/Row'

interface XPListContentProps {
  xpList: XPItem[]
}

const XPListContent = ({ xpList }: XPListContentProps) => {
  return xpList.length ? (
    <XPList xpList={xpList} />
  ) : (
    <Row
      sx={{
        alignItems: 'center',
        p: 10,
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body1">No match found</Typography>
    </Row>
  )
}

export default XPListContent
