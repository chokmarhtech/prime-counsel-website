'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, AlertCircle, Loader2, Calendar, Clock, ArrowRight } from 'lucide-react'

function VoteContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const choice = searchParams.get('choice')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [voterName, setVoterName] = useState<string>('')
  const [selectedDateLabel, setSelectedDateLabel] = useState<string>('')
  const [selectedTimeLabel, setSelectedTimeLabel] = useState<string>('')

  useEffect(() => {
    if (!code || !choice) {
      setError('Invalid link. Missing ticket code or choice.')
      setLoading(false)
      return
    }

    const choiceLabelMap: Record<string, { date: string; time: string }> = {
      saturday_8pm: { date: 'Saturday, 28th November 2026', time: '8:00 PM GMT' },
      sunday_9pm: { date: 'Sunday, 29th November 2026', time: '9:00 PM GMT' },
    }

    const details = choiceLabelMap[choice]
    if (details) {
      setSelectedDateLabel(details.date)
      setSelectedTimeLabel(details.time)
    }

    fetch(`/api/spm/vote?code=${encodeURIComponent(code)}&choice=${encodeURIComponent(choice)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setVoterName(data.name || 'Valued Attendee')
        }
      })
      .catch((err) => {
        console.error('Vote submission error', err)
        setError('Failed to record your choice. Please try again or reply directly to the email.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [code, choice])

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin mb-4" />
        <h2 className="text-lg font-serif text-navy">Recording your preference...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-serif text-navy mb-2">Unable to Record Choice</h2>
        <p className="text-sm text-neutral-600 max-w-md mb-6">{error}</p>
        <p className="text-xs text-neutral-400">
          You can reply directly to the email with your preferred date and our team will note it.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-full flex items-center justify-center px-4 py-16 bg-[#FAF9F6]">
      <div className="max-w-md w-full bg-white border border-[#E5DFD0] rounded-xl shadow-lg overflow-hidden text-center">
        
        {/* Header Band */}
        <div className="bg-[#0B1C3D] py-8 px-6 text-white border-b-2 border-gold">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 text-gold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="text-[10px] uppercase font-bold tracking-[2px] text-gold mb-1">
            SPM 3.0 Virtual Session
          </div>
          <h1 className="text-xl font-serif font-normal">Preference Recorded</h1>
        </div>

        {/* Content */}
        <div className="p-8 text-left">
          <p className="text-neutral-700 text-sm leading-relaxed mb-5">
            Thank you, <strong className="text-navy">{voterName}</strong>. Your preferred date has been recorded for the exclusive session with Coach Ayoola:
          </p>

          {/* Clean Receipt-style Card */}
          <div className="bg-[#FAF9F6] border border-[#E5DFD0] rounded-lg p-5 mb-6 space-y-2">
            <div className="flex items-center gap-2.5 text-navy font-semibold text-sm">
              <Calendar className="w-4 h-4 text-gold shrink-0" />
              <span>{selectedDateLabel}</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-600 text-xs font-medium">
              <Clock className="w-4 h-4 text-gold shrink-0" />
              <span>{selectedTimeLabel}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-500 leading-relaxed mb-6">
            Once polling closes, we will analyze responses and dispatch the confirmed session date along with your Zoom joining credentials.
          </p>

          <div className="pt-4 border-t border-neutral-100 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-navy hover:text-gold text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Return to Prime Counsel <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SpmVotePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
        </div>
      }
    >
      <VoteContent />
    </Suspense>
  )
}
