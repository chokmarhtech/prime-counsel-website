import { getPayload } from 'payload'
import config from '@payload-config'
import TestimonialsSlider from './testimonials'
import type { TestimonialData } from './testimonials'

export default async function TestimonialsServer() {
  let testimonials: TestimonialData[] = []

  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'testimonials',
      limit: 50,
      sort: 'sortOrder',
    })

    testimonials = docs.map((doc) => ({
      id: doc.id,
      name: doc.clientName,
      location: doc.location || undefined,
      programme: doc.programme,
      text: doc.quote,
      featured: doc.featured || false,
    }))
  } catch (error) {
    console.error('Error fetching testimonials:', error)
  }

  return (
    <section className="section-padding-1 bg-background">
      <div className="container-narrow text-center mb-12">
        <p className="section-label">Testimonials</p>
        <h2 className="heading-display text-3xl md:text-4xl text-navy">
          WHAT LEADERS ARE SAYING
        </h2>
      </div>
      <TestimonialsSlider testimonials={testimonials} />
    </section>
  )
}
