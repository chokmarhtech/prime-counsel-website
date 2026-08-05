import { NextResponse } from 'next/server'
import { spmConfirmationEmailHtml, spmAdminNotificationEmailHtml } from '@/lib/email-templates'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const type = url.searchParams.get('type')

  if (type === 'client') {
    const html = spmConfirmationEmailHtml({
      name: 'Godspower Similoluwa',
      ticketType: 'physical',
      ticketCode: 'SPM3-PHY-M67',
    })
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  }

  if (type === 'admin') {
    const html = spmAdminNotificationEmailHtml({
      name: 'Godspower Similoluwa',
      email: 'gpsimi01@gmail.com',
      ticketType: 'physical',
      ticketCode: 'SPM3-PHY-M67',
      amount: '50.00',
      stripeId: 'cs_test_b1Zf1zWr2026',
    })
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  }

  return NextResponse.json(
    { error: 'Invalid type parameter. Use ?type=client or ?type=admin' },
    { status: 400 }
  )
}
