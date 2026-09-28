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
        { error: 'Unauthorized: Invalid usher passcode' },
        { status: 401 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    // Fetch all registrations for SPM 3.0
    const result = await payload.find({
      collection: 'spm-registrations',
      limit: 1000,
      depth: 0,
      sort: 'name',
    })

    const attendees = result.docs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      email: doc.email,
      ticketType: doc.ticketType,
      ticketCode: doc.ticketCode,
      status: doc.status,
      checkedIn: Boolean(doc.checkedIn),
      checkedInAt: doc.checkedInAt || null,
      checkedInBy: doc.checkedInBy || null,
    }))

    const totalPaid = attendees.filter((a) => a.status === 'paid').length
    const totalCheckedIn = attendees.filter((a) => a.checkedIn).length

    return NextResponse.json({
      success: true,
      attendees,
      stats: {
        totalRegistrations: attendees.length,
        totalPaid,
        totalCheckedIn,
        attendancePercentage: totalPaid > 0 ? Math.round((totalCheckedIn / totalPaid) * 100) : 0,
      },
    })
  } catch (error: any) {
    console.error('Error fetching SPM attendees list:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 },
    )
  }
}
