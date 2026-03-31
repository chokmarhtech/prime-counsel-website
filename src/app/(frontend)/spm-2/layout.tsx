import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/frontend/spm/hooks/use-theme'
import { Navbar, FooterSection, BackToTop } from '@/components/frontend/spm/layout'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'SPM 2.0 - Strategic Positioning Masterclass | Luton 2026',
  description:
    'A full-day strategic masterclass designed to help ambitious professionals move from constant effort to intentional advantage. 25th April, 2026, Luton.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WFW6BLSB');
        `}
      </Script>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WFW6BLSB" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />
      <Navbar />
      {children}
      <FooterSection />
      <BackToTop />
    </ThemeProvider>
  )
}
