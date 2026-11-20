import React from 'react'

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Prime Counsel',
    legalName: 'Prime Counsel Limited',
    url: 'https://primecounsel.co.uk',
    logo: 'https://primecounsel.co.uk/icon.png',
    description:
      'Prime Counsel is a UK-registered leadership, executive coaching, and personal development institution committed to raising visionary, ethically grounded, and high-impact leaders.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
    founder: {
      '@type': 'Person',
      name: 'Ayoola Orimoloye',
      jobTitle: 'Licensed Personal Development Coach & Leadership Strategist',
      sameAs: [
        'https://instagram.com/primecounsel_',
        'https://youtube.com/@primecounsel',
      ],
    },
    sameAs: [
      'https://instagram.com/primecounsel_',
      'https://youtube.com/@primecounsel',
      'https://www.tiktok.com/@primecounsel_',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@primecounsel.co.uk',
      telephone: '+44 777 448 3791',
      contactType: 'customer service',
      areaServed: ['GB', 'NG', 'US'],
      availableLanguage: ['English'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function SPM3EventJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: 'Strategic Positioning Masterclass 3.0 (SPM 3.0 Birmingham)',
    description:
      'Beyond Survival: Secret System to Thriving in the UK. A transformational one-day masterclass designed to help ambitious professionals move beyond hard work to value, visibility, and leverage.',
    startDate: '2026-11-21T10:00:00+00:00',
    endDate: '2026-11-21T16:00:00+00:00',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: [
      {
        '@type': 'Place',
        name: 'Conference Centre, Aston University',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Aston Express Way',
          addressLocality: 'Birmingham',
          postalCode: 'B4 7ET',
          addressCountry: 'GB',
        },
      },
      {
        '@type': 'VirtualLocation',
        url: 'https://primecounsel.co.uk/spm-3',
      },
    ],
    image: ['https://primecounsel.co.uk/website-template-OG.webp'],
    organizer: {
      '@type': 'Organization',
      name: 'Prime Counsel Limited',
      url: 'https://primecounsel.co.uk',
    },
    performer: {
      '@type': 'Person',
      name: 'Ayoola Orimoloye',
      jobTitle: 'Coach & Leadership Strategist',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Physical Ticket (In-Person)',
        price: '50.00',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        url: 'https://primecounsel.co.uk/spm-3',
        validFrom: '2026-01-01T00:00:00Z',
      },
      {
        '@type': 'Offer',
        name: 'Virtual Ticket (Livestream + Replay)',
        price: '25.00',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        url: 'https://primecounsel.co.uk/spm-3',
        validFrom: '2026-01-01T00:00:00Z',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
