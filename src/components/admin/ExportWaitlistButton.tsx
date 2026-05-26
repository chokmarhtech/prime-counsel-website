'use client'
import React from 'react'
import Link from 'next/link'

export const ExportWaitlistButton = () => {
  return (
    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
      <Link
        href="/api/waitlist/export" 
        className="btn btn--style-primary btn--size-medium"
        // style={{ textDecoration: 'none' }}
      >
        Download Waitlist (Excel / CSV)
      </Link>
    </div>
  )
}
