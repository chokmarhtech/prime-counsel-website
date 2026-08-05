'use client'

import { motion } from 'framer-motion'
import { FAQ_ITEMS } from '@/components/frontend/spm/data/constants'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import AnimatedSection from '@/components/frontend/spm/sections/AnimatedSection'

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 md:py-32 bg-white relative overflow-hidden scroll-mt-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto max-w-3xl relative z-10 px-4 md:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy leading-[1.1] mb-6">
              Got Questions?
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="group border border-gray-200 rounded-xl px-6 data-[state=open]:border-gold/50 data-[state=open]:shadow-[0_8px_30px_rgba(var(--gold),0.08)] transition-all duration-500 bg-white"
              >
                <AccordionTrigger className="text-left font-heading text-lg md:text-xl text-navy hover:text-gold hover:no-underline transition-colors py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-base md:text-lg text-gray-600 leading-relaxed pb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.answer}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default FAQSection
