import { useRef } from 'react';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import Hero from './components/Hero';
import About, { AboutBrands } from './components/About';
import Services from './components/Services';
import Projects from './components/Projects/Projects';
import Capabilities from './components/Capabilities';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import LocationBar from './components/LocationBar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import FloatingNav from './components/FloatingNav';

/**
 * Brands pins in place and cedes the spotlight (dims + shrinks slightly)
 * while Services slides up over it like a sheet before its content starts.
 */
function BrandsToServices() {
  const frontRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frontRef,
    offset: ['start end', 'start 0.15'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  return (
    <div className="relative">
      {/* Brands pins at its natural height — no dead space below the grid */}
      <motion.div style={{ scale, opacity }} className="sticky top-0 bg-black">
        <div className="w-full pt-2 md:pt-4">
          <AboutBrands />
        </div>
      </motion.div>
      {/* Short hold, then the Services sheet slides up over the pinned stage */}
      <div className="h-[10vh]" />
      <div ref={frontRef} className="relative z-10">
        <Services />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Cursor />
      <FloatingNav />
      <main className="bg-black min-h-screen">
        <Hero />
        <About />
        <BrandsToServices />
        <Projects />
        <Capabilities />
        <FAQ />
        <CTA />
        <LocationBar />
        <Footer />
      </main>
    </MotionConfig>
  );
}
