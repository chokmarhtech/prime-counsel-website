import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export async function POST(req: Request) {
  try {
    const { name, email, ticketType, paymentType, discountCode } = await req.json()

    if (!name || !email || !ticketType || !paymentType) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // Check if a sponsored/100% discount code is being used
    let appliedDiscount: any = null
    if (paymentType === 'sponsored' || discountCode) {
      if (!discountCode) {
        return NextResponse.json({ error: 'Discount code is required.' }, { status: 400 })
      }

      const cleanCode = String(discountCode).trim().toUpperCase()
      const discountResult = await payload.find({
        collection: 'discount-codes',
        where: {
          code: { equals: cleanCode },
        },
        limit: 1,
      })

      if (discountResult.docs.length === 0) {
        return NextResponse.json(
          { error: 'Invalid discount code.' },
          { status: 400 },
        )
      }

      const doc = discountResult.docs[0]
      if (!doc.isActive) {
        return NextResponse.json(
          { error: 'This discount code is currently inactive.' },
          { status: 400 },
        )
      }

      const usedCount = doc.usedCount || 0
      const maxUses = doc.maxUses || 0
      if (usedCount >= maxUses) {
        return NextResponse.json(
          { error: 'This sponsored ticket code has reached its maximum allocation limit.' },
          { status: 400 },
        )
      }

      appliedDiscount = doc
    }

    // 1. If sponsored / 100% free, create directly with status: 'paid'
    if (paymentType === 'sponsored' && appliedDiscount) {
      const registration = await payload.create({
        collection: 'spm-registrations',
        data: {
          name,
          email,
          ticketType,
          paymentType: 'sponsored',
          discountCode: appliedDiscount.code,
          status: 'paid', // Automatically triggers afterChange hook for QR code & confirmation email!
        },
      })

      // Increment used count on the discount code
      await payload.update({
        collection: 'discount-codes',
        id: appliedDiscount.id,
        data: {
          usedCount: (appliedDiscount.usedCount || 0) + 1,
        },
      })

      return NextResponse.json({
        success: true,
        registrationId: registration.id,
        ticketCode: registration.ticketCode,
        isFree: true,
      })
    }

    // 2. Otherwise create a pending registration
    const registration = await payload.create({
      collection: 'spm-registrations',
      data: {
        name,
        email,
        ticketType,
        paymentType,
        discountCode: appliedDiscount ? appliedDiscount.code : undefined,
        status: 'pending',
      },
    })

    const siteUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_SERVER_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

    // 3. If bank transfer, return immediately with success
    if (paymentType === 'bank_transfer') {
      return NextResponse.json({
        success: true,
        registrationId: registration.id,
        ticketCode: registration.ticketCode,
      })
    }

    // 4. Otherwise, create a Stripe Checkout Session
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
  } catch (error: any) {
    console.error('[SPM] Checkout error:', error)
    return NextResponse.json(
      { error: error?.message || 'An error occurred during registration. Please try again.' },
      { status: 500 },
    )
  }
}
