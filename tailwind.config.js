/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DEDBC8',
        black: '#080807',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        display: ['"Archivo Black"', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-y': 'marquee-y var(--duration) linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-y': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
    },
  },
  plugins: [],
}
