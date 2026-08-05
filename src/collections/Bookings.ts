import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'clientEmail', 'date', 'timeSlot', 'paymentStatus'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // We create via Stripe Webhook
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
    },
    {
      name: 'clientEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: {
        description: 'Format: YYYY-MM-DD',
      },
    },
    {
      name: 'timeSlot',
      type: 'text',
      required: true,
      admin: {
        description: 'E.g., 09:00, 10:00, 14:00',
      },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: ['pending', 'paid', 'refunded'],
      defaultValue: 'pending',
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
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
    },
  ],
}
