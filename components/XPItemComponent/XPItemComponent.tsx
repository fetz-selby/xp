'use client'

import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ShareIcon from '@mui/icons-material/Share'
import { Box, Button, Checkbox, Chip, Stack } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import {
  LocationOn,
  Info,
  Discount,
  FavoriteBorder,
  Favorite,
} from '@mui/icons-material'
import SlotDetailTableComponent from '../SlotDetailTableComponent/SlotDetailTableComponent'
import { useState } from 'react'
import Link from 'next/link'
import discount from '@/utils/discount'
import { styled } from '@mui/material/styles'
import localCurrency from '@/utils/localCurrency'

export interface XPItem {
  id: number
  title: string
  description: string
  price: number
  strikePrice: number | null
  numberOfPeople: number
  imageUrl: string
  locations: string[]
  timeSlots: { [key: string]: string[] }
}

interface XPItemProps {
  xpItem: XPItem
}

const CustomCardHeader = styled(CardHeader)(() => ({
  '& .MuiCardHeader-title': {
    width: '230px',
    margin: 0,
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    fontWeight: '400',
    fontSize: '1.2rem',
    lineHeight: '1.334',
    letterSpacing: '0em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

const XPItemComponent = ({ xpItem }: XPItemProps) => {
  const [slotInfo, setSlotInfo] = useState<string[]>(
    xpItem.timeSlots[xpItem.locations[0]] || []
  )
  const [selectedLocation, setSelectedLocation] = useState<string>(
    xpItem.locations[0]
  )

  const {
    id,
    title,
    description,
    price,
    strikePrice,
    numberOfPeople,
    imageUrl,
    locations,
    timeSlots,
  } = xpItem

  const handleOnChipClick = (location: string) => {
    setSelectedLocation(location)
    setSlotInfo(timeSlots[location])
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  return (
    <Box sx={{ width: '330px', height: '700px' }}>
      <Card sx={{ width: '100%', height: '100%' }}>
        <CustomCardHeader
          title={title}
          action={
            strikePrice ? (
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Discount />
                <Typography
                  variant="h5"
                  sx={{ color: '#FF5722', fontWeight: 800 }}
                >
                  -{discount(strikePrice, price)}%
                </Typography>
              </Box>
            ) : null
          }
        />
        <Box sx={{ height: '220px', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="120"
            image={imageUrl}
            alt={title}
          />
        </Box>
        <CardContent sx={{ height: '360px' }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', pb: '8px' }}
          >
            {description}
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <PersonIcon sx={{ color: 'rgba(0, 0, 0, 0.6)', mr: '16px' }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {numberOfPeople}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <LocationOn sx={{ color: 'rgba(0, 0, 0, 0.6)', mr: '16px' }} />
              <Box>
                {locations.map((location) => (
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
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Info sx={{ color: 'rgba(0, 0, 0, 0.6)', mr: '16px' }} />
              {slotInfo.length ? (
                <SlotDetailTableComponent
                  key={selectedLocation}
                  slotsData={slotInfo}
                  xpId={id}
                />
              ) : (
                <Typography variant="body2">
                  Click on a location to view slots
                </Typography>
              )}
            </Box>
          </Stack>
          {strikePrice && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography
                variant="h6"
                sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
              >
                {localCurrency(strikePrice)}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              variant="h5"
              sx={{
                color: '#F44336',
                textAlign: 'right',
                fontWeight: 800,
              }}
            >
              {localCurrency(price)}
            </Typography>
          </Box>
        </CardContent>
        <CardActions disableSpacing>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box>
              <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />

              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </Box>
            <Link href={`/xp/${xpItem.id}`}>
              <Button
                sx={{ bgcolor: '#FF5722', color: '#FEFEFE', fontSize: '12px' }}
              >
                View Details
              </Button>
            </Link>
          </Box>
        </CardActions>
      </Card>
    </Box>
  )
}

export default XPItemComponent
