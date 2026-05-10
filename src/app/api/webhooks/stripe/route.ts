import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { Resend } from "resend"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed.", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const productId = session.metadata?.productId
    const productType = session.metadata?.productType
    
    // Attempt to extract the customer's email
    const customerEmail = session.customer_details?.email || session.customer_email
    const customerName = session.customer_details?.name || 'Valued Customer'

    console.log(`Payment confirmed for: ${session.metadata?.productSlug} by ${customerEmail}`)

    if (productId && customerEmail) {
      const parsedProductId = Number(productId)
      
      try {
        const payload = await getPayload({ config: configPromise })
        
        // 1. Create the Order in Payload to generate the token
        const order = await payload.create({
          collection: 'orders',
          data: {
            stripeSessionId: session.id,
            product: parsedProductId,
            customerEmail: customerEmail,
            isDownloaded: false,
          },
        })

        // 2. If it's a digital product or book with a digital file, send the email
        if (productType === 'digital' || productType === 'book') {
          const product = await payload.findByID({
            collection: 'products',
            id: parsedProductId,
            depth: 0,
          })

          // Check if there is actually a digital file attached
          if (product.digitalFile) {
            const siteUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://primecounsel.co.uk'
            const downloadUrl = `${siteUrl}/api/download/${order.downloadToken}`

            await resend.emails.send({
              from: 'Prime Counsel Limited <info@primecounsel.co.uk>',
              to: customerEmail,
              subject: `Your Secure Download: ${product.title}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #001f3f;">
                  <h1 style="color: #001f3f; text-transform: uppercase;">Thank you for your purchase!</h1>
                  <p>Hi ${customerName},</p>
                  <p>Your payment for <strong>${product.title}</strong> has been successfully processed.</p>
                  
                  <div style="background-color: #f4f4f4; padding: 20px; border-left: 4px solid #d4af37; margin: 20px 0;">
                    <p style="margin-top: 0; font-weight: bold; font-size: 14px; text-transform: uppercase; color: #d4af37;">Secure Single-Use Link</p>
                    <p style="font-size: 14px; color: #666; margin-bottom: 20px;">
                      Please note: The button below contains a single-use secure link. Once you download the file, the link will expire immediately. Do not share this link.
                    </p>
                    <a href="${downloadUrl}" style="display: inline-block; background-color: #d4af37; color: #001f3f; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 4px; text-transform: uppercase; font-size: 14px;">
                      Download Your File Now
                    </a>
                  </div>
                  
                  <p>If you experience any issues, please reply to this email for support.</p>
                  <p>Best regards,<br>The Prime Counsel Team</p>
                </div>
              `
            })
            
            console.log(`Sent secure download link for order ${order.id} to ${customerEmail}`)
          }
        }
      } catch (err) {
        console.error('Error creating order or sending email:', err)
        // Note: Do not return 500 so Stripe doesn't infinitely retry unless necessary
      }
    }
  }

  return NextResponse.json({ received: true })
}