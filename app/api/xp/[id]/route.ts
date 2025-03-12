import { NextResponse, type NextRequest } from 'next/server'
import xp from '@/data/xp.json'
import _ from 'underscore'

// @ts-expect-error: Unreachable code error
export const GET = async (req: NextRequest, { params }) => {
  const { id } = await params

  const filteredXp = _.find(xp, { id: Number(id) })
  return NextResponse.json({ data: filteredXp })
}
