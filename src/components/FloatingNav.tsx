import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#what-we-do' },
  { label: 'About', href: '#about' },
];

export default function FloatingNav() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    // Appear once the hero (100vh) is mostly scrolled past
    setShow(y > window.innerHeight * 0.85);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          key="floating-nav"
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -72, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          aria-label="Site navigation"
        >
          <div
            className="flex items-center gap-1 rounded-full pl-5 pr-1.5 py-1.5"
            style={{
              background: 'rgba(8,8,8,0.72)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(222,219,200,0.08)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
            }}
          >
            {/* Brand */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-sm font-medium tracking-tight mr-3 sm:mr-5"
              style={{ color: '#E1E0CC' }}
            >
              SINAG<span className="text-primary/50">*</span>
            </a>

            {/* Links */}
            <ul className="hidden sm:flex items-center gap-4 md:gap-6 mr-3 md:mr-5">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-xs text-primary/60 hover:text-primary transition-colors duration-200 tracking-wide"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact CTA */}
            <a
              href="mailto:patulayjohnloyd16@gmail.com"
              className="flex items-center gap-2 bg-primary text-black rounded-full px-4 py-2 text-xs font-medium hover:bg-[#E1E0CC] transition-colors duration-200"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-700" />
              </span>
              Let's talk
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
