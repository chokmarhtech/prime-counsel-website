import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/frontend/spm/hooks/use-theme'
import { Navbar, FooterSection, BackToTop } from '@/components/frontend/spm/layout'

export const metadata: Metadata = {
  title: 'SPM 2.0 - Strategic Positioning Masterclass | Luton 2026',
  description:
    'A full-day strategic masterclass designed to help ambitious professionals move from constant effort to intentional advantage. 25 April 2026, Luton.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Navbar />
      {children}
      <FooterSection />
      <BackToTop />
    </ThemeProvider>
  )
}
