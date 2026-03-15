'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/constants'
import logoLight from '@/assets/logos/logo-light.svg'
import Image from 'next/image'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

   const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-narrow flex items-center justify-between py-4 px-4">
        <Link href="/" className="font-heading text-2xl tracking-wider text-primary-foreground">
          <Image
            src={logoLight}
            alt="Prime Counsel"
            className="h-8 md:h-10 w-auto"
            width={150}
            height={40}
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-body text-sm font-medium tracking-wide transition-all duration-300 px-4 py-2 rounded-full ${
                pathname === link.path 
                  ? 'bg-gold/10 text-gold' 
                  : 'text-primary-foreground hover:bg-gold/10 hover:text-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link href="/contact" className="btn-secondary text-sm">
            Book a Consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-primary-foreground"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className="flex md:hidden items-center gap-2">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
          </SheetTrigger>
          <SheetContent side="left" className="bg-navy border-r-white/10">
            <SheetTitle className="text-primary-foreground sr-only">Menu</SheetTitle>
            <div className="flex flex-col gap-6 mt-12">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.path)}
                    className={`text-lg font-medium transition-all text-left px-4 py-3 rounded-xl ${
                      pathname === link.path 
                        ? 'text-gold bg-gold/10' 
                        : 'text-primary-foreground/80 hover:text-gold hover:bg-gold/5'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <Link href="/contact" className="btn-secondary text-sm">
                  Book a Consultation
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`font-body text-base font-medium tracking-wide transition-colors hover:text-secondary ${
                    pathname === link.path ? 'text-secondary' : 'text-primary-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="px-6 pt-4 pb-6">
              <Link href="/contact" className="btn-secondary w-full text-center">
                Book a Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </nav>
  )
}

export default Navbar
