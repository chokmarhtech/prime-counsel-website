import type { CollectionConfig } from 'payload'

export const DiscountCodes: CollectionConfig = {
  slug: 'discount-codes',
  admin: {
    useAsTitle: 'code',
    group: 'Events',
    description: 'Manages promo and sponsored discount codes for events.',
    defaultColumns: ['code', 'discountPercent', 'maxUses', 'usedCount', 'isActive', 'updatedAt'],
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: () => true, // Public can check validity via API
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'The code attendees enter.',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => (typeof value === 'string' ? value.trim().toUpperCase() : value),
        ],
      },
    },
    {
      name: 'discountPercent',
      type: 'number',
      required: true,
      defaultValue: 100,
      min: 1,
      max: 100,
      admin: {
        description: 'Percentage discount (e.g. 100 for completely free/sponsored tickets).',
      },
    },
    {
      name: 'maxUses',
      type: 'number',
      required: true,
      defaultValue: 10,
      min: 1,
      admin: {
        description: 'Maximum number of times this code can be redeemed.',
      },
    },
    {
      name: 'usedCount',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: {
        description: 'Number of times this code has been used. You can edit or reset this back to 0 anytime in Admin.',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Toggle off to instantly disable this code without deleting it.',
      },
    },
    {
      name: 'note',
      type: 'text',
      admin: {
        description: 'Internal reference or notes on who this code is intended for.',
      },
    },
  ],
}
