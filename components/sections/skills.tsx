'use client';

import { profile } from '@/data/profile';

export function Skills() {
  return (
    <section id='skills' className='py-12 md:py-16 lg:py-20 px-6 lg:px-20'>
      <div className='max-w-7xl mx-auto'>
        <div className='sticky-header bg-[#0a0a0a]/95 backdrop-blur-sm py-6 md:py-8 mb-6 md:mb-8'>
          <span className='text-primary-500 text-base md:text-lg font-semibold'>
            &gt; WHAT I USE
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mt-2 md:mt-4'>
            SKILLS & <span className='text-gradient'>TOOLS</span>
          </h2>
        </div>

        <div className='space-y-6 md:space-y-8'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5'>
            {Object.entries(profile.skills).map(([category, skills]) => (
              <div
                key={category}
                className='border-l-4 border-primary-500 pl-4 md:pl-5 hover:border-primary-400 transition-colors'>
                <h3 className='text-sm md:text-base text-primary-500 uppercase mb-3 tracking-wider font-semibold'>
                  {category}
                </h3>
                <div className='grid grid-cols-2 gap-2'>
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className='border-2 border-white/20 hover:border-primary-500 p-2 text-center text-xs md:text-sm hover:bg-primary-500 hover:text-white transition-all duration-300 cursor-default group card-rounded'>
                      <span className='group-hover:font-bold'>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className='flex flex-col lg:flex-row gap-4 md:gap-6'>
            <div className='relative flex-1'>
              <div className='border-4 border-white p-5 md:p-6 lg:p-7 brutalist-shadow h-full flex flex-col justify-between card-rounded'>
                <div>
                  <h3 className='text-xl md:text-2xl font-bold mb-4 md:mb-5 text-gradient'>
                    Expertise
                  </h3>
                  <div className='space-y-4 md:space-y-5'>
                    {[
                      {
                        area: 'Frontend Architecture',
                        description:
                          'Micro-frontend systems, code splitting, performance optimization',
                        level: 95,
                      },
                      {
                        area: 'React Ecosystem',
                        description:
                          'React, Next.js, TanStack Query, Redux, Context API',
                        level: 98,
                      },
                      {
                        area: 'TypeScript',
                        description:
                          'Type-safe applications, complex type definitions, generics',
                        level: 90,
                      },
                      {
                        area: 'Web3 & DeFi',
                        description:
                          'Smart contract integration, wallet connections, Web3.js',
                        level: 80,
                      },
                      {
                        area: 'UI/UX & Design',
                        description:
                          'Responsive design, animations, accessibility, design generation',
                        level: 92,
                      },
                    ].map((item) => (
                      <div key={item.area} className='space-y-1.5 md:space-y-2'>
                        <div className='flex justify-between items-center'>
                          <h4 className='font-bold text-sm md:text-base'>
                            {item.area}
                          </h4>
                          <span className='text-xs md:text-sm text-electric-500'>
                            {item.level}%
                          </span>
                        </div>
                        <p className='text-xs md:text-sm text-gray-400'>
                          {item.description}
                        </p>
                        <div className='h-1.5 md:h-2 bg-white/10 overflow-hidden btn-rounded'>
                          <div
                            style={{ width: `${item.level}%` }}
                            className='h-full bg-linear-to-r from-primary-500 via-electric-500 to-primary-400'
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='mt-6 md:mt-7 pt-6 md:pt-7 border-t-2 border-white/20'>
                  <div className='grid grid-cols-2 gap-3 md:gap-4 text-center'>
                    <div>
                      <div className='text-2xl md:text-3xl font-bold text-gradient'>
                        300+
                      </div>
                      <div className='text-xs text-gray-500 mt-1 uppercase tracking-wider'>
                        API Integrations
                      </div>
                    </div>
                    <div>
                      <div className='text-2xl md:text-3xl font-bold text-gradient'>
                        7+
                      </div>
                      <div className='text-xs text-gray-500 mt-1 uppercase tracking-wider'>
                        Micro Apps
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-3 md:gap-4 flex-1'>
              {[
                {
                  title: 'Performance Focused',
                  description:
                    'Optimizing bundle sizes, lazy loading, code splitting for blazing fast apps',
                  icon: '⚡',
                },
                {
                  title: 'Scalable Architecture',
                  description:
                    'Building maintainable systems that grow with your business needs',
                  icon: '🏗️',
                },
                {
                  title: 'Modern Best Practices',
                  description:
                    'Following industry standards, clean code, and accessibility guidelines',
                  icon: '✨',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className='border-2 border-white/20 hover:border-primary-500 p-4 md:p-5 transition-colors duration-300 group card-rounded'>
                  <div className='text-3xl md:text-4xl mb-3 md:mb-4'>
                    {item.icon}
                  </div>
                  <h3 className='text-lg md:text-xl font-bold mb-1.5 md:mb-2 group-hover:text-gradient transition-colors'>
                    {item.title}
                  </h3>
                  <p className='text-xs md:text-sm text-gray-400'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
