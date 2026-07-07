import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { services } from '../data/services';

// Encoded with a keyframe on every frame (-g 1) so currentTime seeks are instant
const VIDEO_SRC = '/services-light.mp4';
const VIDEO_DURATION = 9.041667; // fallback until metadata loads

interface BeatProps {
  progress: MotionValue<number>;
  start: number;
  end: number;
  /** Visible from the first frame (intro) */
  openAtStart?: boolean;
  /** Never fades out (CTA finale) */
  holdAtEnd?: boolean;
  children: React.ReactNode;
}

/** One text beat — fades in/out inside its hard [start, end] window */
function Beat({ progress, start, end, openAtStart, holdAtEnd, children }: BeatProps) {
  const w = end - start;
  const opacity = useTransform(
    progress,
    [start + w * 0.02, start + w * 0.25, end - w * 0.25, end - w * 0.02],
    [openAtStart ? 1 : 0, 1, 1, holdAtEnd ? 1 : 0]
  );
  const y = useTransform(
    progress,
    [start + w * 0.02, start + w * 0.25],
    [openAtStart ? 0 : 28, 0]
  );
  const visibility = useTransform(opacity, (v) => (v < 0.02 ? 'hidden' : 'visible'));

  return (
    <motion.div
      style={{ opacity, y, visibility }}
      className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
    >
      {children}
    </motion.div>
  );
}

// Hard windows mapped to the beam: dark intro → beam sweeps (4 services) → starburst peak (CTA)
const INTRO: [number, number] = [0, 0.16];
const SERVICE_WINDOWS: [number, number][] = [
  [0.16, 0.34],
  [0.34, 0.52],
  [0.52, 0.7],
  [0.7, 0.87],
];
const CTA_WINDOW: [number, number] = [0.87, 1];

export default function Services() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  // Soft spring so the scrub glides instead of stuttering with the scroll wheel
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.0005 });

  useMotionValueEvent(smooth, 'change', (v) => {
    const vid = videoRef.current;
    if (!vid) return;
    const duration = vid.duration || VIDEO_DURATION;
    vid.currentTime = Math.min(Math.max(v, 0), 0.999) * duration;
  });

  return (
    <section
      id="services"
      className="relative rounded-t-[2rem] md:rounded-t-[3rem] border-t border-white/[0.08] shadow-[0_-24px_80px_rgba(0,0,0,0.7)]"
      style={{ background: '#080807' }}
    >
      {/* Noise texture */}
      <div className="bg-noise absolute inset-0 opacity-[0.12] pointer-events-none rounded-t-[2rem] md:rounded-t-[3rem]" />

      {/* Pinned cinematic scrub — the light beam sweeps as you scroll */}
      <div ref={wrapRef} className="h-[600vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Scroll-scrubbed background video */}
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Soft scrim so text stays readable over the brightest frames */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
          {/* Cinematic vignette — corners melt into black */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 75% 65% at center, transparent 50%, rgba(8,8,7,0.85) 100%)',
            }}
          />
          {/* Edge fades — video dissolves into the page black, no visible seam */}
          <div
            className="absolute inset-x-0 top-0 h-[20vh] pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #080807, transparent)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[16vh] pointer-events-none"
            style={{ background: 'linear-gradient(to top, #080807, transparent)' }}
          />

          {/* Intro beat — dark frame, beam tip entering */}
          <Beat progress={smooth} start={INTRO[0]} end={INTRO[1]} openAtStart>
            <p className="text-primary/60 text-[10px] md:text-xs tracking-[0.4em] uppercase">
              Sinag &bull; Services
            </p>
            <p className="mt-4 text-gray-500 text-xs md:text-sm tracking-[0.25em] uppercase">
              (keep scrolling)
            </p>
          </Beat>

          {/* One beat per service, timed to the beam's sweep */}
          {services.map((service, i) => (
            <Beat
              key={service.id}
              progress={smooth}
              start={SERVICE_WINDOWS[i][0]}
              end={SERVICE_WINDOWS[i][1]}
            >
              <p className="text-primary/50 text-[10px] md:text-xs tracking-[0.35em] mb-6">
                {service.number} / 0{services.length}
              </p>
              <h3
                className="font-anton font-bold uppercase text-[11vw] md:text-[7.5vw] leading-[0.95]"
                style={{ color: '#E1E0CC' }}
              >
                {service.title}
              </h3>
              <p className="mt-6 text-sm md:text-base text-gray-300 leading-relaxed max-w-md">
                {service.description}
              </p>
            </Beat>
          ))}

          {/* CTA finale — lands on the starburst peak and holds */}
          <Beat progress={smooth} start={CTA_WINDOW[0]} end={CTA_WINDOW[1]} holdAtEnd>
            <h3
              className="font-anton font-bold uppercase text-[10vw] md:text-[6.5vw] leading-[1.02] max-w-6xl"
              style={{ color: '#E1E0CC' }}
            >
              Let's build something
              <br />
              that moves people
            </h3>
            <a
              href="mailto:patulayjohnloyd16@gmail.com"
              className="mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-transform duration-300 hover:scale-105"
              style={{ background: '#DEDBC8', color: '#080807' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Let's talk
            </a>
          </Beat>
        </div>
      </div>
    </section>
  );
}
