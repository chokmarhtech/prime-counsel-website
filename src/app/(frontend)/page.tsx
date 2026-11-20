import React from 'react'
import {
  HeroSection,
  InstitutionalIdentity,
  PillarSection,
  // PhilosophyPreview,
  ServicesOverview,
  AskPrimeSection,
  HomeBlogPreview,
  TrustedOrganisations,
  MeetCoach,
  Testimonials,
  Statistics,
} from '@/components/frontend/pages/home'
import Layout from '@/components/frontend/layout/Layout'
import { OrganizationJsonLd } from '@/components/frontend/seo/JsonLd'

export const metadata = {
  title: 'Prime Counsel | Raising Leaders, Redifining Futures',
  description:
    'Prime Counsel is a UK-registered leadership and personal development organisation committed to helping emerging leaders move from potential to structured impact.',
}

export const revalidate = 600

export default function Page() {

  return (
    <Layout>
      <OrganizationJsonLd />
      <HeroSection />
      <InstitutionalIdentity />
      <PillarSection />
      {/* <PhilosophyPreview /> */}
      <ServicesOverview />  
      <AskPrimeSection />
      <TrustedOrganisations />
      <Statistics />
      <MeetCoach />
      <Testimonials />
      <HomeBlogPreview />
    </Layout>
  )
}

