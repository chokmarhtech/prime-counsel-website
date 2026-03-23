'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import heroBg from '@/assets/images/hero-bg.jpg'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <Image
          src={heroBg}
          alt="Engineering Leadership Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 gradient-navy-overlay" />

      <div className="relative z-10 container-narrow px-6 md:px-12 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h1 className="heading-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight mb-6">
            Building Leaders Who <span className="text-secondary">Shape Nations</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-10 max-w-2xl">
            Prime Counsel is a global leadership and personal development institution building
            visionary, ethically grounded and strategically positioned leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link href="/about">Explore Our Institution</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link href="/contact">Begin today</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
