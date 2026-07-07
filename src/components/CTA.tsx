import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// Moody studio scene — rendered in classic black & white via CSS grayscale
const CTA_IMAGE =
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1800&q=75';

const lines = [
  { text: "Let's build", indent: 'ml-[6vw]' },
  { text: 'an experience', indent: 'ml-[14vw]' },
  { text: 'that moves', indent: 'ml-[2vw]' },
  { text: 'people', indent: 'ml-[26vw]', arrow: true },
];

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden flex flex-col justify-center py-24 px-4 md:px-8">
      {/* Classic B&W backdrop */}
      <img
        src={CTA_IMAGE}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover grayscale contrast-110"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
      <div className="noise-overlay absolute inset-0 opacity-[0.5] mix-blend-overlay pointer-events-none" />

      {/* Giant staggered headline */}
      <div className="relative z-10">
        {lines.map((line, i) => (
          <motion.div
            key={line.text}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-center gap-[2vw] ${line.indent}`}
          >
            {line.arrow && (
              <ArrowRight
                className="w-[6.5vw] h-[6.5vw] shrink-0"
                style={{ color: '#E1E0CC' }}
                strokeWidth={2.5}
              />
            )}
            <span
              className="font-display uppercase text-[8.2vw] leading-[0.98] tracking-tight whitespace-nowrap"
              style={{ color: '#E1E0CC' }}
            >
              {line.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom row — wise words + CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-16 md:mt-20 flex flex-col md:flex-row md:items-end justify-between gap-10 max-w-[90rem] mx-auto w-full"
      >
        <blockquote className="max-w-md">
          <p className="text-base md:text-lg text-primary/80 leading-relaxed font-serif italic">
            "It does not matter how slowly you go as long as you do not stop."
          </p>
          <cite className="block mt-3 text-xs md:text-sm text-primary/50 not-italic tracking-wide">
            Confucius
          </cite>
        </blockquote>

        <a
          href="mailto:patulayjohnloyd16@gmail.com?subject=Here's%20my%20story"
          className="group inline-flex items-center gap-3 bg-primary text-black rounded-full px-7 py-4 text-base md:text-lg font-bold w-fit hover:gap-4 transition-all duration-300 shrink-0"
        >
          Tell us your story
          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>
    </section>
  );
}
