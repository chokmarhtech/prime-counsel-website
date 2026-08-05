'use client'

import AnimatedSection from '@/components/frontend/spm/sections/AnimatedSection'
import Image from 'next/image'
import spm1Img from '@/assets/images/events/spm1/image-1.png'
import spm2Img from '@/assets/images/events/spm2/spm-2-a.png'
import spm3Img from '@/assets/images/events/spm2/spm-2-e.png'

const journeyData = [
  {
    version: 'SPM 1.0',
    location: 'Birmingham',
    title: 'The Foundation',
    desc: 'The beginning of the strategic movement. 40+ attendees laying the groundwork for intentional growth.',
    image: spm1Img
  },
  {
    version: 'SPM 2.0',
    location: 'Luton',
    title: 'Expanded Reach',
    desc: 'Higher engagement and deeper strategic frameworks designed to break through professional ceilings.',
    image: spm2Img
  },
  {
    version: 'SPM 3.0',
    location: 'Aston University',
    title: 'Premium Positioning',
    desc: 'The next evolution. Advanced positioning and premium networking for ambitious leaders.',
    image: spm3Img
  },
]

const JourneySection = () => {
  return (
    <section id="movement" className="py-24 md:py-32 bg-[#04082B] text-white relative overflow-hidden">
      {/* Background styling to match the solid bold vibrant background of Dribbble section 5 */}
      <div className="absolute inset-0 bg-linear-to-tr from-gold/40 via-gold/20 to-orange-400/20 mix-blend-color-dodge opacity-60 pointer-events-none" />
      <div className="absolute -top-1/2 -right-1/4 w-200 h-200 bg-gold/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        
        <AnimatedSection>
          <div className="text-center mb-16">
            <h4 className="font-heading text-sm uppercase tracking-[0.2em] text-white/70 font-bold mb-4">
              The Movement
            </h4>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1]">
              The SPM Journey
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journeyData.map((item, index) => (
            <AnimatedSection key={index} delay={0.2 * index}>
              <div className="flex flex-col items-start bg-transparent">
                {/* Top Image Box */}
                <div className="w-full aspect-4/5 sm:aspect-square md:aspect-4/5 rounded-3xl overflow-hidden mb-6 border-4 border-white/20 shadow-xl relative group bg-transparent">
                  <Image 
                    src={item.image} 
                    alt={item.version} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h5 className="font-heading text-2xl md:text-3xl font-bold">{item.version}</h5>
                    <p className="font-body text-sm font-semibold tracking-widest uppercase text-white/80">{item.location}</p>
                  </div>
                </div>
                
                {/* Bottom Text */}
                <div className="px-2 text-left">
                  <h6 className="font-heading text-xl text-white font-bold mb-2">
                    {item.title}
                  </h6>
                  <p className="font-body text-base text-white/80 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}

export default JourneySection
