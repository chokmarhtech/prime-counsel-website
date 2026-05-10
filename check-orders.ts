import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function checkOrders() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    const orders = await payload.find({
      collection: 'orders',
      limit: 10,
      sort: '-createdAt'
    })

    console.log(`Found ${orders.docs.length} orders in the database.`)
    
    orders.docs.forEach((doc, idx) => {
      console.log(`\n--- Order ${idx + 1} ---`)
      console.log(`ID:`, doc.id)
      console.log(`Customer:`, doc.customerEmail)
      console.log(`Stripe Session:`, doc.stripeSessionId)
      console.log(`Token:`, doc.downloadToken)
      console.log(`Product:`, typeof doc.product === 'object' ? doc.product?.title : doc.product)
    })
    
    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
}

checkOrders()
