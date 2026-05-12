import Layout from '@/components/frontend/layout/Layout'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/frontend/spm/sections/AnimatedSection'
import EventImageSlider from '@/components/frontend/pages/events/event-image-slider'
import EventVideoGallery from '@/components/frontend/pages/events/event-video-gallery'

import spm2a from '@/assets/images/events/spm2/spm-2-a.png'
import spm2b from '@/assets/images/events/spm2/spm-2-b.jpeg'
import spm2c from '@/assets/images/events/spm2/spm-2-c.png'
import spm2d from '@/assets/images/events/spm2/spm-2-d.jpeg'
import spm2e from '@/assets/images/events/spm2/spm-2-e.png'
import spm2f from '@/assets/images/events/spm2/spm-2-f.jpeg'

const spm2Images = [
  { src: spm2a, alt: 'SPM 2.0 Highlights 1' },
  { src: spm2b, alt: 'SPM 2.0 Highlights 2' },
  { src: spm2c, alt: 'SPM 2.0 Highlights 3' },
  { src: spm2d, alt: 'SPM 2.0 Highlights 4' },
  { src: spm2e, alt: 'SPM 2.0 Highlights 5' },
  { src: spm2f, alt: 'SPM 2.0 Highlights 6' },
]

const spm2Videos = [
  { url: 'https://vimeo.com/1191671244?fl=tl&fe=ec', title: 'SPM 2.0 Recap' },
]

export default function SPM2Page() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 gradient-navy text-primary-foreground">
        <div className="container-narrow px-4">
          <p className="section-label text-primary-foreground/60 mb-4">SPM 2.0</p>
          <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground mb-4 leading-tight">
            STRATEGIC POSITIONING MASTERCLASS
          </h1>
          <div className="flex flex-wrap gap-6 mt-8 font-body text-sm text-primary-foreground/70">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              25th April, 2026
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              Luton, United Kingdom
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary" />
              10:00 AM – 4:00 PM
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
                SPM 2.0 built on the foundation of the inaugural masterclass — deeper, more
                structured, and designed for leaders ready to move from visibility to lasting
                impact. If SPM 1.0 was the ignition, SPM 2.0 is the engine.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-navy mb-6">Images From The Event</h2>
              <div className="my-8">
                <AnimatedSection delay={0.5}>
                  <EventImageSlider images={spm2Images} />
                </AnimatedSection>
              </div>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-navy mb-6">Videos From The Event</h2>
              <div className="my-8">
                <AnimatedSection delay={0.7}>
                  <EventVideoGallery videos={spm2Videos} />
                </AnimatedSection>
              </div>
            </div>
          </div>

          {/* Right: CTA card */}
          <div>
            <div className="rounded-2xl p-8 sticky top-28 bg-navy text-primary-foreground border-2 border-secondary">
              <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest bg-secondary/20 text-secondary rounded-full px-3 py-1 mb-4">
                Coming Soon
              </span>
              <h3 className="font-heading text-xl text-primary-foreground mb-3">
                Secure Your Seat for SPM 3.0
              </h3>
              <p className="font-body text-sm text-primary-foreground/60 mb-6">
                Seats are limited. Register your interest and be among the first to be notified.
              </p>
              <Link href="/events/spm-3" className="btn-gold w-full text-center block">
                Register for SPM 3.0 →
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
              href="/events/spm-1"
              className="group bg-background rounded-2xl border border-border p-6 hover:border-secondary/50 transition-all duration-300"
            >
              <span className="font-body text-xs font-semibold text-secondary uppercase tracking-widest">
                SPM 1.0
              </span>
              <h3 className="font-heading text-lg text-navy mt-2 mb-1">
                Strategic Positioning Masterclass
              </h3>
              <p className="font-body text-sm text-muted-foreground">December 2025</p>
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
