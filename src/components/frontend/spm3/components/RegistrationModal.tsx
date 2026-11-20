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
  Tag,
  Gift,
  Check,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utilities/ui'

type Step = 'ticket' | 'details' | 'payment' | 'bank_success' | 'sponsored_success'

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
  const [paymentType, setPaymentType] = useState<'stripe' | 'bank_transfer' | 'sponsored'>('stripe')

  // Discount code state
  const [discountInput, setDiscountInput] = useState('')
  const [validatingCode, setValidatingCode] = useState(false)
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string
    discountPercent: number
    isFree: boolean
  } | null>(null)
  const [discountError, setDiscountError] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [copied, setCopied] = useState<string | null>(null)
  const [bankSuccessCode, setBankSuccessCode] = useState('')
  const [bankAmountToPay, setBankAmountToPay] = useState<number>(50)
  const [sponsoredSuccessCode, setSponsoredSuccessCode] = useState('')

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const basePrice = ticketType === 'physical' ? 50 : 25
  const discountPercent = appliedDiscount ? appliedDiscount.discountPercent : 0
  const discountAmount = (basePrice * discountPercent) / 100
  const finalPrice = Math.max(0, basePrice - discountAmount)
  const isFree = finalPrice === 0

  const handleApplyDiscount = async () => {
    if (!discountInput.trim()) {
      setDiscountError('Please enter a code.')
      return
    }

    setValidatingCode(true)
    setDiscountError(null)

    try {
      const res = await fetch('/api/spm/validate-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discountInput.trim() }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Invalid discount code.')
      }

      setAppliedDiscount({
        code: data.code,
        discountPercent: data.discountPercent,
        isFree: data.isFree,
      })

      if (data.isFree) {
        setPaymentType('sponsored')
      } else {
        if (paymentType === 'sponsored') {
          setPaymentType('stripe')
        }
      }
    } catch (err: any) {
      setDiscountError(err.message || 'Failed to apply code.')
    } finally {
      setValidatingCode(false)
    }
  }

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null)
    setDiscountInput('')
    setDiscountError(null)
    if (paymentType === 'sponsored') {
      setPaymentType('stripe')
    }
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
          paymentType: isFree ? 'sponsored' : paymentType,
          discountCode: appliedDiscount?.code,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      if (isFree && data.success) {
        // Sponsored / 100% Free ticket claimed!
        setSponsoredSuccessCode(data.ticketCode)
        setStep('sponsored_success')
      } else if (paymentType === 'stripe' && data.stripeUrl) {
        // Redirect to Stripe Checkout page
        window.location.href = data.stripeUrl
      } else if (paymentType === 'bank_transfer') {
        // Transition to success screen for bank transfers
        setBankSuccessCode(data.ticketCode)
        setBankAmountToPay(data.amountToPay !== undefined ? data.amountToPay : finalPrice)
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
    setTimeout(() => {
      setStep('ticket')
      setName('')
      setEmail('')
      setPaymentType('stripe')
      setAppliedDiscount(null)
      setDiscountInput('')
      setDiscountError(null)
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
        {step !== 'bank_success' && step !== 'sponsored_success' && (
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
              03. Confirmation
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
                  Provide your information and any sponsored or discount code.
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

                {/* Discount / Sponsored Code Section */}
                <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/70 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-gold" />
                    Sponsored or Promo Code
                  </label>

                  {appliedDiscount ? (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 shrink-0 text-green-400" />
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider">
                            {appliedDiscount.code} Applied!
                          </p>
                          <p className="text-[11px] text-green-400/80">
                            {appliedDiscount.isFree
                              ? '100% Free Sponsored Ticket'
                              : `${appliedDiscount.discountPercent}% Discount Applied`}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveDiscount}
                        className="text-xs text-white/60 hover:text-white underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountInput}
                        onChange={(e) => setDiscountInput(e.target.value.toUpperCase())}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleApplyDiscount()
                          }
                        }}
                        placeholder="e.g. SPM3SPONSORED"
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 font-body text-sm uppercase tracking-wider"
                      />
                      <Button
                        type="button"
                        onClick={handleApplyDiscount}
                        disabled={validatingCode || !discountInput.trim()}
                        className="bg-white/10 hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider px-4 rounded-lg transition-colors shrink-0"
                      >
                        {validatingCode ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                      </Button>
                    </div>
                  )}

                  {discountError && (
                    <p className="text-red-400 text-xs font-body font-semibold">{discountError}</p>
                  )}
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
                  {isFree ? 'Confirm Your Pass' : 'Payment Method'}
                </DialogTitle>
                <DialogDescription className="font-body text-white/60 text-sm md:text-base mt-2">
                  {isFree
                    ? 'Your pass is fully sponsored! Confirm to receive your official ticket and QR code.'
                    : `Select how you would like to secure your ${ticketType} pass.`}
                </DialogDescription>
              </DialogHeader>

              {/* Order summary box */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/60 block">
                    Selected Pass
                  </span>
                  <span className="font-heading font-bold text-base text-white capitalize">
                    SPM 3.0 {ticketType} Pass
                  </span>
                  {appliedDiscount && !isFree && (
                    <span className="text-[11px] text-green-400 block font-medium mt-0.5">
                      {appliedDiscount.discountPercent}% discount applied ({appliedDiscount.code})
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-white/60 block">Total</span>
                  {isFree ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm line-through text-white/40">£{basePrice}</span>
                      <span className="font-heading font-black text-xl text-green-400">FREE</span>
                    </div>
                  ) : appliedDiscount ? (
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-sm line-through text-white/40">£{basePrice}</span>
                      <span className="font-heading font-bold text-xl text-gold">
                        £{finalPrice.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="font-heading font-bold text-xl text-gold">
                      £{basePrice}
                    </span>
                  )}
                </div>
              </div>

              {isFree ? (
                /* 100% Sponsored Ticket Banner */
                <div className="bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/40 rounded-xl p-5 flex items-start gap-3">
                  <Gift className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-white text-base">
                      Sponsored Invitation
                    </h4>
                    <p className="text-white/70 text-xs mt-1 leading-relaxed">
                      Code <strong className="text-gold">{appliedDiscount?.code}</strong> grants you
                      complimentary access to this masterclass. Click below to claim your ticket and
                      receive your entry pass via email.
                    </p>
                  </div>
                </div>
              ) : (
                /* Standard Payment Methods with Discounted Pricing */
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
                        Pay £{finalPrice.toFixed(2)} securely via card. Instant confirmation.
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
                        Transfer £{finalPrice.toFixed(2)} directly to our bank account.
                      </span>
                    </div>
                    <span className="bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-white/10 shrink-0">
                      Manual
                    </span>
                  </div>
                </div>
              )}

              {error && (
                <p className="text-red-400 text-xs font-body font-semibold mt-1">{error}</p>
              )}

              <div className="grid grid-cols-3 gap-4 mt-2">
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
                  className={cn(
                    'text-navy font-body font-bold text-base py-6 rounded-lg uppercase tracking-wider shadow-lg gap-2 col-span-2',
                    isFree
                      ? 'bg-green-500 hover:bg-green-400 shadow-green-500/20 text-black'
                      : 'bg-gold hover:bg-gold/90 shadow-gold/10',
                  )}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Processing
                    </>
                  ) : isFree ? (
                    <>
                      Claim Free Ticket <Sparkles className="w-4 h-4" />
                    </>
                  ) : paymentType === 'stripe' ? (
                    <>
                      Pay £{finalPrice.toFixed(2)} <Sparkles className="w-4 h-4" />
                    </>
                  ) : (
                    <>Submit Ticket (£{finalPrice.toFixed(2)})</>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Sponsored Success Screen */}
          {step === 'sponsored_success' && (
            <motion.div
              key="step-sponsored-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-6 text-center"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <DialogHeader className="text-center">
                <DialogTitle className="font-heading text-2xl md:text-3xl text-white">
                  Ticket Confirmed! 🎉
                </DialogTitle>
                <DialogDescription className="font-body text-white/70 text-sm md:text-base mt-2">
                  Welcome aboard, <strong className="text-white">{name}</strong>! Your sponsored{' '}
                  <span className="capitalize text-gold font-bold">{ticketType}</span> pass has been
                  activated.
                </DialogDescription>
              </DialogHeader>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4">
                <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Your Official Ticket Code
                  </span>
                  <span className="font-heading font-black text-2xl text-gold tracking-wider">
                    {sponsoredSuccessCode}
                  </span>
                </div>

                <p className="text-xs text-white/70 font-body leading-relaxed">
                  A confirmation email with your official pass and QR code has been dispatched to{' '}
                  <strong className="text-white">{email}</strong>.
                </p>

                <div className="bg-gold/10 border border-gold/20 p-3 rounded-lg text-xs text-white/80 font-body">
                  Please keep your ticket code handy on the day of the event for check-in.
                </div>
              </div>

              <Button
                onClick={handleClose}
                className="bg-gold hover:bg-gold/90 text-navy font-body font-bold py-4 rounded-lg uppercase tracking-wider mt-2"
              >
                Done
              </Button>
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
                    £{bankAmountToPay.toFixed(2)}
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
