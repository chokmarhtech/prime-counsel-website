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

    // 1. Calculate Base Price
    const basePrice = ticketType === 'physical' ? 50 : 25
    let finalPrice = basePrice
    let appliedDiscountDoc: any = null

    // 2. Validate Discount Code if provided
    if (discountCode) {
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
          { error: 'This discount code has reached its maximum usage limit.' },
          { status: 400 },
        )
      }

      appliedDiscountDoc = doc
      const discountPercent = doc.discountPercent || 0
      const discountAmount = (basePrice * discountPercent) / 100
      finalPrice = Math.max(0, basePrice - discountAmount)
    }

    const isCompletelyFree = finalPrice === 0

    // 3. If completely free (100% off / sponsored):
    if (isCompletelyFree) {
      const registration = await payload.create({
        collection: 'spm-registrations',
        data: {
          name,
          email,
          ticketType,
          paymentType: 'sponsored',
          discountCode: appliedDiscountDoc?.code,
          status: 'paid', // Triggers ticket code, QR pass generation & emails
        },
      })

      // Increment used count on the discount code
      if (appliedDiscountDoc) {
        await payload.update({
          collection: 'discount-codes',
          id: appliedDiscountDoc.id,
          data: {
            usedCount: (appliedDiscountDoc.usedCount || 0) + 1,
          },
        })
      }

      return NextResponse.json({
        success: true,
        registrationId: registration.id,
        ticketCode: registration.ticketCode,
        isFree: true,
      })
    }

    // 4. Otherwise, create pending registration with calculated pricing
    const registration = await payload.create({
      collection: 'spm-registrations',
      data: {
        name,
        email,
        ticketType,
        paymentType,
        discountCode: appliedDiscountDoc?.code,
        status: 'pending',
      },
    })

    const siteUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_SERVER_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

    // 5. If Direct Bank Transfer, return success with exact final amount to pay
    if (paymentType === 'bank_transfer') {
      return NextResponse.json({
        success: true,
        registrationId: registration.id,
        ticketCode: registration.ticketCode,
        amountToPay: finalPrice,
      })
    }

    // 6. Stripe Checkout Session (charges exact discounted amount in cents)
    const ticketLabel = ticketType === 'physical' ? 'SPM 3.0 Physical Pass' : 'SPM 3.0 Virtual Pass'
    const discountNote = appliedDiscountDoc ? ` (${appliedDiscountDoc.discountPercent}% off applied)` : ''

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `${ticketLabel}${discountNote}`,
              description: `Strategic Positioning Masterclass 3.0 Registration Code: ${registration.ticketCode}`,
            },
            unit_amount: Math.round(finalPrice * 100), // Stripe takes amounts in pence
          },
          quantity: 1,
        },
      ],
      metadata: {
        registrationId: String(registration.id),
        type: 'spm_registration',
        discountCodeId: appliedDiscountDoc ? String(appliedDiscountDoc.id) : '',
        amountPaid: finalPrice.toFixed(2),
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
