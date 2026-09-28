'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Users,
  RefreshCw,
  LogOut,
  Camera,
  CameraOff,
  Check,
  Volume2,
  VolumeX,
  History,
  UserCheck,
} from 'lucide-react'

interface Attendee {
  id: string | number
  name: string
  email: string
  ticketType: 'physical' | 'virtual'
  ticketCode: string
  status: string
  checkedIn: boolean
  checkedInAt: string | null
  checkedInBy: string | null
}

interface ScanResult {
  type: 'success' | 'warning' | 'error'
  title: string
  message: string
  attendee?: {
    name: string
    ticketCode: string
    ticketType: string
    checkedInAt?: string | null
  }
}

// Web Audio API Sound Synthesizer (Zero external mp3 assets needed)
class SoundEffects {
  private ctx: AudioContext | null = null

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) this.ctx = new AudioCtx()
    }
  }

  playSuccess() {
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      // Pleasant Apple Pay / Hotel Chime chord: E5 -> G#5 -> B5
      osc.frequency.setValueAtTime(659.25, now)
      osc.frequency.setValueAtTime(830.61, now + 0.08)
      osc.frequency.setValueAtTime(987.77, now + 0.16)

      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.6)
    } catch (e) {}
  }

  playWarning() {
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.setValueAtTime(370, now + 0.15)

      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.4)
    } catch (e) {}
  }

  playError() {
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(180, now)
      osc.frequency.setValueAtTime(130, now + 0.18)

      gain.gain.setValueAtTime(0.4, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.45)
    } catch (e) {}
  }
}

const sounds = new SoundEffects()

export default function UsherPage() {
  const [passcode, setPasscode] = useState('')
  const [usherName, setUsherName] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Device mode detection
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState<'scan' | 'directory'>('scan')
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [cameraLoading, setCameraLoading] = useState(false)

  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'not_arrived' | 'checked_in'>('all')
  const [soundEnabled, setSoundEnabled] = useState(true)

  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const scannerRef = useRef<any>(null)
  const isScannerRunningRef = useRef(false)
  const lastScannedCodeRef = useRef<string | null>(null)
  const lastScannedTimeRef = useRef<number>(0)

  // Detect Mobile vs Desktop screen / touch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const mobile = window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024)
        setIsMobile(mobile)
        if (!mobile) {
          setActiveTab('directory')
        }
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Load saved credentials on mount
  useEffect(() => {
    const savedPass = localStorage.getItem('spm_usher_pass')
    const savedName = localStorage.getItem('spm_usher_name')
    if (savedPass) {
      setPasscode(savedPass)
      if (savedName) setUsherName(savedName)
      verifyAndLoad(savedPass, savedName || '')
    }
  }, [])

  const verifyAndLoad = async (pass: string, name: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/spm/list?passcode=${encodeURIComponent(pass)}`)
      if (!res.ok) {
        throw new Error('Invalid Passcode')
      }
      const data = await res.json()
      setAttendees(data.attendees || [])
      setIsAuthenticated(true)
      localStorage.setItem('spm_usher_pass', pass)
      if (name) localStorage.setItem('spm_usher_name', name)
    } catch (err: any) {
      alert('Access Denied: ' + (err.message || 'Incorrect Event Passcode'))
      localStorage.removeItem('spm_usher_pass')
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!passcode.trim()) return
    verifyAndLoad(passcode.trim(), usherName.trim())
  }

  const handleLogout = () => {
    localStorage.removeItem('spm_usher_pass')
    setIsAuthenticated(false)
    setPasscode('')
    stopScanner()
  }

  const refreshList = async () => {
    if (!passcode) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/spm/list?passcode=${encodeURIComponent(passcode)}`)
      const data = await res.json()
      if (data.attendees) setAttendees(data.attendees)
    } catch (err) {
      console.error('Refresh error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Camera Management
  useEffect(() => {
    if (isAuthenticated && activeTab === 'scan' && isCameraActive && isMobile) {
      startScanner()
    } else {
      stopScanner()
    }
    return () => {
      stopScanner()
    }
  }, [isAuthenticated, activeTab, isCameraActive, isMobile])

  const startScanner = async () => {
    if (typeof window === 'undefined') return
    setCameraLoading(true)
    await stopScanner()

    try {
      const { Html5Qrcode } = await import('html5-qrcode')
      const html5QrCode = new Html5Qrcode('qr-reader')
      scannerRef.current = html5QrCode

      const config = {
        fps: 15,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      }

      await html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          handleCodeScanned(decodedText)
        },
        () => {},
      )
      isScannerRunningRef.current = true
    } catch (err) {
      console.error('Failed to start camera scanner:', err)
      alert('Camera Access Denied or Not Available. Please allow camera permissions in your browser.')
      setIsCameraActive(false)
    } finally {
      setCameraLoading(false)
    }
  }

  const stopScanner = async () => {
    if (scannerRef.current && isScannerRunningRef.current) {
      try {
        await scannerRef.current.stop()
        scannerRef.current.clear()
      } catch (e) {}
      isScannerRunningRef.current = false
    }
  }

  const handleCodeScanned = async (code: string) => {
    const now = Date.now()
    if (
      lastScannedCodeRef.current === code &&
      now - lastScannedTimeRef.current < 3000
    ) {
      return
    }

    lastScannedCodeRef.current = code
    lastScannedTimeRef.current = now

    await validateAndCheckIn(code)
  }

  const validateAndCheckIn = async (code: string) => {
    if (isProcessing) return
    setIsProcessing(true)

    let cleanCode = code.trim()
    if (cleanCode.includes('/spm-3/pass/')) {
      cleanCode = cleanCode.split('/spm-3/pass/')[1]?.split('?')[0]?.split('#')[0] || cleanCode
    }
    cleanCode = cleanCode.toUpperCase().trim()

    try {
      const res = await fetch('/api/spm/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketCode: cleanCode,
          usherPasscode: passcode,
          usherName: usherName || 'Gate Usher',
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        if (soundEnabled) sounds.playSuccess()
        setScanResult({
          type: 'success',
          title: 'Check-In Verified!',
          message: 'Welcome to SPM 3.0',
          attendee: data.registration,
        })
        setAttendees((prev) =>
          prev.map((a) =>
            a.ticketCode === data.registration.ticketCode
              ? { ...a, checkedIn: true, checkedInAt: data.registration.checkedInAt }
              : a,
          ),
        )
      } else if (data.status === 'already_checked_in') {
        if (soundEnabled) sounds.playWarning()
        const checkInTime = data.checkedInAt
          ? new Date(data.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : 'earlier'
        setScanResult({
          type: 'warning',
          title: 'Already Checked In',
          message: `This pass was checked in at ${checkInTime}.`,
          attendee: data.registration,
        })
      } else if (data.status === 'unpaid') {
        if (soundEnabled) sounds.playError()
        setScanResult({
          type: 'error',
          title: 'Payment Incomplete',
          message: 'This registration is currently unpaid or pending confirmation.',
          attendee: data.registration,
        })
      } else {
        if (soundEnabled) sounds.playError()
        setScanResult({
          type: 'error',
          title: 'Invalid Ticket',
          message: data.message || `No ticket found with code ${cleanCode}`,
        })
      }
    } catch (err: any) {
      if (soundEnabled) sounds.playError()
      setScanResult({
        type: 'error',
        title: 'Connection Error',
        message: 'Could not connect to server. Please try again.',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Filtered attendees for Directory search
  const filteredAttendees = useMemo(() => {
    if (!searchQuery.trim()) return []

    let list = attendees
    if (statusFilter === 'checked_in') {
      list = list.filter((a) => a.checkedIn)
    } else if (statusFilter === 'not_arrived') {
      list = list.filter((a) => !a.checkedIn)
    }

    const q = searchQuery.toLowerCase().trim()
    return list.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.ticketCode.toLowerCase().includes(q),
    )
  }, [attendees, searchQuery, statusFilter])

  // Recently verified attendees (sorted by latest check-in time)
  const recentlyVerified = useMemo(() => {
    return attendees
      .filter((a) => a.checkedIn)
      .sort((a, b) => {
        const timeA = a.checkedInAt ? new Date(a.checkedInAt).getTime() : 0
        const timeB = b.checkedInAt ? new Date(b.checkedInAt).getTime() : 0
        return timeB - timeA
      })
  }, [attendees])

  const stats = useMemo(() => {
    const total = attendees.length
    const paid = attendees.filter((a) => a.status === 'paid').length
    const checkedIn = attendees.filter((a) => a.checkedIn).length
    const physical = attendees.filter((a) => a.ticketType === 'physical').length
    const physicalCheckedIn = attendees.filter((a) => a.ticketType === 'physical' && a.checkedIn).length

    return {
      total,
      paid,
      checkedIn,
      physical,
      physicalCheckedIn,
      pct: paid > 0 ? Math.round((checkedIn / paid) * 100) : 0,
    }
  }, [attendees])

  const formatTime = (isoString: string | null) => {
    if (!isoString) return 'Just now'
    try {
      const d = new Date(isoString)
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    } catch {
      return 'Just now'
    }
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#04082B] text-white flex items-center justify-center p-4 selection:bg-[#C9A84C] selection:text-[#0B1C3D]">
        <div className="max-w-md w-full bg-[#0B0F3A] border border-[#C9A84C]/30 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <img src="/logos/logo-light.svg" alt="Prime Counsel" className="h-8 mx-auto mb-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-3 py-1 rounded-full">
              Usher Gate Portal
            </span>
            <h1 className="font-heading text-2xl font-bold mt-4">SPM 3.0 Check-In</h1>
            <p className="text-white/60 text-xs mt-1">Enter your event passcode to unlock the gate system.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                Usher Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Gate 1 - Sarah"
                value={usherName}
                onChange={(e) => setUsherName(e.target.value)}
                className="w-full bg-[#050926] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                Event Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-[#050926] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C9A84C] hover:bg-white text-[#0B1C3D] font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-6 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Verifying...
                </>
              ) : (
                'Unlock Gate System'
              )}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // MAIN USHER DASHBOARD
  return (
    <div className="min-h-screen bg-[#04082B] text-white flex flex-col selection:bg-[#C9A84C] selection:text-[#0B1C3D]">
      {/* Top Header */}
      <header className="bg-[#0B0F3A] border-b border-white/10 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logos/logo-light.svg" alt="Prime Counsel" className="h-6 w-auto" />
            <span className="text-xs font-bold text-[#C9A84C] tracking-widest uppercase">
              {isMobile ? 'SPM 3.0 Mobile Gate' : 'SPM 3.0 Desk Lookup'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
              className="p-2 text-white/70 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#C9A84C]" /> : <VolumeX className="w-4 h-4 text-white/40" />}
            </button>

            <button
              onClick={refreshList}
              title="Refresh Attendee List"
              className={`p-2 text-white/70 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer ${
                isLoading ? 'animate-spin text-[#C9A84C]' : ''
              }`}
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              title="Lock / Logout"
              className="p-2 text-red-400 hover:text-red-300 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Live Stats Bar */}
      <div className="bg-[#070C2D] border-b border-white/5 px-4 py-3">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div>
            <span className="text-white/50 uppercase tracking-wider">Checked In: </span>
            <strong className="text-white font-mono text-sm">{stats.checkedIn}</strong>
            <span className="text-white/40"> / {stats.paid}</span>
            <span className="ml-2 font-bold text-[#C9A84C]">({stats.pct}%)</span>
          </div>

          <div className="text-white/60 flex items-center gap-3">
            <span>Physical: <strong className="text-white font-mono">{stats.physicalCheckedIn}/{stats.physical}</strong></span>
            <span>Total: <strong className="text-white font-mono">{stats.total}</strong></span>
          </div>
        </div>
      </div>

      {/* Tab Navigation (Only shown on Mobile) */}
      {isMobile && (
        <div className="max-w-4xl w-full mx-auto px-4 pt-4">
          <div className="flex bg-[#070C2D] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'scan' ? 'bg-[#C9A84C] text-[#0B1C3D] shadow-md' : 'text-white/70 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" /> QR Camera Scanner
            </button>

            <button
              onClick={() => setActiveTab('directory')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'directory' ? 'bg-[#C9A84C] text-[#0B1C3D] shadow-md' : 'text-white/70 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" /> Search & Lookup
            </button>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col space-y-6">
        {isMobile && activeTab === 'scan' ? (
          /* MOBILE CAMERA SCANNER TAB */
          <div className="flex-1 flex flex-col items-center justify-start space-y-6">
            {/* Viewfinder Container */}
            <div className="w-full max-w-md bg-[#0B0F3A] border border-[#C9A84C]/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center">
              {!isCameraActive ? (
                /* Tap to Start Camera Screen */
                <div className="py-8 space-y-4">
                  <div className="w-20 h-20 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Camera className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-white mb-1">Ready to Scan</h2>
                    <p className="text-xs text-white/60 max-w-xs mx-auto">
                      Tap below to activate your mobile camera and scan attendee QR codes.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCameraActive(true)}
                    disabled={cameraLoading}
                    className="w-full bg-[#C9A84C] hover:bg-white text-[#0B1C3D] font-bold text-sm py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {cameraLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Starting Camera...
                      </>
                    ) : (
                      <>
                        <Camera className="w-5 h-5" /> Start QR Camera Scanner
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* Active Camera Viewfinder */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Camera Active
                    </span>
                    <button
                      onClick={() => setIsCameraActive(false)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-white/70 hover:text-white bg-white/10 px-3 py-1 rounded-lg cursor-pointer"
                    >
                      <CameraOff className="w-3.5 h-3.5" /> Pause Camera
                    </button>
                  </div>

                  <div
                    id="qr-reader"
                    className="w-full rounded-2xl overflow-hidden bg-black aspect-square border border-white/10"
                  />

                  {isProcessing && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                      <RefreshCw className="w-8 h-8 text-[#C9A84C] animate-spin mb-2" />
                      <p className="text-xs font-bold text-white uppercase tracking-widest">Validating Ticket...</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Manual Code Input */}
            <div className="w-full max-w-md bg-[#070C2D] border border-white/10 rounded-2xl p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const input = (e.currentTarget.elements.namedItem('manualCode') as HTMLInputElement).value
                  if (input) {
                    validateAndCheckIn(input)
                    ;(e.currentTarget.elements.namedItem('manualCode') as HTMLInputElement).value = ''
                  }
                }}
                className="flex gap-2"
              >
                <input
                  name="manualCode"
                  type="text"
                  placeholder="Or type Ticket Code (e.g. K42)..."
                  className="flex-1 bg-[#050926] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C9A84C] uppercase"
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-[#C9A84C] text-[#0B1C3D] font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-white transition-colors cursor-pointer"
                >
                  Verify
                </button>
              </form>
            </div>

            {/* LIVE RECENTLY VERIFIED FEED (Mobile View) */}
            {recentlyVerified.length > 0 && (
              <div className="w-full max-w-md bg-[#070C2D]/80 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4" /> Verified Attendees ({recentlyVerified.length})
                  </span>
                  <span className="text-[10px] text-white/40">Latest at top</span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {recentlyVerified.slice(0, 10).map((att) => (
                    <div
                      key={att.id}
                      className="bg-[#0B0F3A] border border-emerald-500/20 rounded-xl p-3 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-heading text-xs text-white font-medium truncate">{att.name}</p>
                        <p className="text-[10px] text-white/50 font-mono">
                          {att.ticketCode} • {att.ticketType}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          <Check className="w-3 h-3" /> {formatTime(att.checkedInAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* SEARCH & DIRECTORY MODE (Mobile Search Tab or Laptop/Desktop Default) */
          <div className="flex-1 flex flex-col space-y-6">
            {/* Search Box */}
            <div className="bg-[#070C2D] border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-lg font-bold text-white">Attendee Lookup Desk</h2>
                  <p className="text-xs text-white/50">Search by attendee name, email address, or ticket code.</p>
                </div>
              </div>

              <div className="relative">
                <Search className="w-5 h-5 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  autoFocus={!isMobile}
                  placeholder="Start typing name (e.g. Oluwaseun), email, or ticket code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#050926] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              {searchQuery.trim() && (
                <div className="flex gap-2 text-xs">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                      statusFilter === 'all' ? 'bg-[#C9A84C] text-[#0B1C3D]' : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    All Matches
                  </button>
                  <button
                    onClick={() => setStatusFilter('not_arrived')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                      statusFilter === 'not_arrived'
                        ? 'bg-[#C9A84C] text-[#0B1C3D]'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    Not Yet Checked In
                  </button>
                  <button
                    onClick={() => setStatusFilter('checked_in')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                      statusFilter === 'checked_in'
                        ? 'bg-[#C9A84C] text-[#0B1C3D]'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    Checked In
                  </button>
                </div>
              )}
            </div>

            {/* Results Area */}
            <div className="flex-1 space-y-4">
              {searchQuery.trim() ? (
                /* Search Results View */
                <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-320px)] pr-1">
                  {filteredAttendees.length === 0 ? (
                    <div className="text-center py-12 text-white/40 text-sm bg-[#070C2D]/30 rounded-2xl border border-white/5">
                      No attendees matching <span className="text-white font-bold">&quot;{searchQuery}&quot;</span>.
                    </div>
                  ) : (
                    filteredAttendees.map((att) => (
                      <div
                        key={att.id}
                        className="bg-[#0B0F3A] border border-white/5 hover:border-white/15 rounded-xl p-4 flex items-center justify-between gap-4 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-heading text-base text-white font-medium truncate">{att.name}</p>
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                att.ticketType === 'physical'
                                  ? 'bg-[#C9A84C]/20 text-[#C9A84C]'
                                  : 'bg-blue-500/20 text-blue-300'
                              }`}
                            >
                              {att.ticketType} Pass
                            </span>
                          </div>
                          <p className="text-xs text-white/50 truncate font-mono">
                            <strong className="text-white/80">{att.ticketCode}</strong> • {att.email}
                          </p>
                        </div>

                        <div className="shrink-0">
                          {att.checkedIn ? (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/20">
                              <Check className="w-4 h-4" /> Checked In ({formatTime(att.checkedInAt)})
                            </div>
                          ) : (
                            <button
                              onClick={() => validateAndCheckIn(att.ticketCode)}
                              disabled={isProcessing}
                              className="bg-[#C9A84C] hover:bg-white text-[#0B1C3D] font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-md cursor-pointer"
                            >
                              Check In Now
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                /* LIVE VERIFIED FEED ON SCREEN (When not actively filtering) */
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                      <UserCheck className="w-4 h-4" /> Verified Attendees ({recentlyVerified.length})
                    </h3>
                    <span className="text-[11px] text-white/40">Real-time check-in log</span>
                  </div>

                  {recentlyVerified.length === 0 ? (
                    <div className="text-center py-16 px-4 bg-[#070C2D]/40 rounded-2xl border border-dashed border-white/10 space-y-3">
                      <div className="w-12 h-12 bg-white/5 text-[#C9A84C] rounded-full flex items-center justify-center mx-auto">
                        <Search className="w-6 h-6" />
                      </div>
                      <h4 className="font-heading text-base font-medium text-white">No Check-Ins Yet Today</h4>
                      <p className="text-xs text-white/50 max-w-sm mx-auto">
                        As attendees are verified, their names and check-in timestamps will appear live in this list.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-340px)] pr-1">
                      {recentlyVerified.map((att) => (
                        <div
                          key={att.id}
                          className="bg-[#0B0F3A] border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl p-3.5 flex items-center justify-between gap-3 transition-colors shadow-sm"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="font-heading text-sm text-white font-medium truncate">{att.name}</p>
                              <span
                                className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                  att.ticketType === 'physical'
                                    ? 'bg-[#C9A84C]/20 text-[#C9A84C]'
                                    : 'bg-blue-500/20 text-blue-300'
                                }`}
                              >
                                {att.ticketType}
                              </span>
                            </div>
                            <p className="text-xs text-white/50 truncate font-mono">
                              <strong className="text-white/80">{att.ticketCode}</strong> • {att.email}
                            </p>
                          </div>

                          <div className="shrink-0 text-right">
                            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              {formatTime(att.checkedInAt)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* SCAN RESULT OVERLAY MODAL */}
      {scanResult && (
        <div
          onClick={() => setScanResult(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`max-w-sm w-full rounded-3xl p-6 text-center shadow-2xl border ${
              scanResult.type === 'success'
                ? 'bg-[#042A1D] border-emerald-500/50 text-emerald-100'
                : scanResult.type === 'warning'
                ? 'bg-[#3A2904] border-amber-500/50 text-amber-100'
                : 'bg-[#3A040B] border-red-500/50 text-red-100'
            }`}
          >
            {scanResult.type === 'success' && (
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            )}
            {scanResult.type === 'warning' && (
              <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-10 h-10" />
              </div>
            )}
            {scanResult.type === 'error' && (
              <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-10 h-10" />
              </div>
            )}

            <h2 className="font-heading text-2xl font-bold mb-1">{scanResult.title}</h2>
            <p className="text-xs opacity-80 mb-4">{scanResult.message}</p>

            {scanResult.attendee && (
              <div className="bg-black/30 rounded-2xl p-4 text-left space-y-2 mb-6 border border-white/10">
                <div>
                  <p className="text-[10px] uppercase tracking-wider opacity-60">Attendee</p>
                  <p className="font-bold text-base text-white">{scanResult.attendee.name}</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10 text-xs">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider opacity-60">Ticket Code</p>
                    <p className="font-mono font-bold text-white">{scanResult.attendee.ticketCode}</p>
                  </div>
                  <span className="font-bold uppercase text-[10px] bg-white/10 px-2 py-1 rounded">
                    {scanResult.attendee.ticketType} Pass
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => setScanResult(null)}
              className="w-full bg-white text-black font-bold text-sm py-3 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
            >
              Continue Scanning (Tap Anywhere)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
