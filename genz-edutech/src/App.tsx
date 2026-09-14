import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowUpRight, BookOpen, Briefcase, ChevronDown, CircleCheck, Code2, Compass,
  GraduationCap, Handshake, Instagram, Laptop, Mail, Menu,
  MessageCircle, Network, Phone, Play, Sparkles, Target, Users, Wallet, X,
} from 'lucide-react';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const whatsappNumber = '6369216076';
const whatsapp = (message: string) =>
  `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(message)}`;

type Course = {
  title: string;
  level: string;
  description: string;
  overview: string;
  whoCanJoin: string;
  topics: string[];
  syllabus: string[];
  duration: string;
  mode: string;
  language: string;
  career: string;
  support: string;
  accent: string;
  icon: typeof Laptop;
};

const courses: Course[] = [
  {
    title: 'Digital Marketing',
    level: 'Career starter',
    description: 'Learn to make a brand visible, valuable, and impossible to ignore.',
    overview: 'Build a practical understanding of how brands attract, engage, and grow through digital channels.',
    whoCanJoin: 'Students, business owners, creators, and anyone starting a digital career.',
    topics: ['Social media strategy', 'Content & campaign planning', 'Analytics fundamentals'],
    syllabus: ['Digital marketing foundations', 'Search and social strategy', 'Content calendars', 'Campaign basics', 'Analytics and reporting'],
    duration: '8 weeks',
    mode: 'Online',
    language: 'Tamil + English',
    career: 'Digital marketing executive, social media coordinator, content strategist.',
    support: 'Guidance on portfolio projects and career conversations.',
    accent: 'from-[#15304d] to-[#28536d]',
    icon: Target,
  },
  {
    title: 'Social Media Management',
    level: 'Build a presence',
    description: 'Plan, publish, and measure social content with clarity and consistency.',
    overview: 'Learn the day-to-day systems behind thoughtful social media management for brands and professionals.',
    whoCanJoin: 'Aspiring social media managers, creators, and small business teams.',
    topics: ['Content planning', 'Community management', 'Insights and reporting'],
    syllabus: ['Platform fundamentals', 'Content pillars', 'Publishing workflows', 'Community responses', 'Performance insights'],
    duration: '6 weeks',
    mode: 'Online',
    language: 'Tamil + English',
    career: 'Social media manager, community executive, content coordinator.',
    support: 'Portfolio guidance and practical feedback on sample calendars.',
    accent: 'from-[#a06c18] to-[#d7a43c]',
    icon: MessageCircle,
  },
  {
    title: 'Content Writing',
    level: 'Write with purpose',
    description: 'Develop clear, useful writing for audiences, brands, and digital products.',
    overview: 'Practice the research, structure, tone, and editing skills behind professional content.',
    whoCanJoin: 'Students, aspiring writers, marketers, and freelancers.',
    topics: ['Research and structure', 'Brand voice', 'Editing fundamentals'],
    syllabus: ['Writing for the web', 'Research and fact checking', 'SEO-friendly structure', 'Brand voice', 'Editing and briefs'],
    duration: '6 weeks',
    mode: 'Online',
    language: 'Tamil + English',
    career: 'Content writer, copywriter, editorial assistant, freelance writer.',
    support: 'Portfolio prompts and direction for finding suitable projects.',
    accent: 'from-[#4e6573] to-[#77919c]',
    icon: BookOpen,
  },
  {
    title: 'AI Courses',
    level: 'Work smarter',
    description: 'Understand useful AI tools and workflows without losing human judgment.',
    overview: 'Explore practical AI concepts, responsible use, and workflows that support learning and work.',
    whoCanJoin: 'Students, professionals, creators, and curious beginners.',
    topics: ['AI foundations', 'Prompting workflows', 'Responsible use'],
    syllabus: ['AI and machine learning basics', 'Prompt design', 'Research and summarisation', 'Creative workflows', 'Privacy and responsible use'],
    duration: '6 weeks',
    mode: 'Online',
    language: 'Tamil + English',
    career: 'AI-enabled professional, workflow specialist, content and research support.',
    support: 'Project direction for building a responsible AI-assisted workflow.',
    accent: 'from-[#7b4d42] to-[#b8785b]',
    icon: Sparkles,
  },
  {
    title: 'Freelancing',
    level: 'Work independently',
    description: 'Turn a useful skill into a clear, professional freelance offer.',
    overview: 'Learn the practical systems behind finding clients, communicating clearly, and delivering work well.',
    whoCanJoin: 'Beginners and professionals exploring independent work.',
    topics: ['Portfolio creation', 'Proposals and pricing', 'Client communication'],
    syllabus: ['Freelancing foundations', 'Service positioning', 'Portfolio creation', 'Proposal writing', 'Pricing and project management'],
    duration: '6 weeks',
    mode: 'Online',
    language: 'Tamil + English',
    career: 'Independent freelancer, project-based specialist, remote service provider.',
    support: 'Feedback on portfolio direction and professional outreach.',
    accent: 'from-[#274c4b] to-[#55817a]',
    icon: Wallet,
  },
  {
    title: 'Python Programming',
    level: 'Build foundations',
    description: 'Learn to solve problems and create useful programs with Python.',
    overview: 'Start with programming fundamentals and grow through hands-on exercises and small projects.',
    whoCanJoin: 'Students, beginners, and career switchers with no prior coding experience.',
    topics: ['Programming basics', 'Data structures', 'Practical projects'],
    syllabus: ['Python setup and syntax', 'Variables and control flow', 'Functions and collections', 'Files and errors', 'Mini projects'],
    duration: '10 weeks',
    mode: 'Online',
    language: 'Tamil + English',
    career: 'Junior Python developer, automation assistant, technical learner.',
    support: 'Project reviews and guidance on building a beginner portfolio.',
    accent: 'from-[#15304d] to-[#386483]',
    icon: Laptop,
  },
  {
    title: 'Java Programming',
    level: 'Build foundations',
    description: 'Develop core programming thinking with Java and object-oriented concepts.',
    overview: 'Build a solid base in Java syntax, problem solving, and object-oriented programming.',
    whoCanJoin: 'Students and beginners preparing for software development pathways.',
    topics: ['Java syntax', 'Object-oriented thinking', 'Problem solving'],
    syllabus: ['Java foundations', 'Control flow and methods', 'Classes and objects', 'Collections', 'Practice projects'],
    duration: '10 weeks',
    mode: 'Online',
    language: 'Tamil + English',
    career: 'Junior Java developer, application support associate, software trainee.',
    support: 'Practice guidance and portfolio project direction.',
    accent: 'from-[#7b4d42] to-[#b8785b]',
    icon: Code2,
  },
  {
    title: 'HTML & CSS',
    level: 'Start building',
    description: 'Create polished, responsive web pages from the ground up.',
    overview: 'Learn the building blocks of the web and turn ideas into responsive interfaces.',
    whoCanJoin: 'Beginners, students, designers, and aspiring web developers.',
    topics: ['Semantic HTML', 'Responsive CSS', 'Web page projects'],
    syllabus: ['HTML structure', 'Accessibility basics', 'CSS layout', 'Responsive design', 'Landing page project'],
    duration: '6 weeks',
    mode: 'Online',
    language: 'Tamil + English',
    career: 'Junior web designer, frontend learner, website support assistant.',
    support: 'Portfolio feedback on a responsive web project.',
    accent: 'from-[#a06c18] to-[#d7a43c]',
    icon: Laptop,
  },
  {
    title: 'Aptitude Training',
    level: 'Prepare with purpose',
    description: 'Build the reasoning and numerical confidence needed for assessments.',
    overview: 'Practice common aptitude patterns with a clear approach to time, accuracy, and revision.',
    whoCanJoin: 'Students and job seekers preparing for placement or entrance assessments.',
    topics: ['Quantitative aptitude', 'Logical reasoning', 'Time management'],
    syllabus: ['Numbers and percentages', 'Ratios and averages', 'Time and work', 'Data interpretation', 'Reasoning patterns'],
    duration: '6 weeks',
    mode: 'Online',
    language: 'Tamil + English',
    career: 'Stronger assessment readiness across entry-level opportunities.',
    support: 'Practice plans and guidance for preparing consistently.',
    accent: 'from-[#4e6573] to-[#77919c]',
    icon: Compass,
  },
  {
    title: 'Verbal Ability',
    level: 'Communicate clearly',
    description: 'Strengthen the language skills that help you perform and present yourself.',
    overview: 'Improve comprehension, vocabulary, grammar, and communication for academic and professional settings.',
    whoCanJoin: 'Students, job seekers, and professionals building communication confidence.',
    topics: ['Grammar and vocabulary', 'Reading comprehension', 'Professional communication'],
    syllabus: ['Grammar essentials', 'Vocabulary building', 'Reading comprehension', 'Sentence correction', 'Workplace communication'],
    duration: '6 weeks',
    mode: 'Online',
    language: 'Tamil + English',
    career: 'Improved readiness for assessments, interviews, and workplace communication.',
    support: 'Practice feedback and communication guidance.',
    accent: 'from-[#274c4b] to-[#55817a]',
    icon: MessageCircle,
  },
  {
    title: 'Placement Training',
    level: 'Get opportunity-ready',
    description: 'Prepare your profile, practice interviews, and approach your search with a plan.',
    overview: 'A structured preparation path combining resume, aptitude, technical, HR, and communication guidance.',
    whoCanJoin: 'Eligible students and job seekers preparing for current opportunities.',
    topics: ['Resume and ATS guidance', 'Mock interviews', 'Job search strategy'],
    syllabus: ['Resume building', 'ATS resume guidance', 'Aptitude preparation', 'Technical interviews', 'HR interviews and mock practice'],
    duration: '8 weeks',
    mode: 'Online',
    language: 'Tamil + English',
    career: 'Better prepared applications and more confident interview conversations.',
    support: 'Placement guidance; no guaranteed placement claims.',
    accent: 'from-[#15304d] to-[#28536d]',
    icon: Briefcase,
  },
  {
    title: 'Career Development',
    level: 'Find your direction',
    description: 'Make clearer decisions about your skills, profile, and next opportunity.',
    overview: 'Understand your strengths, explore pathways, and build a practical plan for professional growth.',
    whoCanJoin: 'Students, early-career professionals, and people changing direction.',
    topics: ['Career mapping', 'Profile building', 'Goal planning'],
    syllabus: ['Strengths and interests', 'Career pathway research', 'Profile positioning', 'LinkedIn basics', 'Action planning'],
    duration: '4 weeks',
    mode: 'Online',
    language: 'Tamil + English',
    career: 'A clearer next step and a stronger professional direction.',
    support: 'Personalised guidance through the learning journey.',
    accent: 'from-[#7b4d42] to-[#b8785b]',
    icon: Compass,
  },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" data-testid="link-logo">
      <img
        src="/assets/genz-edutech-logo-circle.png"
        alt="GenZ EduTech logo"
        className={compact ? 'h-11 w-11 rounded-full object-contain' : 'h-12 w-12 rounded-full object-contain'}
      />
      <span className="font-display text-[17px] font-extrabold tracking-[-0.04em] text-[#142b47]">
        GenZ <span className="text-[#b27b1b]">EduTech</span>
      </span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  children,
  light = false,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`font-display mt-4 text-3xl font-extrabold leading-[1.12] tracking-[-0.055em] sm:text-5xl ${light ? 'text-[#f7f2e8]' : 'text-[#142b47]'}`}>
        {title}
      </h2>
      {children && <p className={`mt-5 text-base leading-7 ${light ? 'text-[#d6d8d4]' : 'text-[#5c6870]'}`}>{children}</p>}
    </div>
  );
}

function ButtonLink({
  href,
  children,
  secondary = false,
  className = '',
  testId,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
  testId: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b27b1b] focus-visible:ring-offset-2 ${secondary ? 'border border-[#d1a14a]/50 bg-transparent text-[#142b47] hover:bg-[#f7f2e8]/10' : 'bg-[#c18b25] text-[#142b47] hover:bg-[#d7a43c]'} ${className}`}
      data-testid={testId}
    >
      {children}
    </a>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const navItems = [
    ['About', '#about'],
    ['Founder', '#founder'],
    ['Courses', '#courses'],
    ['Services', '#services'],
    ['Placement Support', '#careers'],
    ['Freelancing', '#freelancing'],
    ['Testimonials', '#testimonials'],
    ['Contact', '#contact'],
  ];

  return (
    <div id="top" className="min-h-[100dvh] overflow-hidden bg-[#f9f7f1]">
      <header className="nav-glass fixed inset-x-0 top-0 z-50 border-b border-[#e3dccd]/80">
        <div className="container-width flex h-[76px] items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="underline-link text-[13px] font-semibold text-[#40505b] transition hover:text-[#142b47]" data-testid={`link-nav-${label.toLowerCase()}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <a href="tel:6369216076" className="flex items-center gap-2 text-sm font-semibold text-[#40505b]" data-testid="link-nav-phone">
              <Phone className="h-4 w-4 text-[#b27b1b]" /> 6369216076
            </a>
            <ButtonLink href={whatsapp('Hello GenZ EduTech, I would like to talk about your learning and career programs.')} className="min-h-10 px-5" testId="button-nav-talk">
              Talk to Us <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full p-2 text-[#142b47] transition hover:bg-[#eee6d7] lg:hidden"
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#e3dccd] bg-[#f9f7f1] px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="container-width flex flex-col gap-1">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-base font-semibold text-[#40505b] hover:bg-[#eee6d7]" data-testid={`link-mobile-${label.toLowerCase()}`}>
                  {label}
                </a>
              ))}
              <ButtonLink href={whatsapp('Hello GenZ EduTech, I would like to talk about your learning and career programs.')} className="mt-3" testId="button-mobile-talk">
                Talk to Us <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-[#f9f7f1] pt-28">
          <div className="hero-orb -right-40 top-16 -z-10 h-[470px] w-[470px] bg-[#ead8ae]/50" />
          <div className="hero-orb -left-32 bottom-0 -z-10 h-[280px] w-[280px] bg-[#d6e0da]/45" />
          <div className="container-width grid items-center gap-14 pb-20 pt-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-8 lg:pb-28">
            <div className="reveal">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dec78e] bg-[#f8edcf] px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-[#7a5715]">
                <Sparkles className="h-3.5 w-3.5" /> Your next chapter starts here
              </div>
              <h1 className="font-display max-w-[720px] text-[clamp(3.35rem,8vw,6.7rem)] font-extrabold leading-[.93] tracking-[-0.075em] text-[#142b47]">
                Learn Skills.<br />
                <span className="text-[#b27b1b]">Build Careers.</span><br />
                Create Opportunities.
              </h1>
               <p className="mt-8 max-w-xl text-lg leading-8 text-[#56636b]">
                 Practical online training, career guidance and digital skills designed to help you move confidently toward your next opportunity.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={whatsapp('Hello GenZ EduTech, I would like to explore your courses and career guidance.')} testId="button-hero-course">
                  Explore courses <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href={whatsapp('Hello GenZ Edu Tech, I would like to know more about your courses and services.')} secondary className="border-[#c4b99f] bg-[#f9f7f1] text-[#142b47] hover:bg-[#eee6d7]" testId="button-hero-talk">
                  Talk to Us <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              </div>
              <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-[#647079]">
                <span className="flex items-center gap-2"><CircleCheck className="h-4 w-4 text-[#b27b1b]" /> Skills that stay relevant</span>
                <span className="flex items-center gap-2"><CircleCheck className="h-4 w-4 text-[#b27b1b]" /> Guidance that feels human</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[500px] reveal reveal-delay-2">
              <div className="absolute -inset-4 rounded-[42px] border border-[#d3b56b]/40" />
              <div className="relative overflow-hidden rounded-[34px] bg-[#142b47] p-6 shadow-[0_28px_80px_rgba(20,43,71,.22)] sm:p-8">
                <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#c18b25]/25" />
                <div className="absolute -bottom-24 -left-12 h-48 w-48 rounded-full bg-[#6e8c91]/25" />
                <div className="relative flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[.18em] text-[#d6b86d]">The GenZ route</span>
                  <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-semibold text-white/70">01 / 04</span>
                </div>
                <div className="relative mt-10 flex justify-center">
                  <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[#f6f0e1] ring-8 ring-[#d3b56b]/20">
                    <img src="/assets/genz-edutech-logo-circle.png" alt="GenZ EduTech emblem" className="h-40 w-40 rounded-full object-contain" />
                  </div>
                </div>
                <div className="relative mt-9">
                  <p className="font-display text-2xl font-extrabold leading-tight tracking-[-.04em] text-[#f7f2e8]">A little direction<br />changes everything.</p>
                  <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-5">
                    <span className="text-xs leading-5 text-white/55">Learn with purpose.<br />Move with clarity.</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c18b25] text-[#142b47]"><ArrowUpRight className="h-5 w-5" /></span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-7 -left-5 flex items-center gap-3 rounded-2xl bg-[#f7f2e8] px-4 py-3 shadow-xl sm:-left-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7d6a5] text-[#142b47]"><GraduationCap className="h-5 w-5" /></div>
                <div><p className="text-xs font-bold text-[#142b47]">Your potential</p><p className="text-[11px] text-[#647079]">Worth investing in.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#142b47] py-24 text-[#f7f2e8] sm:py-32">
          <div className="container-width grid gap-14 lg:grid-cols-[.84fr_1.16fr] lg:items-end">
             <SectionHeading eyebrow="About GenZ EduTech" title="Empowering People With Practical Skills" light />
            <div>
               <p className="text-xl leading-9 text-[#e1ded5] sm:text-2xl sm:leading-10">GenZ Edu Tech is a modern education and career development platform focused on practical skill development, professional growth, placement guidance and freelancing opportunities.</p>
               <p className="mt-6 max-w-2xl text-base leading-8 text-[#bfc5c4]">We help students, job seekers and aspiring professionals develop practical skills that can support their academic, professional and entrepreneurial journeys.</p>
              <a href="#courses" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#d6b86d] underline-offset-8 hover:underline" data-testid="link-about-courses">See how we help <ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

         <section id="founder" className="bg-[#f9f7f1] py-24 sm:py-32">
           <div className="container-width grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
             <div className="relative mx-auto w-full max-w-[420px]">
               <div className="absolute -inset-4 rounded-[34px] border border-[#d3b56b]/45" />
               <div className="relative overflow-hidden rounded-[28px] bg-[#ede7da] p-3 shadow-[0_24px_60px_rgba(20,43,71,.12)]">
                 <img
                   src="/assets/genz-edutech-founder.png"
                   alt="Founder of GenZ Edu Tech"
                   className="aspect-square w-full rounded-[22px] object-cover object-top"
                 />
               </div>
             </div>
             <div>
               <SectionHeading eyebrow="Founder" title="Building a more practical way forward." >
                 GenZ Edu Tech is being shaped around a simple belief: learning should feel useful, guidance should feel human, and every learner should be able to see a next step.
               </SectionHeading>
               <p className="mt-6 max-w-2xl text-base leading-8 text-[#647079]">Through practical online training, career guidance, placement support, and freelancing direction, the goal is to help students, job seekers, and aspiring professionals move with more clarity and confidence.</p>
               <a href={whatsapp('Hello GenZ Edu Tech, I would like to connect with the founder and learn more about your courses and services.')} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c18b25] px-6 text-sm font-bold text-[#142b47] transition hover:-translate-y-0.5 hover:bg-[#d7a43c]" data-testid="button-founder-talk">Talk to GenZ Edu Tech <ArrowUpRight className="h-4 w-4" /></a>
             </div>
           </div>
         </section>

        <section className="section-wash py-24 sm:py-32">
          <div className="container-width">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
               <SectionHeading eyebrow="Why choose GenZ" title="Why Choose GenZ Edu Tech?" >
                 Practical guidance, current skills, and flexible support for the next useful step.
              </SectionHeading>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                   { icon: BookOpen, title: 'Practical Learning', body: 'Learn through guided practice and useful work that gives your knowledge somewhere to go.' },
                   { icon: Target, title: 'Industry-Relevant Skills', body: 'Build capabilities shaped around current digital, technical, and professional needs.' },
                   { icon: Compass, title: 'Career Guidance', body: 'Understand your strengths, explore possibilities, and make decisions with less noise.' },
                   { icon: Handshake, title: 'Placement Support', body: 'Prepare your profile, applications, and interviews with thoughtful guidance.' },
                   { icon: Wallet, title: 'Freelancing Guidance', body: 'Learn how to package your skills, find clients, and build independent momentum.' },
                   { icon: Laptop, title: 'Flexible Online Learning', body: 'Access focused online learning that fits around your schedule and goals.' },
                ].map(({ icon: Icon, title, body }, index) => (
                  <article key={title} className={`rounded-2xl border border-[#e1daca] bg-[#fdfbf6] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d4b76e] hover:shadow-lg ${index === 1 ? 'sm:translate-y-8' : ''}`} data-testid={`card-value-${index}`}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9d8a9] text-[#142b47]"><Icon className="h-5 w-5" /></div>
                    <h3 className="font-display mt-6 text-xl font-extrabold tracking-[-.04em] text-[#142b47]">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#647079]">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="bg-[#f9f7f1] py-24 sm:py-32">
          <div className="container-width">
             <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
               <SectionHeading eyebrow="Courses" title="Learn Skills That Move You Forward" >
                 Focused online programs for practical skills, professional growth, and your next opportunity.
              </SectionHeading>
              <a href={whatsapp('Hello GenZ EduTech, I would like to get course details.')} className="inline-flex items-center gap-2 text-sm font-bold text-[#8b6115] underline-offset-8 hover:underline" data-testid="link-all-course-details">Get course details <ArrowUpRight className="h-4 w-4" /></a>
            </div>
             <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-[#e2d3b0] bg-[#fbf1d7] px-5 py-4 text-sm text-[#6e541d]">
               <span className="font-bold">Up to 30% OFF on selected courses</span>
               <span className="hidden text-[#a78a4d] sm:inline">•</span>
               <span>Placement guidance is FREE for eligible students who enroll during the offer period.</span>
             </div>
            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              {courses.map((course, index) => {
                const Icon = course.icon;
                const isExpanded = expandedCourse === course.title;
                return (
                  <article key={course.title} className="group overflow-hidden rounded-[24px] border border-[#e0d8c9] bg-[#fdfbf6] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(20,43,71,.09)]" data-testid={`card-course-${index}`}>
                    <div className={`relative min-h-[176px] overflow-hidden bg-gradient-to-br ${course.accent} p-7 text-[#f7f2e8]`}>
                      <div className="absolute -right-7 -top-10 h-40 w-40 rounded-full border-[18px] border-white/10" />
                      <div className="absolute bottom-[-44px] right-16 h-28 w-28 rounded-full border-[12px] border-[#d6b86d]/20" />
                      <div className="relative flex items-start justify-between">
                        <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[.15em]">{course.level}</span>
                        <Icon className="h-7 w-7 text-[#f1d58d]" />
                      </div>
                      <h3 className="relative mt-12 font-display text-2xl font-extrabold tracking-[-.05em]">{course.title}</h3>
                    </div>
                    <div className="p-7">
                       <p className="text-sm leading-7 text-[#647079]">{course.description}</p>
                       <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[.1em] text-[#8b6115]">
                         <span className="rounded-full bg-[#f0e5c9] px-3 py-1">{course.duration}</span>
                         <span className="rounded-full bg-[#f0e5c9] px-3 py-1">{course.mode}</span>
                         <span className="rounded-full bg-[#f0e5c9] px-3 py-1">{course.language}</span>
                       </div>
                      <button type="button" onClick={() => setExpandedCourse(isExpanded ? null : course.title)} className="mt-5 flex w-full items-center justify-between border-t border-[#e8e0d3] pt-5 text-left text-sm font-bold text-[#142b47]" aria-expanded={isExpanded} data-testid={`button-course-details-${index}`}>
                         {isExpanded ? 'Hide course details' : 'View Course'} <ChevronDown className={`h-4 w-4 text-[#b27b1b] transition ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      {isExpanded && (
                         <div className="mt-5 space-y-5" data-testid={`list-course-topics-${index}`}>
                           <div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#8b6115]">Course overview</p><p className="mt-2 text-sm leading-6 text-[#56636b]">{course.overview}</p></div>
                           <div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#8b6115]">Who can join</p><p className="mt-2 text-sm leading-6 text-[#56636b]">{course.whoCanJoin}</p></div>
                           <div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#8b6115]">What you will learn</p><ul className="mt-2 space-y-2">{course.topics.map((topic) => <li key={topic} className="flex items-center gap-2 text-sm text-[#56636b]"><CircleCheck className="h-4 w-4 shrink-0 text-[#b27b1b]" /> {topic}</li>)}</ul></div>
                           <div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#8b6115]">Complete syllabus</p><ul className="mt-2 grid gap-2 sm:grid-cols-2">{course.syllabus.map((item) => <li key={item} className="text-sm leading-6 text-[#56636b]">• {item}</li>)}</ul></div>
                           <div className="grid gap-4 sm:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#8b6115]">Career opportunities</p><p className="mt-2 text-sm leading-6 text-[#56636b]">{course.career}</p></div><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#8b6115]">Support available</p><p className="mt-2 text-sm leading-6 text-[#56636b]">{course.support}</p></div></div>
                         </div>
                      )}
                      <a href={whatsapp(`Hello GenZ EduTech, I would like to get details about the ${course.title} course.`)} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#8b6115] underline-offset-8 hover:underline" data-testid={`link-course-enquire-${index}`}>Enquire about this course <ArrowUpRight className="h-4 w-4" /></a>
                    </div>
                  </article>
                );
              })}
            </div>
             <div className="mt-12 text-center">
               <p className="text-sm font-semibold text-[#647079]">Interested in a course?</p>
               <a href={whatsapp('Hello GenZ Edu Tech, I would like to know more about your courses and services.')} className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c18b25] px-6 text-sm font-bold text-[#142b47] transition hover:-translate-y-0.5 hover:bg-[#d7a43c]" data-testid="button-courses-talk">Talk to GenZ Edu Tech <ArrowUpRight className="h-4 w-4" /></a>
             </div>
          </div>
        </section>

         <section id="services" className="bg-[#ede7da] py-24 sm:py-32">
          <div className="container-width">
            <SectionHeading eyebrow="Services" title="Support for every stage of the journey." >
               Practical learning, guidance, and digital services for people and teams ready to move forward.
            </SectionHeading>
             <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                 { icon: GraduationCap, title: 'Online Skill Training', body: 'Structured, practical learning that turns curiosity into capability.' },
                 { icon: Briefcase, title: 'Placement Guidance', body: 'Build a stronger profile, prepare for opportunities, and approach the job search with direction.' },
                 { icon: Compass, title: 'Career Development', body: 'Explore your strengths, possible paths, and the next action worth taking.' },
                 { icon: Wallet, title: 'Freelancing Guidance', body: 'Understand how to package your skill, find clients, and build independent momentum.' },
                 { icon: Target, title: 'Digital Marketing', body: 'Create thoughtful digital strategies that help brands reach the right people.' },
                 { icon: MessageCircle, title: 'Social Media Management', body: 'Plan, publish, and improve social communication with consistency.' },
                 { icon: BookOpen, title: 'Content Writing', body: 'Develop clear, useful content for audiences, brands, and digital products.' },
                 { icon: Sparkles, title: 'AI Training', body: 'Use practical AI tools responsibly to support learning and professional work.' },
                 { icon: Code2, title: 'Programming Training', body: 'Build strong fundamentals through guided practice and projects.' },
                 { icon: Laptop, title: 'Project-Based Learning', body: 'Turn your learning into visible work that gives your skills context.' },
                 { icon: Users, title: 'Professional Skill Development', body: 'Grow communication, confidence, and the habits that support good work.' },
                 { icon: Network, title: 'Website Development / Digital Services', body: 'Get practical digital support for websites, content, and online presence.' },
              ].map(({ icon: Icon, title, body }, index) => (
                <article key={title} className={`group rounded-[24px] border border-[#dcd1bc] bg-[#f9f7f1] p-7 transition duration-300 hover:-translate-y-1 hover:bg-[#142b47] hover:text-[#f7f2e8] ${index === 1 ? 'md:mt-10' : ''}`} data-testid={`card-service-${index}`}>
                  <Icon className="h-7 w-7 text-[#b27b1b] transition group-hover:text-[#d6b86d]" />
                  <h3 className="font-display mt-12 text-2xl font-extrabold tracking-[-.05em] text-[#142b47] transition group-hover:text-[#f7f2e8]">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#647079] transition group-hover:text-[#c7cdcc]">{body}</p>
                  <a href={whatsapp(`Hello GenZ EduTech, I would like to learn more about ${title}.`)} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#8b6115] group-hover:text-[#d6b86d]" data-testid={`link-service-${index}`}>Talk to us <ArrowUpRight className="h-4 w-4" /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

         <section id="careers" className="bg-[#f9f7f1] py-24 sm:py-32">
          <div className="container-width grid gap-14 lg:grid-cols-[1fr_.9fr] lg:items-center">
            <div>
               <SectionHeading eyebrow="Placement Guidance" title="Career & Placement Guidance" >
                 We help you understand where you are, where you want to go, and what to do next — without making unrealistic promises.
              </SectionHeading>
              <div className="mt-9 space-y-5">
                 {['Resume Building', 'ATS Resume Guidance', 'Aptitude Preparation', 'Technical Interview Preparation', 'HR Interview Preparation', 'Mock Interviews', 'Communication Skills', 'LinkedIn Guidance', 'Career Guidance', 'Job Search Strategy'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[#465761]"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e7d6a5] text-[#142b47]"><CircleCheck className="h-4 w-4" /></span>{item}</div>
                ))}
              </div>
              <ButtonLink href={whatsapp('Hello GenZ EduTech, I would like guidance for my career and placement journey.')} className="mt-10" testId="button-career-guidance">Start a conversation <ArrowUpRight className="h-4 w-4" /></ButtonLink>
            </div>
            <div className="relative rounded-[32px] bg-[#dce6e0] p-7 sm:p-10">
              <div className="absolute right-7 top-7 h-16 w-16 rounded-full bg-[#c18b25]/30" />
              <div className="relative rounded-[22px] bg-[#f9f7f1] p-6 shadow-[0_20px_45px_rgba(20,43,71,.1)] sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">A simple framework</span>
                  <span className="text-xs font-bold text-[#b27b1b]">01 — 04</span>
                </div>
                <div className="mt-9 space-y-4">
                  {[
                    ['01', 'Know yourself', 'Find the strengths worth building on.'],
                    ['02', 'Build your proof', 'Turn learning into visible, useful work.'],
                    ['03', 'Tell your story', 'Communicate your value with clarity.'],
                    ['04', 'Take your shot', 'Move towards opportunities with intent.'],
                  ].map(([number, title, body], index) => (
                    <div key={number} className="flex gap-4 border-b border-[#e8e0d3] pb-4 last:border-0 last:pb-0">
                      <span className={`font-display text-sm font-extrabold ${index === 0 ? 'text-[#b27b1b]' : 'text-[#99a3a2]'}`}>{number}</span>
                      <div><p className="font-display text-lg font-extrabold tracking-[-.03em] text-[#142b47]">{title}</p><p className="mt-1 text-xs leading-5 text-[#647079]">{body}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

         <section id="freelancing" className="bg-[#ede7da] py-24 sm:py-32">
           <div className="container-width grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
             <SectionHeading eyebrow="Freelancing" title="Build skills that can travel with you." >
               Freelancing is more than finding one project. It is learning how to create value, communicate professionally, and build trust over time.
             </SectionHeading>
             <div>
               <div className="grid gap-3 sm:grid-cols-2">
                 {['Understanding freelancing', 'Building skills', 'Portfolio creation', 'Finding clients', 'Proposal writing', 'Client communication', 'Pricing and negotiation', 'Project management', 'Building long-term clients'].map((item, index) => (
                   <div key={item} className="flex items-center gap-3 rounded-xl bg-[#f9f7f1] px-4 py-3 text-sm font-semibold text-[#465761]"><span className="text-xs font-bold text-[#b27b1b]">0{index + 1}</span>{item}</div>
                 ))}
               </div>
               <p className="mt-7 text-sm leading-7 text-[#647079]">GenZ Edu Tech is building a professional network of skilled individuals across multiple domains. Based on suitable opportunities and projects, work can be distributed among qualified professionals while GenZ Edu Tech coordinates the process.</p>
               <a href={whatsapp('Hello GenZ Edu Tech, I would like to explore freelancing guidance.')} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c18b25] px-6 text-sm font-bold text-[#142b47] transition hover:-translate-y-0.5 hover:bg-[#d7a43c]" data-testid="button-freelancing">Explore Freelancing Guidance <ArrowUpRight className="h-4 w-4" /></a>
             </div>
           </div>
         </section>

         <section className="bg-[#142b47] py-24 text-[#f7f2e8] sm:py-32">
          <div className="container-width grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c18b25] text-[#142b47]"><Network className="h-7 w-7" /></div>
               <h2 className="font-display mt-7 text-3xl font-extrabold leading-[1.1] tracking-[-.055em] sm:text-5xl">Skills That Create Opportunities</h2>
            </div>
            <div>
               <p className="text-xl leading-9 text-[#e3ded2]">GenZ Edu Tech is building a network of skilled individuals across multiple domains.</p>
               <p className="mt-6 text-base leading-8 text-[#bfc5c4]">Based on suitable opportunities and projects, work can be distributed among qualified professionals while GenZ Edu Tech coordinates the process. We keep the focus on skills, fit, and clear communication.</p>
               <div className="mt-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#d6b86d]"><span>Skills</span><ArrowUpRight className="h-4 w-4" /><span>Opportunities</span><ArrowUpRight className="h-4 w-4" /><span>Projects</span><ArrowUpRight className="h-4 w-4" /><span>Growth</span></div>
               <a href={whatsapp('Hello GenZ Edu Tech, I would like to know more about the GenZ professional network.')} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#d6b86d] underline-offset-8 hover:underline" data-testid="link-network">Learn about the network <ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

         <section id="testimonials" className="bg-[#f5efe4] py-24 sm:py-32">
          <div className="container-width">
            <div className="mx-auto max-w-3xl rounded-[28px] border border-[#ddcfb6] bg-[#fbf9f3] p-8 text-center sm:p-14">
              <p className="eyebrow">A note from us</p>
              <div className="mx-auto mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#e9d8a9] text-[#142b47]"><Play className="ml-1 h-5 w-5" /></div>
               <h2 className="font-display mt-7 text-3xl font-extrabold tracking-[-.055em] text-[#142b47] sm:text-4xl">Student experiences will be featured here.</h2>
               <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#647079]">We are keeping this space honest. As learners begin their journeys with GenZ Edu Tech, we will feature their experiences here with permission, in their own words.</p>
               <p className="mt-7 text-xs font-bold uppercase tracking-[.15em] text-[#a68235]">Real learner stories coming soon</p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#c18b25] py-20 sm:py-28">
          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[35px] border-[#f4d88e]/25" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[28px] border-[#8a5e15]/20" />
          <div className="container-width relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
               <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#5f451b]">Your next chapter starts here</p>
               <h2 className="font-display mt-4 text-4xl font-extrabold leading-[1.05] tracking-[-.06em] text-[#142b47] sm:text-6xl">Ready to Build Your Next Skill?</h2>
               <p className="mt-5 max-w-xl text-base leading-7 text-[#5f451b]">Explore our courses and connect with GenZ Edu Tech to find the right learning path for you.</p>
            </div>
            <ButtonLink href={whatsapp('Hello GenZ EduTech, I am ready to take my next step. Please tell me how to begin.')} secondary className="shrink-0 border-[#142b47]/40 text-[#142b47] hover:bg-[#142b47]/10" testId="button-final-cta">Talk to GenZ EduTech <ArrowUpRight className="h-4 w-4" /></ButtonLink>
          </div>
        </section>

        <section id="contact" className="bg-[#f9f7f1] py-24 sm:py-32">
          <div className="container-width grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <SectionHeading eyebrow="Contact" title="A question is a good place to start." >
              Tell us what you are trying to learn, build, or become. We will point you in the right direction.
            </SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="tel:6369216076" className="group rounded-2xl border border-[#e0d8c9] bg-[#fdfbf6] p-6 transition hover:-translate-y-1 hover:border-[#d4b76e]" data-testid="link-contact-phone">
                <Phone className="h-5 w-5 text-[#b27b1b]" /><p className="mt-8 text-xs font-bold uppercase tracking-[.13em] text-[#8b6115]">Call us</p><p className="mt-2 font-display text-lg font-extrabold text-[#142b47]">6369216076</p>
              </a>
              <a href="mailto:megakandhan0@gmail.com" className="group rounded-2xl border border-[#e0d8c9] bg-[#fdfbf6] p-6 transition hover:-translate-y-1 hover:border-[#d4b76e]" data-testid="link-contact-email">
                <Mail className="h-5 w-5 text-[#b27b1b]" /><p className="mt-8 text-xs font-bold uppercase tracking-[.13em] text-[#8b6115]">Email us</p><p className="mt-2 break-all font-display text-lg font-extrabold text-[#142b47]">megakandhan0@gmail.com</p>
              </a>
              <a href={whatsapp('Hello GenZ EduTech, I would like to talk to someone about my next step.')} className="group rounded-2xl border border-[#e0d8c9] bg-[#fdfbf6] p-6 transition hover:-translate-y-1 hover:border-[#d4b76e]" data-testid="link-contact-whatsapp">
                <MessageCircle className="h-5 w-5 text-[#b27b1b]" /><p className="mt-8 text-xs font-bold uppercase tracking-[.13em] text-[#8b6115]">WhatsApp</p><p className="mt-2 font-display text-lg font-extrabold text-[#142b47]">Start a conversation</p>
              </a>
              <a href="https://www.instagram.com/genz_edu_tech/" target="_blank" rel="noreferrer" className="group rounded-2xl border border-[#e0d8c9] bg-[#fdfbf6] p-6 transition hover:-translate-y-1 hover:border-[#d4b76e]" data-testid="link-contact-instagram">
                <Instagram className="h-5 w-5 text-[#b27b1b]" /><p className="mt-8 text-xs font-bold uppercase tracking-[.13em] text-[#8b6115]">Instagram</p><p className="mt-2 font-display text-lg font-extrabold text-[#142b47]">@genz_edu_tech</p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#10253e] py-10 text-[#f7f2e8]">
        <div className="container-width flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
             <Logo compact />
             <p className="mt-4 max-w-xs text-sm leading-6 text-[#abb8ba]">Learn Skills. Build Careers. Create Opportunities.</p>
          </div>
           <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#c9d0ce]">
             <a href="#top" className="transition hover:text-[#d6b86d]" data-testid="link-footer-home">Home</a>
             {navItems.map(([label, href]) => <a key={href} href={href} className="transition hover:text-[#d6b86d]" data-testid={`link-footer-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/genz_edu_tech/" target="_blank" rel="noreferrer" aria-label="GenZ EduTech on Instagram" className="rounded-full border border-white/20 p-2.5 transition hover:border-[#d6b86d] hover:text-[#d6b86d]" data-testid="link-footer-instagram"><Instagram className="h-4 w-4" /></a>
            <a href="mailto:megakandhan0@gmail.com" aria-label="Email GenZ EduTech" className="rounded-full border border-white/20 p-2.5 transition hover:border-[#d6b86d] hover:text-[#d6b86d]" data-testid="link-footer-email"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
         <div className="container-width mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#8e9da0] sm:flex-row sm:items-center sm:justify-between">
           <span>© 2026 GenZ Edu Tech. All Rights Reserved.</span>
           <div className="flex gap-4"><a href="#contact" className="hover:text-[#d6b86d]">Privacy Policy</a><a href="#contact" className="hover:text-[#d6b86d]">Terms &amp; Conditions</a></div>
         </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;