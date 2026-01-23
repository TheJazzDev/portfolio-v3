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
    id: '67-humanitarian-foundation',
    title: '67 Humanitarian Foundation',
    description: 'Nigerian Army 67 Intake humanitarian initiative managing 3,600+ members',
    fullDescription:
      'First organized humanitarian initiative in Nigerian Army history, built for the 67 Intake to manage 3,600+ member records across 36 Nigerian states. A comprehensive full-stack platform featuring member management, donation tracking, news publishing, and memorial tributes. Includes sophisticated role-based access control (4 roles), complete audit logging, and state-of-the-art database architecture for honoring fallen heroes and supporting military families.',
    languages:
      'Next.js 14 • React 19 • TypeScript • Prisma ORM • PostgreSQL • TailwindCSS v4 • Shadcn/ui',
    category: 'webapp',
    tags: ['Humanitarian', 'Military', 'Non-Profit', 'Full-Stack', 'Enterprise', 'Database Management'],
    features: [
      'Member management system for 3,600+ records with 14 military ranks',
      'Role-based access control (SUPERADMIN, ADMIN, MODERATOR, MEMBER)',
      'Donation tracking with Stripe payment integration',
      'News and announcements publishing system',
      'Memorial tributes for fallen heroes',
      'Complete audit logging for all actions',
      'Advanced search and filtering across 36 states',
      'Bulk CSV import for member data',
      'Responsive dashboard with analytics',
      'Email notifications via Resend',
      'Cloudinary integration for media storage',
    ],
    architecture: 'Full-Stack (Next.js App Router, Prisma ORM, PostgreSQL)',
    role: 'Full-Stack Developer',
    impact:
      'First-ever organized digital platform for Nigerian Army humanitarian efforts. Managing 3,600+ member records with complete audit trail. Supporting military families through streamlined donation and memorial systems.',
    technicalHighlights: [
      'Next.js 14 App Router with route groups for clean architecture',
      'Prisma ORM with PostgreSQL for type-safe database operations',
      'NextAuth.js for secure authentication and session management',
      'Zod validation schemas for input sanitization',
      'Complete audit logging system tracking all data modifications',
      'Role-based access control with granular permissions',
      'Optimized database queries with proper indexing',
      'Shadcn/ui components built on Radix UI primitives',
      'Tailwind CSS v4 for modern styling',
    ],
    liveDemoLink: 'https://67hf.org',
  },
  {
    id: 'foodjunkee',
    title: 'Food Junkee',
    description: 'Full-stack food delivery platform for African & Caribbean cuisine',
    fullDescription:
      'Food Junkee is a production-ready Next.js 16 food delivery platform offering authentic African & Caribbean meals through online ordering and mobile van services at 40+ workplace locations. The application features Stripe payment integration, Firebase authentication, DPD shipping with thermal label printing, real-time order tracking, and a comprehensive role-based admin dashboard with activity logging and analytics. Built with TypeScript, Tailwind CSS, and Framer Motion, it delivers a premium user experience with smooth animations, dark mode support, and mobile-first responsive design.',
    languages:
      'Next.js 16 • React 19 • TypeScript • Firebase • Stripe • TailwindCSS • GSAP • Framer Motion • Zustand • React Query • Resend • DPD API',
    category: 'webapp',
    tags: ['Food Delivery', 'E-commerce', 'Full-Stack', 'Next.js', 'Firebase', 'Stripe', 'Shipping Integration', 'Real-time'],
    architecture: 'Full-Stack (Next.js App Router, Firebase, Stripe, DPD API)',
    features: [
      'Stripe payment integration with webhook confirmation',
      'Firebase authentication (Email/Password, Google Sign-In, Email Link)',
      'DPD shipping integration with thermal label printing',
      'Real-time order tracking and status updates',
      'Shopping cart with localStorage persistence and Zustand state management',
      'Favorites system with Firebase synchronization',
      'Role-based admin dashboard (super-admin, admin, manager, user)',
      'Activity logging system for audit trails',
      'Promo code system with anti-cheat validation',
      'Automated email notifications via Resend',
      'Draft order system with auto-cleanup via Vercel cron jobs',
      'Multi-environment Firebase setup (dev/prod)',
      'Gallery and menu management with image uploads',
      'Newsletter subscription system',
      'Dark/light theme support',
      'Mobile-first responsive design with premium animations',
      'SEO optimization with structured data and sitemaps',
    ],
    keyFeatures: [
      '40+ workplace locations served by mobile van service',
      'Obfuscated admin routes for enhanced security',
      'Soft-delete pattern with trash recovery',
      'Direct thermal printing for shipping labels (no file intermediary)',
      'React Query for efficient server state management',
      'Upstash Redis for caching and rate limiting',
      'Multi-role access control with granular permissions',
      'Recharts integration for admin analytics',
    ],
    technicalHighlights: [
      'Next.js 16 App Router with React Server Components',
      'Firebase Admin SDK for secure server-side operations',
      'Stripe webhook handling with signature verification',
      'DPD API integration (@jazzdev/dpd-local-sdk)',
      'qz-tray integration for thermal label printing (TSC-DA210 printer)',
      'Zustand state management with localStorage persistence',
      'TanStack React Query v5 for server state with DevTools',
      'Resend email service with HTML templates',
      'Vercel cron jobs for scheduled tasks (draft cleanup, token refresh)',
      'Multi-environment database architecture',
      'Incremental Static Regeneration (ISR) with 5-minute revalidation',
      'Image optimization with Next.js Image component',
      'GSAP and Framer Motion for premium animations',
      'Comprehensive error handling and logging',
      'GDPR compliance considerations',
    ],
    role: 'Full-Stack Developer (Contract)',
    impact:
      'Built production-ready food delivery platform serving 40+ workplace locations daily. Implemented complete e-commerce workflow from browsing to payment and delivery. Integrated DPD shipping with automated thermal label printing. Created comprehensive admin system with activity logging and analytics for operational efficiency.',
    githubLink: 'https://github.com/C8nd0ur/food-junkee',
    liveDemoLink: 'https://foodjunkee.co.uk',
  },
  {
    id: 'vom-mobile-app',
    title: 'VOM Church Management Platform',
    description: 'Full-stack church community system with mobile app and admin dashboard',
    fullDescription:
      'VOM (Valley of Mercy) is a comprehensive church management platform featuring a cross-platform mobile app built with Expo and React Native, coupled with a powerful Next.js admin dashboard. The system enables church members to access sermons, submit prayer requests, view programmes, and engage with their faith community, while administrators manage members, content, and communications through a secure, role-based admin panel. Built on Firebase with real-time synchronization, offline support, push notifications, and gamification features to drive member engagement.',
    languages:
      'React Native • Expo SDK 54 • Next.js 15 • TypeScript • Firebase • Redux Toolkit • TanStack Query • NativeWind v4 • TailwindCSS v4',
    category: 'mobile',
    tags: ['Mobile', 'React Native', 'Next.js', 'Firebase', 'Full-Stack', 'Church Management', 'Admin Dashboard', 'Community Platform'],
    architecture: 'Monorepo - React Native Mobile App + Next.js Admin Panel (Firebase Backend)',
    features: [
      'Cross-platform mobile app (iOS & Android) with Expo',
      'Next.js admin dashboard with role-based access control',
      'Real-time data synchronization via Firebase Firestore',
      'Offline-first architecture with action queue',
      'Push notifications system (Expo Cloud Messaging)',
      'Member directory with bands, departments, and children tracking',
      'Programme management (Sunday services, Vigils, special events)',
      'Ministry features (daily prayers, prayer requests, testimonies, sermons)',
      'Gamification system (points, badges, streaks)',
      'CSV export/import for bulk member operations',
      'Birthday tracking and reminders',
      'Announcements and events calendar',
      'First-timers management',
      'Engagement analytics and reporting',
    ],
    keyFeatures: [
      'Dual-app architecture: Mobile + Admin Panel sharing Firebase backend',
      'Redux Toolkit for mobile state management with persistence',
      'TanStack Query for admin panel server state',
      'Firebase Admin SDK for secure server-side operations',
      'Expo Router v6 for file-based navigation',
      'React Hook Form with Yup/Zod validation',
      'Server-side rendering with Next.js 15 App Router',
      'Session-based authentication with HTTP-only cookies',
      'Radix UI component library for accessible admin interface',
    ],
    technicalHighlights: [
      'Monorepo structure with separate mobile and admin apps',
      'Expo SDK 54 with React Native 0.81.5 for mobile',
      'Next.js 15 with Turbopack for admin panel',
      'NativeWind v4 (Tailwind for React Native)',
      'Firebase integration: Firestore, Auth, Storage, Cloud Messaging',
      'Redux Toolkit with Redux Persist for offline-capable mobile app',
      'TanStack React Query v5 for efficient server state management',
      'Expo Router for type-safe navigation',
      'Real-time updates with Firestore listeners',
      'Push notifications via expo-notifications',
      'Image optimization with expo-image and Next.js Image',
      'Error boundaries and loading states',
      'CSV bulk operations in admin panel',
      'Mobile-first responsive design with Tailwind breakpoints',
      '15+ Redux slices managing different app domains',
    ],
    role: 'Lead Full-Stack Developer - Architecture & Implementation',
    impact:
      'Enabling digital transformation for Valley of Mercy Church community. Built comprehensive dual-platform solution serving both mobile members and administrators. Implemented offline-first architecture ensuring app functionality without internet. Created gamification system to increase member engagement and participation.',
    status: 'In Active Development',
  },
  {
    id: 'olamide-sax',
    title: 'Olamide Sax Portfolio',
    description: 'Full-stack portfolio website with admin CMS for professional musician',
    fullDescription:
      'A comprehensive portfolio platform built for UK-based Nigerian musician Olamide Sax, featuring a public-facing showcase and secure admin panel for content management. The application leverages Next.js 16 with server-side rendering, Prisma ORM with PostgreSQL for data persistence, and Vercel Blob Storage for media management. Includes sophisticated video categorization by instrument type (Saxophone, Vocal, Keyboard), photo galleries, music release showcases, press coverage sections, and smooth animations powered by Framer Motion.',
    languages:
      'Next.js 16 • React 19 • TypeScript • Prisma ORM • PostgreSQL • TailwindCSS v4 • Framer Motion • Vercel Blob Storage',
    category: 'website',
    tags: ['Music', 'Portfolio', 'CMS', 'Full-Stack', 'Artist Website', 'Media Gallery'],
    features: [
      'Video categorization system by instrument type (Saxophone, Vocal, Keyboard)',
      'Secure admin panel for content management',
      'Image upload system with Vercel Blob Storage (max 5MB, multiple formats)',
      'Dynamic photo gallery with featured items and display ordering',
      'Music releases showcase (Audiomack, Spotify integration)',
      'Press coverage and publications management',
      'Smooth animations with Framer Motion',
      'Statistics counter with React CountUp',
      'Mobile-first responsive design',
      'Server-side rendering with Next.js App Router',
    ],
    architecture: 'Full-Stack (Next.js App Router, Prisma ORM, PostgreSQL, Vercel Blob Storage)',
    role: 'Full-Stack Developer',
    technicalHighlights: [
      'Next.js 16 App Router with route groups for public and admin sections',
      'Prisma ORM v7 with PostgreSQL and NeonDB for type-safe database operations',
      'Vercel Blob Storage integration for efficient media management',
      'Custom authentication system with bcryptjs',
      'Dynamic video filtering by category with YouTube embeds',
      'Image optimization with Next.js Image component',
      'Intersection Observer API for scroll-triggered animations',
      'Component-based architecture with reusable UI elements',
      'API routes for CRUD operations (videos, photos, music, press)',
      'Mobile-first development following Tailwind CSS v4 best practices',
    ],
    githubLink: 'https://github.com/TheJazzDev/olamide-sax',
  },
  {
    id: 'larrywind',
    title: 'Larry Wind',
    description: 'A Professional Musician',
    fullDescription:
      'Elite music instructor in Lagos. Specialize in Saxophone, Piano, Drums, Violin & Music Theory.',
    languages: 'NextJS • TypeScript • TailwindCSS',
    category: 'website',
    tags: ['Music', 'Theory', 'Instruments', 'Teaching', 'Landing page'],
    githubLink: 'https://github.com/TaiwoJazz/larry-wind',
    liveDemoLink: 'https://larrywind.vercel.app/',
  },
  {
    id: 'digit-tally-landing-page',
    title: 'Digit Tally Landing Page',
    description: 'Accounting app',
    fullDescription: 'The only accounting app you need',
    languages: 'NextJS • TypeScript • TailwindCSS',
    category: 'website',
    tags: ['Accounting', 'Calculator', 'Landing page'],
    liveDemoLink: 'https://digit-tally.io',
  },
  {
    id: 'digit-tally',
    title: 'Digit Tally App',
    description:
      'Scalable micro-frontend accounting system serving 50+ business users',
    fullDescription:
      'A comprehensive enterprise-grade accounting platform built using Turbo Repo micro-frontend architecture. Led the frontend development and architecture, integrating 300+ API endpoints across multiple independent applications that work seamlessly together. Built custom React component library, utility functions, and CLI tools published on NPM for team efficiency. Implemented advanced PDF generation system using Playwright for professional invoices, purchase orders, and receipts with optimized multi-page support.',
    architecture: 'Micro-Frontend (Turbo Repo)',
    microApps: [
      'Sales Management App - Invoice generation, customer management, sales tracking',
      'Suppliers & Procurement App - Vendor management, purchase orders, payment tracking',
      'Inventory Management App - Stock control, warehousing, real-time inventory tracking',
      'Accounting & Finance App - General ledger, financial reporting, reconciliation',
      'Payroll Management App - Employee salary processing, tax calculations, auto payslip generation',
      'Payslip App - Generate employee payslip',
      'PDF Service - Server-side PDF generation for invoices, orders, and receipts',
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
      'Server-side PDF generation with Playwright for professional documents',
      'Dynamic template system with Mustache for customizable invoices and receipts',
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
      'Playwright-based PDF generation with A4 page optimization',
      'Advanced footer positioning algorithm for multi-page documents',
      'Template rendering system with Mustache.js for dynamic content',
      'Serverless-optimized Chromium configuration for PDF export',
    ],
    npmPackages: [
      {
        name: '@candourorg/components',
        description:
          'Shared React component library used across all micro-apps',
        link: 'https://www.npmjs.com/package/@candourorg/components',
      },
      {
        name: '@candourorg/utils',
        description: 'Common utility functions and helpers for business logic',
        link: 'https://www.npmjs.com/package/@candourorg/utils',
      },
      {
        name: '@candourorg/cli',
        description:
          'CLI tool for authenticating backend and frontend developers locally',
        link: 'https://www.npmjs.com/package/@candourorg/cli',
      },
    ],
    languages:
      'Next.js • TypeScript • TanStack Query • Redux • Turbo Repo • TailwindCSS',
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
    liveDemoLink: 'https://app/digit-tally.io',
  },
  {
    id: 'gebu-works',
    title: 'Gebu Works',
    description: 'Fair Work Platform for African Talent',
    fullDescription:
      'Connect African developers and designers with global companies. Fair pay, fast payments, quality work.',
    languages: 'NextJS • TypeScript • TailwindCSS',
    category: 'website',
    tags: ['Freelancing', 'Remote', 'Hybridg', 'Landing page'],
    liveDemoLink: 'https://gebuworks.vercel.app/',
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
    description:
      'Next-generation decentralized exchange built on Arbitrum network',
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
    description:
      'Comprehensive forex trading platform with real-time market data',
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

];
