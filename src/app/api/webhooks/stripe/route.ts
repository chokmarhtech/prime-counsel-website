import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Resend } from 'resend'
import { 
  adminSessionEmailHtml, 
  clientSessionEmailHtml, 
  adminOrderEmailHtml, 
  clientDownloadEmailHtml, 
  spmAdminNotificationEmailHtml,
  adminDirectBookingEmailHtml,
  clientDirectBookingEmailHtml 
} from '@/lib/email-templates'

export const dynamic = 'force-dynamic' // Fix for Vercel App Router caching webhooks

const ADMIN_EMAIL="primecounsel5@gmail.com"
const SUPERADMIN_EMAIL="info@primecounsel.co.uk"
const FROM_EMAIL="Prime Counsel <info@primecounsel.co.uk>"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  console.log('⚡ Webhook received! Processing...')
  
  let body: string;
  let signature: string;

  try {
    body = await req.text()
    signature = req.headers.get('stripe-signature') || ''
  } catch (err) {
    console.error('❌ Failed to read request body or signature', err)
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('🛠️ Dev Mode: Bypassing signature verification')
      event = JSON.parse(body) as Stripe.Event
    } else {
      // .trim() is crucial here because pasting the secret into Vercel often includes an invisible trailing space!
      const secret = (process.env.STRIPE_WEBHOOK_SECRET || '').trim()
      if (!secret) {
        console.error('❌ STRIPE_WEBHOOK_SECRET is missing in Vercel environment variables!')
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
      }
      event = stripe.webhooks.constructEvent(body, signature, secret)
    }
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: `Verification failed: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // 1. Handle SPM 3.0 registrations separately
    if (session.metadata?.type === 'spm_registration') {
      const registrationId = session.metadata.registrationId
      console.log(`⚡ SPM 3.0 Webhook registration complete for ID: ${registrationId}`)
      if (registrationId) {
        try {
          const payload = await getPayload({ config: configPromise })
          const updatedReg = await payload.update({
            collection: 'spm-registrations',
            id: registrationId,
            data: {
              status: 'paid',
              stripeSessionId: session.id,
            },
          })
          console.log(`✅ Updated SPM 3.0 registration status to PAID for ID: ${registrationId}`)

          // Send admin notification immediately after payment confirmed
          const ticketPrice = updatedReg.ticketType === 'physical' ? '50.00' : '25.00'
          await resend.emails.send({
            from: FROM_EMAIL,
            to: [ADMIN_EMAIL, SUPERADMIN_EMAIL],
            subject: `🎟️ New SPM 3.0 Registration: ${updatedReg.name} (${updatedReg.ticketType === 'physical' ? 'Physical' : 'Virtual'})`,
            html: spmAdminNotificationEmailHtml({
              name: updatedReg.name,
              email: updatedReg.email,
              ticketType: updatedReg.ticketType as 'physical' | 'virtual',
              ticketCode: updatedReg.ticketCode || '',
              amount: ticketPrice,
              stripeId: session.id,
            }),
          })
          console.log(`✅ Admin notification sent for SPM registration: ${updatedReg.ticketCode}`)
        } catch (err) {
          console.error(`❌ Failed to update SPM 3.0 registration:`, err)
        }
      }
      return NextResponse.json({ received: true })
    }

    // Attempt to extract the customer's email, prioritizing custom form inputs from metadata
    const customerEmail = session.metadata?.customEmail || session.customer_details?.email || session.customer_email
    const customerName = session.metadata?.customName || session.customer_details?.name || 'Valued Customer'
    
    // Support both single checkout (Mentorship) and Cart checkout (Books/Digital)
    const rawProductIds = session.metadata?.productIds
    const singleProductId = session.metadata?.productId
    
    let productIdsToProcess: string[] = []
    
    if (rawProductIds) {
      try {
        productIdsToProcess = JSON.parse(rawProductIds)
      } catch (e) {
        console.error('Failed to parse productIds from metadata', e)
      }
    } else if (singleProductId) {
      productIdsToProcess = [singleProductId]
    }

    console.log(`⚡ Payment confirmed for ${productIdsToProcess.length} item(s) by ${customerEmail}`)

    if (productIdsToProcess.length > 0 && customerEmail) {
      try {
        const payload = await getPayload({ config: configPromise })

        for (const pid of productIdsToProcess) {
          const parsedProductId = !isNaN(Number(pid)) ? Number(pid) : pid

          // 1. Check if Order already exists (Idempotency)
          const existingOrder = await payload.find({
            collection: 'orders',
            where: {
              and: [
                { stripeSessionId: { equals: session.id } },
                { product: { equals: parsedProductId } }
              ]
            }
          })

          if (existingOrder.docs.length > 0) {
            console.log(`ℹ️ Order already exists for session ${session.id} and product ${parsedProductId}, skipping creation.`)
            continue
          }

          // Fetch product details
          const product = await payload.findByID({
            collection: 'products',
            id: parsedProductId,
            depth: 0,
          })

          if (!product) {
            console.error(`Product not found: ${parsedProductId}`)
            continue
          }

          // 2. Create the Order in Payload
          const order = await payload.create({
            collection: 'orders',
            data: {
              stripeSessionId: session.id,
              product: product.id,
              customerEmail: customerEmail,
              isDownloaded: false,
            },
          })

          // Fallback to env variable for Calendly link (per-product link removed)
          const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/primecounsel'
          const siteUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://primecounsel.co.uk'
          const itemPrice = product.price ? product.price.toFixed(2) : (session.amount_total! / 100).toFixed(2)

          // 3. Handle specific product types
          if (product.type === 'digital' || product.type === 'book') {
            // Admin Notification
            await resend.emails.send({
              from: FROM_EMAIL,
              to: [ADMIN_EMAIL, SUPERADMIN_EMAIL],
              subject: `New Order 💰: ${product.title} - £${itemPrice}`,
              html: adminOrderEmailHtml({
                name: customerName,
                email: customerEmail,
                productTitle: product.title,
                amount: itemPrice,
                currency: session.currency?.toUpperCase() || 'GBP',
                stripeId: session.id,
              }),
            })

            // Client Digital/Book Notification
            if (product.digitalFile) {
              const downloadUrl = `${siteUrl}/api/download/${order.downloadToken}`

              await resend.emails.send({
                from: FROM_EMAIL,
                to: customerEmail,
                subject: `Your Secure Download: ${product.title}`,
                html: clientDownloadEmailHtml({
                  name: customerName,
                  productTitle: product.title,
                  downloadUrl: downloadUrl,
                }),
              })

              console.log(`Sent secure download link for order ${order.id} to ${customerEmail}`)
            }
          } else if (product.type === 'session') {
            // Check if this session has booking details attached in Stripe metadata
            const hasBookings = session.metadata?.hasBookings === 'true'
            const bookingsDataParam = session.metadata?.bookingsData
            
            let bookingDate = ''
            let bookingTime = ''
            let meetLink = ''

            if (hasBookings && bookingsDataParam) {
              try {
                const parsedBookings = JSON.parse(bookingsDataParam)
                // Find matching booking for this specific product
                const currentBooking = parsedBookings.find((b: any) => String(b.productId) === String(product.id))
                
                if (currentBooking) {
                  bookingDate = currentBooking.date
                  bookingTime = currentBooking.timeSlot
                  
                  // Use configured custom meeting link from the product
                  meetLink = (product.meetingLink as string) || ''

                  // Create Booking row in Payload
                  const existingBookingRecord = await payload.find({
                    collection: 'bookings',
                    where: {
                      and: [
                        { stripeSessionId: { equals: session.id } },
                        { product: { equals: product.id } }
                      ]
                    }
                  })

                  if (existingBookingRecord.docs.length === 0) {
                    await payload.create({
                      collection: 'bookings',
                      data: {
                        clientName: customerName,
                        clientEmail: customerEmail,
                        date: bookingDate,
                        timeSlot: bookingTime,
                        paymentStatus: 'paid',
                        stripeSessionId: session.id,
                        product: product.id,
                        meetingLink: meetLink,
                      },
                    })
                    console.log(`✅ Created booking record in Payload for ${customerEmail}: ${bookingDate} @ ${bookingTime}`)
                  }
                }
              } catch (e) {
                console.error('Failed to parse or create bookings in webhook:', e)
              }
            }

            if (bookingDate && bookingTime) {
              // Admin notification for Direct Booking
              await resend.emails.send({
                from: FROM_EMAIL,
                to: [ADMIN_EMAIL, SUPERADMIN_EMAIL],
                subject: `New Mentorship Booking 🗓: ${product.title} - £${itemPrice}`,
                html: adminDirectBookingEmailHtml({
                  name: customerName,
                  email: customerEmail,
                  productTitle: product.title,
                  amount: itemPrice,
                  currency: session.currency?.toUpperCase() || 'GBP',
                  bookingDate,
                  bookingTime,
                  stripeId: session.id,
                  meetLink,
                }),
              })

              // Client Direct Booking Confirmation Email
              await resend.emails.send({
                from: FROM_EMAIL,
                to: customerEmail,
                subject: `Booking Confirmed: Your Session is Scheduled!`,
                html: clientDirectBookingEmailHtml({
                  name: customerName,
                  productTitle: product.title,
                  bookingDate,
                  bookingTime,
                  meetLink,
                }),
              })

              console.log(`Sent direct booking confirmation for order ${order.id} to ${customerEmail}`)
            } else {
              // Fallback to legacy Calendly flow if no booking date selected
              await resend.emails.send({
                from: FROM_EMAIL,
                to: [ADMIN_EMAIL, SUPERADMIN_EMAIL],
                subject: `New Mentorship Booking 🗓: ${product.title} - £${itemPrice}`,
                html: adminSessionEmailHtml({
                  name: customerName,
                  email: customerEmail,
                  productTitle: product.title,
                  amount: itemPrice,
                  currency: session.currency?.toUpperCase() || 'GBP',
                  stripeId: session.id,
                }),
              })

              const calendlyLink = 'https://calendly.com/primecounsel'
              await resend.emails.send({
                from: FROM_EMAIL,
                to: customerEmail,
                subject: `Payment Receipt & Action Required: Schedule Your ${product.title}`,
                html: clientSessionEmailHtml({
                  name: customerName,
                  productTitle: product.title,
                  calendlyLink: calendlyLink,
                }),
              })

              console.log(`Sent fallback session confirmation for order ${order.id} to ${customerEmail}`)
            }
          }
        } // End of loop
      } catch (err) {
        console.error('Error processing orders or sending emails:', err)
      }
    }
  }

  return NextResponse.json({ received: true })
}
