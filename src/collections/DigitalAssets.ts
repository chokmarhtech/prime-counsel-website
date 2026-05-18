import type { CollectionConfig } from 'payload'
import crypto from 'crypto'

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
  hooks: {
    beforeOperation: [
      ({ req, args, operation }) => {
        // Automatically rename uploaded digital files to a 64-character encrypted string
        // to prevent anyone from guessing the Cloudinary URL.
        if (operation === 'create' && req.file) {
          const file = req.file
          const ext = file.name.includes('.') ? file.name.substring(file.name.lastIndexOf('.')) : ''
          const randomName = crypto.randomBytes(32).toString('hex')
          file.name = `${randomName}${ext}`
        }
        return args
      },
    ],
  },
  upload: {
    // We use cloud storage because Vercel deletes local files.
    disableLocalStorage: true, 
    // Only allow specific file types like PDFs or zip files
    mimeTypes: ['application/pdf', 'application/zip', 'application/x-zip-compressed', 'application/rar'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alternative Text or Description',
    },
  ],
}
