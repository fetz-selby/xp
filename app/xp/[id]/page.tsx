import XPDetail from '@/components/XPDetail/XPDetail'
import { getXPById } from '@/utils/api'
import { Box } from '@mui/material'
import { currentUser } from '@clerk/nextjs/server'

const XPWithIdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  let [isUserLoggedIn, userName]: [boolean, string | null] = [false, null]
  const user = await currentUser()
  const { id } = await params
  const xp = await getXPById(id)

  if (user) {
    isUserLoggedIn = true
    userName = user.fullName
  }

  return (
    <Box>
      <XPDetail xp={xp} isUserLoggedIn={isUserLoggedIn} userName={userName} />
    </Box>
  )
}

export default XPWithIdPage
