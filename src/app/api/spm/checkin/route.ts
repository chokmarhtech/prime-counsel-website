import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const DEFAULT_PASSCODE = 'SPM3-GATE-2026'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { ticketCode, usherPasscode, usherName } = body

    const expectedPasscode = process.env.SPM_USHER_PASSCODE || DEFAULT_PASSCODE

    // 1. Verify Usher Passcode
    if (!usherPasscode || usherPasscode.trim() !== expectedPasscode.trim()) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid usher passcode' },
        { status: 401 },
      )
    }

    if (!ticketCode) {
      return NextResponse.json(
        { error: 'Missing ticket code' },
        { status: 400 },
      )
    }

    // Clean ticket code (support raw ticketCode or full URL scan)
    let cleanedCode = String(ticketCode).trim()
    if (cleanedCode.includes('/spm-3/pass/')) {
      cleanedCode = cleanedCode.split('/spm-3/pass/')[1]?.split('?')[0]?.split('#')[0] || cleanedCode
    }
    cleanedCode = cleanedCode.toUpperCase().trim()

    const payload = await getPayload({ config: configPromise })

    // 2. Lookup Registration
    const result = await payload.find({
      collection: 'spm-registrations',
      where: {
        ticketCode: { equals: cleanedCode },
      },
      limit: 1,
    })

    const reg = result.docs?.[0]

    if (!reg) {
      return NextResponse.json(
        {
          success: false,
          status: 'not_found',
          message: 'Ticket reference code not found.',
        },
        { status: 404 },
      )
    }

    // 3. Verify Payment Status
    if (reg.status !== 'paid') {
      return NextResponse.json(
        {
          success: false,
          status: 'unpaid',
          message: 'Registration payment is pending / incomplete.',
          registration: {
            id: reg.id,
            name: reg.name,
            email: reg.email,
            ticketCode: reg.ticketCode,
            ticketType: reg.ticketType,
            status: reg.status,
          },
        },
        { status: 400 },
      )
    }

    // 4. Check if already checked in
    if (reg.checkedIn) {
      return NextResponse.json({
        success: false,
        status: 'already_checked_in',
        message: 'This ticket has already been checked in.',
        checkedInAt: reg.checkedInAt,
        checkedInBy: reg.checkedInBy,
        registration: {
          id: reg.id,
          name: reg.name,
          email: reg.email,
          ticketCode: reg.ticketCode,
          ticketType: reg.ticketType,
          status: reg.status,
          checkedIn: true,
          checkedInAt: reg.checkedInAt,
          checkedInBy: reg.checkedInBy,
        },
      })
    }

    // 5. Atomic check-in update
    const checkInTimestamp = new Date().toISOString()
    const updated = await payload.update({
      collection: 'spm-registrations',
      id: reg.id,
      data: {
        checkedIn: true,
        checkedInAt: checkInTimestamp,
        checkedInBy: usherName || 'Gate Usher',
      },
    })

    return NextResponse.json({
      success: true,
      status: 'checked_in',
      message: 'Check-in successful! Welcome to SPM 3.0.',
      registration: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        ticketCode: updated.ticketCode,
        ticketType: updated.ticketType,
        status: updated.status,
        checkedIn: true,
        checkedInAt: checkInTimestamp,
        checkedInBy: usherName || 'Gate Usher',
      },
    })
  } catch (error: any) {
    console.error('Check-in error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error during check-in' },
      { status: 500 },
    )
  }
}
