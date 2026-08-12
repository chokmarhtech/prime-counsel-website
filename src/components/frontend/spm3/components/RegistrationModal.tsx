'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { BANK_DETAILS } from '@/components/frontend/spm3/data/constants'
import {
  Copy,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  Monitor,
  Users,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utilities/ui'

type Step = 'ticket' | 'details' | 'payment' | 'bank_success'

export const RegistrationModal = ({
  children,
  className,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: {
  children?: React.ReactNode
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [localOpen, setLocalOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : localOpen
  const setOpen = isControlled ? controlledOnOpenChange : setLocalOpen

  const [step, setStep] = useState<Step>('ticket')
  const [ticketType, setTicketType] = useState<'physical' | 'virtual'>('physical')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [paymentType, setPaymentType] = useState<'stripe' | 'bank_transfer'>('stripe')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [copied, setCopied] = useState<string | null>(null)
  const [bankSuccessCode, setBankSuccessCode] = useState('')

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleNextStep = () => {
    if (step === 'ticket') {
      setStep('details')
    } else if (step === 'details') {
      if (!name.trim() || !email.trim()) {
        setError('Please fill in your name and email.')
        return
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.')
        return
      }
      setError(null)
      setStep('payment')
    }
  }

  const handlePrevStep = () => {
    if (step === 'details') setStep('ticket')
    if (step === 'payment') setStep('details')
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/spm/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          ticketType,
          paymentType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      if (paymentType === 'stripe' && data.stripeUrl) {
        // Redirect to Stripe Checkout page
        window.location.href = data.stripeUrl
      } else if (paymentType === 'bank_transfer') {
        // Transition to success screen for bank transfers
        setBankSuccessCode(data.ticketCode)
        setStep('bank_success')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (setOpen) setOpen(false)
    // Reset modal states after closing transition
    setTimeout(() => {
      setStep('ticket')
      setName('')
      setEmail('')
      setPaymentType('stripe')
      setError(null)
    }, 300)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => (val ? (setOpen ? setOpen(true) : null) : handleClose())}
    >
      {children && (
        <DialogTrigger asChild>
          <div className={cn('inline-block', className)}>{children}</div>
        </DialogTrigger>
      )}
      <DialogContent className="w-[95vw] sm:max-w-xl max-h-[90vh] overflow-y-auto bg-[#04082B] text-white border-white/10 p-6 md:p-8 gap-0">
        {/* Step Indicator Header */}
        {step !== 'bank_success' && (
          <div className="flex items-center gap-2 mb-6">
            <span
              className={cn(
                'text-xs font-bold uppercase tracking-widest transition-colors',
                step === 'ticket' ? 'text-gold' : 'text-white/40',
              )}
            >
              01. Ticket
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-white/20" />
            <span
              className={cn(
                'text-xs font-bold uppercase tracking-widest transition-colors',
                step === 'details' ? 'text-gold' : 'text-white/40',
              )}
            >
              02. Details
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-white/20" />
            <span
              className={cn(
                'text-xs font-bold uppercase tracking-widest transition-colors',
                step === 'payment' ? 'text-gold' : 'text-white/40',
              )}
            >
              03. Payment
            </span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 'ticket' && (
            <motion.div
              key="step-ticket"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl md:text-3xl text-white tracking-wider">
                  Select Ticket Type
                </DialogTitle>
                <DialogDescription className="font-body text-white/60 text-sm md:text-base mt-2">
                  Choose your mode of attendance for Strategic Positioning Masterclass 3.0.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                {/* Physical Ticket option */}
                <div
                  onClick={() => setTicketType('physical')}
                  className={cn(
                    'flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer',
                    ticketType === 'physical'
                      ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(201,168,76,0.15)]'
                      : 'bg-white/5 border-white/10 hover:border-white/20',
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0 mt-1">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-lg text-white tracking-wider">
                        Physical Ticket
                      </span>
                      <span className="font-heading font-bold text-xl text-gold tracking-wide">
                        £50
                      </span>
                    </div>
                    <p className="font-body text-sm text-white/60 mt-1">
                      Attend live in-person in Birmingham. Access includes lunch & refreshments,
                      branded souvenirs, physical networking, and Q&A.
                    </p>
                  </div>
                </div>

                {/* Virtual Ticket option */}
                <div
                  onClick={() => setTicketType('virtual')}
                  className={cn(
                    'flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer',
                    ticketType === 'virtual'
                      ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(201,168,76,0.15)]'
                      : 'bg-white/5 border-white/10 hover:border-white/20',
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0 mt-1">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-lg text-white tracking-wider">
                        Virtual Ticket
                      </span>
                      <span className="font-heading font-bold text-xl text-gold tracking-wide">
                        £25
                      </span>
                    </div>
                    <p className="font-body text-sm text-white/60 mt-1">
                      Stream online globally. Access includes full live broadcast, and access to replay.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleNextStep}
                className="bg-gold hover:bg-gold/90 text-navy font-body font-bold text-base py-6 rounded-lg uppercase tracking-wider shadow-lg shadow-gold/10 gap-2 mt-4"
              >
                Proceed to Details <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {step === 'details' && (
            <motion.div
              key="step-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl md:text-3xl text-white tracking-wider">
                  Enter Your Details
                </DialogTitle>
                <DialogDescription className="font-body text-white/60 text-sm md:text-base mt-2">
                  Provide your name and email address to receive your ticket confirmation.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold uppercase tracking-widest text-white/70"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 font-body text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold uppercase tracking-widest text-white/70"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 font-body text-sm"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-body font-semibold mt-1">{error}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button
                  onClick={handlePrevStep}
                  variant="ghost"
                  className="border border-white/10 hover:bg-white/5 hover:text-white font-body font-bold text-sm py-6 rounded-lg uppercase tracking-wider gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="bg-gold hover:bg-gold/90 text-navy font-body font-bold text-base py-6 rounded-lg uppercase tracking-wider shadow-lg shadow-gold/10 gap-2"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'payment' && (
            <motion.div
              key="step-payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl md:text-3xl text-white tracking-wider">
                  Payment Method
                </DialogTitle>
                <DialogDescription className="font-body text-white/60 text-sm md:text-base mt-2">
                  Select how you would like to secure your {ticketType} pass.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                {/* Pay with card */}
                <div
                  onClick={() => setPaymentType('stripe')}
                  className={cn(
                    'flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer',
                    paymentType === 'stripe'
                      ? 'bg-gold/10 border-gold'
                      : 'bg-white/5 border-white/10',
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-base text-white tracking-wider">
                      Pay Online (Card)
                    </span>
                    <span className="text-white/60 text-xs mt-0.5">
                      Secure payment via card. Best for instant check-in.
                    </span>
                  </div>
                  <span className="bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-gold/20 shrink-0">
                    Instant
                  </span>
                </div>

                {/* Bank transfer */}
                <div
                  onClick={() => setPaymentType('bank_transfer')}
                  className={cn(
                    'flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer',
                    paymentType === 'bank_transfer'
                      ? 'bg-gold/10 border-gold'
                      : 'bg-white/5 border-white/10',
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-base text-white tracking-wider">
                      Direct Bank Transfer
                    </span>
                    <span className="text-white/60 text-xs mt-0.5">
                      Submit registration and transfer directly to our account.
                    </span>
                  </div>
                  <span className="bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-white/10 shrink-0">
                    Manual
                  </span>
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-body font-semibold mt-1">{error}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <Button
                  onClick={handlePrevStep}
                  variant="ghost"
                  className="border border-white/10 hover:bg-white/5 hover:text-white font-body font-bold text-sm py-6 rounded-lg uppercase tracking-wider gap-2 col-span-1"
                  disabled={loading}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-gold hover:bg-gold/90 text-navy font-body font-bold text-base py-6 rounded-lg uppercase tracking-wider shadow-lg shadow-gold/10 gap-2 col-span-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Processing
                    </>
                  ) : paymentType === 'stripe' ? (
                    <>
                      Pay with Stripe <Sparkles className="w-4 h-4" />
                    </>
                  ) : (
                    <>Submit Ticket</>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'bank_success' && (
            <motion.div
              key="step-bank-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-6 text-center"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <DialogHeader className="text-center">
                <DialogTitle className="font-heading text-2xl md:text-3xl text-white">
                  Ticket Reserved!
                </DialogTitle>
                <DialogDescription className="font-body text-white/70 text-sm md:text-base mt-2">
                  Thank you, <strong className="text-white">{name}</strong>! Your seat is reserved
                  under pending validation.
                </DialogDescription>
              </DialogHeader>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 text-left space-y-4">
                <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Your Unique Ticket Reference
                  </span>
                  <span className="font-heading font-black text-xl text-gold tracking-wider">
                    {bankSuccessCode}
                  </span>
                </div>

                <div className="font-body text-xs font-semibold text-white bg-gold/10 border border-gold/20 p-3 rounded-lg">
                  <span className="text-gold text-[10px] font-black uppercase tracking-wider block mb-1">
                    Payment Instructions:
                  </span>
                  Please transfer exactly{' '}
                  <span className="text-gold font-bold">
                    £{ticketType === 'physical' ? '50' : '25'}
                  </span>{' '}
                  to our bank account. Use your unique code{' '}
                  <span className="text-gold font-bold">{bankSuccessCode}</span> as the bank
                  reference.
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      label: 'Bank Name',
                      value: BANK_DETAILS.bankName,
                      id: 'bank',
                      copyable: false,
                    },
                    {
                      label: 'Account Name',
                      value: BANK_DETAILS.accountName,
                      id: 'name',
                      copyable: false,
                    },
                    {
                      label: 'Account Number',
                      value: BANK_DETAILS.accountNumber,
                      id: 'account',
                      copyable: true,
                    },
                    {
                      label: 'Sort Code',
                      value: BANK_DETAILS.sortCode,
                      id: 'sort',
                      copyable: true,
                    },
                  ].map((detail) => (
                    <div
                      key={detail.id}
                      className="flex items-center justify-between py-1 border-b border-white/5 last:border-0 last:pb-0"
                    >
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-white/40">
                          {detail.label}
                        </span>
                        <span className="font-body text-sm font-semibold text-white mt-0.5">
                          {detail.value}
                        </span>
                      </div>
                      {detail.copyable && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/50 hover:text-gold hover:bg-gold/10 transition-colors shrink-0"
                          onClick={() => handleCopy(detail.value, detail.id)}
                        >
                          {copied === detail.id ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-white/60 font-body leading-relaxed">
                After transferring, please email a screenshot of your transfer proof to:{' '}
                <a
                  href="mailto:info@primecounsel.co.uk"
                  className="text-gold font-semibold hover:underline"
                >
                  info@primecounsel.co.uk
                </a>
                . Your ticket code will be fully activated upon validation.
              </p>

              <Button
                onClick={handleClose}
                className="bg-gold hover:bg-gold/90 text-navy font-body font-bold py-4 rounded-lg uppercase tracking-wider mt-2"
              >
                Close Window
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
