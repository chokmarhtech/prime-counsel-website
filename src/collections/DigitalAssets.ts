import type { CollectionConfig } from 'payload'

export const DigitalAssets: CollectionConfig = {
  slug: 'digital-assets',
  admin: {
    useAsTitle: 'filename',
    group: 'Shop',
    description: 'Private digital files attached to products. These files are securely stored and only accessible via unique, single-use download links.',
  },
  access: {
    // Only authenticated users (admins) can read/upload these assets directly through the API
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    // We intentionally do NOT use cloud storage for this. We want it local and secure.
    // Ensure this folder exists or Payload will create it
    staticDir: '../private-assets',
    // Disable automatic public URL generation
    disableLocalStorage: false, 
    // Only allow specific file types like PDFs or zip files
    mimeTypes: ['application/pdf', 'application/zip', 'application/x-zip-compressed'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alternative Text or Description',
    },
  ],
}
