import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import WordsPullUpMultiStyle from './animations/WordsPullUpMultiStyle';
import TiltCard from './animations/TiltCard';

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: '-80px' });

  return (
    <section id="services" className="bg-black min-h-screen py-24 md:py-36 px-4 md:px-6 relative">
      {/* Noise texture */}
      <div className="bg-noise absolute inset-0 opacity-[0.12] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6 md:mb-8">
            What I do
          </p>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal max-w-3xl mx-auto">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'Studio-grade workflows for visionary clients.',
                  className: 'text-primary',
                },
              ]}
              containerClassName="mb-2"
            />
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'Built for pure vision. Powered by craft.',
                  className: 'text-gray-500',
                },
              ]}
              delay={0.3}
            />
          </div>
        </div>

        {/* Service cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:h-[480px] items-stretch"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="h-full bg-[#212121] rounded-2xl p-6 md:p-7 flex flex-col justify-between">
                {/* Top */}
                <div>
                  <p className="text-gray-600 text-xs font-light mb-6">{service.number}</p>

                  <h3 className="text-primary text-base md:text-lg font-medium mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check className="w-3 h-3 mt-0.5 shrink-0 text-primary/60" />
                        <span className="text-gray-400 text-xs leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <a
                    href="#contact"
                    className="flex items-center gap-2 text-primary/60 hover:text-primary text-xs transition-colors duration-200 group/btn w-fit"
                  >
                    <span>Start a project</span>
                    <ArrowRight
                      className="w-3 h-3 -rotate-45 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
