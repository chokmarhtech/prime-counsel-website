import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  HeroSection,
  RealitySection,
  HighlightsSection,
  WhySPMSection,
  DeliverablesSection,
  WhoIsThisForSection,
  EventDetailsSection,
  CoachSection,
  FAQSection,
  ContactSection,
} from '@/components/frontend/spm3/sections'
import { RegistrationSuccessOverlay } from '@/components/frontend/spm3/components/RegistrationSuccessOverlay'

export const metadata: Metadata = {
  title: 'Strategic Positioning Masterclass 3.0 | Prime Counsel',
  description:
    'Beyond Survival: Secret System to Thriving in the UK. A transformational one-day masterclass designed to help ambitious professionals move beyond hard work.',
}

export default async function SPM3({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; registrationId?: string }>
}) {
  const params = await searchParams
  const success = params.success === 'true'
  const registrationId = params.registrationId

  let registrationData = null

  if (success && registrationId) {
    try {
      const payload = await getPayload({ config: configPromise })
      const reg = await payload.findByID({
        collection: 'spm-registrations',
        id: registrationId,
        depth: 0,
      })
      if (reg) {
        registrationData = {
          name: reg.name,
          ticketCode: reg.ticketCode || '',
          ticketType: reg.ticketType as 'physical' | 'virtual',
        }
      }
    } catch (err) {
      console.error('[SPM] Failed to fetch registration data for success overlay:', err)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="dark text-foreground bg-background">
        <HeroSection />
      </div>
      <div className="light text-foreground bg-background">
        <RealitySection />
        <HighlightsSection />
        <WhySPMSection />
        <DeliverablesSection />
        <WhoIsThisForSection />
        <EventDetailsSection />
        <CoachSection />
        <FAQSection />
        <ContactSection />
      </div>
      {/* Success Modal Overlay */}
      <RegistrationSuccessOverlay registration={registrationData} />
    </main>
  )
}
