'use client';

import { Download } from 'lucide-react';

export default function ResumePage() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <section className='resume-page min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 print:py-2'>
      <div
        id='resume-header'
        className='flex items-center justify-end mb-6 sm:mb-8 print:hidden'>
        <button
          onClick={handleDownload}
          className='text-white text-sm md:text-base border-2 border-primary-500 bg-primary-500 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 btn-rounded hover:bg-transparent hover:text-primary-500 transition-all ease-in-out duration-300 flex items-center gap-2 font-semibold'>
          <Download size={18} />
          Download PDF
        </button>
      </div>

      {/* Resume Container */}
      <div className='max-w-5xl mx-auto bg-white rounded-lg shadow-xl px-6 sm:px-8 md:px-10 pt-6 print:shadow-none print:rounded-none print-ready'>
        {/* HEADER */}
        <div className='text-center mb-4 pb-4 border-b-2 border-gray-800'>
          <div className='text-2xl font-bold text-gray-800 mb-1'>
            TAIWO ADEWALE BABARINDE
          </div>
          <div className='text-sm text-gray-600 mb-4'>
            LEAD FRONTEND ENGINEER | REACT.JS • NEXT.JS • TYPESCRIPT SPECIALIST
          </div>
          <div className='text-xs text-gray-600 space-y-1'>
            <div>
              📧 babsman4all@gmail.com | 📱 +2349032073321 | 📍 Lagos, Nigeria
            </div>
            <div>
              🔗{' '}
              <a
                href='https://www.linkedin.com/in/taiwo-babarinde/'
                className='text-blue-600 hover:underline'>
                Linkedin
              </a>{' '}
              | 💻{' '}
              <a
                href='https://github.com/TheJazzDev'
                className='text-blue-600 hover:underline'>
                Github
              </a>{' '}
              | 🌐{' '}
              <a
                href='https://jazzdev.vercel.app'
                className='text-blue-600 hover:underline'>
                Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* PROFESSIONAL SUMMARY */}
        <div className='mb-6'>
          <h2 className='resume-section-title text-sm font-bold text-white bg-gray-800 px-2 py-2 mb-2 uppercase tracking-wide'>
            Professional Summary
          </h2>
          <p className='text-xs text-gray-700 mb-4 print:mb-2 leading-relaxed text-justify'>
            Results-driven Lead Frontend Engineer with 4+ years of hands-on
            experience architecting and scaling web applications across fintech,
            Web3, food delivery, and healthcare sectors. Proven expertise in
            React.js, Next.js, and TypeScript with a demonstrated ability to
            lead high-performing teams, mentor junior developers, and deliver
            pixel-perfect, performance-optimized applications serving thousands
            of users.
          </p>
          <ul className='text-xs text-gray-700 space-y-2 print:space-y-1 ml-4'>
            <li>
              <strong>Led a team of 4 frontend developers</strong> building
              scalable accounting software with micro-frontend architecture
            </li>
            <li>
              <strong>Mentored 3 interns</strong> through to junior developer
              positions, establishing team best practices
            </li>
            <li>
              <strong>Evaluated 20,000+ lines of code</strong>, improving
              product optimization by 20% and developer productivity
            </li>
            <li>
              <strong>
                Successfully shipped 7+ responsive web applications
              </strong>{' '}
              and multiple blockchain dApps
            </li>
          </ul>
        </div>

        {/* CORE COMPETENCIES */}
        <div className='mb-6'>
          <h2 className='resume-section-title text-sm font-bold text-white bg-gray-800 px-2 py-2 mb-2 uppercase tracking-wide'>
            Core Competencies
          </h2>
          <div className='space-y-2 print:space-y-1 text-xs text-gray-700'>
            <div>
              <strong className='underline'>Frontend Development:</strong>{' '}
              React.js • Next.js • TypeScript • JavaScript (ES6+) • React Native
              • Flutter • TailwindCSS • GSAP • Shadcn UI
            </div>
            <div>
              <strong className='underline'>Architecture & Performance:</strong>{' '}
              Micro Frontend Architecture • Component Design Systems •
              Performance Optimization • API Integration • Code Splitting
            </div>
            <div>
              <strong className='underline'>Leadership:</strong> Team Leadership
              • Mentorship • Code Review • Technical Documentation • Agile
              (Scrum/Kanban)
            </div>
            <div>
              <strong className='underline'>Developer Tools:</strong> Git •
              Docker • Firebase • Webpack • Redux • Jira • Slack
            </div>
          </div>
        </div>

        {/* PROFESSIONAL EXPERIENCE */}
        <div className='mb-6'>
          <h2 className='resume-section-title text-sm font-bold text-white bg-gray-800 px-2 py-2 mb-2 uppercase tracking-wide'>
            Professional Experience
          </h2>

          {/* Job 1 */}
          <div className='mb-4'>
            <h3 className='font-bold text-gray-800 text-sm'>
              FRONT-END DEVELOPER (Freelance)
            </h3>
            <p className='text-xs text-gray-600 italic'>
              Food Junkee | Nov 2025 – Present | Remote
            </p>
            <p className='text-xs text-gray-600 mb-2'>
              Full-stack food delivery platform specializing in African and
              Caribbean cuisine
            </p>
            <ul className='text-xs text-gray-700 space-y-2 print:space-y-0 ml-4 list-disc'>
              <li>
                Built production-ready food delivery web application using
                Next.js 16, React 19, and TypeScript with Firebase backend
                serving real customers
              </li>
              <li>
                Integrated Stripe payment processing with webhook handling and
                DPD Local UK shipping API for automated order fulfillment and
                thermal label printing
              </li>
              <li>
                Developed comprehensive admin dashboard with role-based access
                control, order management, real-time analytics, and inventory
                tracking
              </li>
              <li>
                Implemented 30+ RESTful API endpoints with authentication,
                activity logging, and automated cleanup jobs deployed on Vercel
                with cron scheduling
              </li>
              <li>
                Designed complex checkout flow with cart persistence, delivery
                validation, and multi-service integration (Firebase, Resend
                email, QZ Tray printing)
              </li>
            </ul>
            <p className='text-xs text-gray-600 mt-2'>
              <strong>Skills:</strong> Next.js | React.js | TypeScript |
              Firebase | Stripe API | DPD API | Zustand | API Development
            </p>
          </div>

          {/* Job 2 */}
          <div className='mb-4'>
            <h3 className='font-bold text-gray-800 text-sm'>
              LEAD FRONTEND ENGINEER
            </h3>
            <p className='text-xs text-gray-600 italic'>
              CANDOUR IT SERVICES | Jan 2024 – Present | Remote
            </p>
            <p className='text-xs text-gray-600 mb-2'>
              IT solutions company providing innovative tech solutions to
              businesses worldwide
            </p>
            <ul className='text-xs text-gray-700 space-y-2 print:space-y-0 ml-4 list-disc'>
              <li>
                Leading a high-performing team of 4 frontend developers building
                scalable accounting software using micro-frontend architecture
                and 300+ integrated API endpoints
              </li>
              <li>
                Architected and implemented micro-frontend architecture enabling
                independent team workflows and seamless integration across
                services
              </li>
              <li>
                Designed, developed, and maintained 7+ responsive web
                applications using React.js and Angular, serving thousands of
                users
              </li>
              <li>
                Mentored 3 interns from onboarding to junior developer
                positions, establishing coding standards and best practices
              </li>
              <li>
                Optimized applications for performance, identifying bottlenecks
                and reducing load times through profiling and code analysis
              </li>
            </ul>
            <p className='text-xs text-gray-600 mt-2'>
              <strong>Skills:</strong> React.js | Next.js | TypeScript | Micro
              Frontend Architecture | API Integration | Team Leadership
            </p>
          </div>

          {/* Job 3 */}
          <div className='mb-4'>
            <h3 className='font-bold text-gray-800 text-sm'>
              FRONT-END DEVELOPER
            </h3>
            <p className='text-xs text-gray-600 italic'>
              VastFluid Finance | Mar 2023 – May 2023 | Remote
            </p>
            <p className='text-xs text-gray-600 mb-2'>
              Next-generation decentralized exchange (DEX) built on the Arbitrum
              network (Web3)
            </p>
            <ul className='text-xs text-gray-700 space-y-2 print:space-y-0 ml-4 list-disc'>
              <li>
                Collaborated with design team to create intuitive, user-friendly
                frontend for blockchain DApp
              </li>
              <li>
                Developed fully responsive landing page with mobile-first
                approach; reduced bounce rates by 15%
              </li>
              <li>
                Optimized web architecture for scalability resulting in improved
                page load speed
              </li>
            </ul>
          </div>

          {/* Job 4 */}
          <div className='mb-4'>
            <h3 className='font-bold text-gray-800 text-sm'>
              FRONT-END DEVELOPER (Freelance)
            </h3>
            <p className='text-xs text-gray-600 italic'>
              DEFT Trader | Jan 2023 – Feb 2023 | Remote
            </p>
            <p className='text-xs text-gray-600 mb-2'>
              Forex brand helping traders and investors achieve profitability in
              forex markets
            </p>
            <ul className='text-xs text-gray-700 space-y-2 print:space-y-0 ml-4 list-disc'>
              <li>
                Designed and developed fully responsive multi-page Forex website
                with seamless UX
              </li>
              <li>
                Implemented authentication system, admin panel, and database
                using Firebase
              </li>
              <li>
                Integrated REST APIs with Myfxbook to fetch real-time financial
                data
              </li>
            </ul>
          </div>

          {/* Job 5 */}
          <div className='mb-4'>
            <h3 className='font-bold text-gray-800 text-sm'>
              STRATEGY AND QUALITY ASSURANCE MANAGER
            </h3>
            <p className='text-xs text-gray-600 italic'>
              StableDoc | Oct 2021 – Dec 2022
            </p>
            <p className='text-xs text-gray-600 mb-2'>
              Blockchain- and AI-powered telehealth platform providing global
              cross-boundary healthcare
            </p>
            <ul className='text-xs text-gray-700 space-y-2 print:space-y-0 ml-4 list-disc'>
              <li>
                Led cross-functional team of 2 designers and 6 developers to
                successfully lunch 5 products
              </li>
              <li>
                Evaluated 20,000+ lines of code across multiple projects,
                ensuring adherence to industry best practices
              </li>
              <li>
                Made codebase 100% developer-friendly through comprehensive code
                reviews and documentation
              </li>
              <li>
                Provided mentorship and technical guidance to junior developers,
                improving team efficiency
              </li>
            </ul>
            <p className='text-xs text-gray-600 mt-2'>
              <strong>Skills:</strong> Flutter | Code Review | Performance
              Optimization | Team Leadership | Product Development
            </p>
          </div>
        </div>

        {/* EDUCATION */}
        <div className='mb-6'>
          <h2 className='resume-section-title text-sm font-bold text-white bg-gray-800 px-2 py-2 mb-2 uppercase tracking-wide'>
            Education & Certifications
          </h2>
          <div className='space-y-2 text-xs text-gray-700'>
            <div>
              <strong>Harvard CS50X – Introduction to Computer Science</strong>{' '}
              | 2023
            </div>
            <div>
              <strong>React - The Complete Guide</strong> | Udemy | 2022
            </div>
            <div>
              <strong>
                The Complete 2022 Full-Stack Web Development Bootcamp
              </strong>{' '}
              | Udemy | 2022
            </div>
            <div>
              <strong>Responsive Web Design</strong> | Free Code Camp | 2022
            </div>
          </div>
        </div>

        {/* KEY ACHIEVEMENTS */}
        <div className='mb-6'>
          <h2 className='resume-section-title text-sm font-bold text-white bg-gray-800 px-2 py-2 mb-2 uppercase tracking-wide'>
            Key Achievements
          </h2>
          <ul className='text-xs text-gray-700 space-y-2 ml-4'>
            <li>
              ✓ Mentored and hired 3 interns to junior developer positions,
              establishing industry best practices
            </li>
            <li>
              ✓ Evaluated 20,000+ lines of code, improving product optimization
              by 20%
            </li>
            <li>
              ✓ Shipped 5+ production applications across web, mobile, and
              blockchain platforms
            </li>
            <li>
              ✓ Designed micro-frontend architecture enabling scalable workflows
              and 300+ API integrations
            </li>
            <li>
              ✓ Successfully led cross-functional teams of 8+ people to deliver
              products on time
            </li>
          </ul>
        </div>

        {/* ADDITIONAL INFO */}
        <div>
          <h2 className='resume-section-title text-sm font-bold text-white bg-gray-800 px-2 py-2 mb-2 uppercase tracking-wide'>
            Additional Information
          </h2>
          <div className='space-y-1 text-xs text-gray-700'>
            <div>
              <strong>Work Authorization:</strong> Nigerian citizen, open to
              visa sponsorship for international opportunities
            </div>
            <div>
              <strong>Availability:</strong> Available for immediate start on
              remote or relocation opportunities
            </div>
            <div>
              <strong>Languages:</strong> English (Fluent) | Yoruba (Native)
            </div>
            <div>
              <strong>Interests:</strong> Coding & Software Architecture | Team
              Leadership & Mentorship | Web3 & Blockchain Development
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
