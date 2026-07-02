import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Search, PenTool, Code2, Rocket, ArrowRight, type LucideIcon } from 'lucide-react';
import WordsPullUpMultiStyle from './animations/WordsPullUpMultiStyle';
import TiltCard from './animations/TiltCard';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description:
      'We align on your goals, audience, and vision. I ask the right questions so nothing is assumed.',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Design',
    description:
      'Typography, motion concepts, and visual direction come together before a single line of code.',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Build',
    description:
      'Pixel-perfect development with clean, scalable code. Every interaction is intentional.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch',
    description:
      'Thorough testing, final polish, and handoff. I stay available for questions after delivery.',
  },
];

interface StepCardProps {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isLast: boolean;
}

function StepCard({
  number,
  icon: Icon,
  title,
  description,
  index,
  total,
  progress,
  isLast,
}: StepCardProps) {
  const start = index / total;
  const activationEnd = start + 0.55 / total;

  const y = useTransform(progress, [start - 0.15, start + 0.1], [40, 0], { clamp: true });
  const opacity = useTransform(progress, [start - 0.15, start + 0.05], [0, 1], { clamp: true });
  const activation = useTransform(progress, [start, activationEnd], [0, 1], { clamp: true });
  const badgeBg = useTransform(
    activation,
    [0, 1],
    ['rgba(222,219,200,0.1)', 'rgba(222,219,200,1)']
  );
  const badgeColor = useTransform(activation, [0, 1], ['rgba(222,219,200,1)', 'rgba(0,0,0,1)']);
  const ghostOpacity = useTransform(activation, [0, 1], [0.06, 0.16]);

  return (
    <motion.div style={{ y, opacity }} className="relative">
      <TiltCard className="h-full bg-[#212121] rounded-2xl p-7 md:p-8 flex flex-col gap-5 relative overflow-hidden group">
        {/* Ghost watermark number, brightens as scroll reaches this step */}
        <motion.span
          style={{ opacity: ghostOpacity }}
          className="absolute -top-3 -right-1 font-serif text-primary text-[6.5rem] leading-none select-none pointer-events-none"
        >
          {number}
        </motion.span>

        {/* Icon badge, fills in as scroll reaches this step */}
        <motion.div
          style={{ backgroundColor: badgeBg, color: badgeColor }}
          className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-400 ease-out"
        >
          <Icon className="w-5 h-5" />
        </motion.div>

        <div className="relative z-10">
          <p className="text-[10px] text-gray-600 tracking-widest mb-2">{number}</p>
          <h3 className="text-primary text-lg font-medium mb-3">{title}</h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{description}</p>
        </div>
      </TiltCard>

      {/* Flow connector */}
      {!isLast && (
        <div className="hidden md:flex absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-black items-center justify-center">
          <ArrowRight className="w-3.5 h-3.5 text-gray-700" />
        </div>
      )}
    </motion.div>
  );
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  });

  return (
    <section className="bg-black py-24 md:py-36 px-4 md:px-6 relative overflow-hidden">
      {/* Noise texture */}
      <div className="bg-noise absolute inset-0 opacity-[0.12] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6">
            How I work
          </p>
          <div className="text-2xl sm:text-3xl md:text-4xl font-normal max-w-xl">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'A process built for', className: 'text-primary' },
                { text: 'clarity and results.', className: 'font-serif italic text-primary/70' },
              ]}
            />
          </div>
        </div>

        {/* Scroll progress rail */}
        <div className="hidden md:block relative h-px bg-white/[0.06] mb-10 overflow-hidden rounded-full">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="absolute inset-0 origin-left bg-gradient-to-r from-primary/40 via-primary to-primary/40"
          />
        </div>

        {/* Steps */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, i) => (
            <StepCard
              key={step.number}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={i}
              total={steps.length}
              progress={scrollYProgress}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
