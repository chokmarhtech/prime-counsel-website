'use client'

import React from 'react'
import FadeIn from '@/components/frontend/FadeIn'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/constants'
import { useState } from 'react'

const ShopGrid = () => {
  const categories = ['All', 'Books', 'Digital Resources', 'Frameworks', 'Workbooks']

  const [filter, setFilter] = useState('All')

  const filtered = products.filter((p) => {
    if (filter === 'All') return true
    if (filter === 'Books') return p.category === 'Book'
    if (filter === 'Digital Resources') return p.category === 'Digital Resource'
    if (filter === 'Frameworks') return p.category === 'Framework'
    if (filter === 'Workbooks') return p.category === 'Workbook'
    return true
  })

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container-narrow mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="flex overflow-x-auto gap-2 mb-12 pb-4 scrollbar-hide md:justify-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`btn-pill shrink-0 text-sm py-2 px-6 ${filter === c ? 'bg-secondary text-primary-foreground' : 'bg-surface text-navy hover:bg-navy/10'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.1}>
              <Link href={`/shop/${p.id}`} className="group block bg-card rounded-2xl p-4 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="h-48 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={p.img}
                    alt={p.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="inline-block font-body text-xs font-semibold text-gold bg-gold/10 rounded-full px-3 py-1 mb-2">
                  {p.category}
                </span>
                <h3 className="font-heading text-lg text-navy mb-1">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground mb-3">{p.desc}</p>
                <p className="font-body font-bold text-navy">{p.price}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopGrid
