import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function checkMedia() {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'media',
      limit: 1,
    })
    
    if (docs.length === 0) {
      console.log('No media found.')
      return
    }
    
    console.log('Media entry:', JSON.stringify(docs[0], null, 2))
  } catch (error) {
    console.error('Error fetching media:', error)
  }
}

checkMedia()
