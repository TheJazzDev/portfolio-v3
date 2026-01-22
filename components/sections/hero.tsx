'use client';

import { ArrowRight, FileDown } from 'lucide-react';
import { profile } from '@/data/profile';
import Link from 'next/link';

export function Hero() {

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id='home'
      className='min-h-[97vh] md:min-h-[90vh] flex items-center justify-center relative overflow-hidden px-6 lg:px-20 py-12 md:py-16'>
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl' />
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        <div className='space-y-6 md:space-y-7 lg:space-y-8'>
          <div className='text-primary-500 text-base md:text-lg font-semibold'>
            &gt; FRONTEND ENGINEER
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight">
            <span className="block">TAIWO</span>
            <span className="block text-primary-500">BABARINDE</span>
          </h1>

          <p className='text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl leading-relaxed'>
            Building exceptional digital experiences with React, Next.js, and
            TypeScript. From micro-frontends to DeFi platforms.
          </p>

          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
            <button
              onClick={scrollToProjects}
              className="group px-6 lg:px-8 py-2 border-4 border-primary-500 bg-primary-500 text-white font-bold text-base md:text-lg hover:bg-transparent hover:text-primary-500 transition-all duration-300 flex items-center justify-center gap-2 btn-rounded"
            >
              View Projects
              <ArrowRight
                className='group-hover:translate-x-1 transition-transform'
                size={20}
              />
            </button>

            <Link
              href='/resume'
              target='_blank'
              className="group text-center px-6 lg:px-8 py-2 border-2 border-primary-500 text-primary-500 font-bold text-base md:text-lg hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 btn-rounded"
            >
              <FileDown
                className='group-hover:scale-110 transition-transform'
                size={20}
              />
              Resume
            </Link>

            <a
              href='#contact'
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-center px-6 lg:px-8 py-2.5 border border-white font-bold text-base md:text-lg hover:bg-white hover:text-black transition-all duration-300 btn-rounded"
            >
              Get in Touch
            </a>
          </div>

          <div className='pt-8 md:pt-10 lg:pt-12 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 lg:gap-8'>
            {Object.entries(profile.stats).map(([key, value]) => (
              <div
                key={key}
                className='border-l-4 border-primary-500 pl-3 md:pl-4 hover:border-primary-400 transition-colors'>
                <div className='text-2xl md:text-3xl lg:text-4xl font-bold text-primary-500'>
                  {value}
                </div>
                <div className='text-xs md:text-sm text-gray-400 uppercase mt-1 md:mt-2'>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
