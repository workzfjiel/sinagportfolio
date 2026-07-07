import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { badges } from '../data/badges';
import type { Badge } from '../data/badges';
import { brands } from '../data/brands';
import founderPhoto from '../assets/founder.jpg';

const PARAGRAPHS = [
  "We're a three-person studio hungry for the work bigger teams play safe on. Everything here, websites, mobile apps, motion graphics, we taught ourselves while nobody was watching.",
  "We show up, we figure it out, and we don't stop until it works.",
];

// Dedupe by name for the About column (one badge appears twice in the source data)
const uniqueBadges = badges.filter(
  (badge, i, arr) => arr.findIndex((b) => b.name === badge.name) === i
);

function BadgeRow({ badge }: { badge: Badge }) {
  return (
    <div className="flex items-center gap-3 group/badge">
      <img
        src={badge.image}
        alt={badge.name}
        loading="lazy"
        className="w-9 h-9 object-contain shrink-0 grayscale brightness-150 contrast-75 opacity-80 group-hover/badge:grayscale-0 group-hover/badge:brightness-100 group-hover/badge:contrast-100 group-hover/badge:opacity-100 transition-all duration-300"
      />
      <div className="min-w-0">
        <p className="text-xs font-medium leading-snug truncate" style={{ color: '#E1E0CC' }}>
          {badge.name}
        </p>
        <p className="text-[10px] text-primary/50 truncate">{badge.issuer}</p>
      </div>
    </div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.25'],
  });

  // Diagonal reveal — the bright/dim boundary sweeps across the text at an angle
  const backgroundPosition = useTransform(scrollYProgress, [0, 1], ['100% 0%', '0% 0%']);

  return (
    <section id="about" className="bg-black pb-12 md:pb-16">
      <div ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — flush to the very left & top (small screens keep edge padding) */}
          <div className="lg:col-span-4 flex flex-col px-4 md:px-6 lg:pl-6 lg:pr-0">
            <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-10">
              The person behind SINAG
            </p>

            <div className="mb-8">
              <p
                className="text-6xl sm:text-7xl font-medium tracking-tight mb-3"
                style={{ color: '#E1E0CC' }}
              >
                8
              </p>
              <p className="text-base text-primary/60 leading-relaxed max-w-[26ch]">
                Verified certifications &amp; badges on Credly
              </p>
            </div>

            {/* Vertical auto-scrolling badge marquee */}
            <div className="relative h-[260px] md:h-[320px] overflow-hidden">
              <div className="group flex flex-col h-full [--gap:1.25rem] [gap:var(--gap)] [--duration:26s] overflow-hidden">
                <div className="flex flex-col shrink-0 [gap:var(--gap)] animate-marquee-y group-hover:[animation-play-state:paused]">
                  {uniqueBadges.map((badge, i) => (
                    <BadgeRow key={i} badge={badge} />
                  ))}
                </div>
                <div
                  aria-hidden
                  className="flex flex-col shrink-0 [gap:var(--gap)] animate-marquee-y group-hover:[animation-play-state:paused]"
                >
                  {uniqueBadges.map((badge, i) => (
                    <BadgeRow key={i} badge={badge} />
                  ))}
                </div>
              </div>

              {/* Fade edges — top & bottom */}
              <div
                className="pointer-events-none absolute top-0 left-0 right-0 h-12"
                style={{ background: 'linear-gradient(to bottom, #080807, transparent)' }}
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-12"
                style={{ background: 'linear-gradient(to top, #080807, transparent)' }}
              />
            </div>
          </div>

          {/* Right — big statement */}
          <div className="lg:col-span-8 px-4 md:px-6 lg:pl-0 lg:pr-12">
            <motion.div
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold leading-[1.12] tracking-tight space-y-10"
              style={{
                backgroundImage:
                  'linear-gradient(100deg, #DEDBC8 38%, rgba(222,219,200,0.15) 62%)',
                backgroundSize: '300% 100%',
                backgroundPosition,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {PARAGRAPHS.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </motion.div>

            {/* Attribution */}
            <div className="flex items-center gap-4 mt-14">
              <img
                src={founderPhoto}
                alt="Johnloyd Patulay, founder of SINAG"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shrink-0"
                style={{ objectPosition: '50% 22%' }}
              />
              <div>
                <p className="text-base md:text-lg font-medium text-primary/90">Johnloyd Patulay</p>
                <p className="text-xs md:text-sm text-primary/50">
                  Founder: web, mobile, motion &amp; tech support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Brands wall — part of the About story, rendered inside the pinned stage
 * in App so the Services sheet can slide up over it.
 */
export function AboutBrands() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: '-80px' });

  return (
    <div id="brands" className="bg-black">
      {/* Divider — full-bleed line separating the brands wall from the statement */}
      <div className="h-px bg-white/10 mb-10 md:mb-14" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 px-4 md:px-6 lg:pl-6 lg:pr-10">
        {/* Label — pinned to the very left, with the line above it */}
        <div className="lg:col-span-3">
          <p className="text-xl md:text-2xl font-medium" style={{ color: '#E1E0CC' }}>
            Brands I worked with
          </p>
        </div>

        {/* Logo grid — right */}
        <div ref={gridRef} className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4">
          {brands.map((brand, i) => (
            <motion.div
              key={`${brand.label}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group/brand flex flex-col items-center justify-between gap-10 px-4 py-10 md:py-12 ${
                i < brands.length - (brands.length % 4 || 4) ? 'border-b border-dashed border-white/10' : ''
              }`}
            >
              <div className="flex-1 flex items-center justify-center">
                {brand.image ? (
                  <img
                    src={brand.image}
                    alt={brand.name}
                    loading="lazy"
                    className="h-20 md:h-24 w-auto object-contain grayscale brightness-150 contrast-75 opacity-80 group-hover/brand:grayscale-0 group-hover/brand:brightness-100 group-hover/brand:contrast-100 group-hover/brand:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <span className={`${brand.wordmarkClass}`} style={{ color: '#E1E0CC' }}>
                    {brand.name}
                  </span>
                )}
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-primary/40 text-center">
                {brand.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
