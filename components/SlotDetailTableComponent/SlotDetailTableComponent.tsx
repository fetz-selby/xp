'use client'

import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { CalendarMonth, Schedule } from '@mui/icons-material'
import { useMemo } from 'react'
import localDate from '@/utils/localDate'

interface SlotDetailTableComponentProps {
  xpId: number
  slotsData: string[]
}

function createData(date: string, time: string) {
  return { date, time }
}

const SlotDetailTableComponent = ({
  xpId,
  slotsData,
}: SlotDetailTableComponentProps) => {
  const rows = useMemo(
    () =>
      slotsData.map((data) => {
        const [date, time] = data.split('T')
        return createData(localDate(date), time)
      }),
    [slotsData]
  )

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 330 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <CalendarMonth sx={{ color: 'rgba(0, 0, 0, 0.6)', mr: '16px' }} />
            </TableCell>
            <TableCell align="right">
              <Schedule sx={{ color: 'rgba(0, 0, 0, 0.6)', mr: '16px' }} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.date + row.time + xpId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SlotDetailTableComponent
