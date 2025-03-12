'use client'

import XPItemComponent from '@/components/XPItemComponent/XPItemComponent'
import { XPItem } from '../XPItemComponent/XPItemComponent'
import { Box } from '@mui/material'

interface XPListProps {
  xpList: XPItem[]
}

const XPList = ({ xpList }: XPListProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        gap: '8px',
        bgcolor: '#F5F5F5',
        p: '8px',
        justifyContent: 'center',
      }}
    >
      {xpList.map((xp) => (
        <XPItemComponent key={xp.id} xpItem={xp} />
      ))}
    </Box>
  )
}

export default XPList
