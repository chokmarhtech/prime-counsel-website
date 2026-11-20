import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore Prime Counsel advisory, executive coaching, leadership development programmes, and organizational consulting services in the UK.',
  alternates: { canonical: '/services' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

