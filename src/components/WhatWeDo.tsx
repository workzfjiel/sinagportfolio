import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { services } from '../data/services';

// Poster-style imagery per service — Web card shows real RCC work
const CARD_IMAGES: Record<string, string> = {
  '1': '/projects/rcc-welcome.png',
  '2': 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=70',
  '3': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=70',
  '4': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=900&q=70',
};

// Giant bottom title + small kicker, per service
const CARD_TITLES: Record<string, { kicker: string; giant: string }> = {
  '1': { kicker: 'Development', giant: 'Web' },
  '2': { kicker: 'Development', giant: 'Mobile' },
  '3': { kicker: 'Graphics & 3D', giant: 'Motion' },
  '4': { kicker: '& Maintenance', giant: 'Support' },
};

// SINAG-toned card palette: cream, gold, terracotta, charcoal
const CARD_STYLES = [
  { bg: '#DEDBC8', text: '#141414', muted: 'rgba(20,20,20,0.65)', line: 'rgba(20,20,20,0.25)' },
  { bg: '#E8B816', text: '#141414', muted: 'rgba(20,20,20,0.68)', line: 'rgba(20,20,20,0.25)' },
  { bg: '#C46B4A', text: '#141414', muted: 'rgba(20,20,20,0.68)', line: 'rgba(20,20,20,0.25)' },
  { bg: '#141414', text: '#DEDBC8', muted: 'rgba(222,219,200,0.6)', line: 'rgba(222,219,200,0.2)' },
];

/** Cinematic iris reveal — a dot of light bursts out of the dark and opens the section */
function IntroReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // The light circle grows from a pinprick to swallowing the whole screen.
  // One-way: once fully open it latches and never collapses back.
  const opened = useRef(false);
  const clipPath = useTransform(scrollYProgress, (v) => {
    if (opened.current || v >= 0.72) {
      opened.current = true;
      return 'none';
    }
    const t = Math.min(Math.max((v - 0.05) / 0.67, 0), 1);
    return `circle(${0.5 + t * 119.5}% at 50% 50%)`;
  });
  const headingScale = useTransform(scrollYProgress, (v) =>
    opened.current ? 1 : 1.3 - Math.min(Math.max((v - 0.15) / 0.6, 0), 1) * 0.3
  );
  const headingOpacity = useTransform(scrollYProgress, (v) =>
    opened.current ? 1 : Math.min(Math.max((v - 0.18) / 0.32, 0), 1)
  );

  return (
    <div ref={ref} className="h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#080807' }}>
        <motion.div
          style={{ clipPath, background: '#DDDDD5' }}
          className="absolute inset-0 flex items-center justify-center px-4"
        >
          <motion.h2
            style={{ scale: headingScale, opacity: headingOpacity, color: '#141414' }}
            className="font-anton font-bold uppercase text-center leading-none text-[7.5vw] md:text-[5vw]"
          >
            So what do we do, exactly?
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
}

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative">
      {/* Intro — the light opens the stage */}
      <IntroReveal />

      {/* Stacked cards — each pins fullscreen, the next slides up over it */}
      <div className="relative">
        {services.map((service, i) => {
          const style = CARD_STYLES[i % CARD_STYLES.length];
          const titles = CARD_TITLES[service.id];
          return (
            <div
              key={service.id}
              className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between p-6 md:p-12"
              style={{ background: style.bg, color: style.text }}
            >
              {/* Top — number + description */}
              <div className="max-w-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm font-medium mb-8 md:mb-10"
                  style={{ border: `1px solid ${style.line}` }}
                >
                  {i + 1}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-base md:text-lg leading-relaxed"
                >
                  {service.description}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="mt-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: style.muted }}
                >
                  {service.features.join(' · ')}
                </motion.p>
              </div>

              {/* Tilted poster image — right side */}
              <motion.div
                initial={{ opacity: 0, rotate: 14, y: 60 }}
                whileInView={{ opacity: 1, rotate: 8, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="hidden md:block absolute right-[7%] top-[16%] w-[24vw] max-w-sm aspect-[3/4] shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              >
                <img
                  src={CARD_IMAGES[service.id]}
                  alt=""
                  aria-hidden
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Bottom — giant title */}
              <div className="relative z-10">
                <p className="font-anton uppercase text-lg md:text-2xl tracking-wide mb-1 md:ml-[0.5vw]">
                  {titles.kicker}
                </p>
                <h3 className="font-anton font-bold uppercase leading-[0.82] text-[26vw] md:text-[17vw] -ml-[0.5vw]">
                  {titles.giant}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
