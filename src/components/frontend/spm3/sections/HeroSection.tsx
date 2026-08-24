'use client'

import { motion } from 'framer-motion'
import { RegistrationModal } from '@/components/frontend/spm3/components/RegistrationModal'
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi'
import Image from 'next/image'

import flyer from '@/assets/images/spm3/spm-3.webp'

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
              transition={{ duration: 0.6, ease: 'easeOut' }}
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
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="mb-6"
            >
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] text-foreground leading-[1.1] tracking-tight">
                Strategic Positioning <br className="hidden lg:block" />
                <span className="text-gold">Masterclass 3.0 Birmingham</span>
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
                <strong className="text-foreground font-bold">
                  Beyond Survival: Secret System to Thriving in the UK.
                </strong>{' '}
                <br />I know why you are here. You are tired of the rat race of waking up every
                month knowing the paycheck is already allocated before it arrives. You have
                ambition, ideas & potential. But somewhere in between you are managing life instead
                of designing it.
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
            className="w-full flex justify-center items-center mt-6 lg:mt-0"
          >
            <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg">
              {/* Main center image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="flex justify-center lg:justify-end"
              >
                <Image
                  src={flyer}
                  alt="SPM 3.0 BIRMINGHAM"
                  className="w-full h-auto object-contain rounded-2xl shadow-2xl border border-gold/20"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Event Details Bar - Centered on desktop, stacked & centered on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 sm:mt-16 md:mt-20 w-full flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 border border-white/15 bg-white/5 backdrop-blur-md rounded-2xl px-5 sm:px-8 py-5 sm:py-6 md:py-8 w-full max-w-4xl text-center shadow-xl"
          >
            <div className="flex items-start justify-center gap-2.5 sm:gap-3 text-white/90 font-body text-xs sm:text-sm md:text-base uppercase tracking-wide">
              <FiCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0 mt-0.5" />
              <span>Saturday, 21st November 2026</span>
            </div>

            <div className="hidden md:block w-px h-5 bg-white/15 shrink-0" />

            <div className="flex items-start justify-center gap-2.5 sm:gap-3 text-white/90 font-body text-xs sm:text-sm md:text-base uppercase tracking-wide">
              <FiClock className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0 mt-0.5" />
              <span>10:00 AM - 4:00 PM</span>
            </div>

            <div className="hidden md:block w-px h-5 bg-white/15 shrink-0" />

            <div className="flex items-start justify-center gap-2.5 sm:gap-3 text-white/90 font-body text-xs sm:text-sm md:text-base uppercase tracking-wide">
              <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0 mt-0.5" />
              <span className="text-center md:text-start">
                Conference Centre, Aston University, Birmingham B4 7ET
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
