import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Prime Counsel for executive leadership coaching, advisory engagements, and event inquiries in the UK.',
  alternates: { canonical: '/contact' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

