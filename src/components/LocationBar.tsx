import { useEffect, useState } from 'react';

/** Full-width strip between the CTA and footer — live Philippine time */
export default function LocationBar() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(now);

  return (
    <div className="bg-black border-t border-white/[0.06] px-2 md:px-3 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[9px] md:text-xs tracking-[0.2em] uppercase text-primary/50">
      <span>Based in the Philippines</span>
      <span className="hidden sm:inline text-primary/35">Available worldwide, remote</span>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>Manila {time} GMT+8</span>
    </div>
  );
}
