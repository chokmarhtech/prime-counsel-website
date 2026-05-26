'use client'

import React, { useState } from 'react'
import { Calendar, MapPin, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Spm3Waitlist = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, event: 'SPM-3' }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
    } catch (err: any) {
      console.error(err)
      setStatus('error')
      setErrorMessage(err.message || 'Failed to join the waitlist. Please try again.')
    }
  }

  return (
    <section className="py-24 bg-background">
      <div className="container-narrow mx-auto px-4 flex flex-col items-center text-center">
        {/* Header */}
        <p className="font-heading tracking-widest text-gold uppercase text-sm mb-4">
          Upcoming Event
        </p>
        <h2 className="font-heading text-5xl md:text-6xl text-primary mb-4">
          SPM <span className="text-gold">3.0</span>
        </h2>
        <p className="font-body text-lg md:text-xl text-primary mb-6">
          The Strategic Positioning Masterclass
        </p>

        {/* Info Icons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-primary-foreground/70 mb-8 font-body">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold" />
            <span className="font-semibold text-primary/40">November 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold" />
            <span className="font-semibold text-primary/40">Birmingham, United Kingdom</span>
          </div>
        </div>

        {/* Description */}
        <p className="max-w-2xl text-base md:text-lg text-primary/80 font-body mb-10 font-semibold leading-relaxed">
          An intensive masterclass designed to equip leaders with the frameworks,
          clarity, and strategic discipline needed to position themselves for lasting
          influence and global relevance.
        </p>

        {/* Form or Success State */}
        {status === 'success' ? (
          <div className="w-full max-w-[440px] flex flex-col items-center p-8 border border-gold/30 rounded-3xl bg-gold/5">
            <CheckCircle2 className="w-12 h-12 text-gold mb-4" />
            <h3 className="font-heading text-2xl text-primary mb-2">You&apos;re on the list!</h3>
            <p className="font-body text-primary/70 text-sm">
              Thank you for registering your interest. We&apos;ll send you an exclusive update when tickets go live.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-[440px] flex flex-col gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Your full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === 'loading'}
                className="w-full border border-primary rounded-full px-4 py-3.5 text-sm text-primary placeholder:text-primary/60 font-body font-medium focus:outline-none focus:border-gold/50 transition-colors disabled:opacity-50"
              />
            </div>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="w-full border border-primary rounded-full px-4 py-3.5 text-sm text-primary placeholder:text-primary/60 font-body font-medium focus:outline-none focus:border-gold/50 transition-colors disabled:opacity-50"
              />
            </div>
            
            {status === 'error' && (
              <p className="text-red-500 text-xs font-body font-semibold">{errorMessage}</p>
            )}

            <Button variant="gold" className="w-full mt-2 h-12" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  Join the Waitlist <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Spm3Waitlist
