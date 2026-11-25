import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Resend } from 'resend'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')?.trim()
    const choice = searchParams.get('choice')?.trim() // 'saturday_8pm' | 'sunday_9pm'

    if (!code || !choice) {
      return NextResponse.json({ error: 'Missing code or choice parameters.' }, { status: 400 })
    }

    if (choice !== 'saturday_8pm' && choice !== 'sunday_9pm') {
      return NextResponse.json({ error: 'Invalid choice selected.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'spm-registrations',
      where: {
        ticketCode: { equals: code },
      },
      limit: 1,
    })

    if (result.docs.length === 0) {
      return NextResponse.json({ error: 'Registration not found.' }, { status: 404 })
    }

    const doc = result.docs[0]

    // Record the vote
    await payload.update({
      collection: 'spm-registrations',
      id: doc.id,
      data: {
        rescheduleVote: choice,
        rescheduleVotedAt: new Date().toISOString(),
      },
    })

    // Instant notification to Admin inboxes
    try {
      const resendApiKey = process.env.RESEND_API_KEY
      if (resendApiKey) {
        const resend = new Resend(resendApiKey)
        const choiceLabel =
          choice === 'saturday_8pm'
            ? 'Saturday, 28th November 2026 at 8:00 PM GMT'
            : 'Sunday, 29th November 2026 at 9:00 PM GMT'

        const adminRecipients = ['info@primecounsel.co.uk', 'primecounsel5@gmail.com']

        await resend.emails.send({
          from: 'Prime Counsel <info@primecounsel.co.uk>',
          to: adminRecipients,
          subject: `🗳️ Virtual Vote Cast: ${doc.name} selected ${choice === 'saturday_8pm' ? 'Saturday' : 'Sunday'}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; background-color: #FAF9F6; padding: 30px 20px;">
              <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border: 1px solid #E5DFD0; border-radius: 10px; overflow: hidden;">
                <div style="background: #0B1C3D; padding: 20px; text-align: center; border-bottom: 2px solid #C9A84C;">
                  <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 600;">SPM 3.0 Virtual Reschedule Vote</h2>
                </div>
                <div style="padding: 24px; color: #374151; font-size: 14px; line-height: 1.6;">
                  <p style="margin: 0 0 16px 0;">An attendee has just recorded their preferred session date:</p>
                  
                  <div style="background: #FAF9F6; border: 1px solid #E5DFD0; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
                    <p style="margin: 0 0 8px 0;"><strong>Attendee:</strong> ${doc.name}</p>
                    <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${doc.email}</p>
                    <p style="margin: 0 0 8px 0;"><strong>Ticket Code:</strong> <code style="background: #fff; padding: 2px 6px; border: 1px solid #ddd; border-radius: 4px;">${doc.ticketCode}</code></p>
                    <p style="margin: 0; color: #0B1C3D;"><strong>Selected Choice:</strong> <span style="color: #C9A84C; font-weight: bold;">${choiceLabel}</span></p>
                  </div>

                  <p style="margin: 0; font-size: 12px; color: #6B7280;">
                    You can view the full live tally anytime on the <a href="https://primecounsel.co.uk/spm-3/broadcast" style="color: #0B1C3D; font-weight: bold;">Broadcast Desk</a>.
                  </p>
                </div>
              </div>
            </div>
          `,
        })
      }
    } catch (emailErr) {
      console.error('Failed to dispatch vote notification to admin:', emailErr)
    }

    return NextResponse.json({
      success: true,
      name: doc.name,
      choice,
      message: 'Vote successfully recorded.',
    })
  } catch (error: any) {
    console.error('Error recording reschedule vote:', error)
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { passcode } = body

    const expectedPasscode = process.env.SPM_USHER_PASSCODE || 'SPM3-GATE-2026'
    if (!passcode || passcode.trim() !== expectedPasscode.trim()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await getPayload({ config: configPromise })

    // Tally votes
    const allVirtual = await payload.find({
      collection: 'spm-registrations',
      where: {
        and: [
          { status: { equals: 'paid' } },
          { ticketType: { equals: 'virtual' } },
        ],
      },
      limit: 100,
    })

    let saturday = 0
    let sunday = 0
    let pending = 0

    const voterList: Array<{ name: string; email: string; choice: string | null; date: string | null }> = []

    for (const doc of allVirtual.docs) {
      if (doc.rescheduleVote === 'saturday_8pm') {
        saturday++
      } else if (doc.rescheduleVote === 'sunday_9pm') {
        sunday++
      } else {
        pending++
      }

      voterList.push({
        name: doc.name,
        email: doc.email,
        choice: doc.rescheduleVote || null,
        date: doc.rescheduleVotedAt || null,
      })
    }

    return NextResponse.json({
      totalVirtual: allVirtual.docs.length,
      saturday,
      sunday,
      pending,
      voters: voterList,
    })
  } catch (error: any) {
    console.error('Error fetching vote tally:', error)
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}
