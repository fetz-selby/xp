'use client'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { redirect } from 'next/navigation'

interface AlertDialogProps {
  btnLabel: string
  title: string
  description?: string
  agreeLink?: string
  infoType?: 'info' | 'action'
  isDisabled: boolean
}

const PopupInfoComponent = ({
  btnLabel,
  title,
  description,
  agreeLink,
  infoType = 'action',
  isDisabled,
}: AlertDialogProps) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAgreeAndClose = () => {
    if (agreeLink) {
      redirect(agreeLink)
    }
    setOpen(false)
  }

  return (
    <>
      <Button
        disabled={isDisabled}
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ width: '350px' }}
      >
        {btnLabel}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        {infoType === 'action' ? (
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleAgreeAndClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        ) : null}
      </Dialog>
    </>
  )
}

export default PopupInfoComponent
