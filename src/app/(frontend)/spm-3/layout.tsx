import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/frontend/spm/hooks/use-theme'

export const metadata: Metadata = {
  title: 'SPM 3.0 - Strategic Positioning Masterclass | Aston University 2026',
  description:
    'A transformational one-day masterclass designed to help ambitious professionals and leaders move beyond hard work and become strategically positioned. 28th November, 2026, Birmingham.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
