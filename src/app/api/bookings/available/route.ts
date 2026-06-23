import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { parseISO, isWeekend, format } from 'date-fns'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const dateParam = searchParams.get('date')

    if (!dateParam) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 })
    }

    const requestedDate = parseISO(dateParam)
    
    // 1. Enforce Monday - Friday
    if (isWeekend(requestedDate)) {
      return NextResponse.json({ availableSlots: [] }) // No weekend slots
    }

    // 2. Define standard slots (9 AM to 4 PM means last slot starts at 3 PM)
    const standardSlots = [
      '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
    ]

    // 3. Find any existing bookings for this specific date
    const formattedDateStr = format(requestedDate, 'yyyy-MM-dd')
    const payload = await getPayload({ config: configPromise })
    
    const existingBookings = await payload.find({
      collection: 'bookings',
      where: {
        date: { equals: formattedDateStr },
        // Consider both paid and pending slots as taken to prevent double-booking during checkout
        paymentStatus: { in: ['paid', 'pending'] }
      },
      limit: 100,
    })

    const bookedSlots = existingBookings.docs.map(booking => booking.timeSlot)

    // 4. Filter out booked slots
    const availableSlots = standardSlots.filter(slot => !bookedSlots.includes(slot))

    return NextResponse.json({ availableSlots })
  } catch (error) {
    console.error('Error fetching available slots:', error)
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 })
  }
}
