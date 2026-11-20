import type { Metadata } from 'next'

import { Anton, Montserrat } from 'next/font/google'

import React from 'react'

import { Providers } from '@/components/frontend/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-heading' })
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="/icon.png" rel="icon" sizes="32x32" />
      </head>
      <body className={`${anton.variable} ${montserrat.variable} font-body antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    default: 'Prime Counsel',
    template: '%s | Prime Counsel',
  },
  description: 'Prime Counsel is a UK-registered leadership and personal development organisation committed to helping emerging leaders move from potential to structured impact.',
  metadataBase: new URL(getServerSideURL()),
  alternates: {
    canonical: '/',
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@primecounsel',
  },
  other: {
    'color-scheme': 'light',
  },
}


