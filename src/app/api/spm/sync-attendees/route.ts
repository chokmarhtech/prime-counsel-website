import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'

const DEFAULT_PASSCODE = 'SPM3-GATE-2026'

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json()
    const expectedPasscode = process.env.SPM_USHER_PASSCODE || DEFAULT_PASSCODE

    if (!passcode || passcode.trim() !== expectedPasscode.trim()) {
      return NextResponse.json({ error: 'Unauthorized: Invalid passcode' }, { status: 401 })
    }

    const csvPath = path.resolve(process.cwd(), 'attendees_excel.csv')
    if (!fs.existsSync(csvPath)) {
      return NextResponse.json({ error: 'attendees_excel.csv not found' }, { status: 404 })
    }

    const rawCsv = fs.readFileSync(csvPath, 'utf8')
    const lines = rawCsv.trim().split('\n').slice(1) // Skip header

    const payload = await getPayload({ config: configPromise })

    let existingPreserved = 0
    let newlyCreated = 0
    const report: Array<{ name: string; email: string; ticketType: string; ticketCode: string; action: string }> = []

    for (const line of lines) {
      if (!line.trim()) continue
      const parts = line.split(',')
      const name = parts[0]?.trim()
      const email = parts[1]?.trim().toLowerCase()
      const rawStatus = parts[2]?.trim().toLowerCase() || ''

      if (!name || !email) continue

      let ticketType: 'physical' | 'virtual' = 'physical'
      let paymentType: 'stripe' | 'bank_transfer' | 'sponsored' = 'bank_transfer'

      if (rawStatus.includes('virtual')) {
        ticketType = 'virtual'
        paymentType = 'bank_transfer'
      } else if (rawStatus.includes('sponsored')) {
        ticketType = 'physical'
        paymentType = 'sponsored'
      } else {
        ticketType = 'physical'
        paymentType = 'bank_transfer'
      }

      // Check if attendee already exists in database
      const existing = await payload.find({
        collection: 'spm-registrations',
        where: {
          email: { equals: email },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        const doc = existing.docs[0]
        // Preserve their existing ticket code, just ensure status is paid
        await payload.update({
          collection: 'spm-registrations',
          id: doc.id,
          data: {
            name,
            ticketType,
            status: 'paid',
            paymentType: doc.paymentType || paymentType,
          },
        })
        existingPreserved++
        report.push({
          name,
          email,
          ticketType,
          ticketCode: doc.ticketCode || 'EXISTING',
          action: 'Preserved & Confirmed',
        })
      } else {
        // Create new record (Payload hooks will generate their unique SPM3-PHY-... or SPM3-VIR-... code)
        const newDoc = await payload.create({
          collection: 'spm-registrations',
          data: {
            name,
            email,
            ticketType,
            paymentType,
            status: 'paid',
          },
        })
        newlyCreated++
        report.push({
          name,
          email,
          ticketType,
          ticketCode: newDoc.ticketCode || 'CREATED',
          action: 'New Pass Minted',
        })
      }
    }

    // Recount totals in database
    const physicalRes = await payload.find({
      collection: 'spm-registrations',
      where: {
        and: [{ status: { equals: 'paid' } }, { ticketType: { equals: 'physical' } }],
      },
      limit: 1000,
    })

    const virtualRes = await payload.find({
      collection: 'spm-registrations',
      where: {
        and: [{ status: { equals: 'paid' } }, { ticketType: { equals: 'virtual' } }],
      },
      limit: 1000,
    })

    return NextResponse.json({
      success: true,
      totalFromSheet: lines.length,
      existingPreserved,
      newlyCreated,
      totalPhysicalInDb: physicalRes.totalDocs,
      totalVirtualInDb: virtualRes.totalDocs,
      report,
    })
  } catch (error: any) {
    console.error('Error syncing attendees:', error)
    return NextResponse.json({ error: error?.message || 'Sync failed' }, { status: 500 })
  }
}
