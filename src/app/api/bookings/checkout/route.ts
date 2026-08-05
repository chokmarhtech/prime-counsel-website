import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export async function POST(req: Request) {
  try {
    const { productId, date, timeSlot } = await req.json()

    if (!productId || !date || !timeSlot) {
      return NextResponse.json({ error: 'Missing required booking fields' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    
    // Securely fetch the product's latest price
    const product = await payload.findByID({
      collection: 'products',
      id: productId,
      depth: 0,
    })

    if (!product || product.type !== 'session') {
      return NextResponse.json({ error: 'Invalid product or not a session' }, { status: 404 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL 
      || process.env.NEXT_PUBLIC_SERVER_URL 
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: product.currency.toLowerCase(),
            product_data: {
              name: `Mentorship Session: ${product.title}`,
              description: `Date: ${date} | Time: ${timeSlot}`,
            },
            unit_amount: Math.round(product.price * 100), // Convert to cents
          },
          quantity: 1,
        }
      ],
      metadata: {
        isBooking: 'true',
        productId: String(product.id),
        bookingDate: date,
        bookingTime: timeSlot,
      },
      success_url: `${siteUrl}/mentorship/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop/${product.slug}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Booking Checkout Error:', error)
    return NextResponse.json({ error: 'Something went wrong during checkout' }, { status: 500 })
  }
}
