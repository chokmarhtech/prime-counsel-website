import { CONTACT_INFO } from '@/components/frontend/spm/data/constants'
import { RegistrationModal } from '@/components/frontend/spm3/components/RegistrationModal'
import { FiMail, FiPhone } from 'react-icons/fi'
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
import AnimatedSection from '@/components/frontend/spm/sections/AnimatedSection'

const ContactSection = () => {
  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center">
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-navy mb-12">
            Get Your Ticket
          </h2>
          <AnimatedSection delay={0.1}>
            <RegistrationModal>
              <button className="group relative inline-flex items-center gap-3 bg-gold text-navy font-body font-bold text-lg px-14 py-5 rounded-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(var(--gold),0.3)] mb-12">
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </RegistrationModal>
          </AnimatedSection>
          <div className="w-16 h-1 bg-gold mx-auto mb-10" />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="font-body text-gray-600 text-lg mb-4">
            For enquiries or group bookings, reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center justify-center gap-3 font-body text-navy hover:text-gold transition-colors"
            >
              <FiMail className="w-5 h-5" />
              {CONTACT_INFO.email}
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center justify-center gap-3 font-body text-navy hover:text-gold transition-colors"
            >
              <FiPhone className="w-5 h-5" />
              {CONTACT_INFO.phone}
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="flex justify-center gap-4">
            {[
              {
                href: CONTACT_INFO.instagram,
                Icon: FaInstagram,
                label: 'Instagram',
                colorClass: 'text-[#E4405F]',
                hoverClass: 'hover:border-[#E4405F]/50 hover:bg-[#E4405F]/10 hover:shadow-md',
              },
              {
                href: CONTACT_INFO.youtube,
                Icon: FaYoutube,
                label: 'YouTube',
                colorClass: 'text-[#FF0000]',
                hoverClass: 'hover:border-[#FF0000]/50 hover:bg-[#FF0000]/10 hover:shadow-md',
              },
              {
                href: CONTACT_INFO.tiktok,
                Icon: FaTiktok,
                label: 'TikTok',
                colorClass: 'text-black',
                hoverClass: 'hover:border-black/50 hover:bg-black/10 hover:shadow-md',
              },
            ].map(({ href, Icon, label, colorClass, hoverClass }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-xl border border-gray-200 bg-white flex items-center justify-center ${colorClass} ${hoverClass} hover:-translate-y-0.5 transition-all duration-300`}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default ContactSection
