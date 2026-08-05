'use client'


import AnimatedSection from '@/components/frontend/spm/sections/AnimatedSection'
import { FiCheck } from 'react-icons/fi'

const deliverables = [
  "Certificate of Participation",
  "Branded Souvenirs",
  "Discount on Coach Ayoola’s book- From Raw Talent to Market Value",
  "Lunch & Refreshments",
  "Networking Session",
  "Fireside Q&A",
  "Access to Prime Counsel Growth Community",
]

const DeliverablesSection = () => {
  return (
    <section id="value" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
        
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gold w-8 md:w-12" />
              <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-gold font-semibold">
                The Value
              </h2>
              <div className="h-px bg-gold w-8 md:w-12" />
            </div>
            <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy">
              What you will <br className="hidden md:block"/>
              walk away with
            </h3>
          </div>
        </AnimatedSection>

        <div className="relative">
          {/* Decorative glowing background behind the list */}
          <div className="absolute inset-0 bg-linear-to-b from-gold/10 to-transparent blur-3xl -z-10 rounded-full" />
          
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {deliverables.map((item, index) => (
                <AnimatedSection key={index} delay={0.1 * index}>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0 shadow-[0_0_10px_rgba(var(--gold),0.2)]">
                      <FiCheck className="w-3 h-3" />
                    </div>
                    <span className="font-body text-base md:text-lg text-navy font-medium">
                      {item}
                    </span>
                  </li>
                </AnimatedSection>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}

export default DeliverablesSection
