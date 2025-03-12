import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const locations = await prisma.location.findMany()

  return NextResponse.json({ data: locations })
}
