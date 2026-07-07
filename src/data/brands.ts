export interface Brand {
  /** Wordmark text shown as the "logo" when no image is provided */
  name: string;
  /** Small uppercase caption under the wordmark */
  label: string;
  /** Tailwind classes that give each text wordmark its own logo-like personality */
  wordmarkClass: string;
  /** Optional logo image — rendered black & white, colors on hover */
  image?: string;
}

export const brands: Brand[] = [
  {
    name: 'Sample Brand',
    label: 'Sample Brand',
    wordmarkClass: 'text-3xl md:text-4xl font-bold tracking-tight',
  },
  {
    name: 'RCC',
    label: 'RCC',
    wordmarkClass: 'text-4xl md:text-5xl font-medium tracking-[0.15em]',
  },
  {
    name: 'Sample Brand',
    label: 'Sample Brand',
    wordmarkClass: 'text-2xl md:text-3xl font-serif italic',
  },
  {
    name: 'Sample Brand',
    label: 'Sample Brand',
    wordmarkClass: 'text-2xl md:text-3xl font-bold uppercase tracking-[0.2em]',
  },
  {
    name: 'SAMPLE',
    label: 'Sample Brand',
    wordmarkClass: 'text-3xl md:text-4xl font-display tracking-tight',
  },
  {
    name: 'sample.brand',
    label: 'Sample Brand',
    wordmarkClass: 'text-2xl md:text-3xl font-light lowercase tracking-[0.1em]',
  },
  {
    name: 'Sample & Brand',
    label: 'Sample Brand',
    wordmarkClass: 'text-2xl md:text-3xl font-serif',
  },
  {
    name: 'SB*',
    label: 'Sample Brand',
    wordmarkClass: 'text-4xl md:text-5xl font-bold tracking-tighter',
  },
];
