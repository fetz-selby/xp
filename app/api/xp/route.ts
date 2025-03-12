import { NextResponse, type NextRequest } from 'next/server'
import xp from '@/data/xp.json'
import _ from 'underscore'

const parsedRequest = (
  field: string,
  searchParams: URLSearchParams,
  isNumber?: boolean
) => {
  const value = searchParams.get(field)

  if (!value) return null
  // Convert the string to an array
  const parsedValue = value
    .split(',')
    // If the field is a number, convert the string to a number
    .map((v) => (isNumber ? parseInt(v) : v))
  return parsedValue
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams

  // Grab the query parameter from the URL
  const locations = parsedRequest('locations', searchParams) as string[]
  const priceRange = parsedRequest('priceRange', searchParams, true) as number[]
  const numberOfPeople = parsedRequest(
    'numberOfPeople',
    searchParams,
    true
  ) as number[]
  const months = parsedRequest('months', searchParams, true) as number[]

  const activities = xp

  // Define the filter criteria
  const filterCriteria = {
    locations,
    priceRange,
    numberOfPeople,
    months,
  }

  type XPType = (typeof xp)[0]

  const filterByLocation = (data: XPType[]) =>
    !filterCriteria.locations
      ? data
      : _.filter(data, (a) =>
          _.some(filterCriteria.locations, (loc) => a.locations.includes(loc))
        )

  // 🔹 Filter by price range
  const filterByPrice = (data: XPType[]) =>
    !filterCriteria.priceRange || filterCriteria.priceRange.length !== 2
      ? data
      : _.filter(
          data,
          (a) =>
            a.price >= filterCriteria.priceRange[0] &&
            a.price <= filterCriteria.priceRange[1]
        )

  // 🔹 Filter by number of people
  const filterByNumberOfPeople = (data: XPType[]) =>
    !filterCriteria.numberOfPeople?.length
      ? data
      : _.filter(data, (a) =>
          _.contains(filterCriteria.numberOfPeople, a.numberOfPeople)
        )

  // 🔹 Filter by month of available dates
  const filterByMonth = (data: XPType[]) =>
    !filterCriteria.months?.length
      ? data
      : _.filter(data, (a) =>
          _.some(filterCriteria.locations, (loc) =>
            //@ts-expect-error: exp
            a.timeSlots[loc]?.some(
              (slot: string | number | Date) =>
                _.contains(filterCriteria.months, new Date(slot).getMonth() + 1) // Months are 0-based in JS
            )
          )
        )

  const filterActivities = _.compose(
    filterByMonth,
    filterByNumberOfPeople,
    filterByPrice,
    filterByLocation
  )

  const filteredActivities = filterActivities(activities)

  return NextResponse.json({ data: filteredActivities })
}
