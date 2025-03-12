import XPFilter from '@/components/XPFilter/XPFilter'
import { Stack } from '@mui/material'
import { getXP } from '@/utils/api'

const XPPage = async () => {
  const initialLoad = await getXP({})

  return (
    <Stack>
      <XPFilter initXPList={initialLoad} />
    </Stack>
  )
}

export default XPPage
