import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import WordsPullUp from './animations/WordsPullUp';

// Ping-pong loop (forward + reversed) so the 4s source loops seamlessly
const HERO_VIDEO = '/hero-bg.mp4';

export default function Hero() {
  return (
    <section className="h-screen p-4 md:p-6 bg-black">
      <h1 className="sr-only">
        SINAG, a three-person creative studio founded by Johnloyd Patulay: web &amp; mobile
        development, motion graphics, and tech support.
      </h1>
      <div className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background video */}
        <video
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

        {/* Navbar */}
        <Navbar />

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-10">
          <div className="grid grid-cols-12 items-end gap-4 md:gap-6">
            {/* Brand name — 8 cols */}
            <div className="col-span-12 lg:col-span-8">
              <WordsPullUp
                text="SINAG"
                showAsterisk
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]"
                style={{ color: '#E1E0CC' }}
              />
            </div>

            {/* Right column — description + CTA */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 lg:pb-3">
              <motion.p
                className="text-xs sm:text-sm md:text-base text-primary/70"
                style={{ lineHeight: 1.25 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                We build websites and mobile apps, design motion graphics, and fix the tech
                problems nobody else wants to touch. A team of three, led by founder
                Johnloyd Patulay.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-3"
              >
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 bg-primary rounded-full pl-5 pr-1 py-1 w-fit hover:gap-3 transition-all duration-300"
                >
                  <span className="text-black font-medium text-sm sm:text-base">See our work</span>
                  <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
                    <ArrowRight className="w-4 h-4" style={{ color: '#DEDBC8' }} />
                  </div>
                </a>

                {/* Availability pulse */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] text-primary/60 tracking-wide">Open for projects &amp; collaborations</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
