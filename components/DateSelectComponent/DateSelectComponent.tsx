'use client'

import * as React from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import _ from 'underscore'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const months = [
  { id: '1', name: 'January', value: '1' },
  { id: '2', name: 'February', value: '2' },
  { id: '3', name: 'March', value: '3' },
  { id: '4', name: 'April', value: '4' },
  { id: '5', name: 'May', value: '5' },
  { id: '6', name: 'June', value: '6' },
  { id: '7', name: 'July', value: '7' },
  { id: '8', name: 'August', value: '8' },
  { id: '9', name: 'September', value: '9' },
  { id: '10', name: 'October', value: '10' },
  { id: '11', name: 'November', value: '11' },
  { id: '12', name: 'December', value: '12' },
]

function getStyles(name: string, monthName: readonly string[], theme: Theme) {
  return {
    fontWeight: monthName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  }
}

interface DateSelectComponentProps {
  onMonthChange?: (newValue: number[]) => void
}

const DateSelectComponent = ({ onMonthChange }: DateSelectComponentProps) => {
  const theme = useTheme()
  const [monthName, setMonthName] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof monthName>) => {
    const {
      target: { value },
    } = event
    const newValue = typeof value === 'string' ? value.split(',') : value
    setMonthName(newValue)

    const resolvedMonthValues = newValue.map((month) =>
      _.find(months, { name: month })
    )

    onMonthChange?.(
      resolvedMonthValues
        .filter((month) => month !== undefined)
        .map((month) => parseInt(month!.value))
    )
  }

  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel id="demo-multiple-chip-label">Months</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={monthName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Months" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {months.map((month) => (
          <MenuItem
            key={month.id}
            value={month.name}
            style={getStyles(month.name, monthName, theme)}
          >
            {month.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default DateSelectComponent
