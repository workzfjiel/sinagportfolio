import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  { value: 8, suffix: '', label: 'Verified Badges' },
  { value: 3, suffix: '+', label: 'Cloud Certifications' },
  { value: 5, suffix: '+', label: 'Projects Delivered' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 1600;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(to);
    };

    requestAnimationFrame(step);
  }, [isInView, to]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-black px-4 md:px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center py-10 px-6 text-center border-white/[0.04] ${
                i % 2 === 1 ? 'border-l' : ''
              } ${i >= 2 ? 'border-t md:border-t-0' : ''} ${i > 0 ? 'md:border-l' : ''}`}
            >
              <p
                className="text-4xl sm:text-5xl font-medium tracking-tight mb-2"
                style={{ color: '#E1E0CC' }}
              >
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[10px] sm:text-xs text-primary/60 tracking-widest uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        {/* Divider */}
        <div className="h-px bg-white/[0.04]" />
      </div>
    </section>
  );
}
