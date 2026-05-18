import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const payload = await getPayload({ config: configPromise })
  
  const orders = await payload.find({
    collection: 'orders',
    depth: 2,
    limit: 5,
    sort: '-createdAt'
  })

  const results = orders.docs.map(o => {
    let digitalFileResult = null;
    if (o.product && typeof o.product === 'object' && o.product.digitalFile) {
        const df = o.product.digitalFile as any;
        digitalFileResult = {
            filename: df.filename,
            url: df.url,
            id: df.id,
            mimeType: df.mimeType,
            absolutePath: path.resolve(process.cwd(), 'private-assets', df.filename),
            fileExists: fs.existsSync(path.resolve(process.cwd(), 'private-assets', df.filename))
        }
    }
    return {
        orderId: o.id,
        token: o.downloadToken,
        product: typeof o.product === 'object' ? o.product?.title : o.product,
        digitalFile: digitalFileResult
    }
  })

  return NextResponse.json({ cwd: process.cwd(), results })
}
