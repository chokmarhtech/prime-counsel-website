'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/frontend/spm/hooks/use-theme'
import { RegistrationModal as RegistrationModalSPM2 } from '@/components/frontend/spm/components/RegistrationModal'
import { RegistrationModal as RegistrationModalSPM3 } from '@/components/frontend/spm3/components/RegistrationModal'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import logoLight from '@/assets/logos/logo-light.svg'
import logoDark from '@/assets/logos/logo-dark.svg'

const NAV_LINKS_SPM2 = [
  { label: 'The Problem', href: '#the-problem' },
  { label: 'Highlights', href: '#highlight' },
  { label: 'Why SPM 2.0', href: '#why-spm' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Event', href: '#event-details' },
  { label: 'Coach', href: '#coach' },
  { label: 'FAQ', href: '#faq' },
]

const NAV_LINKS_SPM3 = [
  { label: 'The Reality', href: '#reality' },
  { label: 'The Difference', href: '#difference' },
  { label: 'The Audience', href: '#audience' },
  { label: 'The Value', href: '#value' },
  { label: 'The Movement', href: '#movement' },
  { label: 'FAQ', href: '#faq' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)
  const pathname = usePathname()
  
  const isSPM3 = pathname?.includes('/spm-3')
  const NAV_LINKS = isSPM3 ? NAV_LINKS_SPM3 : NAV_LINKS_SPM2

  const openMobileModal = () => {
    setIsOpen(false)
    setTimeout(() => setIsMobileModalOpen(true), 150)
  }
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  // Prevent hydration mismatch by not rendering theme-dependent UI until mounted
  if (!mounted) return null

  // isSPM3 hero is visually dark, so transparent navbar needs white logo.
  // isSPM2 hero is light, so transparent navbar needs dark logo.
  // When scrolled, the navbar becomes white, so both need dark logo.
  const currentLogo = isSPM3 
    ? (scrolled ? logoDark : logoLight)
    : logoDark;

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm text-navy'
            : 'bg-transparent ' + (isSPM3 ? 'text-white' : 'text-navy')
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href={isSPM3 ? "/spm-3" : "/spm-2"}
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="font-heading text-xl md:text-2xl tracking-wider flex items-center"
            >
              <Image
                src={currentLogo}
                alt="Prime Counsel"
                className="h-8 md:h-10 w-auto"
                width={150}
                height={40}
                priority
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`font-body uppercase text-[12px] font-medium px-2 py-2 rounded-sm transition-colors ${
                    scrolled 
                      ? 'text-navy/70 hover:text-navy hover:bg-gray-100'
                      : (isSPM3 ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-navy/70 hover:text-navy hover:bg-gray-100')
                  }`}
                >
                  {link.label}
                </button>
              ))}



              {/* CTA */}
              <RegistrationModalSPM3>
                <button className="ml-3 cursor-pointer font-body text-sm font-bold px-5 py-2 rounded-sm tracking-wider uppercase transition-all bg-gold text-navy hover:shadow-[0_0_20px_rgba(var(--gold),0.4)]">
                  Register
                </button>
              </RegistrationModalSPM3>
            </div>

            {/* Mobile controls (Switcher + Hamburger on right) */}
            <div className="flex md:hidden items-center gap-2">


              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={
                      scrolled 
                        ? 'text-navy border border-gray-200 hover:bg-gray-100'
                        : (isSPM3 ? 'text-white hover:bg-white/10 hover:text-white border border-white/20' : 'text-navy border border-gray-200 hover:bg-gray-100')
                    }
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <div className="flex flex-col gap-6 mt-6">
                    <div className="flex flex-col gap-4">
                      {NAV_LINKS.map((link) => (
                        <button
                          key={link.label}
                          onClick={() => handleNavClick(link.href)}
                          className="text-lg font-medium transition-colors hover:text-primary text-muted-foreground text-left"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                      <button
                        onClick={openMobileModal}
                        className={`font-body text-sm text-center font-bold px-5 py-2 rounded-sm tracking-wider uppercase transition-all ${
                          isSPM3 
                            ? 'bg-gold text-navy hover:shadow-[0_0_20px_rgba(var(--gold),0.4)]'
                            : 'bg-secondary text-secondary-foreground hover:shadow-[0_0_20px_hsl(212,100%,46%,0.3)]'
                        }`}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* External Registration Modal for Mobile Drawer */}
              {isSPM3 ? (
                <RegistrationModalSPM3 open={isMobileModalOpen} onOpenChange={setIsMobileModalOpen} />
              ) : (
                <RegistrationModalSPM2 open={isMobileModalOpen} onOpenChange={setIsMobileModalOpen} />
              )}
            </div>
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  )
}

export default Navbar
