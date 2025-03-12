'use client'

import { Box, Card, CardMedia, Chip, Stack, Typography } from '@mui/material'
import { XPItem } from '@/components/XPItemComponent/XPItemComponent'
import { useState } from 'react'
import SlotSelectItemComponent from '@/components/SlotSelectItemComponent/SlotSelectItemComponent'
import localCurrency from '@/utils/localCurrency'
import discount from '@/utils/discount'
import TitleHeader from '@/molecules/TitleHeader/TitleHeader'
import Row from '@/molecules/Row/Row'

interface XPDetailInfoProps {
  xp: XPItem
  onSelectedSlotsChange: (selectedSlots: string[]) => void
}

const getFirstInitialLocation = (locations: string[]) => locations[0]

const XPDetailInfo = ({ xp, onSelectedSlotsChange }: XPDetailInfoProps) => {
  const [selectedLocation, setSelectedLocation] = useState<string>(
    getFirstInitialLocation(xp.locations)
  )
  const [, setSelectedSlots] = useState<string[]>([])

  const handleOnChipClick = (location: string) => {
    setSelectedLocation(location)
    setSelectedSlots([])
    onSelectedSlotsChange([])
  }

  const handleOnSlotSelect = (slot: string, isChecked: boolean) => {
    setSelectedSlots((prev) => {
      let updatedSlot = []
      if (isChecked) {
        updatedSlot = [...prev, slot]
      } else {
        updatedSlot = prev.filter((selectedSlot) => selectedSlot !== slot)
      }
      onSelectedSlotsChange(updatedSlot)
      return updatedSlot
    })
  }

  const {
    imageUrl,
    title,
    strikePrice,
    price,
    description,
    numberOfPeople,
    timeSlots,
  } = xp

  return (
    <Card sx={{ m: 2, width: '650px', height: '420px', margin: 0 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          width: '100%',
        }}
      >
        <Box sx={{ width: '400px', height: '100%', margin: 'auto' }}>
          <CardMedia
            component="img"
            height="120"
            image={imageUrl}
            alt={title}
          ></CardMedia>
        </Box>
        <Stack sx={{ gap: '8px', p: 2 }}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            {title}
          </Typography>
          <Stack>
            <TitleHeader variant="body1">Description</TitleHeader>
            <Typography variant="body1">{description}</Typography>
          </Stack>
          <Stack>
            <TitleHeader variant="body1">Price</TitleHeader>
            <Row sx={{ justifyContent: 'flex-start', gap: '8px' }}>
              {strikePrice && (
                <Typography
                  variant="body1"
                  sx={{ textDecoration: 'line-through' }}
                >
                  {localCurrency(strikePrice)}
                </Typography>
              )}
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: '#F44336' }}
              >
                {localCurrency(price)}
              </Typography>
            </Row>
          </Stack>
          {strikePrice && (
            <>
              <Stack>
                <TitleHeader variant="body1">Discount</TitleHeader>
                <Typography variant="body1">
                  -{discount(strikePrice, price)}%
                </Typography>
              </Stack>
            </>
          )}
          <Stack>
            <TitleHeader variant="body1">Number of People</TitleHeader>
            <Typography variant="body1">{numberOfPeople}</Typography>
          </Stack>
          <Stack>
            <TitleHeader variant="body1">Locations</TitleHeader>
            <Box>
              {xp.locations.map((location) => (
                <Chip
                  sx={{
                    mr: '4px',
                    ...(selectedLocation === location
                      ? { bgcolor: '#FF5722', color: 'white' }
                      : { bgcolor: '#BDBDBD', color: 'rgba(0, 0, 0, 0.87)' }),
                  }}
                  key={location}
                  label={location}
                  onClick={() => handleOnChipClick(location)}
                />
              ))}
            </Box>
          </Stack>

          <Stack>
            {selectedLocation &&
              timeSlots[selectedLocation].map((timeSlot: string) => (
                <SlotSelectItemComponent
                  key={timeSlot}
                  slot={timeSlot}
                  onSlotSelect={handleOnSlotSelect}
                />
              ))}
          </Stack>
        </Stack>
      </Box>
    </Card>
  )
}

export default XPDetailInfo
