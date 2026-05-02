import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'programme', 'location', 'featured', 'createdAt'],
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location / Context',
      admin: {
        description: 'e.g. "United Kingdom", "Nigeria"',
      },
    },
    {
      name: 'programme',
      type: 'text',
      required: true,
      label: 'Programme / Service',
      admin: {
        description: 'e.g. "Vision Clarity Call", "One-to-One Mentorship"',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Testimonial Quote',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Testimonial',
      admin: {
        position: 'sidebar',
        description: 'Featured testimonials are highlighted with a different style.',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first. Use this to control display order.',
      },
    },
  ],
}
