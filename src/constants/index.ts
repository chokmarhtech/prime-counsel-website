import {
  Mic,
  Compass,
  ClipboardList,
  Users,
  BookOpen,
  Building2,
  Briefcase,
  GraduationCap,
  Globe,
} from 'lucide-react'

//navLinks
export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Shop', path: '/shop' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

// Home Page
export const identityCards = [
  { icon: Briefcase, label: 'Leadership Institute' },
  { icon: GraduationCap, label: 'Development Academy' },
  { icon: Users, label: 'Mentorship Organisation' },
  { icon: Globe, label: 'Global Movement' },
]

export const pillars = [
  {
    title: 'Leadership Intelligence',
    desc: 'Developing strategic thinking and decision-making frameworks for complex environments.',
  },
  {
    title: 'Identity & Mindset Development',
    desc: 'Building leaders from the inside out through identity-first transformation.',
  },
  {
    title: 'Structured Mentorship',
    desc: 'Institutional mentorship models that produce consistent, measurable growth.',
  },
  {
    title: 'Faith-Informed Ethics',
    desc: 'Embedding ethical conviction into every level of leadership practice.',
  },
  {
    title: 'Global Positioning',
    desc: 'Preparing emerging leaders for visibility and impact on the international stage.',
  },
]

export const convictions = [
  {
    num: '01',
    title: 'Leadership Is Engineered, Not Inherited',
    desc: 'True leadership is developed through intentional structure, not left to chance or charisma.',
  },
  {
    num: '02',
    title: 'Identity Precedes Influence',
    desc: 'Before you can lead others, you must know who you are and why you exist.',
  },
  {
    num: '03',
    title: 'Ethics Are Non-Negotiable',
    desc: 'Sustainable leadership is built on moral clarity and principled decision-making.',
  },
]

export const HomeServices = [
  {
    icon: Mic,
    title: 'Talks & Keynotes',
    desc: 'High-impact keynotes for corporate, academic and leadership events',
  },
  {
    icon: Compass,
    title: 'Coaching & Mentorship',
    desc: 'Structured 1:1 and group coaching for emerging and senior leaders',
  },
  {
    icon: ClipboardList,
    title: 'Workshops & Training',
    desc: 'Intensive leadership training programs and strategic workshops',
  },
  {
    icon: Building2,
    title: 'Organisational Advisory',
    desc: 'Strategic advisory for organisations developing leadership culture',
  },
]

export const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Corporate Director',
    text: "Prime Counsel didn't just motivate me — they restructured how I think about leadership. The frameworks are unmatched.",
  },
  {
    name: 'Daniel K.',
    role: 'Founder & CEO',
    text: 'Working with Prime Counsel gave me the clarity and conviction I needed to lead my organisation through its most challenging season.',
    featured: true,
  },
  {
    name: 'Grace O.',
    role: 'Youth Leader',
    text: 'The mentorship I received was structured, intentional, and deeply impactful. I now lead with purpose and precision.',
  },
]

//About Page
export const AboutConvictions = [
  {
    title: 'Leadership is a discipline, not a personality trait',
    body: 'We believe leadership can be taught, structured, and developed. It is not reserved for the charismatic — it belongs to the disciplined.',
  },
  {
    title: 'Identity precedes strategy',
    body: 'Before you can lead others, you must know who you are. Identity is the foundation upon which all strategic decisions rest.',
  },
  {
    title: 'Ethics is non-negotiable at every altitude',
    body: 'Whether leading a team of five or a nation of millions, ethical conviction must remain constant and uncompromised.',
  },
  {
    title: 'Faith and intellect are not in conflict',
    body: 'We hold that spiritual conviction and intellectual rigour complement one another, producing leaders of depth and substance.',
  },
  {
    title: 'Development must be structured, not accidental',
    body: "Growth that lasts requires architecture. We reject the notion that leadership simply 'happens' — it must be engineered.",
  },
  {
    title: 'Mentorship is an institutional responsibility',
    body: 'Organisations that fail to mentor are organisations that fail to sustain. We embed mentorship into the DNA of institutions.',
  },
  {
    title: 'Global thinking is a leadership requirement',
    body: 'In a connected world, leaders must think beyond borders. We prepare leaders for international visibility and impact.',
  },
]

export const missions = [
  'To develop leaders who combine strategic depth with ethical clarity.',
  'To institutionalize mentorship within organisations.',
  'To equip emerging leaders for global impact and visibility.',
  'To challenge conventional thinking about leadership and influence.',
  'To build a global community of leaders committed to excellence and integrity.',
]

//Services
export const services = [
  {
    icon: Mic,
    title: 'Executive Coaching',
    desc: 'One-on-one coaching engagements designed to develop the mindset, strategy, and executive presence of senior leaders.',
  },
  {
    icon: Users,
    title: 'Leadership Programmes',
    desc: 'Structured group programmes delivering leadership transformation through cohort-based learning and accountability.',
  },
  {
    icon: BookOpen,
    title: 'Strategic Advisory',
    desc: 'Bespoke advisory services for organisations seeking to build leadership capacity at scale.',
  },
  {
    icon: Building2,
    title: 'Institutional Partnerships',
    desc: 'Long-term strategic partnerships with universities, corporations, and government institutions.',
  },
]

//Services Page
export const serviceBlocks = [
  {
    title: 'Talks & Keynotes',
    desc: 'High-impact keynotes delivered to corporate, academic, faith-based, and youth leadership environments.',
    outcomes: 'Inspired, challenged, and repositioned audiences',
    idealFor: 'Conferences, corporate events, universities, youth summits',
    cta: 'Enquire About a Talk →',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  },
  {
    title: 'Coaching & Mentorship',
    desc: 'Structured 1:1 and cohort coaching programs for emerging to senior leaders.',
    outcomes: 'Clarity of identity, sharpened strategy, sustained development',
    idealFor: 'Professionals aged 18–45, executives, organisational leaders',
    cta: 'Begin Coaching →',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
  },
  {
    title: 'Workshops & Training',
    desc: 'Intensive half-day and full-day leadership development workshops.',
    outcomes: 'Actionable frameworks, team alignment, leadership culture shift',
    idealFor: 'Corporate teams, student bodies, faith organisations',
    cta: 'Book a Workshop →',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
  },
  {
    title: 'Organisational Advisory',
    desc: 'Strategic advisory for organisations building and sustaining leadership pipelines.',
    outcomes: 'Cultural transformation, leadership infrastructure, structured development programs',
    idealFor: 'Corporates, NGOs, educational institutions, faith organisations',
    cta: 'Request Advisory →',
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80',
  },
]


//Shop Page
export const products = [
  {
    id: 'architecture-of-leadership',
    title: 'The Architecture of Leadership',
    category: 'Book',
    desc: 'A structured framework for building sustainable leadership capacity',
    price: '£19.99',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
    longDesc:
      'This foundational text lays out the Prime Counsel model for developing leadership capacity that lasts. Drawing from over a decade of institutional experience, it provides frameworks, case studies, and actionable strategies for leaders at every level.',
    gains: [
      'A complete leadership development framework',
      'Identity-first leadership methodology',
      'Strategic positioning tools',
      'Ethical decision-making models',
    ],
    whoFor:
      'Emerging and established leaders looking for a structured, rigorous approach to personal and professional leadership growth.',
  },
  {
    id: 'strategic-identity-blueprint',
    title: 'Strategic Identity Blueprint',
    category: 'Digital Resource',
    desc: 'A step-by-step framework for leaders to define and own their strategic identity',
    price: '£9.99',
    img: 'https://images.unsplash.com/photo-1568027762272-e4da8b386fe9?w=500&q=80',
    longDesc:
      'This digital resource walks leaders through the process of defining their strategic identity. It provides exercises, frameworks, and reflection tools designed to produce clarity and conviction.',
    gains: [
      'Identity mapping exercises',
      'Strategic positioning templates',
      'Personal brand architecture',
      'Values alignment framework',
    ],
    whoFor:
      'Leaders and professionals seeking to clarify their personal brand and leadership identity.',
  },
  {
    id: 'leadership-development-workbook',
    title: 'The Leadership Development Workbook',
    category: 'Workbook',
    desc: '90-day structured workbook for personal and professional leadership growth',
    price: '£14.99',
    img: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&q=80',
    longDesc:
      'A 90-day guided workbook designed to build consistent leadership habits. Each week focuses on a different dimension of the Prime Counsel leadership architecture.',
    gains: [
      'Daily leadership exercises',
      'Weekly reflection prompts',
      'Monthly milestone assessments',
      'Accountability frameworks',
    ],
    whoFor:
      'Anyone committed to a disciplined, structured approach to their leadership development journey.',
  },
  {
    id: 'executive-positioning-toolkit',
    title: 'Executive Positioning Toolkit',
    category: 'Digital Resource',
    desc: 'Templates, frameworks, and positioning tools for senior-level development',
    price: '£24.99',
    img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&q=80',
    longDesc:
      'A comprehensive toolkit designed for senior leaders and executives. Includes templates for strategic planning, positioning frameworks, and development tracking tools.',
    gains: [
      'Executive positioning canvas',
      'Strategic planning templates',
      'Stakeholder mapping tools',
      'Development tracking dashboards',
    ],
    whoFor:
      'Senior leaders, executives, and organisational heads looking to refine their strategic positioning and leadership infrastructure.',
  },
  {
    id: 'faith-ethics-leadership',
    title: 'Faith, Ethics & Leadership',
    category: 'Book',
    desc: 'Exploring the intersection of ethical conviction and leadership excellence',
    price: '£17.99',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
    longDesc:
      'This book examines how faith-informed ethics can strengthen rather than limit leadership effectiveness. It challenges the secular-sacred divide and presents a compelling case for conviction-led leadership.',
    gains: [
      'Ethical leadership frameworks',
      'Faith-intellect integration models',
      'Case studies from global leaders',
      'Conviction-based decision tools',
    ],
    whoFor:
      'Leaders who want to integrate their faith and ethical convictions into their professional leadership practice.',
  },
  {
    id: 'global-positioning-framework',
    title: 'Global Positioning Framework',
    category: 'Framework',
    desc: 'A structured guide to positioning emerging leaders on the international stage',
    price: '£12.99',
    img: 'https://images.unsplash.com/photo-1568027762272-e4da8b386fe9?w=500&q=80',
    longDesc:
      'This framework PDF provides step-by-step guidance for leaders seeking international visibility and impact. It covers personal branding, cross-cultural competence, and strategic networking.',
    gains: [
      'Global visibility roadmap',
      'Cross-cultural leadership tools',
      'International networking strategies',
      'Personal brand architecture for global audiences',
    ],
    whoFor:
      'Emerging leaders with global ambitions who want a structured pathway to international positioning.',
  },
]


export const CONTACT_INFO = {
  email: 'info@primecounsel.co.uk',
  phone: '+44 777 448 3791',
  instagram: 'https://instagram.com/primecounsel_',
  youtube: 'https://youtube.com/@primecounsel',
  tiktok: 'https://www.tiktok.com/@primecounsel_',
}

export const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Shop', path: '/shop' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]
