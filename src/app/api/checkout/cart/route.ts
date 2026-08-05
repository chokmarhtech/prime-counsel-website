import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export async function POST(req: Request) {
  try {
    const { items } = await req.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const line_items: any[] = []
    let primarySessionId = ''

    // Securely fetch each product's latest price from the database
    for (const item of items) {
      const product = await payload.findByID({
        collection: 'products',
        id: item.id,
        depth: 0,
      })

      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 404 })
      }

      if (product.type === 'session' && !primarySessionId) {
        primarySessionId = String(product.id)
      }

      let description = product.shortDescription || undefined
      if (item.bookingDate && item.bookingTime) {
        description = `Date: ${item.bookingDate} | Time: ${item.bookingTime} (GMT)`
      }

      line_items.push({
        price_data: {
          currency: product.currency.toLowerCase(),
          product_data: {
            name: product.title,
            description,
          },
          unit_amount: Math.round(product.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })
    }

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL 
      || process.env.NEXT_PUBLIC_SERVER_URL 
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

    // Extract all bookings into an array
    const bookingsData = items
      .filter((i: Record<string, unknown>) => i.bookingDate && i.bookingTime)
      .map((i: Record<string, unknown>) => ({
        productId: i.id,
        date: i.bookingDate,
        timeSlot: i.bookingTime
      }))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      metadata: {
        isCart: 'true',
        hasBookings: bookingsData.length > 0 ? 'true' : 'false',
        bookingsData: bookingsData.length > 0 ? JSON.stringify(bookingsData) : '',
        productIds: JSON.stringify(items.map((i: Record<string, unknown>) => i.id)),
        productId: primarySessionId,
        productType: primarySessionId ? 'session' : 'cart',
        primarySessionId,
        productSlug: items.length === 1 ? items[0].slug : 'cart-checkout',
      },
      success_url: `${siteUrl}/mentorship/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Cart Checkout Error:', error)
    return NextResponse.json({ error: 'Something went wrong during checkout' }, { status: 500 })
  }
}
