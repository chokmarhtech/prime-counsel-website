import React from 'react'
import Layout from '@/components/frontend/layout/Layout'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/frontend/spm/sections/AnimatedSection'
import Image from 'next/image'

import img01 from '@/assets/images/events/other-events/01.jpeg'
import img02 from '@/assets/images/events/other-events/02.jpeg'
import img03 from '@/assets/images/events/other-events/03.jpeg'
import img04 from '@/assets/images/events/other-events/04.jpeg'

const otherEventImages = [
  { src: img01, alt: 'Monthly & Weekly Event Highlight 1' },
  { src: img02, alt: 'Monthly & Weekly Event Highlight 2' },
  { src: img03, alt: 'Monthly & Weekly Event Highlight 3' },
  { src: img04, alt: 'Monthly & Weekly Event Highlight 4' },
]

const OtherEventsPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 gradient-navy text-primary-foreground">
        <div className="container-narrow px-4">
          <p className="section-label text-primary-foreground/60 mb-4">OTHER EVENTS</p>
          <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground mb-4 leading-tight">
            OTHER EVENTS WITH PRIME COUNSEL
          </h1>
        </div>
      </section>
      <section className="section-padding-1 bg-background">
        <div className="container-narrow grid lg:grid-cols-3 gap-12">
          {/* Left: description + highlights */}
          <div className="lg:col-span-2 space-y-10 min-w-0 w-full overflow-hidden">
            <div>
              <h2 className="font-heading text-2xl text-navy mb-4">ABOUT THIS EVENT</h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                This is a collection of other events with Prime Counsel that Happens on a{' '}
                <span className="text-secondary font-bold">Monthly </span>and{' '}
                <span className="text-secondary font-bold">Weekly</span> Basis.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-navy mb-6">Images From These Events</h2>
              <div className="my-8">
                <AnimatedSection delay={0.5}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {otherEventImages.map((img, index) => (
                      <div key={index} className="rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-auto object-contain"
                          placeholder="blur"
                        />
                      </div>
                    ))}
                  </div>
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

export default OtherEventsPage
