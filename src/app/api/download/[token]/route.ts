import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import path from 'path'
import fs from 'fs'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params

    if (!token) {
      return new NextResponse('Invalid token', { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // 1. Find the order with this exact token
    const ordersResult = await payload.find({
      collection: 'orders',
      where: {
        downloadToken: { equals: token },
      },
      limit: 1,
      depth: 2, // Populate product and digitalFile
    })

    const order = ordersResult.docs[0]

    if (!order) {
      return new NextResponse('Invalid or expired download link.', { status: 404 })
    }

    // 2. Check if the link has already been used
    if (order.isDownloaded) {
      return new NextResponse(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h2>This link has already been used.</h2>
            <p>For security purposes, download links can only be used once.</p>
            <p>If your download failed, please contact support.</p>
          </body>
        </html>
      `, { status: 403, headers: { 'Content-Type': 'text/html' } })
    }

    // 3. Get the digital file details
    const product = typeof order.product === 'object' ? order.product : null
    const digitalFile = product && typeof product.digitalFile === 'object' ? product.digitalFile : null

    if (!digitalFile || !digitalFile.filename) {
      return new NextResponse('Digital file not found for this product.', { status: 404 })
    }

    // 4. Construct the absolute path to the secure file
    // Note: This relies on the staticDir configured in DigitalAssets ('../private-assets')
    // We resolve relative to the payload root directory.
    const filePath = path.resolve(process.cwd(), 'private-assets', digitalFile.filename)

    if (!fs.existsSync(filePath)) {
      console.error(`Secure file not found at path: ${filePath}`)
      return new NextResponse('File missing on server.', { status: 500 })
    }

    // 5. Read the file
    const fileBuffer = fs.readFileSync(filePath)

    // 6. Mark the token as used so it can NEVER be used again
    await payload.update({
      collection: 'orders',
      id: order.id,
      data: {
        isDownloaded: true,
        downloadedAt: new Date().toISOString(),
      },
    })

    console.log(`Fulfilled digital download for order ${order.id} (Token: ${token})`)

    // 7. Send the file to the user's browser as a direct download
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': digitalFile.mimeType || 'application/pdf',
        'Content-Disposition': `attachment; filename="${digitalFile.filename}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return new NextResponse('An error occurred processing your download.', { status: 500 })
  }
}
