'use client'

import React, { useState, useEffect } from 'react'
import { format, isWeekend, startOfToday, addMonths } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { Loader2, Calendar as CalendarIcon, Clock } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import type { Product } from '@/payload-types'
import { toast } from '@/components/ui/use-toast'
import { useCartStore } from '@/store/cart-store'

interface BookingCalendarModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

export function BookingCalendarModal({ isOpen, onClose, product }: BookingCalendarModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const { addItem, setCartOpen } = useCartStore()

  const today = startOfToday()
  const maxDate = addMonths(today, 3)

  // Fetch available slots whenever a valid date is selected
  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([])
      setSelectedSlot(null)
      return
    }

    if (isWeekend(selectedDate)) {
      setAvailableSlots([])
      setSelectedSlot(null)
      return
    }

    const fetchSlots = async () => {
      setIsLoadingSlots(true)
      setSelectedSlot(null)
      try {
        const dateStr = format(selectedDate, 'yyyy-MM-dd')
        const res = await fetch(`/api/bookings/available?date=${dateStr}`)
        if (!res.ok) throw new Error('Failed to fetch slots')
        
        const data = await res.json()
        setAvailableSlots(data.availableSlots || [])
      } catch (error) {
        console.error('Slot fetch error:', error)
        toast({
          title: 'Error',
          description: 'Failed to load available times. Please try again.',
          variant: 'destructive'
        })
      } finally {
        setIsLoadingSlots(false)
      }
    }

    fetchSlots()
  }, [selectedDate])

  const handleCheckout = async () => {
    if (!selectedDate || !selectedSlot) return

    setIsCheckingOut(true)
    
    // Add the specific session (Date/Time) to the Cart
    addItem(product, format(selectedDate, 'yyyy-MM-dd'), selectedSlot)
    
    // Reset state, close modal, open cart drawer
    setIsCheckingOut(false)
    onClose()
    setCartOpen(true)
  }

  // Disable weekends and past dates
  const disabledDays = [
    { before: today, after: maxDate },
    { dayOfWeek: [0, 6] } // 0 is Sunday, 6 is Saturday
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-[#FAF9F6] border-border/40">
        <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
          
          {/* Left Column: Date Picker */}
          <div className="w-full md:w-[400px] p-6 bg-white border-r border-border/20">
            <DialogHeader className="mb-4">
              <DialogTitle className="font-heading text-2xl text-navy uppercase">Select Date</DialogTitle>
              <DialogDescription className="font-body text-muted-foreground text-sm">
                Pick a weekday (Monday - Friday) for your session.
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-center mt-6 day-picker-custom">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={disabledDays}
                modifiersClassNames={{
                  selected: 'bg-gold text-white font-bold',
                  today: 'text-gold font-bold',
                }}
                styles={{
                  caption: { color: 'var(--navy)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' },
                  head_cell: { color: 'var(--muted-foreground)', fontSize: '0.8rem', fontWeight: 'bold' }
                }}
              />
            </div>
            
            {/* Custom CSS for DayPicker since we can't easily style everything inline */}
            <style jsx global>{`
              .day-picker-custom .rdp-day_selected, .day-picker-custom .rdp-day_selected:focus, .day-picker-custom .rdp-day_selected:hover {
                background-color: #D4AF37;
                color: white;
              }
              .day-picker-custom .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                background-color: #f1f5f9;
              }
              .day-picker-custom .rdp {
                margin: 0;
              }
            `}</style>
          </div>

          {/* Right Column: Time Slots & Checkout */}
          <div className="flex-1 flex flex-col bg-[#FAF9F6] p-6 overflow-y-auto">
            {selectedDate ? (
              <div className="flex-1 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="font-heading text-xl text-navy uppercase flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-gold" />
                    {format(selectedDate, 'EEEE, MMMM do')}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Times shown in GMT (London)</p>
                </div>

                {isLoadingSlots ? (
                  <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-gold animate-spin" />
                  </div>
                ) : availableSlots.length > 0 ? (
                  <div className="flex-1">
                    <p className="text-sm font-bold uppercase tracking-wider text-navy mb-4">Available Times</p>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`
                            py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-body transition-all
                            ${selectedSlot === slot 
                              ? 'bg-navy border-navy text-white shadow-md scale-[1.02]' 
                              : 'bg-white border-border/40 text-navy hover:border-gold hover:text-gold'}
                          `}
                        >
                          <Clock className="w-4 h-4" />
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-surface rounded-xl border border-border/20">
                    <CalendarIcon className="w-10 h-10 text-muted-foreground mb-3 opacity-50" />
                    <p className="font-bold text-navy">No slots available</p>
                    <p className="text-sm text-muted-foreground mt-1">Please select a different date.</p>
                  </div>
                )}

                {/* Checkout Footer */}
                <div className="mt-auto pt-6 border-t border-border/30">
                  <button
                    className="w-full bg-navy text-white py-3 rounded-xl font-bold hover:bg-navy-light transition-colors disabled:opacity-50"
                    onClick={handleCheckout}
                    disabled={!selectedSlot || isCheckingOut}
                  >
                    {isCheckingOut ? 'Adding...' : 'Add Session to Cart'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <CalendarIcon className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="font-heading text-xl text-navy uppercase">Select a Date</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-[200px]">
                  Please select a weekday from the calendar to view available times.
                </p>
              </div>
            )}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
