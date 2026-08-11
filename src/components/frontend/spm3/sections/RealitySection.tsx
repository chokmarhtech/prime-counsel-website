import AnimatedSection from '../sections/AnimatedSection'

const RealitySection = () => {
  return (
    <section id="reality" className="section-padding section-light overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground text-center mb-6">
            The Problem Is Not
            <br />
            Your Effort
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-12" />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-7xl mx-auto mb-12 text-center">
            You work hard, have the required qualifications and keep applying for job and
            opportunities. Yet the opportunities you desire seem to go to someone else. <br />
            After years of coaching ambitious professionals and working within global organisations,
            I&apos;ve realised one truth: The marketplace does not reward effort and talent alone.
            It rewards value that is strategically positioned.
            <br />
            The problem was not effort or motivation, it was{' '}
            <span className="text-gold font-bold">Positioning.</span>
            <br /> <span className="text-gold font-bold">SPM 3.0</span> is designed to help you
            learn the rules that govern the{' '}
            <span className="text-gold font-bold">3 key factors of Positioning</span>
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-16">
          {['VALUE', 'LEVERAGE', 'VISIBILITY'].map((text, i) => (
            <AnimatedSection key={i} delay={0.2 + i * 0.1}>
              <div className="border border-border rounded-sm p-8 text-center bg-card hover:border-gold/40 transition-colors duration-300">
                <p className="font-heading text-xl text-foreground">{text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="bg-primary rounded-sm p-6 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gold" />
            <div className="relative">
              <p className="font-heading text-2xl md:text-4xl text-primary mb-4">
                This Is Not a Motivational Event
              </p>
              <p className="font-body text-primary/70  mx-auto">
                Not another motivational seminar or random event. SPM is a practical strategic
                masterclass where you&apos;ll learn the frameworks behind visibility, value
                creation, leadership, long-term relevance and networking opportunities with other
                successful professionals. You&apos;ll leave with practical systems you can immediately apply
                to your career, business and personal development.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default RealitySection
