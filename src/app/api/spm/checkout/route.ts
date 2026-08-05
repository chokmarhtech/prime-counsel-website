import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export async function POST(req: Request) {
  try {
    const { name, email, ticketType, paymentType } = await req.json()

    if (!name || !email || !ticketType || !paymentType) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // 1. Create a pending registration in the database
    // This triggers the beforeValidate hook to generate the unique ticket code.
    const registration = await payload.create({
      collection: 'spm-registrations',
      data: {
        name,
        email,
        ticketType,
        paymentType,
        status: 'pending',
      },
    })

    const siteUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_SERVER_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

    // 2. If it is a bank transfer, return immediately with success
    if (paymentType === 'bank_transfer') {
      return NextResponse.json({
        success: true,
        registrationId: registration.id,
        ticketCode: registration.ticketCode,
      })
    }

    // 3. Otherwise, create a Stripe Checkout Session
    const ticketPrice = ticketType === 'physical' ? 50 : 25
    const ticketLabel = ticketType === 'physical' ? 'SPM 3.0 Physical Pass' : 'SPM 3.0 Virtual Pass'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: ticketLabel,
              description: `Strategic Positioning Masterclass 3.0 Registration Code: ${registration.ticketCode}`,
            },
            unit_amount: ticketPrice * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        registrationId: String(registration.id),
        type: 'spm_registration',
      },
      success_url: `${siteUrl}/spm-3?success=true&registrationId=${registration.id}`,
      cancel_url: `${siteUrl}/spm-3`,
    })

    return NextResponse.json({ stripeUrl: session.url })
  } catch (error) {
    console.error('[SPM] Checkout error:', error)
    return NextResponse.json(
      { error: 'An error occurred during registration. Please try again.' },
      { status: 500 },
    )
  }
}
