import FadeIn from '@/components/frontend/FadeIn'
import Link from 'next/link'
import { services } from '@/constants'

const ServicesOverview = () => (
<section className="py-20 md:py-28 bg-muted">
    <div className="container-narrow mx-auto max-md:px-4">
      <div className="grid lg:grid-cols-3 gap-12">
        <div>
          <FadeIn>
            <p className="section-label">Services</p>
            <h2 className="heading-lg mb-8">YOUR DEVELOPMENT, OUR ARCHITECTURE</h2>
            <Link href="/services" className="btn-primary">View All Services</Link>
          </FadeIn>
        </div>
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <div className="card-prime">
                <s.icon className="w-6 h-6 text-accent mb-4" />
                <h3 className="font-heading text-lg text-navy mb-2">{s.title}</h3>
                <p className="font-body text-sm text-muted-foreground mb-4">{s.desc}</p>
                <Link href="/services" className="text-accent-blue font-body text-sm font-semibold hover:underline">
                  Learn More →
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  </section>
  // <section className="section-padding-1 bg-muted">
  //   <div className="container-narrow">
  //     <AnimatedSection>
  //       <h2 className="heading-display text-3xl md:text-5xl text-foreground mb-16">
  //         INSTITUTIONAL SERVICES
  //       </h2>
  //     </AnimatedSection>

  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  //       {services.map((s, i) => (
  //         <AnimatedSection key={s.title} delay={i * 0.1}>
  //           <div className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow duration-300">
  //             <s.icon className="w-8 h-8 text-secondary mb-4" />
  //             <h3 className="font-heading text-xl text-foreground mb-3">{s.title}</h3>
  //             <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
  //               {s.desc}
  //             </p>
  //             <Button variant="link" className="p-0 text-secondary font-body font-semibold" asChild>
  //               <Link href="/services">Learn More →</Link>
  //             </Button>
  //           </div>
  //         </AnimatedSection>
  //       ))}
  //     </div>
  //   </div>
  // </section>
)

export default ServicesOverview
