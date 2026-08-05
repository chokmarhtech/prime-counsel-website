'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/frontend/spm/sections/AnimatedSection'
import Image from 'next/image'
import { FiCheckCircle } from 'react-icons/fi'
import realityImg from '@/assets/images/events/spm1/image-3.png'

const RealitySection = () => {
  return (
    <section id="reality" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Vertical Portrait Image */}
          <div className="relative order-2 lg:order-1">
            <AnimatedSection delay={0.2}>
              {/* Faint background graphic */}
              <div className="absolute -inset-10 border border-gold/20 rounded-full blur-[2px] -z-10 animate-[spin_60s_linear_infinite]" />
              
              <div className="relative rounded-2rem overflow-hidden shadow-2xl aspect-3/4 w-full max-w-md mx-auto bg-white border-8 border-white">
                <Image 
                  src={realityImg} 
                  alt="Professional event" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Content & List */}
          <div className="flex flex-col justify-center order-1 lg:order-2">
            <AnimatedSection delay={0.4}>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy leading-[1.1] mb-8">
                High-achieving... but <br className="hidden lg:block"/>
                quietly <span className="text-gold">running on fumes?</span>
              </h2>

              <p className="font-body text-base md:text-lg text-navy font-semibold mb-6">
                Common signs include:
              </p>

              <div className="flex flex-col gap-4 mb-10">
                {[
                  "You work hard but opportunities go to someone else.",
                  "You have qualifications but lack strategic positioning.",
                  "A mind that won’t shut off from work demands.",
                  "The marketplace does not reward your effort alone.",
                  "Feeling stuck in survival mode despite outward success."
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
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

              <div className="pt-8 border-t border-gray-200">
                <p className="font-body text-base md:text-lg text-gray-600 leading-relaxed">
                  You&apos;re not broken. Your career isn&apos;t over. You just need to shift from effort to leverage. <strong className="text-navy font-bold">It can be retrained.</strong>
                </p>
              </div>
            </AnimatedSection>
          </div>
          
        </div>

      </div>
    </section>
  )
}

export default RealitySection
