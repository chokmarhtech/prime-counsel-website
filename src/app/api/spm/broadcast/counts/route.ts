import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const DEFAULT_PASSCODE = 'SPM3-GATE-2026'

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('x-usher-passcode')
    const queryPasscode = req.nextUrl.searchParams.get('passcode')
    const passcode = authHeader || queryPasscode

    const expectedPasscode = process.env.SPM_USHER_PASSCODE || DEFAULT_PASSCODE

    if (!passcode || passcode.trim() !== expectedPasscode.trim()) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid passcode' },
        { status: 401 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    // Count physical paid attendees
    const physicalRes = await payload.find({
      collection: 'spm-registrations',
      where: {
        and: [
          { status: { equals: 'paid' } },
          { ticketType: { equals: 'physical' } },
        ],
      },
      limit: 1000,
      depth: 0,
    })

    // Count virtual paid attendees
    const virtualRes = await payload.find({
      collection: 'spm-registrations',
      where: {
        and: [
          { status: { equals: 'paid' } },
          { ticketType: { equals: 'virtual' } },
        ],
      },
      limit: 1000,
      depth: 0,
    })

    return NextResponse.json({
      success: true,
      physicalCount: physicalRes.totalDocs,
      virtualCount: virtualRes.totalDocs,
      totalCount: physicalRes.totalDocs + virtualRes.totalDocs,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch counts' },
      { status: 500 },
    )
  }
}
