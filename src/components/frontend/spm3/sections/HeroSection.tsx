'use client'

import { motion } from 'framer-motion'
import { RegistrationModal } from '@/components/frontend/spm3/components/RegistrationModal'
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi'
import { EVENT_DETAILS } from '@/components/frontend/spm3/data/constants'
import Image from 'next/image'

import img1 from '@/assets/images/events/spm2/spm-2-a.jpeg'
import img2 from '@/assets/images/events/spm2/spm-2-c.jpeg'
import img3 from '@/assets/images/events/spm1/image-2.webp'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-32">
      
      {/* Background blobs for light/dark mode */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-3 border border-gold/30 bg-gold/10 rounded-full px-6 py-2 mb-8"
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
              </div>
              <span className="font-body text-xs md:text-sm tracking-[0.25em] uppercase text-gold font-bold">
                SPM 3.0 • NOVEMBER 2026
              </span>
            </motion.div>

            {/* Main Typography */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-6"
            >
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] text-foreground leading-[1.1] tracking-tight">
                Strategic Positioning <br className="hidden lg:block" />
                <span className="text-gold">
                  Masterclass 3.0
                </span>
              </h1>
            </motion.div>

            {/* Subtitle / Pitch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-xl mb-10"
            >
              <p className="font-body text-muted-foreground md:text-base lg:text-lg font-medium leading-relaxed">
                <strong className="text-foreground font-bold">Beyond Survival: Secret System to Thriving in the UK.</strong> <br/>
                A transformational one-day masterclass designed to help ambitious professionals and leaders move beyond hard work and become strategically positioned.
              </p>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12"
            >
              <RegistrationModal>
                <button className="relative group flex items-center justify-center gap-3 bg-gold text-navy font-body font-bold text-base px-10 py-4 rounded-md tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--gold),0.4)] hover:-translate-y-1">
                  Secure Your Seat
                </button>
              </RegistrationModal>
            </motion.div>
          </div>

          {/* Right Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-70 sm:h-87.5 lg:h-105 w-full flex justify-center items-center perspective-1000"
          >
             <div className="relative w-full max-w-125 aspect-square">
                {/* Main center image */}
                <motion.div 
                  className="absolute inset-0 z-20 rounded-2xl overflow-hidden border-4 border-background shadow-2xl shadow-black/20 dark:shadow-black/60"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                >
                  <Image src={img1} alt="SPM Event" className="w-full h-full object-cover" />
                </motion.div>
                
                {/* Top right image */}
                <motion.div 
                  className="absolute -top-10 -right-10 w-2/3 h-2/3 z-10 rounded-2xl overflow-hidden border-4 border-background shadow-xl opacity-90"
                  animate={{ y: [0, 15, 0], rotate: [5, 7, 5] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                >
                  <Image src={img2} alt="SPM Event Networking" className="w-full h-full object-cover" />
                </motion.div>

                {/* Bottom left image */}
                <motion.div 
                  className="absolute -bottom-10 -left-10 w-3/5 h-3/5 z-30 rounded-2xl overflow-hidden border-4 border-background shadow-xl opacity-95"
                  animate={{ y: [0, -12, 0], rotate: [-4, -6, -4] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                >
                  <Image src={img3} alt="Coach Ayoola" className="w-full h-full object-cover" />
                </motion.div>
             </div>
          </motion.div>

        </div>

        {/* Event Details Bar - Fully responsive to light/dark mode */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 w-full max-w-5xl mx-auto border border-white/10 bg-[#04082B]/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <div className="flex items-center gap-4 pt-2 sm:pt-0 justify-start sm:justify-center">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/30 text-gold">
                <FiCalendar className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1">Date</span>
                <span className="text-white font-body font-semibold text-sm">{EVENT_DETAILS.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 sm:pt-0 justify-start sm:justify-center sm:pl-8">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/30 text-gold">
                <FiClock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1">Time</span>
                <span className="text-white font-body font-semibold text-sm">{EVENT_DETAILS.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 sm:pt-0 justify-start sm:justify-center sm:pl-8">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/30 text-gold">
                <FiMapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1">Location</span>
                <span className="text-white font-body font-semibold text-sm">{EVENT_DETAILS.venue}</span>
                <span className="text-white/60 font-body text-xs mt-0.5">{EVENT_DETAILS.address}</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default HeroSection
