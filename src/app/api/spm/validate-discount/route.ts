import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: Request) {
  try {
    const { code } = await req.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Please enter a discount code.' }, { status: 400 })
    }

    const cleanCode = code.trim().toUpperCase()
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'discount-codes',
      where: {
        code: { equals: cleanCode },
      },
      limit: 1,
    })

    if (result.docs.length === 0) {
      return NextResponse.json(
        { error: 'Invalid discount code. Please check and try again.' },
        { status: 404 },
      )
    }

    const discountDoc = result.docs[0]

    if (!discountDoc.isActive) {
      return NextResponse.json(
        { error: 'This discount code is currently inactive.' },
        { status: 400 },
      )
    }

    const usedCount = discountDoc.usedCount || 0
    const maxUses = discountDoc.maxUses || 0

    if (usedCount >= maxUses) {
      return NextResponse.json(
        { error: 'This sponsored ticket code has reached its maximum allocation limit.' },
        { status: 400 },
      )
    }

    return NextResponse.json({
      valid: true,
      code: discountDoc.code,
      discountPercent: discountDoc.discountPercent,
      isFree: discountDoc.discountPercent === 100,
      remaining: Math.max(0, maxUses - usedCount),
    })
  } catch (error: any) {
    console.error('[SPM] Error validating discount code:', error)
    return NextResponse.json(
      { error: 'Failed to validate discount code. Please try again.' },
      { status: 500 },
    )
  }
}
