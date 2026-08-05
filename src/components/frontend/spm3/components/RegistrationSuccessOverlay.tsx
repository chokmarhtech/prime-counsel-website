'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Sparkles, Ticket } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

interface RegistrationData {
  name: string
  ticketCode: string
  ticketType: 'physical' | 'virtual'
}

export const RegistrationSuccessOverlay = ({
  registration,
}: {
  registration: RegistrationData | null
}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (registration) {
      setOpen(true)
    }
  }, [registration])

  const handleClose = () => {
    setOpen(false)
    // Clean up URL query parameters
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.delete('success')
      url.searchParams.delete('registrationId')
      window.history.replaceState({}, '', url.pathname + url.search)
    }
  }

  if (!registration) return null

  const typeLabel = registration.ticketType === 'physical' ? 'Physical Pass' : 'Virtual Pass'
  const venueLabel = registration.ticketType === 'physical' 
    ? 'Aston University Conference Centre, Birmingham' 
    : 'Online Live Stream'

  return (
    <Dialog open={open} onOpenChange={(val) => (val ? null : handleClose())}>
      <DialogContent className="w-[95vw] sm:max-w-md bg-[#04082B] text-white border-gold/30 p-6 md:p-8 text-center gap-0">
        
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6 shadow-[0_0_20px_rgba(201,168,76,0.2)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <DialogHeader className="text-center">
          <DialogTitle className="font-heading text-center text-2xl md:text-3xl text-white tracking-wider">
            Payment Confirmed!
          </DialogTitle>
          <DialogDescription className="font-body text-white/70 text-sm md:text-base mt-2 text-center">
            Your seat at SPM 3.0 has been successfully secured.
          </DialogDescription>
        </DialogHeader>

        {/* Premium Ticket Card */}
        <div className="bg-white/5 border border-gold/20 rounded-2xl p-6 text-left my-6 space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 text-gold pointer-events-none">
            <Ticket className="w-16 h-16 rotate-12" />
          </div>

          <div className="flex flex-col border-b border-white/10 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Attendee</span>
            <span className=" font-bold text-lg text-white mt-0.5 tracking-wide">{registration.name}</span>
          </div>

          <div className="flex flex-col border-b border-white/10 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Ticket Code</span>
            <span className=" font-black text-xl text-gold  mt-0.5">{registration.ticketCode}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/40">Pass Type</span>
              <span className="font-body text-xs font-semibold text-white mt-1">{typeLabel}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/40">Date</span>
              <span className="font-body text-xs font-semibold text-white mt-1">21st Nov 2026</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-white/60 font-body leading-relaxed mb-6">
          A confirmation receipt alongside event onboarding instructions has been sent to your email. We look forward to welcoming you!
        </p>

        <Button 
          onClick={handleClose}
          className="bg-gold hover:bg-gold/90 text-navy font-body font-bold py-4 rounded-lg uppercase tracking-wider w-full shadow-lg shadow-gold/20 gap-2"
        >
          Explore the Masterclass <Sparkles className="w-4 h-4" />
        </Button>
      </DialogContent>
    </Dialog>
  )
}
