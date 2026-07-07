import type { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    number: '01',
    title: 'Web Development',
    description: 'Websites and web apps built with modern frameworks, clean code, and motion that feels intentional.',
    features: [
      'React / Next.js / Vite',
      'TypeScript & Tailwind CSS',
      'Landing pages & full sites',
      'Mobile-first responsive',
    ],
  },
  {
    id: '2',
    number: '02',
    title: 'Mobile Development',
    description: 'Cross-platform mobile apps that feel native, load fast, and are simple to use.',
    features: [
      'Cross-platform builds',
      'Clean, native-feeling UI',
      'API & backend integration',
      'Offline-ready & performant',
    ],
  },
  {
    id: '3',
    number: '03',
    title: 'Motion Graphics',
    description: 'Brand motion identities, video intros, and animated assets that stop people mid-scroll.',
    features: [
      'Logo animation & brand reveals',
      'Social media motion content',
      'UI micro-interactions',
      'Video editing & color grading',
    ],
  },
  {
    id: '4',
    number: '04',
    title: 'Tech Support',
    description: 'Patient, plain-language help when technology misbehaves: setup, fixes, and maintenance.',
    features: [
      'Hardware & software troubleshooting',
      'System setup & maintenance',
      'Remote & on-site assistance',
      'Backed by Cisco certifications',
    ],
  },
];
