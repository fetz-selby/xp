'use client'

import { useState } from 'react'
import { XPItem } from '../XPItemComponent/XPItemComponent'
import { Stack } from '@mui/material'
import XPFilter from '../XPFilter/XPFilter'
import XPListContent from '../XPListContent/XPListContent'
import { getXP } from '@/utils/api'

interface XPViewProps {
  initXPList: XPItem[]
}

const XPView = ({ initXPList }: XPViewProps) => {
  const [xpList, setXPList] = useState(initXPList)
  const [isXPListLoading, setIsXPListLoading] = useState(false)

  const handleOnFilterChange = async (query: Record<string, string>) => {
    setIsXPListLoading(true)
    const response = await getXP(query)
    setIsXPListLoading(false)
    setXPList(response)
  }

  return (
    <Stack>
      <XPFilter
        onFilterChange={handleOnFilterChange}
        isXPListLoading={isXPListLoading}
      />
      <XPListContent xpList={xpList} />
    </Stack>
  )
}

export default XPView
