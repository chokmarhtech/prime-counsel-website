import FadeIn from '@/components/frontend/FadeIn'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function AskPrimeSection() {
  const payload = await getPayload({ config })
  const { docs: products } = await payload.find({
    collection: 'products',
    where: {
      slug: {
        in: ['askprime', 'seekcounsel'],
      },
    },
    limit: 2,
    depth: 1,
  })

  // Helper to format price
  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '₦'
    return `${symbol}${price}`
  }

  return (
    <section className="py-20 md:py-28 bg-accent-blue">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <FadeIn>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-primary-foreground/70">
            Micro-Consults
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-12">
            Precision Sessions for Immediate Clarity
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
          {products.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.1}>
              <div className="group bg-white rounded-2xl p-4 shadow-sm border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden h-full flex flex-col justify-between">
                <Link href={`/shop/${p.slug}`} className="block">
                  <div className="h-56 rounded-xl overflow-hidden mb-5 bg-muted relative">
                    {typeof p.heroImage === 'object' && p.heroImage?.url && (
                      <Image
                        src={p.heroImage.url}
                        alt={p.title}
                        width={1000}
                        height={500}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="inline-block font-body text-[10px] font-bold tracking-widest text-white bg-gold/70 backdrop-blur-md rounded-lg px-3 py-1.5 uppercase">
                        {typeof p.category === 'object' ? p.category?.title : 'Session'}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading text-lg text-navy mb-2 line-clamp-1 group-hover:text-gold transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2 h-10">
                    {p.shortDescription}
                  </p>
                </Link>

                <div className="flex items-center justify-between mt-2 pt-4 border-t border-border/40">
                  <p className="font-heading text-xl text-navy">
                    {formatPrice(p.price, p.currency || 'GBP')}
                  </p>

                  <Link
                    href={`/shop/${p.slug}`}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-navy hover:text-gold transition-colors"
                  >
                    View Session <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
