import type { CollectionConfig } from 'payload'
import crypto from 'crypto'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id',
    group: 'Shop',
    description: 'Tracks customer purchases and manages single-use download tokens.',
    defaultColumns: ['id', 'product', 'customerEmail', 'isDownloaded', 'createdAt'],
  },
  access: {
    // Only authenticated users (admins) can read/manage orders from the dashboard
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Automatically generate a secure 32-character token on creation if one doesn't exist
        if (operation === 'create' && !data.downloadToken) {
          data.downloadToken = crypto.randomBytes(32).toString('hex')
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'stripeSessionId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'downloadToken',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        description: 'The secure token used for the download link. Generated automatically.',
      },
    },
    {
      name: 'isDownloaded',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether the customer has used their single-use download link yet.',
      },
    },
    {
      name: 'downloadedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
}
