import type { CollectionConfig } from 'payload'

export const Waitlist: CollectionConfig = {
  slug: 'waitlist',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'event', 'createdAt'],
    // components: {
    //   beforeList: ['/components/admin/ExportWaitlistButton#ExportWaitlistButton'],
    // },
  },
  access: {
    // Anyone can join the waitlist (public)
    create: () => true,
    // Only admins can view the waitlist
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  endpoints: [
    {
      path: '/export',
      method: 'get',
      handler: async (req) => {
        // 1. Ensure the user is an authenticated admin
        if (!req.user) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 2. Fetch all waitlist entries
        const { docs } = await req.payload.find({
          collection: 'waitlist',
          limit: 10000, // Safe limit for typical waitlists
          sort: '-createdAt', // Newest first
        })

        // 3. Convert JSON to CSV format
        const csvRows = ['Name,Email,Event,Date Joined']
        docs.forEach((doc) => {
          const dateStr = new Date(doc.createdAt).toLocaleDateString()
          // Wrap strings in quotes to prevent issues with commas in names
          csvRows.push(`"${doc.name}","${doc.email}","${doc.event}","${dateStr}"`)
        })

        // 4. Return as a downloadable CSV file
        return new Response(csvRows.join('\n'), {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="prime-counsel-waitlist.csv"',
          },
        })
      },
    },
  ],
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
      name: 'event',
      type: 'text',
      required: true,
      defaultValue: 'SPM-3',
    },
  ],
}
