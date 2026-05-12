import Layout from '@/components/frontend/layout/Layout'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/frontend/spm/sections/AnimatedSection'
import EventImageSlider from '@/components/frontend/pages/events/event-image-slider'
import EventVideoGallery from '@/components/frontend/pages/events/event-video-gallery'

import image1 from '@/assets/images/events/spm1/image-1.png'
import image2 from '@/assets/images/events/spm1/image-2.png'
import image3 from '@/assets/images/events/spm1/image-3.png'

const spm1Images = [
  { src: image1, alt: 'SPM 1.0 Highlights 1' },
  { src: image2, alt: 'SPM 1.0 Highlights 2' },
  { src: image3, alt: 'SPM 1.0 Highlights 3' },
]

const spm1Videos = [
  { url: 'https://vimeo.com/501958307', title: 'SPM 1.0 Recap' },
]

export default function SPM1Page() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 gradient-navy text-primary-foreground">
        <div className="container-narrow px-4">
          <p className="section-label text-primary-foreground/60 mb-4">SPM 1.0</p>
          <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground mb-4 leading-tight">
            STRATEGIC POSITIONING MASTERCLASS
          </h1>
          <div className="flex flex-wrap gap-6 mt-8 font-body text-sm text-primary-foreground/70">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              December 2025
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              Birmingham, United Kingdom
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary" />
              10:00 AM – 5:00 PM
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding-1 bg-background">
        <div className="container-narrow grid lg:grid-cols-3 gap-12">
          {/* Left: description + highlights */}
          <div className="lg:col-span-2 space-y-10 min-w-0 w-full overflow-hidden">
            <div>
              <h2 className="font-heading text-2xl text-navy mb-4">ABOUT THIS EVENT</h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                The inaugural Strategic Positioning Masterclass that launched a movement. SPM 1.0
                gathered emerging and established leaders from across the UK for a transformative
                day of frameworks, networks, and conviction-led leadership development.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-navy mb-6">Images From The Event</h2>
              <div className="my-8">
                <AnimatedSection delay={0.5}>
                  <EventImageSlider images={spm1Images} />
                </AnimatedSection>
              </div>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-navy mb-6">Videos From The Event</h2>
              <div className="my-8">
                <AnimatedSection delay={0.7}>
                  <EventVideoGallery videos={spm1Videos} />
                </AnimatedSection>
              </div>
            </div>
          </div>

          {/* Right: CTA card */}
          <div>
            <div className="rounded-2xl p-8 sticky top-28 bg-surface border border-border">
              <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest bg-muted text-muted-foreground rounded-full px-3 py-1 mb-4">
                Past Event
              </span>
              <h3 className="font-heading text-xl text-navy mb-3">Missed this one?</h3>
              <p className="font-body text-sm text-muted-foreground mb-6">
                Don&apos;t worry — the next edition is on the way. Join the waitlist and be first to
                know.
              </p>
              <Link href="/events/spm-2" className="btn-primary w-full text-center block">
                Learn About SPM 2 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Events */}
      <section className="py-16 bg-surface">
        <div className="container-narrow px-4">
          <h2 className="font-heading text-2xl text-navy mb-8">OTHER EVENTS</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Link
              href="/events/spm-2"
              className="group bg-background rounded-2xl border border-border p-6 hover:border-secondary/50 transition-all duration-300"
            >
              <span className="font-body text-xs font-semibold text-secondary uppercase tracking-widest">
                SPM 2.0
              </span>
              <h3 className="font-heading text-lg text-navy mt-2 mb-1">
                Strategic Positioning Masterclass 2.0
              </h3>
              <p className="font-body text-sm text-muted-foreground">25th April, 2026</p>
              <span className="inline-flex items-center gap-1 font-body text-sm text-secondary mt-4 group-hover:gap-2 transition-all">
                View Event <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              href="/events/spm-3"
              className="group bg-background rounded-2xl border border-border p-6 hover:border-secondary/50 transition-all duration-300"
            >
              <span className="font-body text-xs font-semibold text-secondary uppercase tracking-widest">
                SPM 3.0
              </span>
              <h3 className="font-heading text-lg text-navy mt-2 mb-1">
                Strategic Positioning Masterclass 3.0
              </h3>
              <p className="font-body text-sm text-muted-foreground">November 2026</p>
              <span className="inline-flex items-center gap-1 font-body text-sm text-secondary mt-4 group-hover:gap-2 transition-all">
                View Event <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
