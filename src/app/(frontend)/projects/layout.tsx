import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects at Prime Counsel',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
