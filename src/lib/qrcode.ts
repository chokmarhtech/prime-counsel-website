import QRCode from 'qrcode'

/**
 * Generate a QR code as a base64 Data URL (PNG).
 * Ideal for embedding directly into emails and <img> tags.
 */
export async function generateQrCodeDataUrl(
  text: string,
  options?: QRCode.QRCodeToDataURLOptions,
): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: options?.width || 280,
      margin: options?.margin || 2,
      color: {
        dark: options?.color?.dark || '#0B1C3D', // Prime Counsel Navy
        light: options?.color?.light || '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
      ...options,
    })
  } catch (err) {
    console.error('Error generating QR code Data URL:', err)
    throw err
  }
}

/**
 * Generate a QR code as an SVG string.
 * Ideal for scalable, crisp web rendering.
 */
export async function generateQrCodeSvg(
  text: string,
  options?: QRCode.QRCodeToStringOptions,
): Promise<string> {
  try {
    return await QRCode.toString(text, {
      type: 'svg',
      width: options?.width || 280,
      margin: options?.margin || 2,
      color: {
        dark: options?.color?.dark || '#0B1C3D',
        light: options?.color?.light || '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
      ...options,
    })
  } catch (err) {
    console.error('Error generating QR code SVG:', err)
    throw err
  }
}
