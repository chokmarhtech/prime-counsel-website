import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Resend } from 'resend'
import { spmBroadcastEmailHtml } from '@/lib/email-templates'
import { generateQrCodeDataUrl } from '@/lib/qrcode'

const DEFAULT_PASSCODE = 'SPM3-GATE-2026'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      passcode,
      audience, // 'physical' | 'virtual'
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

      // Generate a demo QR code for physical preview test
      let sampleQrCode: string | undefined = undefined
      if (audience === 'physical') {
        try {
          sampleQrCode = await generateQrCodeDataUrl(
            `https://primecounsel.co.uk/spm-3/pass/SPM3-PHY-DEMO`,
            { width: 220 },
          )
        } catch (e) {
          console.error('Failed to generate sample QR code', e)
        }
      }

      const testHtml = spmBroadcastEmailHtml({
        name: 'Valued Attendee (Test)',
        ticketType: audience,
        ticketCode: audience === 'physical' ? 'SPM3-PHY-DEMO' : 'SPM3-VIR-DEMO',
        subject: `[TEST PREVIEW] ${subject}`,
        message,
        qrCodeDataUrl: sampleQrCode,
        meetingLink,
        meetingPasscode,
        meetingId,
      })

      await resend.emails.send({
        from: 'Prime Counsel <info@primecounsel.co.uk>',
        to: testEmail,
        subject: `[TEST PREVIEW] ${subject}`,
        html: testHtml,
      })

      return NextResponse.json({
        success: true,
        isTest: true,
        message: `Test email successfully sent to ${testEmail}! Please check your inbox.`,
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
        let qrCodeDataUrl: string | undefined = undefined
        if (audience === 'physical' && reg.ticketCode) {
          try {
            const passUrl = `https://primecounsel.co.uk/spm-3/pass/${reg.ticketCode}`
            qrCodeDataUrl = await generateQrCodeDataUrl(passUrl, { width: 220 })
          } catch (qrErr) {
            console.error(`[Broadcast] Failed QR for ${reg.ticketCode}:`, qrErr)
          }
        }

        const emailHtml = spmBroadcastEmailHtml({
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
