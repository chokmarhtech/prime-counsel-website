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
  QrCode,
  Link as LinkIcon,
  Eye,
  RefreshCw,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const PHYSICAL_DEFAULT_SUBJECT = 'Just one more sleep!'
const PHYSICAL_DEFAULT_MESSAGE = `I hope you are as excited as I am about tomorrow's Strategic Positioning MasterClass 3.0.

We have put a lot of thought into creating an experience that goes beyond the usual masterclass. From the conversations and learning sessions to the book launch, live business pitch and networking opportunities, I am confident you will have a memorable experience.

As you prepare for tomorrow, here are two things to keep in mind:
1. Registration opens at 9:30 AM. Please endeavour to arrive early.
2. Come with an open mind, a willingness to learn and an eagerness to connect.
I encourage you to make the most of every moment. Sometimes, the conversations you have and the people you meet in a room can become the starting point of something significant.

Thank you for making the decision to be part of this experience.

We look forward to welcoming you tomorrow!`

const VIRTUAL_DEFAULT_SUBJECT = 'The countdown is almost over!'
const VIRTUAL_DEFAULT_MESSAGE = `Tomorrow, we finally get to experience the Strategic Positioning MasterClass 3.0.

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

export default function SpmBroadcastPage() {
  const [passcode, setPasscode] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')

  const [audience, setAudience] = useState<'physical' | 'virtual'>('physical')
  const [subject, setSubject] = useState(PHYSICAL_DEFAULT_SUBJECT)
  const [message, setMessage] = useState(PHYSICAL_DEFAULT_MESSAGE)
  const [meetingLink, setMeetingLink] = useState(VIRTUAL_DEFAULT_ZOOM)
  const [meetingId, setMeetingId] = useState(VIRTUAL_DEFAULT_ID)
  const [meetingPasscode, setMeetingPasscode] = useState(VIRTUAL_DEFAULT_PASSCODE)

  // Counts
  const [counts, setCounts] = useState<{ physical: number; virtual: number }>({
    physical: 0,
    virtual: 0,
  })
  const [loadingCounts, setLoadingCounts] = useState(false)

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

  // Pre-fill smart defaults when switching audience
  const handleAudienceChange = (target: 'physical' | 'virtual') => {
    setAudience(target)
    setError('')
    setTestSuccess('')
    setBroadcastResult(null)

    if (target === 'physical') {
      setSubject(PHYSICAL_DEFAULT_SUBJECT)
      setMessage(PHYSICAL_DEFAULT_MESSAGE)
    } else {
      setSubject(VIRTUAL_DEFAULT_SUBJECT)
      setMessage(VIRTUAL_DEFAULT_MESSAGE)
      setMeetingLink(VIRTUAL_DEFAULT_ZOOM)
      setMeetingId(VIRTUAL_DEFAULT_ID)
      setMeetingPasscode(VIRTUAL_DEFAULT_PASSCODE)
    }
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
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setIsAuthenticated(true)
              setCounts({
                physical: data.physicalCount || 0,
                virtual: data.virtualCount || 0,
              })
            }
          })
          .catch(() => {})
      }
    }
  }, [])

  const refreshCounts = async () => {
    setLoadingCounts(true)
    try {
      const res = await fetch(`/api/spm/broadcast/counts?passcode=${encodeURIComponent(passcode)}`)
      const data = await res.json()
      if (data.success) {
        setCounts({
          physical: data.physicalCount || 0,
          virtual: data.virtualCount || 0,
        })
      }
    } catch (e) {
    } finally {
      setLoadingCounts(false)
    }
  }

  // Send Test Email
  const handleSendTest = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      setError('Please provide a valid email address to receive the test preview.')
      return
    }

    setIsSendingTest(true)
    setError('')
    setTestSuccess('')

    try {
      const res = await fetch('/api/spm/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode,
          audience,
          subject,
          message,
          meetingLink: audience === 'virtual' ? meetingLink : undefined,
          meetingPasscode: audience === 'virtual' ? meetingPasscode : undefined,
          meetingId: audience === 'virtual' ? meetingId : undefined,
          isTest: true,
          testEmail: testEmail.trim(),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send test email.')
      }

      setTestSuccess(data.message || `Test email dispatched to ${testEmail}!`)
    } catch (err: any) {
      setError(err.message || 'Error sending test email.')
    } finally {
      setIsSendingTest(false)
    }
  }

  // Live Broadcast
  const handleBroadcast = async () => {
    const recipientCount = audience === 'physical' ? counts.physical : counts.virtual

    if (recipientCount === 0) {
      setError(`No confirmed ${audience} attendees found to receive this email.`)
      return
    }

    const confirmed = window.confirm(
      `⚠️ CONFIRMATION REQUIRED:\n\nYou are about to broadcast this email to ALL ${recipientCount} confirmed ${audience.toUpperCase()} attendees.\n\nSubject: "${subject}"\n\nDo you want to proceed?`,
    )

    if (!confirmed) return

    setIsBroadcasting(true)
    setError('')
    setBroadcastResult(null)

    try {
      const res = await fetch('/api/spm/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode,
          audience,
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
        throw new Error(data.error || 'Failed to broadcast emails.')
      }

      setBroadcastResult({
        success: true,
        sent: data.successCount,
        failed: data.failedCount,
        message: `Successfully delivered to ${data.successCount} ${audience} attendees!`,
      })
    } catch (err: any) {
      setError(err.message || 'Error broadcasting emails.')
    } finally {
      setIsBroadcasting(false)
    }
  }

  // 1. Passcode Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#04082B] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0B0F3A] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-center text-white mb-2">
            SPM 3.0 Broadcast Desk
          </h1>
          <p className="text-xs text-white/60 text-center mb-6">
            Enter your admin passcode to access email dispatch controls.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter SPM Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 text-center font-mono tracking-widest text-sm"
              />
            </div>

            {authError && (
              <p className="text-red-400 text-xs font-semibold text-center">{authError}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-3 rounded-lg uppercase tracking-wider"
            >
              Unlock Broadcast Desk
            </Button>
          </form>
        </div>
      </div>
    )
  }

  const recipientCount = audience === 'physical' ? counts.physical : counts.virtual

  // 2. Broadcast Dashboard
  return (
    <div className="min-h-screen bg-[#04082B] text-white py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-2.5 py-0.5 rounded">
                SPM 3.0 Live Desk
              </span>
              <span className="text-xs text-white/40">Push-Button Manual Dispatch</span>
            </div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mt-1">
              Attendee Email Broadcaster
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshCounts}
              disabled={loadingCounts}
              className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingCounts ? 'animate-spin' : ''}`} />
              Refresh Counts
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('spm_broadcast_passcode')
                setIsAuthenticated(false)
              }}
              className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20 cursor-pointer"
            >
              Lock
            </button>
          </div>
        </div>

        {/* Audience Selector Tabs */}
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => handleAudienceChange('physical')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              audience === 'physical'
                ? 'bg-gold/15 border-gold shadow-[0_0_25px_rgba(201,168,76,0.15)]'
                : 'bg-[#0B0F3A] border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">Physical Attendees</h3>
                  <p className="text-xs text-white/60">Includes Entry Pass, QR & Venue Photo</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-heading font-black text-2xl text-gold">
                  {counts.physical}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/40 block">
                  Confirmed
                </span>
              </div>
            </div>
          </div>

          <div
            onClick={() => handleAudienceChange('virtual')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              audience === 'virtual'
                ? 'bg-gold/15 border-gold shadow-[0_0_25px_rgba(201,168,76,0.15)]'
                : 'bg-[#0B0F3A] border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">Virtual Attendees</h3>
                  <p className="text-xs text-white/60">Includes Zoom Link, ID & Passcode</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-heading font-black text-2xl text-blue-400">
                  {counts.virtual}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/40 block">
                  Confirmed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Composer Box */}
        <div className="bg-[#0B0F3A] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" /> Compose Broadcast for{' '}
              <span className="text-gold capitalize">{audience}</span> Audience ({recipientCount}{' '}
              people)
            </h2>
            <span className="text-xs text-white/50">
              Wrapped in official Prime Counsel template
            </span>
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/70 block">
              Email Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Just one more sleep!"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 font-medium"
            />
          </div>

          {/* Virtual-only Zoom Details */}
          {audience === 'virtual' && (
            <div className="space-y-4 bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5" /> Zoom Joining Link
                </label>
                <input
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="https://us06web.zoom.us/j/..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-gold/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> Meeting ID
                  </label>
                  <input
                    type="text"
                    value={meetingId}
                    onChange={(e) => setMeetingId(e.target.value)}
                    placeholder="867 1059 8357"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-gold/50 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> Passcode
                  </label>
                  <input
                    type="text"
                    value={meetingPasscode}
                    onChange={(e) => setMeetingPasscode(e.target.value)}
                    placeholder="262947"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-gold/50 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Message Content Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-white/70 block">
                Message Body
              </label>
              <span className="text-[11px] text-white/40">
                Recipient greeted as: <strong className="text-gold">Dear [Name],</strong>
              </span>
            </div>
            <textarea
              rows={11}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type or paste message here..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-gold/50 font-body leading-relaxed"
            />
          </div>

          {/* Dynamic Extra Box Notification */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 text-xs text-white/70">
            {audience === 'physical' ? (
              <>
                <QrCode className="w-5 h-5 text-gold shrink-0" />
                <span>
                  The email automatically embeds: <strong>1. Live Entry QR Code</strong> &bull; <strong>2. Conference Aston Venue Photo</strong> &bull; <strong>3. 9:30 AM Registration Notice</strong> &bull; <strong>4. First Parking Car Parking Guidance</strong>.
                </span>
              </>
            ) : (
              <>
                <Monitor className="w-5 h-5 text-blue-400 shrink-0" />
                <span>
                  The email automatically renders: <strong>1. Prominent &quot;Join Zoom Masterclass&quot; Button</strong> &bull; <strong>2. Meeting ID (${meetingId}) & Passcode (${meetingPasscode})</strong> &bull; <strong>3. 10:00 AM (UK Time) Schedule</strong>.
                </span>
              </>
            )}
          </div>

          {/* Alerts */}
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          {testSuccess && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> {testSuccess}
            </div>
          )}

          {broadcastResult && (
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-green-400">
                <CheckCircle2 className="w-5 h-5" /> Broadcast Successfully Dispatched!
              </div>
              <p className="text-xs text-green-300/80">
                Delivered to <strong>{broadcastResult.sent}</strong> {audience} attendees (Failed: {broadcastResult.failed}).
              </p>
            </div>
          )}

          {/* Action Row: Test vs Live */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            {/* Step A: Test send */}
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

            {/* Step B: Live Broadcast Button */}
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
