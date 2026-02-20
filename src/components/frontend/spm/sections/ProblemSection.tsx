import AnimatedSection from "./AnimatedSection";

const ProblemSection = () => {
  return (
    <section className="section-padding section-light overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <AnimatedSection>
          {/* <p className="font-body text-secondary text-sm font-semibold uppercase tracking-[0.2em] text-center mb-4">
            The Real Challenge
          </p> */}
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground text-center mb-6">
            The Problem Is Not
            <br />
            Your Effort
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-12" />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto mb-16">
            Across the UK, thousands wake up early, commute long hours, move from one shift to the next,
            and return home exhausted — not because they lack ambition, but because they lack{" "}
            <span className="text-secondary font-semibold">positioning</span>.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-16">
          {["They are capable.", "They are hardworking.", "They are responsible."].map((text, i) => (
            <AnimatedSection key={i} delay={0.2 + i * 0.1}>
              <div className="border border-border rounded-sm p-8 text-center bg-card hover:border-secondary/40 transition-colors duration-300">
                <p className="font-heading text-xl text-foreground">{text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <p className="font-body text-muted-foreground text-center text-lg leading-relaxed max-w-3xl mx-auto mb-12">
            Yet month after month, they are managing bills, managing expectations, managing pressure —
            but not building leverage. Survival has become normal. Working hard has become routine.
            Yet <span className="font-semibold text-foreground">thriving feels distant</span>.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <div className="bg-primary rounded-sm p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-secondary/10 to-transparent" />
            <div className="relative">
              <p className="font-heading text-2xl md:text-4xl text-primary-foreground mb-4">
                This Is Not a Motivational Event
              </p>
              <p className="font-body text-primary-foreground/70 text-lg max-w-lg mx-auto">
                It&apos;s a strategic reset. Because thriving is not luck —{" "}
                <span className="text-gold font-semibold">it is positioning</span>.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProblemSection;
