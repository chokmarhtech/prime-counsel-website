import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Resend } from 'resend'
import { adminOrderEmailHtml, clientDownloadEmailHtml, adminDirectBookingEmailHtml, clientDirectBookingEmailHtml } from '@/lib/email-templates'

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
  } catch (err: unknown) {
    console.error(`❌ Webhook signature verification failed: ${(err as Error).message}`)
    return NextResponse.json({ error: `Verification failed: ${(err as Error).message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Attempt to extract the customer's email
    const customerEmail = session.customer_details?.email || session.customer_email
    const customerName = session.customer_details?.name || 'Valued Customer'
    
    // Support both single checkout (Mentorship) and Cart checkout (Books/Digital)
    const productIdsStr = session.metadata?.productIds || '[]'
    let productIdsToProcess: string[] = []
    try {
      productIdsToProcess = JSON.parse(productIdsStr)
    } catch {
      productIdsToProcess = session.metadata?.productId ? [session.metadata.productId] : []
    }

    let bookingsData: Record<string, string>[] = []
    if (session.metadata?.hasBookings === 'true' && session.metadata?.bookingsData) {
      try {
        bookingsData = JSON.parse(session.metadata.bookingsData)
      } catch (e) {
        console.error('Failed to parse bookingsData metadata', e)
      }
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
            const isDirectBooking = session.metadata?.isBooking === 'true'
            const cartBookingsForProduct = bookingsData.filter(b => String(b.productId) === String(product.id))

            if (isDirectBooking) {
              const bookingDate = session.metadata?.bookingDate || 'TBD'
              const bookingTime = session.metadata?.bookingTime || 'TBD'
              const meetLink = product.meetLink || 'https://meet.google.com/'

              // Save to Bookings Collection
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
                },
              })

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

              // Client Confirmation Email for Direct Booking
              await resend.emails.send({
                from: FROM_EMAIL,
                to: customerEmail,
                subject: `Session Confirmed: ${product.title}`,
                html: clientDirectBookingEmailHtml({
                  name: customerName,
                  productTitle: product.title,
                  bookingDate,
                  bookingTime,
                  meetLink,
                }),
              })

              console.log(`Successfully processed direct booking and sent emails for order ${order.id} to ${customerEmail}`)

            } else if (cartBookingsForProduct.length > 0) {
              // Cart Multi-Booking Flow
              for (const booking of cartBookingsForProduct) {
                const bookingDate = booking.date || 'TBD'
                const bookingTime = booking.timeSlot || 'TBD'

                const meetLink = product.meetLink || 'https://meet.google.com/'

                // Save to Bookings Collection
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
                  },
                })

                // Admin notification for Cart Booking
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

                // Client Confirmation Email for Cart Booking
                await resend.emails.send({
                  from: FROM_EMAIL,
                  to: customerEmail,
                  subject: `Session Confirmed: ${product.title} (${bookingDate} @ ${bookingTime})`,
                  html: clientDirectBookingEmailHtml({
                    name: customerName,
                    productTitle: product.title,
                    bookingDate,
                    bookingTime,
                    meetLink,
                  }),
                })

                console.log(`Successfully processed cart booking for ${bookingDate} @ ${bookingTime} to ${customerEmail}`)
              }
              console.log(`Warning: Session product purchased without explicit booking time via legacy cart logic for order ${order.id}`)
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
