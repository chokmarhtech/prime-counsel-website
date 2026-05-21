import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { clientBookingConfirmedEmailHtml, adminBookingAlertEmailHtml } from '@/lib/email-templates'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL="gpsimi01@gmail.com"
const SUPERADMIN_EMAIL="gpsimi02@gmail.com"
const FROM_EMAIL="Prime Counsel <info@primecounsel.co.uk>"

// Helper to format Calendly ISO date string into a readable format
function formatCalendlyDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    })
  } catch {
    return isoString
  }
}

// Helper to extract a human-readable meeting location from Calendly's location object
function extractMeetingLocation(location: Record<string, string> | null | undefined): string {
  if (!location) return 'To be confirmed'

  if (location.join_url) return location.join_url
  if (location.data && typeof location.data === 'string') return location.data
  if (location.location) return location.location
  if (location.type) return location.type.replace(/_/g, ' ')

  return 'To be confirmed'
}

export async function POST(req: Request) {
  console.log('📅 Calendly Webhook received!')

  try {
    const rawBody = await req.text()
    const body = JSON.parse(rawBody)

    // Verify webhook signature (Security - Temporarily disabled for testing)
    /*
    const signature = req.headers.get('calendly-webhook-signature')
    const secret = process.env.CALENDLY_SIGNING_KEY

    if (signature && secret) {
      const [tPart, v1Part] = signature.split(',')
      const t = tPart.split('=')[1]
      const v1 = v1Part.split('=')[1]

      const signedPayload = `${t}.${rawBody}`
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(signedPayload)
        .digest('hex')

      if (expectedSignature !== v1) {
        console.warn('❌ Calendly webhook: Invalid signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }
    */

    // We only care about new bookings (invitee.created)
    if (body.event !== 'invitee.created') {
      return NextResponse.json({ received: true, skipped: true })
    }

    const payload = body.payload

    // Temporarily log the full payload so we can see its exact shape
    console.log("Calendly Payload Dump:", JSON.stringify(payload, null, 2))

    // Extract invitee (client) details. In V2, these are often directly on the payload.
    const inviteeName: string = payload?.name || payload?.invitee?.name || 'Valued Client'
    const inviteeEmail: string = payload?.email || payload?.invitee?.email

    if (!inviteeEmail) {
      console.error('Calendly webhook: No invitee email found', { payload })
      return NextResponse.json({ error: 'No invitee email' }, { status: 400 })
    }

    // In Calendly V2, payload.event is a URL string. We must fetch it to get times/location.
    let eventDetails = payload?.event;

    if (typeof payload?.event === 'string') {
      const apiToken = process.env.CALENDLY_API_TOKEN;
      if (!apiToken) {
        console.error('Missing CALENDLY_API_TOKEN in .env file. Cannot fetch event details.');
        // We will fallback to "Invalid Date" if the token is missing, but log an error.
      } else {
        try {
          const eventRes = await fetch(payload.event, {
            headers: {
              'Authorization': `Bearer ${apiToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (eventRes.ok) {
            const eventData = await eventRes.json();
            eventDetails = eventData.resource; // Calendly V2 wraps the object in 'resource'
          } else {
            console.error('Failed to fetch event details from Calendly:', await eventRes.text());
          }
        } catch (fetchErr) {
          console.error('Network error fetching event details:', fetchErr);
        }
      }
    }

    // Extract event details from the fetched resource
    const eventName: string = eventDetails?.name || payload?.event_type?.name || 'Prime Counsel Session'
    const startTime: string = formatCalendlyDate(eventDetails?.start_time)
    const endTime: string = formatCalendlyDate(eventDetails?.end_time)
    const timezone: string = payload?.timezone || payload?.invitee?.timezone || 'UTC'
    const calendlyEventUrl: string = payload?.cancel_url?.replace('/cancellations/new', '') || payload?.invitee?.cancel_url?.replace('/cancellations/new', '') || eventDetails?.uri || ''

    // Extract meeting location (Zoom, Google Meet, phone, etc.)
    const rawLocation = eventDetails?.location
    const meetingLocation = extractMeetingLocation(rawLocation)

    console.log(`Calendly booking confirmed for ${inviteeName} (${inviteeEmail}) — ${eventName} at ${startTime}`)

    // 1. Send branded confirmation email to the client
    await resend.emails.send({
      from: FROM_EMAIL,
      to: inviteeEmail,
      subject: `Confirmed: Your ${eventName} with Prime Counsel`,
      html: clientBookingConfirmedEmailHtml({
        name: inviteeName,
        eventName,
        startTime,
        endTime,
        timezone,
        meetingLocation,
        calendlyEventUrl,
      }),
    })

    // 2. Alert admin & superadmin about the new appointment
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL, SUPERADMIN_EMAIL],
      subject: `🗓 New Appointment: ${inviteeName} – ${eventName}`,
      html: adminBookingAlertEmailHtml({
        name: inviteeName,
        email: inviteeEmail,
        eventName,
        startTime,
        timezone,
        meetingLocation,
        calendlyEventUrl,
      }),
    })

    console.log(`Calendly booking emails sent for ${inviteeEmail}`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Calendly webhook error:', error)
    return NextResponse.json({ error: 'Failed to process Calendly event' }, { status: 500 })
  }
}
