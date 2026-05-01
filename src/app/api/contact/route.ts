import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { clientEmailHtml, adminEmailHtml } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = 'gpsimi01@gmail.com'
const SUPERADMIN_EMAIL = 'gpsimi02@gmail.com'
const FROM_EMAIL = 'Prime Counsel <info@primecounsel.co.uk>'


export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json()

    if (!name || !email || !message || !service) {
      return NextResponse.json({ error: 'Name, email, services and message are required.' }, { status: 400 })
    }

    // 1. Send confirmation email to the client
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `We've Received Your Enquiry – Prime Counsel`,
      html: clientEmailHtml({ name, service, message }),
    })

    // 2. Send notification email to admin + superadmin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL, SUPERADMIN_EMAIL],
      subject: `📩 New Contact: ${name} – ${service || 'General Enquiry'}`,
      html: adminEmailHtml({ name, email, service, message }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form email error:', error)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
