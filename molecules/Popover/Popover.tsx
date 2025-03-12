'use client'

import { useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { SxProps } from '@mui/system'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Row from '@/molecules/Row/Row'

interface PopoverProps {
  label: string
  children: React.ReactNode
}

const Popover = ({ label, children }: PopoverProps) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  const styles: SxProps = {
    position: 'absolute',
    top: 58,
    right: 0,
    left: 0,
    zIndex: 1,
    p: 1,
    bgcolor: 'background.paper',
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Stack sx={{ position: 'relative', width: '100%' }}>
        <Row
          sx={{
            border: '1px solid #C1C1C1',
            p: '16px 8px 16px 16px',
            borderRadius: '4px',
          }}
          onClick={handleClick}
        >
          <button type="button">
            <Typography variant="body1" sx={{ color: '#717171' }}>
              {label}
            </Typography>
          </button>

          <ArrowDropDownIcon
            // sx={{ color: '#757575' }}
            sx={{
              color: '#757575',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </Row>
        {open ? <Box sx={styles}>{children}</Box> : null}
      </Stack>
    </ClickAwayListener>
  )
}

export default Popover
