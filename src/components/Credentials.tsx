import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import WordsPullUpMultiStyle from './animations/WordsPullUpMultiStyle';

const badges = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    level: 'Certification',
    image: 'https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
    accent: '#FF9900',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'Web Development Fundamentals',
    issuer: 'IBM SkillsBuild',
    level: 'Intermediate',
    image: 'https://images.credly.com/images/0c1c6eed-818c-4f78-bfaa-7ea8704c863a/image.png',
    accent: '#054ADA',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'AWS Academy Cloud Architecting',
    issuer: 'Amazon Web Services',
    level: 'Learning',
    image: 'https://images.credly.com/images/fcafd0c9-42da-4703-a191-0c397203dc1b/blob',
    accent: '#FF9900',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'Cyber Threat Management',
    issuer: 'Cisco',
    level: 'Intermediate',
    image: 'https://images.credly.com/images/5d5ac32b-d239-42b8-9665-8a921dc3ab47/image.png',
    accent: '#1BA0D7',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'AWS Academy Cloud Foundations',
    issuer: 'Amazon Web Services',
    level: 'Learning',
    image: 'https://images.credly.com/images/e3541a0c-dd4a-4820-8052-5001006efc85/blob',
    accent: '#FF9900',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'CompTIA IT Fundamentals+',
    issuer: 'CompTIA',
    level: 'Certification',
    image: 'https://images.credly.com/images/a49be93a-34ff-4224-996c-b2c976a5dc9d/blob',
    accent: '#C8202F',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'Cyber Threat Management',
    issuer: 'Cisco',
    level: 'Intermediate',
    image: 'https://images.credly.com/images/5d5ac32b-d239-42b8-9665-8a921dc3ab47/image.png',
    accent: '#1BA0D7',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'Linux Unhatched',
    issuer: 'Cisco',
    level: 'Foundational',
    image: 'https://images.credly.com/images/f25ec9d4-c59d-49b9-944a-f160012e81cd/image.png',
    accent: '#1BA0D7',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
];

function BadgeCard({ badge }: { badge: typeof badges[0] }) {
  return (
    <a
      href={badge.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-3 w-[180px] sm:w-[200px] shrink-0 p-5 rounded-2xl border border-white/[0.05] bg-[#0c0c0c] hover:border-white/[0.12] hover:bg-[#101010] transition-all duration-300 group"
    >
      {/* Badge image */}
      <div className="relative w-16 h-16">
        <img
          src={badge.image}
          alt={badge.name}
          className="w-full h-full object-contain drop-shadow-sm"
        />
        {/* Glow ring using accent color */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10 blur-md"
          style={{ background: badge.accent }}
        />
      </div>

      {/* Level chip */}
      <span
        className="text-[9px] px-2 py-0.5 rounded-full tracking-wide font-light"
        style={{
          background: `${badge.accent}15`,
          color: badge.accent,
          border: `1px solid ${badge.accent}30`,
        }}
      >
        {badge.level}
      </span>

      {/* Name */}
      <p
        className="text-xs font-medium text-center leading-snug line-clamp-2"
        style={{ color: '#E1E0CC' }}
      >
        {badge.name}
      </p>

      {/* Issuer */}
      <p className="text-[10px] text-primary/50 text-center">{badge.issuer}</p>
    </a>
  );
}

export default function Credentials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section className="bg-black py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <div>
            <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6">
              Verified on Credly
            </p>
            <div className="text-2xl sm:text-3xl md:text-4xl font-normal">
              <WordsPullUpMultiStyle
                segments={[
                  { text: 'Credentials that', className: 'text-primary' },
                  { text: 'back the work.', className: 'font-serif italic text-primary/70' },
                ]}
              />
            </div>
          </div>

          <motion.a
            href="https://www.credly.com/users/john-loyd-patulay/badges"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs text-primary/60 hover:text-primary transition-colors duration-200 shrink-0"
          >
            <span>View all on Credly</span>
            <ExternalLink className="w-3 h-3" />
          </motion.a>
        </div>
      </div>

      {/* Scrolling marquee — full bleed */}
      <div className="relative overflow-hidden">
        <div className="group flex [--gap:1rem] [gap:var(--gap)] [--duration:50s] overflow-hidden px-4 md:px-6 py-2">
          <div className="flex shrink-0 [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused]">
            {[...Array(3)].map((_, si) =>
              badges.map((badge, i) => (
                <BadgeCard key={`${si}-${i}`} badge={badge} />
              ))
            )}
          </div>
        </div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
      </div>
    </section>
  );
}
