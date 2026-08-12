'use client'

import AnimatedSection from '@/components/frontend/spm/sections/AnimatedSection'
import { RegistrationModal } from '@/components/frontend/spm3/components/RegistrationModal'
import {
  FiAward,
  FiGift,
  FiStar,
  FiCoffee,
  FiUsers,
  FiMessageCircle,
  FiCheckCircle,
} from 'react-icons/fi'

const deliverables = [
  {
    title: 'Certificate of Participation',
    icon: FiAward,
  },
  {
    title: 'Branded Souvenirs',
    icon: FiGift,
  },
  {
    title: (
      <>
        Discount on Coach Ayoola’s book-{' '}
        <span className="font-bold text-white">
          From Raw Talent to Market Value
        </span>
      </>
    ),
    icon: FiStar,
  },
  {
    title: 'Lunch & Refreshments',
    icon: FiCoffee,
  },
  {
    title: 'Networking Session',
    icon: FiUsers,
  },
  {
    title: 'Fireside Q&A',
    icon: FiMessageCircle,
  },
  {
    title: 'Access to Prime Counsel Growth Community',
    icon: FiCheckCircle,
  },
]

const DeliverablesSection = () => {
  return (
    <section className="py-20 md:py-28 section-dark text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none -z-0" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-wider font-extrabold mb-4">
              BONUS OFFER
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {deliverables.map((item, index) => {
            const Icon = item.icon
            return (
              <AnimatedSection key={index} delay={0.08 * index}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 flex items-center gap-4 hover:border-gold/40 hover:bg-white/10 transition-all duration-300 h-full group">
                  <div className="text-gold shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-body text-sm md:text-base text-white/90 font-medium leading-snug">
                    {item.title}
                  </span>
                </div>
              </AnimatedSection>
            )
          })}
        </div>

        <AnimatedSection delay={0.6}>
          <div className="mt-12 flex justify-center">
            <RegistrationModal>
              <button className="bg-gold text-navy hover:bg-gold/90 font-body font-bold text-sm md:text-base px-8 py-4 rounded-md tracking-wider uppercase transition-all duration-300 shadow-xl hover:scale-105">
                REGISTER NOW
              </button>
            </RegistrationModal>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default DeliverablesSection
