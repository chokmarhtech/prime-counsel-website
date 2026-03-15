"use client"

import FadeIn from '@/components/frontend/FadeIn'
import Layout from '@/components/frontend/layout/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { products } from '@/constants'

const ShopProduct = () => {
  const { slug } = useParams()
  const product = products.find((p) => p.id === slug)
  if (!product)
    return (
      <Layout>
        <div className="pt-32 text-center">
          <h1 className="heading-lg">Product Not Found</h1>
          <Link href="/shop" className="btn-primary mt-4 inline-block">
            ← Back to Shop
          </Link>
        </div>
      </Layout>
    )

  const related = products.filter((p) => p.id !== slug).slice(0, 3)

  return (
    <Layout>
      <section className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <FadeIn direction="left">
              <Image
                src={product.img}
                alt={product.title}
                className="w-full rounded-2xl aspect-4/3 object-cover"
                width={500}
                height={500}
              />
            </FadeIn>
            <FadeIn direction="right">
              <span className="inline-block font-body text-xs font-semibold text-gold bg-gold/10 rounded-full px-3 py-1 mb-4">
                {product.category}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl text-navy mb-3">{product.title}</h1>
              <p className="font-heading text-2xl text-navy mb-6">{product.price}</p>

              <h3 className="font-heading text-lg text-navy mb-3">ABOUT THIS RESOURCE</h3>
              <p className="body-text mb-8">{product.longDesc}</p>

              <h3 className="font-heading text-lg text-navy mb-3">WHAT YOU WILL GAIN</h3>
              <ul className="space-y-2 mb-8">
                {product.gains.map((g) => (
                  <li key={g} className="flex items-start gap-3">
                    <span className="text-gold font-heading">—</span>
                    <span className="font-body text-sm text-foreground/80">{g}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-heading text-lg text-navy mb-3">WHO THIS IS FOR</h3>
              <p className="body-text mb-8">{product.whoFor}</p>

              <button className="btn-gold w-full text-center mb-3">Purchase Now →</button>
              <Link
                href="/shop"
                className="block text-center font-body text-sm text-accent-blue hover:underline"
              >
                ← Back to Shop
              </Link>
            </FadeIn>
          </div>

          {/* Related */}
          <div className="mt-20">
            <h2 className="heading-md mb-8 text-center">RELATED RESOURCES</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/shop/${p.id}`} className="group card-prime">
                  <div className="h-40 rounded-xl overflow-hidden mb-3">
                    <Image
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={500}
                      height={500}
                    />
                  </div>
                  <h3 className="font-heading text-base text-navy">{p.title}</h3>
                  <p className="font-body font-bold text-navy text-sm">{p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ShopProduct
