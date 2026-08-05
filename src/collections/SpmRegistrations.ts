import type { CollectionConfig } from 'payload'
import { Resend } from 'resend'

export const SpmRegistrations: CollectionConfig = {
  slug: 'spm-registrations',
  admin: {
    useAsTitle: 'name',
    group: 'Events',
    description: 'Manages registrations and ticket allocations for SPM 3.0.',
    defaultColumns: ['name', 'email', 'ticketType', 'ticketCode', 'status', 'createdAt'],
  },
  access: {
    create: () => true, // Public registration endpoint
    read: ({ req: { user } }) => Boolean(user), // Authenticated admins only
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeValidate: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && data) {
          let isUnique = false
          let ticketCode = ''
          const prefix = data.ticketType === 'physical' ? 'SPM3-PHY-' : 'SPM3-VIR-'

          let attempts = 0
          // Generate a unique ticket code matching SPM3-PHY-[A-Z][0-9]{2} format
          while (!isUnique && attempts < 100) {
            attempts++
            const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)) // A-Z
            const num = Math.floor(10 + Math.random() * 90) // 10-99
            ticketCode = `${prefix}${letter}${num}`

            // Check db uniqueness
            const existing = await req.payload.find({
              collection: 'spm-registrations',
              where: {
                ticketCode: { equals: ticketCode },
              },
              limit: 1,
              req, // Pass req to maintain transaction atomicity and avoid deadlocks
            })

            if (existing.docs.length === 0) {
              isUnique = true
            }
          }

          if (!isUnique) {
            throw new Error('Failed to generate a unique ticket code after multiple attempts.')
          }

          data.ticketCode = ticketCode
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        // Detect transitions to PAID
        const isPaidNow = doc.status === 'paid' && (!previousDoc || previousDoc.status !== 'paid')

        if (isPaidNow && !doc.emailsSent?.includes('confirmation')) {
          try {
            const resendApiKey = process.env.RESEND_API_KEY
            if (!resendApiKey) {
              throw new Error('RESEND_API_KEY is not defined in environments.')
            }

            const resend = new Resend(resendApiKey)
            const { spmConfirmationEmailHtml } = await import('@/lib/email-templates')

            const htmlContent = spmConfirmationEmailHtml({
              name: doc.name,
              ticketType: doc.ticketType,
              ticketCode: doc.ticketCode,
            })

            await resend.emails.send({
              from: 'Prime Counsel <info@primecounsel.co.uk>',
              to: doc.email,
              subject: `Your SPM 3.0 Ticket is Confirmed! 🎉 [Code: ${doc.ticketCode}]`,
              html: htmlContent,
            })

            // Track that this confirmation has been sent successfully
            const currentSent = doc.emailsSent || []
            await req.payload.update({
              collection: 'spm-registrations',
              id: doc.id,
              data: {
                emailsSent: [...currentSent, 'confirmation'],
              },
              req, // Keep transaction atomic and follow transaction rules
            })

            console.log(`[SPM] Confirmation email successfully sent to ${doc.email} (Code: ${doc.ticketCode})`)
          } catch (err) {
            console.error('[SPM] Failed to send registration confirmation email:', err)
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'ticketType',
      type: 'select',
      options: [
        { label: 'Physical (£50)', value: 'physical' },
        { label: 'Virtual (£25)', value: 'virtual' },
      ],
      required: true,
    },
    {
      name: 'ticketCode',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'paymentType',
      type: 'select',
      options: [
        { label: 'Stripe', value: 'stripe' },
        { label: 'Bank Transfer', value: 'bank_transfer' },
      ],
      defaultValue: 'stripe',
      required: true,
    },
    {
      name: 'stripeSessionId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'emailsSent',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Confirmation Email', value: 'confirmation' },
        { label: '5 Days Reminder', value: '5_days' },
        { label: '3 Days Reminder', value: '3_days' },
        { label: '1 Day Reminder', value: '1_day' },
        { label: 'D-Day Reminder', value: 'd_day' },
      ],
      defaultValue: [],
      admin: {
        readOnly: true,
      },
    },
  ],
}
