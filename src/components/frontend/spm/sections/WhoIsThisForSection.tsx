import { AUDIENCE_ITEMS } from '@/components/frontend/spm/data/constants'
import { FiCheckCircle } from 'react-icons/fi'
import AnimatedSection from './AnimatedSection'

const WhoIsThisForSection = () => {
  return (
    <section className="section-padding section-muted overflow-hidden">
      <div className="container mx-auto max-w-3xl">
        <AnimatedSection>
          {/* <p className="font-body text-secondary text-sm font-semibold uppercase tracking-[0.2em] text-center mb-4">
            Audience
          </p> */}
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground text-center mb-4">
            Who Is This For?
          </h2>
          <p className="font-body text-muted-foreground text-center mb-4 text-lg max-w-2xl mx-auto">
            If you are working hard but feel under-positioned and are ready to move from survival to
            structured thriving, SPM 2.0 is for you.
          </p>
          <div className="w-16 h-1 bg-secondary mx-auto mb-12" />
        </AnimatedSection>

        <div className="space-y-3">
          {AUDIENCE_ITEMS.map((item, i) => (
            <AnimatedSection key={i} delay={0.08 * i}>
              <div className="flex items-center gap-4 bg-card border border-border rounded-sm p-5 hover:border-secondary/40 hover:shadow-md transition-all duration-300">
                <FiCheckCircle className="w-5 h-5 text-secondary shrink-0" />
                <p className="font-body text-foreground font-medium">{item.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <p className="font-body text-center text-muted-foreground mt-10 text-sm italic">
            This is not for spectators. It is for individuals ready to reposition.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default WhoIsThisForSection
