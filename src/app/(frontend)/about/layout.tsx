import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Prime Counsel, our mission, vision, and our commitment to developing high-impact ethical leaders across the UK and globally.',
  alternates: { canonical: '/about' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

