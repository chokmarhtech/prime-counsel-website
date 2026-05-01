'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/frontend/AnimatedSection'
import { MdMail } from 'react-icons/md'
import { FaInstagram, FaYoutube, FaTiktok, FaPhoneAlt, FaMapPin } from 'react-icons/fa'
import { CONTACT_INFO } from '@/constants'
import Link from 'next/link'
import { ChevronDown, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react'

const SERVICES = [
  'Vision Clarity Call',
  'One-on-one Mentorship',
  'Prime Emerging Leaders Cohort 2026',
  'Prime Builders Cohort 2026',
  'ASKPRIME™',
  'SEEKCOUNSEL™',
  'Talks & Keynotes',
  'Coaching & Mentorship',
  'Workshop & Training',
  'Organizational Advisory',
  'Other',
]

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      setForm({ name: '', email: '', service: '', message: '' })
    } catch {
      setErrorMsg('Unable to connect. Please check your internet and try again.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full border border-border bg-background rounded-md px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-colors'

  return (
    <>
      <section className="section-padding-1 bg-background">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <AnimatedSection>
              <h2 className="heading-display text-2xl md:text-3xl text-foreground mb-8">
                GET IN TOUCH
              </h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <MdMail className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <Link
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="font-body text-foreground hover:text-secondary transition-colors"
                    >
                      {CONTACT_INFO.email}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <FaPhoneAlt className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Phone
                    </p>
                    <Link
                      href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                      className="font-body text-foreground hover:text-secondary transition-colors"
                    >
                      {CONTACT_INFO.phone}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <FaMapPin className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Location
                    </p>
                    <p className="font-body text-foreground">United Kingdom</p>
                  </div>
                </div>

                {/* Socials */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-4">
                    Connect With Us
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      href={CONTACT_INFO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary transition-all group"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="w-4 h-4 text-secondary group-hover:text-primary-foreground transition-colors" />
                    </Link>
                    <Link
                      href={CONTACT_INFO.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary transition-all group"
                      aria-label="YouTube"
                    >
                      <FaYoutube className="w-4 h-4 text-secondary group-hover:text-primary-foreground transition-colors" />
                    </Link>
                    <Link
                      href={CONTACT_INFO.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary transition-all group"
                      aria-label="TikTok"
                    >
                      <FaTiktok className="w-4 h-4 text-secondary group-hover:text-primary-foreground transition-colors" />
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label
                      htmlFor="name"
                      className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block"
                    >
                      Full Name <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block"
                    >
                      Email Address <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block"
                    >
                      Services <span className="text-secondary">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        required
                        value={form.service}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option value="">Select a service</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block"
                    >
                      Message <span className="text-secondary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Error feedback */}
                  {status === 'error' && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-md">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <p className="font-body text-sm text-red-600">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="font-body font-semibold tracking-wide uppercase text-sm bg-secondary text-secondary-foreground px-8 py-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {status === 'success' && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-background rounded-xl p-8 md:p-12 shadow-2xl border border-border animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setStatus('idle')}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-8">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              
              <h3 className="font-heading text-2xl text-navy uppercase tracking-widest mb-4">
                Message Sent
              </h3>
              
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
                Thank you for reaching out to Prime Counsel. A confirmation has been sent to your email and our team will be in touch within 1–2 business days.
              </p>

              <button
                onClick={() => setStatus('idle')}
                className="w-full font-body font-semibold tracking-widest uppercase text-xs bg-secondary text-secondary-foreground py-4 rounded-md hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ContactForm

