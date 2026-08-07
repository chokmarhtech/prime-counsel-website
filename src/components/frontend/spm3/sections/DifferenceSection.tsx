'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/frontend/spm/sections/AnimatedSection'
import Image from 'next/image'
import { FiCheckCircle } from 'react-icons/fi'
import { RegistrationModal } from '@/components/frontend/spm3/components/RegistrationModal'
import differenceImg from '@/assets/images/events/spm2/spm-2-a.jpeg'

const DifferenceSection = () => {
  return (
    <section id="difference" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Image Card */}
          <AnimatedSection delay={0.2} className="order-2 lg:order-1 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg max-h-125 bg-gold/5 rounded-3xl -z-10 rotate-3" />
             <div className="relative bg-white p-4 rounded-3xl shadow-xl border border-gray-200 aspect-square lg:aspect-[4/5] w-full max-w-md mx-auto">
               <div className="w-full h-full rounded-2xl overflow-hidden relative">
                 <Image 
                    src={differenceImg} 
                    alt="Masterclass Session" 
                    className="w-full h-full object-cover filter brightness-90"
                 />
                 {/* Play button overlay mimicking video/interactive element */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-14 border-l-navy border-b-8 border-b-transparent ml-1" />
                    </div>
                 </div>
               </div>
             </div>
          </AnimatedSection>

          {/* Right: Content */}
          <AnimatedSection delay={0.4} className="order-1 lg:order-2 flex flex-col justify-center">
            
            <h4 className="font-heading text-sm md:text-base uppercase tracking-[0.2em] text-gold font-bold mb-4">
              What Makes It Different
            </h4>
            
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy leading-[1.1] mb-8">
              This is more than <br className="hidden lg:block"/>
              just inspiration. It&apos;s <br className="hidden lg:block"/>
              <span className="text-gold">strategic training.</span>
            </h2>

            <p className="font-body text-lg text-navy font-semibold mb-6">
              Why this works:
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {[
                "Doctor-led, physiology-first approach.",
                "Build undeniable professional worth.",
                "Real-time frameworks for leadership.",
                "Designed for measurable, long-term relevance.",
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  className="flex items-center gap-4"
                >
                  <div className="text-gold bg-gold/10 rounded-full p-1 shrink-0">
                    <FiCheckCircle className="w-5 h-5" />
                  </div>
                  <span className="font-body text-base md:text-lg text-gray-600 font-medium">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <RegistrationModal>
              <button className="bg-gold hover:bg-gold/90 text-navy font-body font-bold px-8 py-4 rounded-full transition-colors w-fit shadow-lg shadow-gold/20">
                Secure Your Seat
              </button>
            </RegistrationModal>

          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}

export default DifferenceSection
