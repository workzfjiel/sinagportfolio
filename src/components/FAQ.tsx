import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import founderPhoto from '../assets/founder.jpg';

const faqs = [
  {
    q: 'Who will actually be working on my project?',
    a: "A team of three, led by me, Johnloyd, the founder. No agency layers, no outsourcing. The people you talk to are the people who design it, code it, and ship it. Nothing gets lost in translation.",
  },
  {
    q: "You're a young studio. Can you really handle this?",
    a: "Fair question. We taught ourselves web, mobile, and motion design before anyone paid us to, and we back it up with verified certifications (AWS, Cisco, CompTIA, IBM). What we lack in years we make up for in effort. We don't stop until it works.",
  },
  {
    q: 'How long do projects usually take?',
    a: 'A landing page usually takes 1 to 2 weeks. A full website or mobile app runs 3 to 6 weeks depending on scope. Motion graphics pieces typically take a few days to a week. We give you a realistic timeline before we start, and we tell you early if anything shifts.',
  },
  {
    q: 'What do you need from me to start?',
    a: "Your goal, any brand assets you already have (logo, colors, copy), examples of work you like, and your deadline. Don't have all of that? No problem. Figuring it out together is part of the work.",
  },
  {
    q: 'Can you handle design, development, and motion?',
    a: 'Yes, that\'s the whole point of SINAG. UI/UX design, web and mobile development, motion graphics, and 3D. One tight team, end to end, so everything feels like it was made by the same hands. Because it was.',
  },
  {
    q: 'What happens after launch?',
    a: "We don't disappear. We fix bugs, keep things updated, and provide tech support when something misbehaves. Troubleshooting is literally one of our certified skills. You'll always be able to reach us.",
  },
  {
    q: 'How much does it cost?',
    a: "Less than an agency, and priced by scope, not by the hour. As a young studio building our portfolio and reputation, our rates are honest and flexible. Tell us your budget and we'll tell you exactly what we can deliver for it.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative isolate pt-12 md:pt-16 pb-24 md:pb-32 px-4 md:px-6">
      {/* Light grid background with purple glow */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#DDDDD5] bg-[linear-gradient(to_right,#cfcfc7_1px,transparent_1px),linear-gradient(to_bottom,#cfcfc7_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#c6c6be,transparent)]" />
      </div>

      <div
        ref={sectionRef}
        className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20"
      >
        {/* Left — label + book-a-call block */}
        <div className="lg:col-span-4 flex flex-col">
          <p className="flex items-center gap-2 text-[#141414] text-xs md:text-sm font-bold mb-8">
            <span className="w-2 h-2 rounded-full bg-[#141414]/60 inline-block" />
            FAQs
          </p>

          <div className="mt-auto pt-16">
            <img
              src={founderPhoto}
              alt="Johnloyd Patulay, founder of SINAG"
              className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover mb-6"
              style={{ objectPosition: '50% 22%' }}
            />
            <p className="text-lg md:text-xl text-[#141414]/70 leading-snug mb-6">
              Got more questions?
              <br />
              Chat with Johnloyd.
            </p>
            <a
              href="mailto:patulayjohnloyd16@gmail.com?subject=Book%20a%20call%20with%20Johnloyd"
              className="group inline-flex items-center gap-2 bg-[#141414] text-white px-5 py-3 rounded-lg text-sm md:text-base font-bold hover:gap-3 transition-all duration-300"
            >
              Book a call with Johnloyd
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Right — heading + accordion */}
        <div className="lg:col-span-8">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.02] mb-14 md:mb-20 max-w-[16ch] text-[#141414]"
          >
            Here's what you need to know before working with us.
          </motion.h2>

          <div className="border-t border-[#141414]/10">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-[#141414]/10"
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left group"
                >
                  <span
                    className="text-lg md:text-2xl font-bold tracking-tight transition-colors duration-200"
                    style={{ color: open === i ? '#141414' : 'rgba(20,20,20,0.65)' }}
                  >
                    {faq.q}
                  </span>
                  <Plus
                    className={`w-5 h-5 shrink-0 text-[#141414]/50 transition-transform duration-300 ${
                      open === i ? 'rotate-45' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 text-sm md:text-base text-[#141414]/60 leading-relaxed max-w-2xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
