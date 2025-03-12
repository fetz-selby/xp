'use client'

import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
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

const numberOfPeopleLabel = [
  { id: 1, name: '1 person', value: '1' },
  { id: 2, name: '2 people', value: '2' },
  { id: 3, name: '3 people', value: '3' },
  { id: 4, name: '4 people', value: '4' },
  { id: 5, name: '8 people', value: '8' },
]

interface PeopleComponentProps {
  onPeopleChange?: (newValue: number[]) => void
}

const PeopleComponent = ({ onPeopleChange }: PeopleComponentProps) => {
  const [numberOfPeople, setPersonName] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof numberOfPeople>) => {
    const {
      target: { value },
    } = event
    const newValue = typeof value === 'string' ? value.split(',') : value
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )

    const resolvedPeopleValues = newValue.map((month) =>
      _.find(numberOfPeopleLabel, { name: month })
    )

    onPeopleChange?.(
      resolvedPeopleValues
        .filter((people) => people !== undefined)
        .map((people) => parseInt(people!.value))
    )
  }

  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel id="demo-multiple-checkbox-label">
        Number Of People
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={numberOfPeople}
        onChange={handleChange}
        input={<OutlinedInput label="Number of People" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {numberOfPeopleLabel.map((label) => (
          <MenuItem key={label.id} value={label.name}>
            <Checkbox checked={numberOfPeople.includes(label.name)} />
            <ListItemText primary={label.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default PeopleComponent
