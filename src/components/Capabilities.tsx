import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import founderPhoto from '../assets/founder.jpg';

const capabilities = [
  {
    label: 'Web Development',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=70',
  },
  {
    label: 'Mobile Development',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=70',
  },
  {
    label: 'UI/UX Design',
    image:
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=70',
  },
  {
    label: 'Motion Graphics',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=70',
  },
  {
    label: '3D Development',
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=70',
  },
  {
    label: 'Tech Support',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=70',
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  // Floating preview follows the cursor with a soft spring lag
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left + 32);
    mouseY.set(e.clientY - rect.top - 120);
  };

  return (
    <section className="bg-black py-24 md:py-32 px-4 md:px-6">
      <div ref={sectionRef} className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
        {/* Left — label + supporting copy */}
        <div className="lg:col-span-4 flex flex-col">
          <p className="text-primary/50 text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-8">
            (What we can help with)
          </p>

          <p className="text-base md:text-lg text-primary/80 leading-relaxed max-w-[38ch] mb-10">
            One small team, end to end. We design it, build it, animate it, and keep it
            running. No agency layers, no waiting weeks for a reply.
          </p>

          {/* Attribution */}
          <div className="flex items-center gap-3 mt-auto">
            <img
              src={founderPhoto}
              alt="Johnloyd Patulay, founder of SINAG"
              className="w-10 h-10 rounded-full object-cover shrink-0"
              style={{ objectPosition: '50% 22%' }}
            />
            <div>
              <p className="text-sm text-primary/80">Johnloyd Patulay</p>
              <p className="text-xs text-primary/50">Founder, SINAG</p>
            </div>
          </div>
        </div>

        {/* Right — giant capability stack with a cursor-following preview image */}
        <ul
          ref={listRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHovered(null)}
          className="lg:col-span-8 relative"
        >
          {capabilities.map((cap, i) => (
            <motion.li
              key={cap.label}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onMouseEnter={() => {
                  setActive(i);
                  setHovered(i);
                }}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="block w-full text-left text-[8.5vw] lg:text-[6.6rem] xl:text-[7.6rem] font-bold tracking-tight leading-[1.08] whitespace-nowrap transition-colors duration-300"
                style={{ color: active === i ? '#E1E0CC' : 'rgba(225,224,204,0.22)' }}
              >
                {cap.label}
              </button>
            </motion.li>
          ))}

          {/* Floating skill preview — follows the cursor */}
          <motion.div
            style={{ x: springX, y: springY }}
            className="absolute top-0 left-0 z-20 pointer-events-none hidden lg:block"
          >
            <AnimatePresence mode="popLayout">
              {hovered !== null && (
                <motion.img
                  key={capabilities[hovered].label}
                  src={capabilities[hovered].image}
                  alt=""
                  aria-hidden
                  initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="w-52 h-64 object-cover rounded-xl shadow-2xl"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </ul>
      </div>
    </section>
  );
}
