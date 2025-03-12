'use client'

import { getLocations } from '@/utils/api'
import { Box, Button } from '@mui/material'
import { useEffect, useCallback } from 'react'
import { useState } from 'react'
import LocationComponent from '@/components/LocationComponent/LocationComponent'
import PeopleComponent from '@/components/PeopleComponent/PeopleComponent'
import DateSelectComponent from '@/components/DateSelectComponent/DateSelectComponent'
import PriceComponent from '@/components/PriceComponent/PriceComponent'
import Row from '@/molecules/Row/Row'
import Popover from '@/molecules/Popover/Popover'

interface XPFilterProps {
  onFilterChange: (query: Record<string, string>) => void
  isXPListLoading: boolean
}

const XPFilter = ({ onFilterChange, isXPListLoading }: XPFilterProps) => {
  const [query, setQuery] = useState({})
  const [locations, setLocations] = useState([])
  const [priceRange, setPriceRange] = useState([0, 500])

  const handleLocationsFetch = useCallback(async () => {
    const requestedLocations = await getLocations()
    setLocations(requestedLocations)
  }, [])

  const searchXP = () => {
    onFilterChange(query)
  }

  useEffect(() => {
    handleLocationsFetch()
  }, [handleLocationsFetch])

  const handleOnFilterChange = (key: string, newValue: string[] | number[]) => {
    setQuery((prev) => {
      return {
        ...prev,
        [key]: newValue,
      }
    })
  }

  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        justifyContent: 'center',
        bgcolor: '#FFFFFF',
      }}
    >
      <LocationComponent
        locations={locations}
        onLocationChange={(locations: string[]) =>
          handleOnFilterChange('locations', locations)
        }
      />
      <DateSelectComponent
        onMonthChange={(months: number[]) =>
          handleOnFilterChange('months', months)
        }
      />
      <Box sx={{ width: '200px' }}>
        <Popover label="Price">
          <PriceComponent
            initMin={priceRange[0]}
            initMax={priceRange[1]}
            onPriceChange={(min: number, max: number) => {
              setPriceRange([min, max])
              handleOnFilterChange('priceRange', [min, max])
            }}
          />
        </Popover>
      </Box>
      <PeopleComponent
        onPeopleChange={(people: number[]) =>
          handleOnFilterChange('numberOfPeople', people)
        }
      />
      <Button
        variant="outlined"
        loading={isXPListLoading}
        onClick={() => {
          searchXP()
        }}
        sx={{ padding: '14px 45px', margin: '0 18px' }}
      >
        Search
      </Button>
    </Row>
  )
}

export default XPFilter
