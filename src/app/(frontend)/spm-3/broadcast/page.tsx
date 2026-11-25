'use client'

import React, { useState, useEffect } from 'react'
import {
  Send,
  Lock,
  Users,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  RefreshCw,
  Sparkles,
  Heart,
  Calendar,
  Vote,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// 1. Pre-Event Broadcast Defaults
const PRE_PHYSICAL_SUBJECT = 'Just One More Sleep!'
const PRE_PHYSICAL_MESSAGE = `I hope you are as excited as I am about tomorrow's Strategic Positioning MasterClass 3.0.

We have put a lot of thought into creating an experience that goes beyond the usual masterclass. From the conversations and learning sessions to the book launch, live business pitch and networking opportunities, I am confident you will have a memorable experience.

As you prepare for tomorrow, here are two things to keep in mind:
1. Registration opens at 9:30 AM. Please endeavour to arrive early.
2. Come with an open mind, a willingness to learn and an eagerness to connect.
I encourage you to make the most of every moment. Sometimes, the conversations you have and the people you meet in a room can become the starting point of something significant.

Thank you for making the decision to be part of this experience.

We look forward to welcoming you tomorrow!`

const PRE_VIRTUAL_SUBJECT = 'The Countdown is Almost Over!'
const PRE_VIRTUAL_MESSAGE = `Tomorrow, we finally get to experience the Strategic Positioning MasterClass 3.0.

We are excited to have you joining us virtually, and we want to ensure you don't miss a moment of this experience.

From insightful conversations and practical learning to the opportunity to engage with our speakers and ask questions, we have an exciting experience lined up for you.

BEFORE WE MEET TOMORROW:
• Keep your Zoom joining details somewhere accessible.
• Ensure your internet connection is stable.
• Settle into a comfortable, quiet space where you can participate fully.
• Join a few minutes before 10 AM so you don't miss the opening session.

We encourage you to come with an open mind, your questions and a willingness to make the most of every session.

Thank you for being part of SPM 3.0. Your presence matters, and we can't wait to share this experience with you.

See you tomorrow!`

const VIRTUAL_DEFAULT_ZOOM = 'https://us06web.zoom.us/j/86710598357?pwd=TP6ETM7hz3Zzr2bRRGHxzU6XMbUYNE.1'
const VIRTUAL_DEFAULT_ID = '867 1059 8357'
const VIRTUAL_DEFAULT_PASSCODE = '262947'

// 2. Post-Event Follow-Up Defaults
const POST_PHYSICAL_SUBJECT = 'Thank You for attending SPM 3'
const POST_PHYSICAL_MESSAGE = `What an incredible experience SPM 3.0 was!

On behalf of Prime Counsel and Coach Ayoola, I want to sincerely thank you for being part of the 3rd edition of the Strategic Positioning MasterClass.

Your presence made this experience even more meaningful. We hope you left with valuable insights, new connections, fresh perspectives and, most importantly, a renewed understanding of what it takes to position yourself for opportunities and create measurable value.

A Few Things We'd Love You to Do:`

const POST_VIRTUAL_SUBJECT = 'Update & Exclusive Session with Coach Ayoola | SPM 3.0'
const POST_VIRTUAL_MESSAGE = `We are excited to bring you the Virtual Strategic Positioning MasterClass 3.0!

As promised, Coach Ayoola is committed to ensuring that our virtual attendees get the full SPM 3.0 experience and the value they signed up for. This special virtual session will be completely FREE of charge.

However, before we finalize the arrangements, we would love to know which of these dates works best for you.

Please find the two available options below:
Option 1:
Date: Saturday, 28th November 2026
Time: 8:00 PM GMT

Option 2:
Date: Sunday, 29th November 2026
Time: 9:00 PM GMT

Kindly let us know your preferred date by clicking your choice below or replying to this email.
Your response will help us choose a date that allows as many of you as possible to participate.

We look forward to having you experience SPM 3.0!`

export default function SpmBroadcastPage() {
  const [passcode, setPasscode] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')

  // Campaigns
  const [campaign, setCampaign] = useState<'post_event' | 'pre_event'>('post_event')
  const [audience, setAudience] = useState<'physical' | 'virtual'>('physical')

  const [subject, setSubject] = useState(POST_PHYSICAL_SUBJECT)
  const [message, setMessage] = useState(POST_PHYSICAL_MESSAGE)
  const [meetingLink, setMeetingLink] = useState(VIRTUAL_DEFAULT_ZOOM)
  const [meetingId, setMeetingId] = useState(VIRTUAL_DEFAULT_ID)
  const [meetingPasscode, setMeetingPasscode] = useState(VIRTUAL_DEFAULT_PASSCODE)

  // Counts
  const [counts, setCounts] = useState<{ physical: number; virtual: number }>({
    physical: 0,
    virtual: 0,
  })
  const [loadingCounts, setLoadingCounts] = useState(false)

  // Live Poll Tally
  const [pollTally, setPollTally] = useState<{
    saturday: number
    sunday: number
    pending: number
    totalVirtual: number
    voters: Array<{ name: string; email: string; choice: string | null; date: string | null }>
  } | null>(null)
  const [loadingPoll, setLoadingPoll] = useState(false)

  // Test mode
  const [testEmail, setTestEmail] = useState('')
  const [isSendingTest, setIsSendingTest] = useState(false)
  const [testSuccess, setTestSuccess] = useState('')

  // Live broadcast
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [broadcastResult, setBroadcastResult] = useState<{
    success: boolean
    sent: number
    failed: number
    message?: string
  } | null>(null)
  const [error, setError] = useState('')

  // Fetch poll stats
  const fetchPollTally = async (code: string) => {
    try {
      setLoadingPoll(true)
      const res = await fetch('/api/spm/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: code }),
      })
      const data = await res.json()
      if (res.ok) {
        setPollTally(data)
      }
    } catch (e) {
      console.error('Failed to load poll tally', e)
    } finally {
      setLoadingPoll(false)
    }
  }

  // Pre-fill smart defaults when switching campaign or audience
  const syncFormDefaults = (targetCampaign: 'post_event' | 'pre_event', targetAudience: 'physical' | 'virtual') => {
    setError('')
    setTestSuccess('')
    setBroadcastResult(null)

    if (targetCampaign === 'post_event') {
      if (targetAudience === 'physical') {
        setSubject(POST_PHYSICAL_SUBJECT)
        setMessage(POST_PHYSICAL_MESSAGE)
      } else {
        setSubject(POST_VIRTUAL_SUBJECT)
        setMessage(POST_VIRTUAL_MESSAGE)
      }
    } else {
      if (targetAudience === 'physical') {
        setSubject(PRE_PHYSICAL_SUBJECT)
        setMessage(PRE_PHYSICAL_MESSAGE)
      } else {
        setSubject(PRE_VIRTUAL_SUBJECT)
        setMessage(PRE_VIRTUAL_MESSAGE)
        setMeetingLink(VIRTUAL_DEFAULT_ZOOM)
        setMeetingId(VIRTUAL_DEFAULT_ID)
        setMeetingPasscode(VIRTUAL_DEFAULT_PASSCODE)
      }
    }
  }

  const handleCampaignChange = (target: 'post_event' | 'pre_event') => {
    setCampaign(target)
    syncFormDefaults(target, audience)
  }

  const handleAudienceChange = (target: 'physical' | 'virtual') => {
    setAudience(target)
    syncFormDefaults(campaign, target)
  }

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')

    try {
      const res = await fetch(`/api/spm/broadcast/counts?passcode=${encodeURIComponent(passcode)}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Invalid passcode.')
      }

      setIsAuthenticated(true)
      setCounts({
        physical: data.physicalCount || 0,
        virtual: data.virtualCount || 0,
      })
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('spm_broadcast_passcode', passcode)
      }
      fetchPollTally(passcode)
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed.')
    }
  }

  // Restore session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('spm_broadcast_passcode')
      if (saved) {
        setPasscode(saved)
        fetch(`/api/spm/broadcast/counts?passcode=${encodeURIComponent(saved)}`)
          .then((r) => r.json())
          .then((data) => {
            if (data.physicalCount !== undefined) {
              setIsAuthenticated(true)
              setCounts({
                physical: data.physicalCount,
                virtual: data.virtualCount,
              })
              fetchPollTally(saved)
            }
          })
          .catch(() => {})
      }
    }
  }, [])

  // Refresh counts
  const refreshCounts = async () => {
    try {
      setLoadingCounts(true)
      const res = await fetch(`/api/spm/broadcast/counts?passcode=${encodeURIComponent(passcode)}`)
      const data = await res.json()
      if (res.ok) {
        setCounts({
          physical: data.physicalCount || 0,
          virtual: data.virtualCount || 0,
        })
      }
      fetchPollTally(passcode)
    } finally {
      setLoadingCounts(false)
    }
  }

  // Send Test Email
  const handleSendTest = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      setError('Please provide a valid email address to test.')
      return
    }

    setIsSendingTest(true)
    setError('')
    setTestSuccess('')

    const campaignTypePayload =
      campaign === 'post_event'
        ? audience === 'physical'
          ? 'thank_you'
          : 'virtual_reschedule'
        : 'pre_event'

    try {
      const res = await fetch('/api/spm/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode,
          audience,
          campaignType: campaignTypePayload,
          subject,
          message,
          meetingLink: audience === 'virtual' ? meetingLink : undefined,
          meetingPasscode: audience === 'virtual' ? meetingPasscode : undefined,
          meetingId: audience === 'virtual' ? meetingId : undefined,
          isTest: true,
          testEmail,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send test email.')
      }

      setTestSuccess(data.message || `Test email dispatched to ${testEmail}! Check your inbox.`)
    } catch (err: any) {
      setError(err.message || 'An error occurred during test send.')
    } finally {
      setIsSendingTest(false)
    }
  }

  // Push Live Broadcast
  const handleBroadcast = async () => {
    const recipientCount = audience === 'physical' ? counts.physical : counts.virtual
    const campaignLabel =
      campaign === 'post_event'
        ? audience === 'physical'
          ? 'Post-Event Thank You'
          : 'Virtual Reschedule Poll'
        : 'Pre-Event Countdown'

    const confirmMsg = `⚠️ ARE YOU SURE?\n\nYou are about to send "${subject}" to all ${recipientCount} confirmed ${audience.toUpperCase()} attendees as a [${campaignLabel}].\n\nClick OK to start delivery.`

    if (!window.confirm(confirmMsg)) return

    setIsBroadcasting(true)
    setError('')
    setTestSuccess('')
    setBroadcastResult(null)

    const campaignTypePayload =
      campaign === 'post_event'
        ? audience === 'physical'
          ? 'thank_you'
          : 'virtual_reschedule'
        : 'pre_event'

    try {
      const res = await fetch('/api/spm/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode,
          audience,
          campaignType: campaignTypePayload,
          subject,
          message,
          meetingLink: audience === 'virtual' ? meetingLink : undefined,
          meetingPasscode: audience === 'virtual' ? meetingPasscode : undefined,
          meetingId: audience === 'virtual' ? meetingId : undefined,
          isTest: false,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Broadcast failed.')
      }

      setBroadcastResult({
        success: true,
        sent: data.successCount,
        failed: data.failedCount,
        message: `Successfully delivered to ${data.successCount} of ${data.totalRecipients} attendees!`,
      })
      refreshCounts()
    } catch (err: any) {
      setError(err.message || 'An error occurred while pushing broadcast.')
    } finally {
      setIsBroadcasting(false)
    }
  }

  // -------------------------------------------------------------
  // Unauthenticated Login Gate
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b1e] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0a1128] border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/60 text-center">
          <div className="w-16 h-16 bg-gold/10 border border-gold/40 text-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-serif text-white font-medium mb-1 tracking-tight">
            SPM 3.0 Broadcast Desk
          </h1>
          <p className="text-xs text-white/50 uppercase tracking-widest mb-6">
            Organizer & Dispatch Command
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Gate Passcode"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-center text-sm tracking-widest focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/60"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-950/40 border border-red-800/50 p-3 rounded-lg text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-6 rounded-xl text-sm tracking-wider uppercase transition-all shadow-lg shadow-gold/20 cursor-pointer"
            >
              Access Broadcast Desk &rarr;
            </Button>
          </form>
        </div>
      </div>
    )
  }

  const recipientCount = audience === 'physical' ? counts.physical : counts.virtual

  return (
    <div className="min-h-screen bg-[#040817] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-[#0A1128] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-1 relative z-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gold/15 text-gold border border-gold/30">
                <Sparkles className="w-3 h-3" /> Live Event Desk
              </span>
              <span className="text-xs text-white/40 font-mono">Saturday, 21 Nov 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-tight">
              SPM 3.0 Email Dispatcher
            </h1>
            <p className="text-xs text-white/60">
              Personalized emails dispatched via official <code className="text-gold">info@primecounsel.co.uk</code>
            </p>
          </div>

          {/* Counts Widget */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-xl z-10">
            <div className="text-right border-r border-white/10 pr-3">
              <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold">Physical</div>
              <div className="text-xl font-bold text-gold">{counts.physical}</div>
            </div>
            <div className="text-left pl-1">
              <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold">Virtual</div>
              <div className="text-xl font-bold text-sky-400">{counts.virtual}</div>
            </div>
            <button
              onClick={refreshCounts}
              disabled={loadingCounts}
              title="Refresh attendee counts"
              className="ml-2 text-white/40 hover:text-white p-1 cursor-pointer transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loadingCounts ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Campaign Switcher: Post-Event (Thank you & Poll) vs Pre-Event (Countdown) */}
        <div className="bg-[#0A1128] border border-white/10 rounded-2xl p-2 shadow-xl flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleCampaignChange('post_event')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              campaign === 'post_event'
                ? 'bg-gold text-navy shadow-lg shadow-gold/20 font-black'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Heart className="w-4 h-4" /> Post-Event Follow-Up (Thank You & Virtual Poll)
          </button>
          <button
            type="button"
            onClick={() => handleCampaignChange('pre_event')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              campaign === 'pre_event'
                ? 'bg-gold text-navy shadow-lg shadow-gold/20 font-black'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" /> Pre-Event Reminders (Passes & Zoom Links)
          </button>
        </div>

        {/* Virtual Live Poll Results Bar (Visible when in Post-Event + Virtual Tab) */}
        {campaign === 'post_event' && audience === 'virtual' && (
          <div className="bg-[#0d1738] border border-sky-500/30 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Vote className="w-5 h-5 text-sky-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Live Virtual Poll Results (Coach Ayoola Reschedule)
                </h3>
              </div>
              <button
                onClick={() => fetchPollTally(passcode)}
                disabled={loadingPoll}
                className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer font-semibold"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingPoll ? 'animate-spin' : ''}`} /> Refresh Votes
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[11px] uppercase tracking-wider text-gold font-bold mb-1">
                  Option 1: Saturday 28th Nov (8 PM)
                </div>
                <div className="text-2xl font-bold text-white">{pollTally?.saturday ?? 0} Votes</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[11px] uppercase tracking-wider text-sky-400 font-bold mb-1">
                  Option 2: Sunday 29th Nov (9 PM)
                </div>
                <div className="text-2xl font-bold text-white">{pollTally?.sunday ?? 0} Votes</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-[11px] uppercase tracking-wider text-white/40 font-bold mb-1">
                  Awaiting Response
                </div>
                <div className="text-2xl font-bold text-white/70">{pollTally?.pending ?? counts.virtual} Attendees</div>
              </div>
            </div>

            {/* Attendee Vote Breakdown Table */}
            {pollTally?.voters && pollTally.voters.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                  Attendee Roster & Vote Breakdown
                </div>
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-white/60 text-[10px] uppercase tracking-wider">
                        <th className="py-2.5 px-3">Attendee Name</th>
                        <th className="py-2.5 px-3">Email</th>
                        <th className="py-2.5 px-3">Selection</th>
                        <th className="py-2.5 px-3 text-right">Vote Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {pollTally.voters.map((voter, idx) => (
                        <tr key={idx} className="hover:bg-white/5">
                          <td className="py-2 px-3 font-medium text-white">{voter.name}</td>
                          <td className="py-2 px-3 text-white/60 font-mono text-[11px]">{voter.email}</td>
                          <td className="py-2 px-3">
                            {voter.choice === 'saturday_8pm' ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gold/20 text-gold border border-gold/40">
                                Saturday (8 PM)
                              </span>
                            ) : voter.choice === 'sunday_9pm' ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-sky-400/20 text-sky-300 border border-sky-400/40">
                                Sunday (9 PM)
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold text-white/40 bg-white/5">
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-right text-white/40 text-[11px]">
                            {voter.date ? new Date(voter.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Audience Selector Tabs */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleAudienceChange('physical')}
            className={`p-5 rounded-2xl border transition-all text-left flex items-start gap-4 cursor-pointer ${
              audience === 'physical'
                ? 'bg-[#0E1A3D] border-gold shadow-lg shadow-gold/10'
                : 'bg-[#0A1128] border-white/10 hover:border-white/20'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                audience === 'physical' ? 'bg-gold text-navy font-bold' : 'bg-white/5 text-white/60'
              }`}
            >
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gold font-bold">
                {campaign === 'post_event' ? 'Thank You Broadcast' : 'Physical Attendees'}
              </div>
              <div className="text-lg font-bold text-white">Physical ({counts.physical})</div>
              <div className="text-xs text-white/50 mt-1">
                {campaign === 'post_event'
                  ? 'Includes feedback form, Amazon book link & certificates'
                  : 'Includes QR boarding passes & Conference Aston details'}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleAudienceChange('virtual')}
            className={`p-5 rounded-2xl border transition-all text-left flex items-start gap-4 cursor-pointer ${
              audience === 'virtual'
                ? 'bg-[#0E1A3D] border-sky-400 shadow-lg shadow-sky-400/10'
                : 'bg-[#0A1128] border-white/10 hover:border-white/20'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                audience === 'virtual' ? 'bg-sky-400 text-navy font-bold' : 'bg-white/5 text-white/60'
              }`}
            >
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-sky-400 font-bold">
                {campaign === 'post_event' ? 'Exclusive Makeup Session' : 'Virtual Attendees'}
              </div>
              <div className="text-lg font-bold text-white">Virtual ({counts.virtual})</div>
              <div className="text-xs text-white/50 mt-1">
                {campaign === 'post_event'
                  ? 'Includes interactive 1-click date poll for Coach Ayoola'
                  : 'Includes Zoom joining link, Meeting ID & Passcode'}
              </div>
            </div>
          </button>
        </div>

        {/* Message Configuration Form */}
        <div className="bg-[#0A1128] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Subject Line */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Email Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-gold/60"
            />
          </div>

          {/* Email Body Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70">
                Message Body
              </label>
              <span className="text-[11px] text-white/40">
                Automatically opens with "Dear [Attendee Name]," and signs off with Titilayo's team signoff.
              </span>
            </div>
            <textarea
              rows={12}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm leading-relaxed focus:outline-none focus:border-gold/60 font-sans"
            />
          </div>

          {/* Special Action Badges depending on campaign */}
          {campaign === 'post_event' && audience === 'physical' && (
            <div className="bg-[#050B1F] border border-gold/30 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Included Action Cards in this Physical Follow-Up:
              </div>
              <ul className="text-xs text-white/70 space-y-1 list-disc list-inside">
                <li><strong>📝 Feedback Form:</strong> Button linking directly to Google Form</li>
                <li><strong>📚 Coach Ayoola's Book:</strong> Button linking directly to Amazon ("From Raw Talent to Market Value")</li>
                <li><strong>🎓 Certificate Notice:</strong> Official participation certificate dispatch announcement</li>
              </ul>
            </div>
          )}

          {campaign === 'post_event' && audience === 'virtual' && (
            <div className="bg-[#050B1F] border border-sky-400/30 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Vote className="w-4 h-4" /> 1-Click Interactive Poll Buttons in this Email:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-xs">
                  <div className="font-bold text-gold">Option 1:</div>
                  <div className="text-white/80">Saturday, 28th November 2026 at 8:00 PM GMT</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-xs">
                  <div className="font-bold text-sky-400">Option 2:</div>
                  <div className="text-white/80">Sunday, 29th November 2026 at 9:00 PM GMT</div>
                </div>
              </div>
              <p className="text-[11px] text-white/50 pt-1">
                When attendees click their preferred button in their email, their vote is automatically recorded in the database and shown on the poll counter above.
              </p>
            </div>
          )}

          {/* Zoom Settings for Pre-Event Virtual */}
          {campaign === 'pre_event' && audience === 'virtual' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#050B1F] p-4 rounded-xl border border-white/5">
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1">
                  Zoom Meeting Joining URL
                </label>
                <input
                  type="text"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-gold/60"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1">
                  Meeting ID
                </label>
                <input
                  type="text"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-gold/60"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1">
                  Passcode
                </label>
                <input
                  type="text"
                  value={meetingPasscode}
                  onChange={(e) => setMeetingPasscode(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-gold/60"
                />
              </div>
            </div>
          )}

          {/* Notifications and Alerts */}
          {error && (
            <div className="bg-red-950/40 border border-red-800 text-red-200 text-xs p-4 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {testSuccess && (
            <div className="bg-emerald-950/40 border border-emerald-800 text-emerald-200 text-xs p-4 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{testSuccess}</span>
            </div>
          )}

          {broadcastResult && (
            <div className="bg-emerald-950/60 border border-emerald-500/50 text-white p-5 rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                <CheckCircle2 className="w-5 h-5" /> Broadcast Successfully Executed
              </div>
              <p className="text-xs text-white/80">{broadcastResult.message}</p>
              <div className="text-[11px] text-white/50">
                Delivered: {broadcastResult.sent} | Failed: {broadcastResult.failed}
              </div>
            </div>
          )}

          {/* Action Step Bar: Test Send vs Live Broadcast */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            
            {/* Step 1: Test send */}
            <div className="bg-[#04082B] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
              <div className="w-full sm:w-auto flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 block mb-1">
                  Step 1: Test On Your Own Email First
                </span>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Enter your email to test"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-white text-xs focus:outline-none focus:border-gold/50"
                />
              </div>

              <Button
                type="button"
                onClick={handleSendTest}
                disabled={isSendingTest || !testEmail}
                variant="ghost"
                className="w-full sm:w-auto border border-white/15 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider py-5 px-5 rounded-lg shrink-0 mt-2 sm:mt-4 gap-2 cursor-pointer"
              >
                {isSendingTest ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending Test...
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Send Test Email
                  </>
                )}
              </Button>
            </div>

            {/* Step 2: Live Broadcast Button */}
            <div className="pt-2">
              <Button
                type="button"
                onClick={handleBroadcast}
                disabled={isBroadcasting || recipientCount === 0}
                className="w-full bg-gold hover:bg-gold/90 text-navy font-heading font-black text-base py-7 rounded-xl uppercase tracking-wider shadow-xl shadow-gold/15 gap-2 cursor-pointer"
              >
                {isBroadcasting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Dispatching Broadcast to {recipientCount} Attendees...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Push Broadcast Now ({recipientCount} {audience.toUpperCase()} Attendees)
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
