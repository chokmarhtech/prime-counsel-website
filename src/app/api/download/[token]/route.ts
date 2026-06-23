import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

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

    // 4. Generate the Cloudinary private download URL (bypasses ACL restrictions)
    if (!digitalFile.filename) {
      console.error('Digital file URL is missing')
      return new NextResponse('File URL missing on server.', { status: 500 })
    }

    const { v2: cloudinary } = await import('cloudinary')

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    })

    const isZip = digitalFile.filename.endsWith('.zip') || digitalFile.filename.endsWith('.rar')
    const resourceType = isZip ? 'raw' : 'image'
    
    // Extract publicId (filename without extension) and format
    const lastDot = digitalFile.filename.lastIndexOf('.')
    const publicId = lastDot !== -1 ? digitalFile.filename.substring(0, lastDot) : digitalFile.filename
    const format = lastDot !== -1 ? digitalFile.filename.substring(lastDot + 1) : ''

    const privateUrl = cloudinary.utils.private_download_url(publicId, format, {
      resource_type: resourceType,
      type: 'upload',
      attachment: true
    })

    const fileResponse = await fetch(privateUrl)
    
    if (!fileResponse.ok) {
      console.error(`Failed to fetch secure file from Cloudinary (Status: ${fileResponse.status})`)
      return new NextResponse('Error retrieving the file from secure storage.', { status: 500 })
    }

    // Read as arrayBuffer
    const fileBuffer = await fileResponse.arrayBuffer()

    // 5. Mark the token as used so it can NEVER be used again
    await payload.update({
      collection: 'orders',
      id: order.id,
      data: {
        isDownloaded: true,
        downloadedAt: new Date().toISOString(),
      },
    })

    console.log(`Fulfilled digital download for order ${order.id} (Token: ${token})`)

    // Determine a professional filename for the download instead of the encrypted string
    let downloadFilename = digitalFile.filename
    if (product && product.title) {
      // e.g. "Prime Counsel Personal Development Guide" -> "prime_counsel_personal_development_guide"
      const cleanTitle = product.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
      downloadFilename = `${cleanTitle}.${format}`
    }

    // 6. Send the file to the user's browser as a direct download
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': digitalFile.mimeType || 'application/pdf',
        'Content-Disposition': `attachment; filename="${downloadFilename}"`,
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
