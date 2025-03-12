'use client'

import { Checkbox, Typography } from '@mui/material'
import { useState } from 'react'
import localDate from '@/utils/localDate'
import { CalendarMonth, Schedule } from '@mui/icons-material'
import Row from '@/molecules/Row/Row'

interface SlotSelectItemComponentProps {
  slot: string
  onSlotSelect?: (slot: string, isChecked: boolean) => void
  isReadOnly?: boolean
}

const SlotSelectItemComponent = ({
  slot,
  onSlotSelect,
  isReadOnly = false,
}: SlotSelectItemComponentProps) => {
  const [checked, setChecked] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    setChecked(checked)
    onSlotSelect?.(slot, checked)
  }

  const [date, time] = slot.split('T')

  return (
    <Row
      sx={{ alignItems: 'center', justifyContent: 'flex-start', gap: '16px' }}
    >
      <Row>
        <CalendarMonth
          sx={{ color: 'rgba(0, 0, 0, 0.6)', m: '4px', width: 16 }}
        />
        <Typography variant="body1">{localDate(date)}</Typography>
      </Row>
      <Row>
        <Schedule sx={{ color: 'rgba(0, 0, 0, 0.6)', m: '4px', width: 16 }} />
        <Typography variant="body1">{time}</Typography>
      </Row>
      {!isReadOnly ? (
        <Row>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            sx={{
              color: '#FF5722',
              '&.Mui-checked': {
                color: '#FF5722',
              },
            }}
          />
        </Row>
      ) : null}
    </Row>
  )
}

export default SlotSelectItemComponent
