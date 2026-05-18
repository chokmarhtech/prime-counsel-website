import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { config } from 'dotenv'

config()

async function run() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    const assets = await payload.find({
      collection: 'digital-assets',
      limit: 10,
    })
    
    console.log("Digital Assets:", JSON.stringify(assets.docs, null, 2));
  } catch (e) {
    console.error("Error:", e);
  }
}

run();
