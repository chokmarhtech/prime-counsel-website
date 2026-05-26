import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, event = 'SPM-3' } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // 1. Save to Payload CMS (Option 1)
    const payload = await getPayload({ config: configPromise })
    
    // Check if they already joined to prevent duplicates
    const existing = await payload.find({
      collection: 'waitlist',
      where: {
        and: [
          { email: { equals: email } },
          { event: { equals: event } }
        ]
      }
    })

    if (existing.totalDocs > 0) {
      return NextResponse.json({ message: 'Already on the waitlist!' }, { status: 200 })
    }

    await payload.create({
      collection: 'waitlist',
      data: {
        name,
        email,
        event,
      },
    })

    // 2. Add to Resend Audience (Option 2)
    // Only attempt if the environment variable is set
    const audienceId = process.env.RESEND_AUDIENCE_ID
    
    if (audienceId) {
      try {
        const [firstName, ...lastNames] = name.split(' ')
        const lastName = lastNames.join(' ') || undefined

        await resend.contacts.create({
          email: email,
          firstName: firstName,
          lastName: lastName,
          unsubscribed: false,
          audienceId: audienceId,
        })
        console.log(`✅ Added ${email} to Resend Audience ${audienceId}`)
      } catch (resendError) {
        console.error('⚠️ Failed to add to Resend Audience (Check API Key or Audience ID):', resendError)
        // We don't fail the whole request just because Resend failed, 
        // since we successfully saved it to Payload!
      }
    } else {
      console.log('ℹ️ Skipping Resend integration because RESEND_AUDIENCE_ID is not set.')
    }

    return NextResponse.json({ success: true, message: 'Joined waitlist successfully!' })
  } catch (error) {
    console.error('Waitlist API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
