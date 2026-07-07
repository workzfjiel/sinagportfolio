import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

const STATEMENT =
  "We're not just builders. We're an extension of your team across design, development, motion, and long-term support.";

const WORDS = STATEMENT.split(' ');

// Words fill inside this progress window; the rest is a settle-hold before release
const FILL_START = 0.08;
const FILL_END = 0.88;

function Word({
  progress,
  index,
  total,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: string;
}) {
  const span = (FILL_END - FILL_START) / total;
  const start = FILL_START + index * span;
  const opacity = useTransform(progress, [start, start + span], [0.12, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.28em]">
      {children}
    </motion.span>
  );
}

/** Closing pitch — pins fullscreen, scroll fills the words, then releases to the next section */
export default function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={ref} className="relative h-[250vh]">
      <div
        className="sticky top-0 h-screen flex items-center justify-center px-4"
        style={{ background: '#DDDDD5' }}
      >
        <p
          className="font-anton font-bold uppercase text-center leading-[1.08] text-[7vw] md:text-[4.6vw] max-w-6xl"
          style={{ color: '#C46B4A' }}
        >
          {WORDS.map((word, i) => (
            <Word key={i} progress={scrollYProgress} index={i} total={WORDS.length}>
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}
