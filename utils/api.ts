const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export const getLocations = async () => {
  const response = await fetch(`${apiUrl}/api/locations`)
  const { data } = await response.json()
  return data
}

export const getXPById = async (xpId: string) => {
  const response = await fetch(`${apiUrl}/api/xp/${xpId}`)
  const { data } = await response.json()
  return data
}

export const getXP = async (params: Record<string, string>) => {
  const response = await fetch(
    new Request(`${apiUrl}/api/xp?${new URLSearchParams(params)}`)
  )
  const { data } = await response.json()
  return data
}
