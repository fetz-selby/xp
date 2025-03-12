import { Stack } from '@mui/material'
import { getXP } from '@/utils/api'
import XPView from '@/components/XPView/XPView'

const XPPage = async () => {
  const initialLoad = await getXP({})

  return (
    <Stack>
      <XPView initXPList={initialLoad} />
    </Stack>
  )
}

export default XPPage
