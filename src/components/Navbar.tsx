const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#what-we-do' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: 'mailto:patulayjohnloyd16@gmail.com' },
];

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 md:py-3">
        <ul className="flex items-center gap-3 sm:gap-6 md:gap-10 lg:gap-12">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-[10px] sm:text-xs md:text-sm transition-colors duration-200 tracking-wide"
                style={{ color: 'rgba(225, 224, 204, 0.7)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.7)')}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
