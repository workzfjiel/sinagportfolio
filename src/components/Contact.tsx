import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import WordsPullUpMultiStyle from './animations/WordsPullUpMultiStyle';
import { BGPattern } from './ui/bg-pattern';

const projectTypes = ['Landing Page', 'Web Application', 'Motion Graphics', 'UI/UX Design', 'Other'];
const budgets = ['< $500', '$500 – $1,500', '$1,500 – $5,000', '$5,000+', "Let's discuss"];
const timelines = ['ASAP', '1 – 2 weeks', '1 month', '2 – 3 months', 'Flexible'];

const inputBase =
  'w-full bg-transparent border-b border-white/10 py-3 text-sm text-primary/80 placeholder-primary/60 focus:outline-none focus:border-primary/40 transition-colors duration-300';
const selectBase =
  'w-full bg-transparent border-b border-white/10 py-3 text-sm text-primary/80 focus:outline-none focus:border-primary/40 transition-colors duration-300 appearance-none cursor-pointer';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({
    name: '',
    email: '',
    type: '',
    budget: '',
    timeline: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[SINAG] ${form.type || 'Project'} inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.type}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:patulayjohnloyd16@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="relative isolate bg-black py-24 md:py-36 px-4 md:px-6">
      <BGPattern variant="grid" mask="fade-edges" fill="rgba(255,255,255,0.14)" />
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/[0.04] grid grid-cols-1 lg:grid-cols-2">

          {/* ── Left: CTA panel ── */}
          <div
            className="flex flex-col justify-between px-8 md:px-14 py-14 md:py-20 relative overflow-hidden"
            style={{ background: '#080808' }}
          >
            {/* Ambient glow */}
            <div
              className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(222,219,200,0.04) 0%, transparent 70%)' }}
            />

            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="text-primary text-[10px] tracking-widest uppercase mb-8"
              >
                Let's build together
              </motion.p>

              <div className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-6">
                <WordsPullUpMultiStyle
                  segments={[
                    { text: "Let's", className: 'text-primary' },
                    { text: 'talk.', className: 'font-serif italic text-primary/60' },
                  ]}
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-gray-400 text-sm leading-relaxed max-w-xs"
              >
                Have a project in mind? I'm open to new collaborations, commissions, and interesting
                builds. Fill in the form and I'll get back to you within 24 hours.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col gap-5 mt-12"
            >
              {/* Direct email */}
              <a
                href="mailto:patulayjohnloyd16@gmail.com"
                className="group inline-flex items-center gap-3 bg-primary rounded-full pl-5 pr-1 py-1 w-fit hover:gap-4 transition-all duration-300"
              >
                <Mail className="w-3.5 h-3.5 text-black" />
                <span className="text-black font-medium text-xs sm:text-sm">patulayjohnloyd16@gmail.com</span>
                <div className="bg-black rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" style={{ color: '#DEDBC8' }} />
                </div>
              </a>

              {/* Availability */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] text-primary/60 tracking-wide">Currently available for new projects</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Inquiry form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="px-8 md:px-14 py-14 md:py-20"
            style={{ background: '#0a0a0a' }}
          >
            <p className="text-[10px] text-primary/60 tracking-widest uppercase mb-10">Quick inquiry</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    aria-label="Your name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={inputBase}
                  />
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    aria-label="Your email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Project type */}
              <div className="relative">
                <select
                  name="type"
                  aria-label="Project type"
                  value={form.type}
                  onChange={handleChange}
                  className={selectBase}
                  style={{ color: form.type ? 'rgba(222,219,200,0.8)' : undefined }}
                >
                  <option value="" disabled style={{ background: '#111', color: '#555' }}>
                    Project type
                  </option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t} style={{ background: '#111', color: '#DEDBC8' }}>
                      {t}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="rgba(222,219,200,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Budget + Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div className="relative">
                  <select
                    name="budget"
                    aria-label="Budget range"
                    value={form.budget}
                    onChange={handleChange}
                    className={selectBase}
                    style={{ color: form.budget ? 'rgba(222,219,200,0.8)' : undefined }}
                  >
                    <option value="" disabled style={{ background: '#111', color: '#555' }}>
                      Budget range
                    </option>
                    {budgets.map((b) => (
                      <option key={b} value={b} style={{ background: '#111', color: '#DEDBC8' }}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="rgba(222,219,200,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <select
                    name="timeline"
                    aria-label="Timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    className={selectBase}
                    style={{ color: form.timeline ? 'rgba(222,219,200,0.8)' : undefined }}
                  >
                    <option value="" disabled style={{ background: '#111', color: '#555' }}>
                      Timeline
                    </option>
                    {timelines.map((t) => (
                      <option key={t} value={t} style={{ background: '#111', color: '#DEDBC8' }}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="rgba(222,219,200,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  aria-label="Tell me about your project"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputBase} resize-none`}
                />
              </div>

              {/* Submit */}
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <button
                  type="submit"
                  className="group self-start inline-flex items-center gap-2 bg-primary rounded-full pl-6 pr-1.5 py-1.5 hover:gap-3 transition-all duration-300"
                >
                  <span className="text-black font-medium text-sm">Send inquiry</span>
                  <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: '#DEDBC8' }} />
                  </div>
                </button>
                <p aria-live="polite" className="text-xs text-primary/60">
                  {sent ? 'Opening your email app — just hit send there.' : ''}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
