import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function checkMediaUrls() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    const media = await payload.find({
      collection: 'media',
      limit: 5,
      sort: '-createdAt'
    })

    console.log(`Found ${media.docs.length} recent media items.`)
    
    media.docs.forEach((doc, idx) => {
      console.log(`\n--- Item ${idx + 1} ---`)
      console.log(`Filename:`, doc.filename)
      console.log(`Prefix (Folder):`, doc.prefix)
      console.log(`Generated URL:`, doc.url)
    })
    
    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
}

checkMediaUrls()
