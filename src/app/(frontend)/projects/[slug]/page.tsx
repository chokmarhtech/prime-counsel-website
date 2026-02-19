import React from 'react'
import { getPayload } from '@/lib/getPayload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowLeft, MapPin, Calendar, Building2 } from 'lucide-react'
import type { Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload()

  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const project = projects[0]

  if (!project) {
    notFound()
  }

  const heroImage = project.heroImage as Media | undefined
  const gallery = project.gallery?.map((item) => item.image as Media).filter(Boolean) || []

  return (
    <div className="min-h-screen flex flex-col">
      <main className="grow pt-32 pb-20">
        {/* Back Link */}
        <div className="container-luxury mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>
        </div>

        <article>
          <div className="container-luxury max-w-5xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[2px] bg-construction-red" />
                <span className="text-warm-concrete text-sm tracking-[0.2em] uppercase font-medium">
                  Project Case Study
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-8">
                {project.title}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border-y border-border py-6">
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> Client
                  </h3>
                  <p className="font-medium">{project.client || 'Private Client'}</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Location
                  </h3>
                  <p className="font-medium">{project.location || 'Nigeria'}</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Year
                  </h3>
                  <p className="font-medium">{project.year || 'Released'}</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    Service
                  </h3>
                  <p className="font-medium">Construction</p>
                </div>
              </div>

              {heroImage?.url && (
                <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-charcoal shadow-2xl">
                  <Image
                    src={heroImage.url}
                    alt={heroImage.alt || project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </header>

            {/* Description & Rich Text */}
            <div className="grid md:grid-cols-3 gap-12 mb-20">
              <div className="md:col-span-1">
                <h3 className="font-heading text-xl font-bold mb-4">Project Overview</h3>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
              <div className="md:col-span-2 prose prose-lg dark:prose-invert max-w-none">
                {project.content && <RichText data={project.content} />}
              </div>
            </div>

            {/* Gallery Grid */}
            {gallery.length > 0 && (
              <div className="mb-20">
                <h3 className="font-heading text-2xl font-bold mb-8 flex items-center gap-4">
                  Project Gallery
                  <span className="h-px grow bg-border"></span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {gallery.map((img, idx) => (
                    <div
                      key={img.id || idx}
                      className="relative aspect-4/3 bg-muted overflow-hidden group"
                    >
                      {img.url && (
                        <Image
                          src={img.url}
                          alt={img.alt || `Gallery image ${idx + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
    </div>
  )
}
