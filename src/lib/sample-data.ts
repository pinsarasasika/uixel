import type { PortfolioProject, WebsiteTemplate } from '@/types';

// A curated list of sample portfolio projects to showcase different skills.
export const samplePortfolioProjects: Omit<PortfolioProject, 'id'>[] = [
  {
    title: 'Project Alpha',
    description:
      'A complete redesign of a leading e-commerce platform, focusing on user experience and conversion rate optimization. The new interface resulted in a 35% increase in sales.',
    category: 'Web',
    imageUrl:
      'https://images.unsplash.com/photo-1678931546577-44a83b3219cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxhYnN0cmFjdCUyMHdlYnNpdGV8ZW58MHx8fHwxNzY3MDM1NTI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    projectUrl: '#',
  },
  {
    title: 'Project Beta',
    description:
      'Developed a sleek and intuitive mobile application for a fintech startup. The app provides seamless budget tracking and investment management for a new generation of users.',
    category: 'UI/UX',
    imageUrl:
      'https://images.unsplash.com/photo-1752055340594-4eb0eda11a64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhcHAlMjBpbnRlcmZhY2V8ZW58MHx8fHwxNzY3MDI3NTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    projectUrl: '#',
  },
  {
    title: 'Project Gamma',
    description:
      'Engineered a custom AI-powered data visualization dashboard that provides real-time business intelligence and predictive analytics, helping stakeholders make informed decisions.',
    category: 'AI',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkYXRhJTIwZGFzaGJvYXJkfGVufDB8fHx8MTc2NzAwNjY5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    projectUrl: '#',
  },
  {
    title: 'Project Delta',
    description:
      'Created a comprehensive brand identity for a new tech company, including logo design, color palette, typography, and marketing materials that capture a futuristic and innovative spirit.',
    category: 'Branding',
    imageUrl:
      'https://images.unsplash.com/photo-1762417582263-7f423d344b77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtb2Rlcm4lMjBicmFuZGluZ3xlbnwwfHx8fDE3NjcwMzU1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    projectUrl: '#',
  },
  {
    title: 'Project Epsilon',
    description:
      'Built a high-performance e-commerce website with a custom CMS, enabling the client to easily manage products, orders, and content, leading to a streamlined sales process.',
    category: 'Web',
    imageUrl:
      'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxlY29tbWVyY2UlMjB3ZWJzaXRlfGVufDB8fHx8MTc2NzAyNDMyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    projectUrl: '#',
  },
];

export const sampleStoreProducts: Omit<WebsiteTemplate, 'id'>[] = [
  {
    name: 'Minima',
    description: 'A clean and minimalist portfolio template for creatives.',
    price: 49,
    imageUrl:
      'https://images.unsplash.com/photo-1644145876127-c189b84fc70f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx3ZWJzaXRlJTIwdGVtcGxhdGV8ZW58MHx8fHwxNzY2OTc5NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    livePreviewUrl: '#',
    category: 'Portfolio',
  },
  {
    name: 'Dashly',
    description: 'A feature-rich dashboard UI kit for SaaS applications.',
    price: 79,
    imageUrl:
      'https://images.unsplash.com/photo-1563753159011-f1d8b8272c8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZGFzaGJvYXJkJTIwdGVtcGxhdGV8ZW58MHx8fHwxNzY3MDM1NTI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    livePreviewUrl: '#',
    category: 'SaaS',
  },
  {
    name: 'Agency X',
    description: 'A bold and modern template for digital agencies.',
    price: 69,
    imageUrl:
      'https://images.unsplash.com/photo-1627634777217-c864268db30c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxhZ2VuY3klMjB3ZWJzaXRlfGVufDB8fHx8MTc2NzAzNTUyNnww&ixlib=rb-4.1.0&q=80&w=1080',
    livePreviewUrl: '#',
    category: 'Agency',
  },
  {
    name: 'Shopify Pro',
    description: 'A premium e-commerce template for fashion brands.',
    price: 99,
    imageUrl:
      'https://images.unsplash.com/photo-1487014679447-9f8336841d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxvbmxpbmUlMjBzdG9yZXxlbnwwfHx8fDE3NjcwMDczODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    livePreviewUrl: '#',
    category: 'E-commerce',
  },
];

    