export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  languages: string;
  category: 'webapp' | 'website' | 'mobile';
  tags: string[];
  features?: string[];
  role?: string;
  teamSize?: string;
  impact?: string;
  architecture?: string;
  microApps?: string[];
  keyFeatures?: string[];
  technicalHighlights?: string[];
  npmPackages?: Array<{
    name: string;
    description: string;
    link: string;
  }>;
  githubLink?: string;
  liveDemoLink?: string;
  status?: string;
}

export const projects: Project[] = [
  {
    id: 'foodjunkee',
    title: 'Food Junkee',
    description: 'Authentic flavors, delivered fresh',
    fullDescription:
      'Order authentic African and Caribbean meals delivered fresh to your doorstep. Experience the vibrant flavors of our heritage with quick, efficient delivery.',
    languages: 'Next.js • TypeScript • Firebase • TailwindCSS • GSAP • Framer Motion',
    category: 'webapp',
    tags: ['Food', 'Lifestyle', 'Culture', 'People'],
    features: [
      'Payment integration using Stripe',
      'User authentication and authorization',
      'Admin panel for content management',
      'Real-time booking orders via admin panel',
      'Email notifications',
      'Cart functionality',
    ],
    role: 'Fullstack Developer (Contract)',
    liveDemoLink: 'https://dev.foodjunkee.co.uk',
  },
  {
    id: 'digit-tally',
    title: 'Digit Tally',
    description: 'Scalable micro-frontend accounting system serving 50+ business users',
    fullDescription:
      'A comprehensive enterprise-grade accounting platform built using Turbo Repo micro-frontend architecture. Led the frontend development and architecture, integrating 300+ API endpoints across multiple independent applications that work seamlessly together. Built custom React component library, utility functions, and CLI tools published on NPM for team efficiency.',
    architecture: 'Micro-Frontend (Turbo Repo)',
    microApps: [
      'Sales Management App - Invoice generation, customer management, sales tracking',
      'Suppliers & Procurement App - Vendor management, purchase orders, payment tracking',
      'Inventory Management App - Stock control, warehousing, real-time inventory tracking',
      'Accounting & Finance App - General ledger, financial reporting, reconciliation',
      'Payroll Management App - Employee salary processing, tax calculations, auto payslip generation',
      'Payslip App - Generate employee payslip',
      'Admin Dashboard - User management, permissions, system configuration, analytics',
    ],
    keyFeatures: [
      'Independent deployment of each micro-app',
      'Custom NPM packages for shared components and utilities',
      'Centralized authentication via custom CLI tool',
      'Real-time data synchronization across apps',
      'Advanced reporting and analytics dashboard',
      'Multi-tenant architecture',
      'Role-based access control (RBAC)',
    ],
    technicalHighlights: [
      'Turbo Repo for micro-frontend orchestration',
      'TanStack Query for efficient server state management',
      'Redux for global state management across micro-apps',
      'Custom shared component library (@candourorg/components)',
      'Utility functions library (@candourorg/utils)',
      'CLI tool for developer authentication (@candourorg/cli)',
      'Optimized bundle splitting and lazy loading',
      'Integrated 300+ RESTful API endpoints',
    ],
    npmPackages: [
      {
        name: '@candourorg/components',
        description: 'Shared React component library used across all micro-apps',
        link: 'https://www.npmjs.com/package/@candourorg/components',
      },
      {
        name: '@candourorg/utils',
        description: 'Common utility functions and helpers for business logic',
        link: 'https://www.npmjs.com/package/@candourorg/utils',
      },
      {
        name: '@candourorg/cli',
        description: 'CLI tool for authenticating backend and frontend developers locally',
        link: 'https://www.npmjs.com/package/@candourorg/cli',
      },
    ],
    languages: 'Next.js • TypeScript • TanStack Query • Redux • Turbo Repo • TailwindCSS',
    category: 'webapp',
    tags: [
      'Micro-Frontend',
      'Enterprise',
      'Accounting',
      'Finance',
      'Architecture',
      'Team Leadership',
      'NPM Packages',
    ],
    role: 'Lead Frontend Engineer - Architecture & Implementation',
    teamSize: '4 frontend developers',
    impact:
      'Improved team productivity by 25% through independent app deployment and custom NPM packages. Reduced initial load time by 40% through code splitting. Streamlined developer onboarding with CLI authentication tool.',
    liveDemoLink: 'https://digit-tally.io',
  },
  {
    id: 'mm-plumbing',
    title: 'MM Plumbing',
    description: 'Professional heating, plumbing, and renovation services',
    fullDescription:
      'Professional heating, plumbing, and renovation services you can trust. Fast response, expert solutions, and customer satisfaction guaranteed.',
    languages: 'NextJS • TypeScript • TailwindCSS',
    category: 'website',
    tags: ['Plumbing', 'Heating', 'Landing Page'],
    githubLink: 'https://github.com/TaiwoJazz/mm-plumbing',
    liveDemoLink: 'https://mm-plumbing.vercel.app/',
  },
  {
    id: 'vastfluid-dex',
    title: 'VastFluid DEX',
    description: 'Next-generation decentralized exchange built on Arbitrum network',
    fullDescription:
      'A sophisticated DeFi platform featuring concentrated liquidity pools and advanced trading capabilities. Collaborated with design team to create an intuitive user experience for complex blockchain interactions. Built responsive frontend handling real-time price updates and blockchain transaction states.',
    languages: 'Next.js • TypeScript • Web3.js • TailwindCSS • GSAP',
    category: 'webapp',
    tags: ['DeFi', 'Web3', 'Blockchain', 'Trading', 'Crypto'],
    features: [
      'Real-time cryptocurrency trading interface',
      'Wallet integration (MetaMask, WalletConnect)',
      'Liquidity pool management',
      'Advanced charting and analytics',
      'Transaction history and portfolio tracking',
    ],
    role: 'Frontend Developer',
    impact: 'Reduced bounce rate by 15% through mobile-first responsive design',
    liveDemoLink: 'https://landing-page-tan-nine-56.vercel.app/',
  },
  {
    id: 'vastfluid-app',
    title: 'VastFluid Trading Interface',
    description: 'Full-featured DEX application for DeFi trading',
    fullDescription:
      'Complete trading application interface for swapping tokens, providing liquidity, and managing DeFi positions. Implemented complex state management for handling blockchain transactions and real-time market data updates.',
    languages: 'Next.js • TypeScript • Web3.js • TailwindCSS • GSAP',
    category: 'webapp',
    tags: ['DeFi', 'Trading', 'Web3', 'Crypto'],
    liveDemoLink: 'https://app-placeholder-vastfluid.vercel.app/',
  },
  {
    id: 'defttrader',
    title: 'Deft Trader',
    description: 'Comprehensive forex trading platform with real-time market data',
    fullDescription:
      'A full-featured forex trading platform helping traders and investors achieve profitability. Built with authentication system, admin panel, and real-time data integration. Implemented secure Firebase backend with role-based access control.',
    languages: 'Next.js • TypeScript • Firebase • TailwindCSS • GSAP',
    category: 'webapp',
    tags: ['Finance', 'Trading', 'Education', 'Real-time'],
    features: [
      'User authentication and authorization',
      'Admin panel for content management',
      'Real-time forex data integration (Myfxbook API)',
      'Trading signals and market analysis',
      'Educational resources and tutorials',
      'User portfolio tracking',
    ],
    role: 'Frontend Developer (Freelance)',
    liveDemoLink: 'https://defttrader.com',
  },
  {
    id: 'typeguru',
    title: 'TypeGuru',
    description: 'Interactive typing practice platform with gamification',
    fullDescription:
      'Full-stack web application for improving typing speed and accuracy. Built with Django backend and vanilla JavaScript frontend, featuring real-time feedback, progress tracking, and competitive leaderboards.',
    languages: 'Django • Python • JavaScript • TailwindCSS',
    category: 'webapp',
    tags: ['Education', 'Productivity', 'Gaming', 'Full-Stack'],
    features: [
      'Real-time typing speed calculation',
      'Accuracy tracking and analytics',
      'Multiple difficulty levels',
      'Progress tracking and achievements',
      'Leaderboard system',
    ],
    githubLink: 'https://github.com/TheJazzDev/typeguru',
    liveDemoLink: 'https://typeguru-jazzdev.vercel.app/',
  },
  {
    id: 'homely',
    title: 'Homely',
    description: 'Full-stack food delivery application',
    fullDescription:
      'Complete food ordering platform with menu browsing, cart management, order tracking, and payment integration. Built with React frontend and Firebase backend for real-time order updates.',
    languages: 'React • TypeScript • Formik • Firebase • TailwindCSS',
    category: 'webapp',
    tags: ['Food', 'E-commerce', 'Delivery', 'Full-Stack'],
    features: [
      'Menu browsing and search',
      'Shopping cart with real-time updates',
      'User authentication',
      'Order tracking',
      'Admin panel for restaurant management',
    ],
    githubLink: 'https://github.com/TaiwoJazz/homely',
    liveDemoLink: 'https://app-homely.netlify.app/',
  },
  {
    id: 'mr-oshodi',
    title: 'Mr Oshodi Portfolio',
    description: 'Creative interactive portfolio with smooth animations',
    fullDescription:
      'A highly creative portfolio website showcasing projects with engaging GSAP animations and modern design principles. Built with performance optimization and smooth user experience in mind.',
    languages: 'React • GSAP • TailwindCSS',
    category: 'website',
    tags: ['Portfolio', 'Personal', 'Animation'],
    liveDemoLink: 'https://mr-oshodi.vercel.app/',
  },
  {
    id: 'candour-it',
    title: 'Candour IT Services',
    description: 'Professional IT consulting services website',
    fullDescription:
      'Modern IT consulting services website with comprehensive service offerings, smooth animations, and professional design. Built for optimal performance and conversion.',
    languages: 'React • GSAP • TailwindCSS',
    category: 'website',
    tags: ['IT Services', 'Consulting', 'Business'],
    liveDemoLink: 'https://candour-website.vercel.app/',
  },
  {
    id: 'candour-training',
    title: 'Candour Training Platform',
    description: 'IT training and certification website',
    fullDescription:
      'Educational platform offering comprehensive IT training courses and certifications with modern design and user-friendly interface.',
    languages: 'React • GSAP • TailwindCSS',
    category: 'website',
    tags: ['Education', 'Training', 'IT'],
    liveDemoLink: 'https://candour-training.vercel.app/',
  },
  {
    id: 'candour-rentals',
    title: 'Candour Rental Services',
    description: 'Modern car rental booking platform',
    fullDescription:
      'Car rental platform with easy booking interface, fleet management, and seamless user experience. Features responsive design and smooth animations.',
    languages: 'React • GSAP • TailwindCSS',
    category: 'website',
    tags: ['Rental', 'Automotive', 'Business'],
    liveDemoLink: 'https://candour-rentals.vercel.app/',
  },
  {
    id: 'dark-jazz-theme',
    title: 'Dark Jazz VS Code Theme',
    description: 'Popular VS Code theme with 1000+ downloads',
    fullDescription:
      'Elegant dark theme for Visual Studio Code with carefully chosen colors to reduce eye strain during long coding sessions. Available on VS Code Marketplace.',
    languages: 'JavaScript • JSON',
    category: 'webapp',
    tags: ['VS Code', 'Theme', 'Developer Tools', 'Open Source'],
    githubLink: 'https://github.com/TaiwoJazz/Dark-Jazz',
    liveDemoLink:
      'https://marketplace.visualstudio.com/items?itemName=TaiwoJazz.dark-jazz&ssr=false#overview',
  },
  {
    id: 'crappo',
    title: 'Crappo',
    description: 'Cryptocurrency information and education platform',
    fullDescription:
      'Modern cryptocurrency information platform with market data, educational content, and clean responsive design.',
    languages: 'React • TailwindCSS',
    category: 'website',
    tags: ['Crypto', 'Information', 'Landing'],
    githubLink: 'https://github.com/TaiwoJazz/crappo-cryptocurrency',
    liveDemoLink: 'https://app-ldiev-crappo.netlify.app/',
  },
  {
    id: 'vom-app',
    title: 'VOM Mobile Application',
    description: 'Cross-platform mobile application (In Development)',
    fullDescription:
      'Mobile application built with React Native, currently in active development. Features modern mobile UI/UX patterns and cross-platform compatibility.',
    languages: 'React Native • TypeScript • Expo',
    category: 'mobile',
    tags: ['Mobile', 'React Native', 'In Development', 'iOS', 'Android'],
    status: 'In Development',
  },
];
