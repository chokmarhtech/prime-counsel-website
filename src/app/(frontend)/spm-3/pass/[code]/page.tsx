import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { generateQrCodeDataUrl } from '@/lib/qrcode'
import { MapPin, Calendar, Clock, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ code: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  return {
    title: `SPM 3.0 Pass - ${code.toUpperCase()} | Prime Counsel`,
    description: 'Your official digital access boarding pass for the Strategic Positioning Masterclass 3.0.',
  }
}

export default async function SpmPassPage({ params }: Props) {
  const { code } = await params
  const decodedCode = decodeURIComponent(code).toUpperCase().trim()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'spm-registrations',
    where: {
      ticketCode: { equals: decodedCode },
    },
    limit: 1,
  })

  const registration = result.docs?.[0]

  if (!registration) {
    return (
      <div className="min-h-screen bg-[#04082B] text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0B0F3A] border border-[#C9A84C]/30 rounded-2xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            ✕
          </div>
          <h1 className="font-heading text-2xl mb-2 text-white">Ticket Not Found</h1>
          <p className="text-white/70 text-sm mb-6">
            We could not find an SPM 3.0 ticket with code <span className="font-mono text-[#C9A84C] font-bold">{decodedCode}</span>.
          </p>
          <Link
            href="/events/spm-3"
            className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0B1C3D] font-bold text-sm px-6 py-3 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to SPM 3.0
          </Link>
        </div>
      </div>
    )
  }

  const isPhysical = registration.ticketType === 'physical'
  const isCheckedIn = Boolean(registration.checkedIn)
  const isPaid = registration.status === 'paid'
  
  // Pass URL for scanning / validation
  const validationUrl = `${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://primecounsel.co.uk'}/spm-3/pass/${registration.ticketCode}`
  const qrDataUrl = await generateQrCodeDataUrl(validationUrl, { width: 320 })

  return (
    <div className="min-h-screen bg-[#04082B] text-white py-12 px-4 sm:px-6 flex flex-col items-center justify-center selection:bg-[#C9A84C] selection:text-[#0B1C3D]">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A84C]/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Top Branding */}
        <div className="flex items-center justify-between mb-6 px-2">
          <Link href="/" className="inline-block opacity-90 hover:opacity-100 transition-opacity">
            <img src="/logos/logo-light.svg" alt="Prime Counsel" className="h-8 w-auto" />
          </Link>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/30 px-3 py-1 rounded-full">
            Official Pass
          </span>
        </div>

        {/* Boarding Pass Ticket Card */}
        <div className="bg-[#0B1038] border border-[#C9A84C]/30 rounded-3xl overflow-hidden shadow-2xl relative backdrop-blur-md">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#0B1C3D] via-[#121950] to-[#0B1C3D] p-6 border-b border-[#C9A84C]/20 text-center relative">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C] mb-1">
              Strategic Positioning Masterclass 3.0
            </p>
            <h1 className="font-heading text-2xl sm:text-3xl text-white font-normal uppercase tracking-wider">
              Executive Pass
            </h1>

            {/* Check-in status pill */}
            <div className="mt-4 flex justify-center">
              {isCheckedIn ? (
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold px-3.5 py-1.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Checked In at Venue
                </span>
              ) : isPaid ? (
                <span className="inline-flex items-center gap-1.5 bg-[#C9A84C]/20 text-[#E5DFD0] border border-[#C9A84C]/40 text-xs font-semibold px-3.5 py-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
                  Verified & Ready for Gate Entry
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold px-3.5 py-1.5 rounded-full">
                  Payment Pending
                </span>
              )}
            </div>
          </div>

          {/* Attendee Info & QR Section */}
          <div className="p-6 sm:p-8 text-center space-y-6">
            {/* Attendee Name & Ticket Type */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Attendee</p>
              <h2 className="font-heading text-2xl text-white font-medium">{registration.name}</h2>
              <span className="inline-block mt-2 font-body text-xs font-bold uppercase tracking-wider text-[#0B1C3D] bg-[#C9A84C] px-3.5 py-1 rounded-md">
                {isPhysical ? 'Physical Pass (In-Person)' : 'Virtual Pass (Online Stream)'}
              </span>
            </div>

            {/* QR Code Container */}
            <div className="bg-white p-4 rounded-2xl inline-block mx-auto shadow-inner border border-white/10">
              <img
                src={qrDataUrl}
                alt="Ticket QR Code"
                width={240}
                height={240}
                className="w-56 h-56 sm:w-60 sm:h-60 mx-auto block"
              />
              <div className="mt-2 text-[10px] font-mono font-bold tracking-widest text-[#0B1C3D] uppercase">
                Scan for Instant Entry
              </div>
            </div>

            {/* Ticket Code Box */}
            <div className="bg-[#050926] border border-white/10 rounded-xl p-3.5 max-w-[280px] mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] mb-0.5">
                Ticket Reference Code
              </p>
              <p className="font-mono text-xl font-bold tracking-widest text-white">
                {registration.ticketCode}
              </p>
            </div>
          </div>

          {/* Perforated Divider */}
          <div className="relative flex items-center justify-between px-4">
            <div className="w-6 h-6 -ml-7 bg-[#04082B] rounded-full border-r border-[#C9A84C]/30" />
            <div className="w-full border-t-2 border-dashed border-white/20 my-1" />
            <div className="w-6 h-6 -mr-7 bg-[#04082B] rounded-full border-l border-[#C9A84C]/30" />
          </div>

          {/* Event Details Section */}
          <div className="p-6 sm:p-8 bg-[#070C2D]/60 space-y-4 text-left text-sm text-white/80">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-white text-xs uppercase tracking-wider">Date</p>
                <p className="text-white/80">Saturday, 21st November 2026</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-white text-xs uppercase tracking-wider">Time</p>
                <p className="text-white/80">10:00 AM – 4:00 PM (GMT) • Doors open 9:15 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-white text-xs uppercase tracking-wider">Venue</p>
                {isPhysical ? (
                  <p className="text-white/80 leading-relaxed">
                    Conference Centre, Aston University<br />
                    Birmingham, B4 7ET, United Kingdom
                  </p>
                ) : (
                  <p className="text-white/80">
                    Live Interactive Stream (Link sent to {registration.email})
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 text-center text-xs text-white/50 space-y-3">
          <p>
            Please show this digital pass on your phone or provide ticket code{' '}
            <strong className="text-white">{registration.ticketCode}</strong> to the ushers at the entrance.
          </p>
          <div className="pt-2">
            <Link href="/" className="text-[#C9A84C] hover:underline font-semibold">
              ← Return to Prime Counsel Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
