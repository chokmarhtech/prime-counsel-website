import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Resend } from 'resend'
import { adminSessionEmailHtml, clientSessionEmailHtml, adminOrderEmailHtml, clientDownloadEmailHtml } from '@/lib/email-templates'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'primecounsel5@gmail.com'
const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL || 'info@primecounsel.co.uk'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Prime Counsel Limited <info@primecounsel.co.uk>'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  console.log('⚡ Webhook received! Processing...')
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('🛠️ Dev Mode: Bypassing signature verification')
      event = JSON.parse(body) as Stripe.Event
    } else {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    }
  } catch (err) {
    console.error('Webhook verification failed.', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Attempt to extract the customer's email
    const customerEmail = session.customer_details?.email || session.customer_email
    const customerName = session.customer_details?.name || 'Valued Customer'
    
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
            // Admin notification for Session
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

            // Client Session Email
            const calendlyLink = product.calendlyLink || 'https://calendly.com/primecounsel' // Fallback

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

            console.log(`Sent session confirmation for order ${order.id} to ${customerEmail}`)
          }
        } // End of loop
      } catch (err) {
        console.error('Error processing orders or sending emails:', err)
      }
    }
  }

  return NextResponse.json({ received: true })
}
