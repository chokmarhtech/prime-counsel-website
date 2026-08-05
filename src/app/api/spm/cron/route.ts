import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Resend } from 'resend'
import { spmDripEmailHtml } from '@/lib/email-templates'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    // 1. Authorize the request
    const authHeader = req.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Calculate days remaining until 21st November 2026
    const eventDate = new Date('2026-11-21T00:00:00Z')
    const today = new Date()
    
    const eventMidnight = Date.UTC(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), eventDate.getUTCDate())
    const todayMidnight = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    
    const msDiff = eventMidnight - todayMidnight
    const daysRemaining = Math.round(msDiff / (1000 * 60 * 60 * 24))

    const validDrips = {
      5: '5_days',
      3: '3_days',
      1: '1_day',
      0: 'd_day',
    } as Record<number, string>

    const currentDripTag = validDrips[daysRemaining] as 'confirmation' | '5_days' | '3_days' | '1_day' | 'd_day' | undefined

    if (!currentDripTag) {
      return NextResponse.json({
        message: `Cron completed: No drip campaign scheduled for today. (${daysRemaining} days remaining until event)`,
        daysRemaining,
      })
    }

    console.log(`[SPM Cron] Executing drip campaign for tag: ${currentDripTag} (${daysRemaining} days remaining)`)

    // 3. Query all PAID registrations that haven't received this drip email
    const payload = await getPayload({ config: configPromise })
    const { docs: registrations } = await payload.find({
      collection: 'spm-registrations',
      where: {
        and: [
          { status: { equals: 'paid' } },
          { emailsSent: { not_in: [currentDripTag] } },
        ],
      },
      limit: 500, // Safe batch size
    })

    if (registrations.length === 0) {
      return NextResponse.json({
        message: `Cron completed: No pending recipients found for drip tag: ${currentDripTag}`,
        recipientsSent: 0,
      })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not defined in environment variables.')
    }
    const resend = new Resend(resendApiKey)
    let successCount = 0

    // 4. Send emails in series to avoid rate limits
    for (const reg of registrations) {
      try {
        const html = spmDripEmailHtml({
          name: reg.name,
          ticketType: reg.ticketType as 'physical' | 'virtual',
          ticketCode: reg.ticketCode || '',
          daysRemaining,
        })

        let subject = ''
        if (daysRemaining === 5) {
          subject = `5 Days to SPM 3.0: Ready to level up, ${reg.name}?`
        } else if (daysRemaining === 3) {
          subject = `3 Days to SPM 3.0: Important Access Details`
        } else if (daysRemaining === 1) {
          subject = `Tomorrow is the Day! SPM 3.0 Final Details`
        } else if (daysRemaining === 0) {
          subject = `[Today] SPM 3.0 Starts at 10:00 AM! Join us`
        }

        await resend.emails.send({
          from: 'Prime Counsel <info@primecounsel.co.uk>',
          to: reg.email,
          subject,
          html,
        })

        // Add the tag to emailsSent list
        const updatedTags = reg.emailsSent || []
        await payload.update({
          collection: 'spm-registrations',
          id: reg.id,
          data: {
            emailsSent: [...updatedTags, currentDripTag],
          },
        })

        successCount++
      } catch (err) {
        console.error(`[SPM Cron] Failed to send drip email to ${reg.email}:`, err)
      }
    }

    return NextResponse.json({
      message: `Cron completed: Sent drip campaign for tag ${currentDripTag}`,
      recipientsSent: successCount,
    })
  } catch (error: any) {
    console.error('[SPM Cron] Error occurred:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
