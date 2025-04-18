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

export interface LocationComponentProps {
  locations: { id: string; name: string }[]
  onLocationChange?: (newValue: string[]) => void
}

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

function getStyles(
  name: string,
  locationName: readonly string[],
  theme: Theme
) {
  return {
    fontWeight: locationName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  }
}

const LocationComponent = ({
  locations,
  onLocationChange,
}: LocationComponentProps) => {
  const theme = useTheme()
  const [locationName, setLocationName] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof locationName>) => {
    const {
      target: { value },
    } = event
    const newValue = typeof value === 'string' ? value.split(',') : value
    setLocationName(newValue)
    onLocationChange?.(newValue)
  }

  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel id="demo-multiple-chip-label">Locations</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={locationName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Locations" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {locations.map((location) => (
          <MenuItem
            key={location.id}
            value={location.name}
            style={getStyles(location.name, locationName, theme)}
          >
            {location.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LocationComponent
