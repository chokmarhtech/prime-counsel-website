'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/frontend/spm/sections/AnimatedSection'
import Image from 'next/image'

import imgLeft from '@/assets/images/events/spm1/image-2.png'
import imgRight from '@/assets/images/events/spm2/spm-2-e.jpeg'

const AudienceSection = () => {
  return (
    <section id="audience" className="py-24 md:py-32 bg-[#04082B] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        
        <AnimatedSection>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white">
              Who is this <span className="text-gold">for?</span>
            </h2>
            <h2 className="font-heading text-2xl md:text-4xl lg:text-4xl text-white leading-[1.2] mb-6">
              Being stuck isn&apos;t a personality flaw. <br className="hidden md:block"/>
              <span className="text-white/70">It&apos;s a positioning problem.</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto mb-16 relative">
          
          {/* Central Arrow Overlay (Desktop) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold items-center justify-center z-20 shadow-xl shadow-gold/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>

          <AnimatedSection delay={0.2}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group border border-gray-200">
              <Image 
                src={imgLeft} 
                alt="Unpositioned" 
                className="w-full h-full object-cover filter grayscale opacity-70 group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="font-heading text-2xl text-white mb-2">The Unpositioned</h4>
                <p className="font-body text-sm text-white/70">Working hard, depleted, unseen, and frustrated by lack of recognition.</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group border border-gold/30">
              <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(var(--gold),0.1)]">
                <Image 
                  src={imgRight} 
                  alt="Positioned" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-gold/90 via-gold/40 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-heading text-2xl text-gold mb-4 group-hover:text-white transition-colors">The Positioned</h3>
                  <p className="font-body text-white/80 leading-relaxed">Strategic, recognized, deeply resilient, and attracting prime opportunities.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
        </div>

        <AnimatedSection delay={0.6}>
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-body text-base md:text-lg text-white/70 leading-relaxed">
              SPM 3.0 is the pathway from <strong className="text-white">Unseen &rarr; Obvious Choice</strong>. It trains you to move your professional strategy out of a chronic hustle and into intentional positioning. Over time, being valued becomes your new normal.
            </p>
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}

export default AudienceSection
