'use client'

import RangeSlider from '@/molecules/RangeSlider/RangeSlider'
import { Stack, Typography, Box } from '@mui/material'
import { ChangeEvent, useState } from 'react'

interface PriceComponentProps {
  onPriceChange?: (min: number, max: number) => void
  initMin: number
  initMax: number
}

const PriceComponent = ({
  initMin,
  initMax,
  onPriceChange,
}: PriceComponentProps) => {
  const [priceRange, setPriceRange] = useState({ min: initMin, max: initMax })

  const handleOnPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    setPriceRange((prev) => {
      const updatedValue = {
        ...prev,
        [name]: value,
      }
      onPriceChange?.(Number(updatedValue.min), Number(updatedValue.max))

      return updatedValue
    })
  }

  const handleOnSliderChange = (e: Event, newRange: number[]): void => {
    setPriceRange((prev) => {
      onPriceChange?.(newRange[0], newRange[1])
      return {
        ...prev,
        min: newRange[0],
        max: newRange[1],
      }
    })
  }

  const { min, max } = priceRange

  return (
    <Stack
      sx={{ bgcolor: '#FFFFFF', p: 2, borderRadius: '4px', width: '340px' }}
    >
      <Typography variant="h6">Price</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Stack>
          <Typography variant="body1">Min</Typography>
          <input name="min" value={min} onChange={handleOnPriceChange} />
        </Stack>
        <Stack>
          <Typography variant="body1">Max</Typography>
          <input name="max" value={max} onChange={handleOnPriceChange} />
        </Stack>
      </Box>
      <Box>
        <RangeSlider
          key={'range-slider-' + min + max}
          min={min}
          max={max}
          onChange={handleOnSliderChange}
        />
      </Box>
    </Stack>
  )
}

export default PriceComponent
