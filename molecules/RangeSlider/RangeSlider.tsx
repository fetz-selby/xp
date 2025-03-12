'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

interface RangeSliderProps {
  min?: number
  max?: number
  onChange?: (event: Event, newValue: number[]) => void
}

const valuetext = (value: number) => {
  return `€ ${value}`
}

const RangeSlider = ({ min = 0, max = 0, onChange }: RangeSliderProps) => {
  const [value, setValue] = React.useState<number[]>([min, max])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])

    if (onChange) {
      onChange(event, newValue as number[])
    }
  }

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  )
}

export default RangeSlider
