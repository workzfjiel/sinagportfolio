export interface Badge {
  name: string;
  issuer: string;
  level: string;
  image: string;
  accent: string;
  href: string;
}

export const badges: Badge[] = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    level: 'Certification',
    image: 'https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
    accent: '#FF9900',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'Web Development Fundamentals',
    issuer: 'IBM SkillsBuild',
    level: 'Intermediate',
    image: 'https://images.credly.com/images/0c1c6eed-818c-4f78-bfaa-7ea8704c863a/image.png',
    accent: '#054ADA',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'AWS Academy Cloud Architecting',
    issuer: 'Amazon Web Services',
    level: 'Learning',
    image: 'https://images.credly.com/images/fcafd0c9-42da-4703-a191-0c397203dc1b/blob',
    accent: '#FF9900',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'Cyber Threat Management',
    issuer: 'Cisco',
    level: 'Intermediate',
    image: 'https://images.credly.com/images/5d5ac32b-d239-42b8-9665-8a921dc3ab47/image.png',
    accent: '#1BA0D7',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'AWS Academy Cloud Foundations',
    issuer: 'Amazon Web Services',
    level: 'Learning',
    image: 'https://images.credly.com/images/e3541a0c-dd4a-4820-8052-5001006efc85/blob',
    accent: '#FF9900',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'CompTIA IT Fundamentals+',
    issuer: 'CompTIA',
    level: 'Certification',
    image: 'https://images.credly.com/images/a49be93a-34ff-4224-996c-b2c976a5dc9d/blob',
    accent: '#C8202F',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'Cyber Threat Management',
    issuer: 'Cisco',
    level: 'Intermediate',
    image: 'https://images.credly.com/images/5d5ac32b-d239-42b8-9665-8a921dc3ab47/image.png',
    accent: '#1BA0D7',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
  {
    name: 'Linux Unhatched',
    issuer: 'Cisco',
    level: 'Foundational',
    image: 'https://images.credly.com/images/f25ec9d4-c59d-49b9-944a-f160012e81cd/image.png',
    accent: '#1BA0D7',
    href: 'https://www.credly.com/users/john-loyd-patulay/badges',
  },
];
