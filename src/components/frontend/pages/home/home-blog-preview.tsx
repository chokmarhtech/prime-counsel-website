import Link from 'next/link'
import React from 'react'
import FadeIn from '@/components/frontend/FadeIn'
import Image from 'next/image'

const HomeBlogPreview = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-narrow mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <FadeIn>
              <p className="section-label">Insights</p>
              <h2 className="heading-lg mb-8">LEADERSHIP INTELLIGENCE</h2>
              <Link href="/blog" className="btn-primary">
                View All Articles →
              </Link>
            </FadeIn>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {[
              {
                img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
                cat: 'Leadership Intelligence',
                title: '5 Disciplines Every Leader Must Master',
              },
              {
                img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80',
                cat: 'Strategy & Positioning',
                title: 'Why Identity Precedes Strategy',
              },
            ].map((post, i) => (
              <FadeIn key={post.title} delay={i * 0.15}>
                <Link href="/blog" className="group block">
                  <div className="rounded-2xl overflow-hidden shadow-navy">
                    <div className="h-48 overflow-hidden">
                      <Image
                        src={post.img}
                        alt={post.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="inline-block font-body text-xs font-semibold text-accent-blue bg-accent/10 rounded-full px-3 py-1 mb-3">
                        {post.cat}
                      </span>
                      <h3 className="font-heading text-lg text-navy mb-2">{post.title}</h3>
                      <span className="text-accent-blue font-body text-sm font-semibold">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeBlogPreview
