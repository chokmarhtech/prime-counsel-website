import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Process',
  description: 'Our Process at Prime Counsel',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
