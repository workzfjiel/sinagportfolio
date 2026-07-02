import { ArrowUp, ExternalLink, Mail } from 'lucide-react';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/[0.04] px-4 md:px-6 pt-14 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Top row — brand, nav, reach */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-14">
          <div>
            <p className="text-2xl font-medium tracking-tight mb-3" style={{ color: '#E1E0CC' }}>
              SINAG<span className="text-primary/50">*</span>
            </p>
            <p className="text-xs text-primary/50 max-w-[26ch] leading-relaxed">
              Ray of light — premium digital experiences by Johnloyd Patulay.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex gap-12">
            <ul className="flex flex-col gap-3">
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
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:patulayjohnloyd16@gmail.com"
                  className="inline-flex items-center gap-1.5 text-xs text-primary/60 hover:text-primary transition-colors duration-200 tracking-wide"
                >
                  <Mail className="w-3 h-3" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://www.credly.com/users/john-loyd-patulay/badges"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary/60 hover:text-primary transition-colors duration-200 tracking-wide"
                >
                  <ExternalLink className="w-3 h-3" />
                  Credly
                </a>
              </li>
            </ul>
          </nav>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="group self-start inline-flex items-center gap-2 rounded-full border border-white/10 hover:border-primary/40 px-4 py-2 text-xs text-primary/60 hover:text-primary transition-colors duration-300"
          >
            Back to top
            <ArrowUp className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/[0.04]">
          <p className="text-[10px] text-primary/40">© {year} SINAG. All rights reserved.</p>
          <p className="text-[10px] text-primary/40 tracking-wide">Built with precision.</p>
        </div>
      </div>
    </footer>
  );
}
