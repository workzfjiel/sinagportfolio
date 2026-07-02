export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Web Development' | 'Motion Graphics' | 'Landing Page' | 'Application' | 'Other';
  imageUrl?: string;
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
  featured?: boolean;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
}
