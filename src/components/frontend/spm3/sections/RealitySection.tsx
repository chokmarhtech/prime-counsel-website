import AnimatedSection from '../sections/AnimatedSection'
import Image from 'next/image'
import spm3Image2 from '@/assets/images/spm3/spm3-2.webp'

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

        <div>
          <AnimatedSection>
            {/* <p className="font-body text-gold text-sm font-semibold uppercase tracking-[0.2em] text-center mb-4">
            Logistics
          </p> */}
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground text-center mb-4">
              FEATURING AT <span className="text-gold">SPM 3.0</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-12" />
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-20">
          {/* Image Column */}
          <div className="lg:col-span-5">
            <AnimatedSection delay={0.4}>
              <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-border shadow-2xl group">
                <Image
                  src={spm3Image2}
                  alt="SPM 3.0 Highlights"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </AnimatedSection>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            {/* Section 1: Live Business Pitch */}
            <AnimatedSection delay={0.5}>
              <div className="bg-card border border-border rounded-sm p-6 md:p-8 hover:border-gold/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-[4px] h-full bg-gold" />
                <span className="inline-block font-body text-xs font-bold text-gold tracking-widest uppercase mb-3">
                  SECTION 1 — LIVE BUSINESS PITCH
                </span>
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3 font-semibold group-hover:text-gold transition-colors duration-300">
                  🏆 Win Up to £500 in Business Registration Funding
                </h3>
                <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                  Step onto the stage and pitch your business idea live. Selected participants will receive up to £500 in sponsorship to cover their UK business registration, plus an exclusive 1-on-1 consultation with Coach Ayoola to sharpen your vision and fast-track your next move.
                </p>
                <div className="inline-flex items-center gap-2 font-body text-xs font-semibold text-gold bg-gold/10 px-3 py-1.5 rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  Secure your spot to be eligible for the live pitch.
                </div>
              </div>
            </AnimatedSection>

            {/* Section 2: Book Launch */}
            <AnimatedSection delay={0.6}>
              <div className="bg-card border border-border rounded-sm p-6 md:p-8 hover:border-gold/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-[4px] h-full bg-gold" />
                <span className="inline-block font-body text-xs font-bold text-gold tracking-widest uppercase mb-3">
                  SECTION 2 — BOOK LAUNCH
                </span>
                <h3 className="font-heading text-xl md:text-2xl text-foreground mb-1 font-semibold group-hover:text-gold transition-colors duration-300">
                  📖 Introducing Coach Ayoola’s Debut Book
                </h3>
                <p className="font-heading text-base md:text-lg text-gold mb-3 italic">
                  From Raw Talent to Market Value
                </p>
                <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                  Discover the roadmap to turning your God-given abilities into a thriving, recognised brand. Be among the first to own a copy available onsite with an exclusive 15% launch discount and personally signed by Coach Ayoola.
                </p>
                <div className="inline-flex items-center gap-2 font-body text-xs font-semibold text-gold bg-gold/10 px-3 py-1.5 rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  Limited copies. Don’t miss this moment.
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RealitySection
