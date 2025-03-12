'use client'

import { getLocations, getXP } from '@/utils/api'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useCallback } from 'react'
import { useState } from 'react'
import LocationComponent from '@/components/LocationComponent/LocationComponent'
import PeopleComponent from '@/components/PeopleComponent/PeopleComponent'
import DateSelectComponent from '@/components/DateSelectComponent/DateSelectComponent'
import PriceComponent from '@/components/PriceComponent/PriceComponent'
import XPList from '@/components/XPList/XPList'
import Row from '@/molecules/Row/Row'
import { XPItem } from '@/components/XPItemComponent/XPItemComponent'
import Popover from '@/molecules/Popover/Popover'

interface XPFilterProps {
  initXPList: XPItem[]
}

const XPFilter = ({ initXPList }: XPFilterProps) => {
  const [query, setQuery] = useState({})
  const [locations, setLocations] = useState([])
  const [xpList, setXPList] = useState(initXPList)
  const [isXPListLoading, setIsXPListLoading] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 500])

  const handleLocationsFetch = useCallback(async () => {
    const requestedLocations = await getLocations()
    setLocations(requestedLocations)
  }, [])

  const searchXP = useCallback(async () => {
    setIsXPListLoading(true)
    const response = await getXP(query)
    setIsXPListLoading(false)
    setXPList(response)
  }, [query])

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
    <Stack>
      <Row
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'space-around',
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
        >
          Search
        </Button>
      </Row>
      {xpList.length ? (
        <XPList xpList={xpList} />
      ) : (
        <Row
          sx={{
            alignItems: 'center',
            p: 10,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body1">No match found</Typography>
        </Row>
      )}
    </Stack>
  )
}

export default XPFilter
