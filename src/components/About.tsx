import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import WordsPullUpMultiStyle from './animations/WordsPullUpMultiStyle';
import AnimatedLetter from './animations/AnimatedLetter';
import { Waves } from './ui/wave-background';

const BODY_TEXT =
  'SINAG is the creative practice of Johnloyd Patulay — a Filipino web developer and motion designer who believes every pixel should be intentional. From cinematic landing pages to full-stack applications and motion graphics, I build digital experiences for brands that refuse to settle for ordinary.';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = BODY_TEXT.split('');

  return (
    <section id="about" className="bg-black py-24 md:py-36 px-4 md:px-6">
      <div
        ref={containerRef}
        className="relative rounded-2xl md:rounded-[2rem] max-w-6xl mx-auto overflow-hidden"
        style={{ background: '#101010' }}
      >
        {/* Wave — fills the entire card background */}
        <Waves
          strokeColor="rgba(222,219,200,0.13)"
          backgroundColor="transparent"
          pointerSize={0}
        />

        {/* Vignette — fades wave at all 4 edges so it feels contained */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, #101010 100%)
            `,
            zIndex: 1,
          }}
        />

        {/* Bottom fade — bleeds into the black section below */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '45%',
            background: 'linear-gradient(to bottom, transparent, #101010)',
            zIndex: 1,
          }}
        />

        {/* Content — above wave and vignette */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-24 text-center">
          {/* Label */}
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-8 md:mb-12">
            The person behind SINAG
          </p>

          {/* Multi-style heading */}
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] mb-10 md:mb-16">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'I am Johnloyd Patulay,', className: 'font-normal text-primary' },
                {
                  text: 'a self-taught developer',
                  className: 'font-serif italic text-primary/75',
                },
                {
                  text: '& motion designer.',
                  className: 'font-normal text-primary',
                },
              ]}
              containerClassName="gap-x-[0.25em]"
            />
          </div>

          {/* Scroll-linked body paragraph */}
          <p
            className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#DEDBC8' }}
          >
            {chars.map((char, i) => (
              <AnimatedLetter
                key={i}
                char={char}
                progress={scrollYProgress}
                index={i}
                total={chars.length}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
