import type { Project } from '../types';

// Real projects live here. Projects added through the hidden admin mode
// (type "sinag") are stored in localStorage and merged in at runtime.
export const defaultProjects: Project[] = [
  {
    id: 'rcc-loan-management',
    title: 'RCC Rosario Financing Credit Corp',
    description:
      'Web based loan management system for a small lending business in Rosario, Batangas. It streamlines their daily workflow with loan applications, client records, and approvals, plus AI credit scoring powered by the Gemini API.',
    category: 'Application',
    imageUrl: '/projects/rcc-welcome.png',
    tags: ['Loan Management', 'AI Credit Scoring', 'Gemini API'],
    featured: true,
  },
  {
    id: 'dgym-landing-page',
    title: "DGYM Rosario",
    description:
      "Landing page for The D'Gym, the first premium gym in Rosario, Batangas. Features their training programs, membership pricing, and imagery, with a booking system and a chat bot for member questions.",
    category: 'Landing Page',
    videoUrl: '/projects/dgym.mp4',
    tags: ['Landing Page', 'Booking System', 'Chat Bot'],
    featured: true,
  },
];
