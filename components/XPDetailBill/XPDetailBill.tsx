'use client'

import TitleHeader from '@/molecules/TitleHeader/TitleHeader'
import { Card, Divider, Stack, Typography } from '@mui/material'
import localCurrency from '@/utils/localCurrency'
import SlotSelectItemComponent from '@/components/SlotSelectItemComponent/SlotSelectItemComponent'
import PopupInfoComponent from '../PopupInfoComponent/PopupInfoComponent'

interface XPDetailBillProps {
  xpSlotCount: number
  xpPrice: number
  xpTitle: string
  xpSelectedSlot: string[]
  isUserLoggedIn: boolean
  userName: string | null
}

const XPDetailBill = ({
  xpSlotCount,
  xpPrice,
  xpTitle,
  xpSelectedSlot,
  isUserLoggedIn,
  userName,
}: XPDetailBillProps) => {
  const notSignedInBookingText = {
    btnLabel: 'Book Now',
    title: 'Why sign in?',
    description:
      'Sign up today to unlock exclusive deals, personalized recommendations, and seamless booking for unforgettable experiences, from thrilling adventures to relaxing getaways—start creating memories that last a lifetime! 🚀',
    agreeLink: '/sign-in',
    infoType: 'action' as const,
  }
  const signedInBookingText = {
    btnLabel: 'Book Now',
    title: `Hello ${userName}`,
    description: `You have successfully booked ${xpTitle} experience. Enjoy your time and have fun! 🎉`,
    infoType: 'info' as const,
  }

  const bookingText = isUserLoggedIn
    ? signedInBookingText
    : notSignedInBookingText
  return (
    <Stack
      sx={{
        gap: '32px',
        height: '100%',
        justifyContent: 'start',
        width: '318px',
      }}
    >
      <Card sx={{ width: '350px', p: 2 }}>
        <Stack sx={{ gap: '8px' }}>
          <Stack>
            <TitleHeader variant="body1">Number of slots</TitleHeader>
            <Typography variant="body1">{xpSlotCount}</Typography>
          </Stack>
          {xpSelectedSlot.length ? (
            <Stack>
              <TitleHeader variant="body1">Selected slot(s)</TitleHeader>
              <Stack>
                {xpSelectedSlot.map((slot, index) => (
                  <SlotSelectItemComponent key={index} slot={slot} isReadOnly />
                ))}
              </Stack>
            </Stack>
          ) : null}
          <Stack>
            <TitleHeader variant="body1">Price</TitleHeader>
            <Typography variant="body1">
              {xpSlotCount} x {xpTitle}
            </Typography>
          </Stack>
          <Divider />
          <Stack>
            <TitleHeader variant="body1" sx={{ fontSize: 16 }}>
              Total
            </TitleHeader>
            <Typography
              variant="body1"
              sx={{ fontSize: 24, fontWeight: 600, color: '#F44336' }}
            >
              {localCurrency(xpSlotCount * xpPrice)}
            </Typography>
          </Stack>
        </Stack>
      </Card>

      <PopupInfoComponent isDisabled={xpSlotCount <= 0} {...bookingText} />
    </Stack>
  )
}

export default XPDetailBill
