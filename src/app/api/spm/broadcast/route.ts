import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Resend } from 'resend'
import {
  spmBroadcastEmailHtml,
  spmThankYouEmailHtml,
  spmVirtualRescheduleEmailHtml,
} from '@/lib/email-templates'
import { generateQrCodeDataUrl } from '@/lib/qrcode'

const DEFAULT_PASSCODE = 'SPM3-GATE-2026'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      passcode,
      audience, // 'physical' | 'virtual'
      campaignType = 'pre_event', // 'pre_event' | 'thank_you' | 'virtual_reschedule'
      subject,
      message,
      meetingLink,
      meetingPasscode,
      meetingId,
      isTest,
      testEmail,
    } = body

    const expectedPasscode = process.env.SPM_USHER_PASSCODE || DEFAULT_PASSCODE

    // 1. Authenticate Request
    if (!passcode || passcode.trim() !== expectedPasscode.trim()) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid broadcast passcode' },
        { status: 401 },
      )
    }

    if (!audience || (audience !== 'physical' && audience !== 'virtual')) {
      return NextResponse.json(
        { error: 'Please select a valid audience (physical or virtual).' },
        { status: 400 },
      )
    }

    if (!subject || !subject.trim()) {
      return NextResponse.json(
        { error: 'Email subject is required.' },
        { status: 400 },
      )
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Email message content is required.' },
        { status: 400 },
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not configured in environment variables.' },
        { status: 500 },
      )
    }
    const resend = new Resend(resendApiKey)

    // 2. Handle TEST Mode: Sends 1 email to the provided test address
    if (isTest) {
      if (!testEmail || !testEmail.includes('@')) {
        return NextResponse.json(
          { error: 'Please enter a valid email address for the test send.' },
          { status: 400 },
        )
      }

      // Check if testEmail exists as an actual registration in the database
      const payload = await getPayload({ config: configPromise })
      const existingUser = await payload.find({
        collection: 'spm-registrations',
        where: {
          email: { equals: testEmail.trim().toLowerCase() },
        },
        limit: 1,
      })

      const actualAttendee = existingUser.docs[0]
      const recipientName = actualAttendee ? actualAttendee.name : 'Valued Attendee (Test)'
      const recipientTicketCode: string =
        actualAttendee?.ticketCode ||
        (audience === 'physical' ? 'SPM3-PHY-TEST' : 'SPM3-VIR-TEST')
      const targetTicketType = actualAttendee ? actualAttendee.ticketType : audience

      let testHtml = ''

      if (campaignType === 'thank_you') {
        testHtml = spmThankYouEmailHtml({
          name: recipientName,
          subject: `[TEST PREVIEW] ${subject}`,
          message,
        })
      } else if (campaignType === 'virtual_reschedule') {
        testHtml = spmVirtualRescheduleEmailHtml({
          name: recipientName,
          ticketCode: recipientTicketCode,
          subject: `[TEST PREVIEW] ${subject}`,
          message,
        })
      } else {
        // Generate a QR code for physical preview test (using real pass if found, or test code)
        let sampleQrCode: string | undefined = undefined
        if (targetTicketType === 'physical' || audience === 'physical') {
          try {
            sampleQrCode = await generateQrCodeDataUrl(
              `https://primecounsel.co.uk/spm-3/pass/${recipientTicketCode}`,
              { width: 220 },
            )
          } catch (e) {
            console.error('Failed to generate sample QR code', e)
          }
        }

        testHtml = spmBroadcastEmailHtml({
          name: recipientName,
          ticketType: targetTicketType as 'physical' | 'virtual',
          ticketCode: recipientTicketCode,
          subject: `[TEST PREVIEW] ${subject}`,
          message,
          qrCodeDataUrl: sampleQrCode,
          meetingLink,
          meetingPasscode,
          meetingId,
        })
      }

      await resend.emails.send({
        from: 'Prime Counsel <info@primecounsel.co.uk>',
        to: testEmail.trim(),
        subject: `[TEST PREVIEW] ${subject}`,
        html: testHtml,
      })

      return NextResponse.json({
        success: true,
        isTest: true,
        message: actualAttendee
          ? `Test email sent to ${testEmail} using your real registration details (${actualAttendee.name}, Code: ${actualAttendee.ticketCode})!`
          : `Test email sent to ${testEmail}!`,
      })
    }

    // 3. LIVE BROADCAST Mode: Query confirmed attendees matching audience
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'spm-registrations',
      where: {
        and: [
          { status: { equals: 'paid' } },
          { ticketType: { equals: audience } },
        ],
      },
      limit: 1000,
      depth: 0,
    })

    const recipients = result.docs

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: `No confirmed ${audience} attendees found in the database.` },
        { status: 404 },
      )
    }

    let successCount = 0
    let failedCount = 0
    const errors: string[] = []

    // 4. Send emails in series with individual personalization
    for (const reg of recipients) {
      try {
        let emailHtml = ''

        if (campaignType === 'thank_you') {
          emailHtml = spmThankYouEmailHtml({
            name: reg.name,
            subject,
            message,
          })
        } else if (campaignType === 'virtual_reschedule') {
          emailHtml = spmVirtualRescheduleEmailHtml({
            name: reg.name,
            ticketCode: reg.ticketCode || '',
            subject,
            message,
          })
        } else {
          let qrCodeDataUrl: string | undefined = undefined
          if (audience === 'physical' && reg.ticketCode) {
            try {
              const passUrl = `https://primecounsel.co.uk/spm-3/pass/${reg.ticketCode}`
              qrCodeDataUrl = await generateQrCodeDataUrl(passUrl, { width: 220 })
            } catch (qrErr) {
              console.error(`[Broadcast] Failed QR for ${reg.ticketCode}:`, qrErr)
            }
          }

          emailHtml = spmBroadcastEmailHtml({
            name: reg.name,
            ticketType: audience,
            ticketCode: reg.ticketCode || '',
            subject,
            message,
            qrCodeDataUrl,
            meetingLink,
            meetingPasscode,
            meetingId,
          })
        }

        await resend.emails.send({
          from: 'Prime Counsel <info@primecounsel.co.uk>',
          to: reg.email,
          subject,
          html: emailHtml,
        })

        successCount++
      } catch (err: any) {
        failedCount++
        errors.push(`${reg.email}: ${err.message || 'Send failed'}`)
        console.error(`[Broadcast] Error sending to ${reg.email}:`, err)
      }
    }

    return NextResponse.json({
      success: true,
      audience,
      totalRecipients: recipients.length,
      successCount,
      failedCount,
      errors: errors.slice(0, 5),
    })
  } catch (error: any) {
    console.error('[SPM] Broadcast error:', error)
    return NextResponse.json(
      { error: error?.message || 'An unexpected error occurred during broadcast.' },
      { status: 500 },
    )
  }
}
