'use client'

import { XPItem } from '@/components/XPItemComponent/XPItemComponent'
import Row from '@/molecules/Row/Row'
import XPDetailBill from '@/components/XPDetailBill/XPDetailBill'
import XPDetailInfo from '@/components/XPDetailInfo/XPDetailInfo'
import { useState } from 'react'

interface XPDetailProps {
  xp: XPItem
  isUserLoggedIn: boolean
  userName: string | null
}

const XPDetail = ({ xp, isUserLoggedIn, userName }: XPDetailProps) => {
  const [slotCount, setSlotCount] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState<string[]>([])

  const handleOnSelectedSlotsChange = (selectedSlots: string[]) => {
    setSelectedSlot(selectedSlots)
    setSlotCount(selectedSlots.length)
  }

  return (
    <Row
      sx={{
        justifyContent: 'center',
        alignItems: 'flex-start',
        bgcolor: '#F5F5F5',
        p: 2,
        gap: '16px',
        flexWrap: 'wrap',
      }}
    >
      <XPDetailInfo
        xp={xp}
        onSelectedSlotsChange={handleOnSelectedSlotsChange}
      />
      <XPDetailBill
        xpSlotCount={slotCount}
        xpPrice={xp.price}
        xpTitle={xp.title}
        xpSelectedSlot={selectedSlot}
        isUserLoggedIn={isUserLoggedIn}
        userName={isUserLoggedIn ? userName : null}
      />
    </Row>
  )
}

export default XPDetail
