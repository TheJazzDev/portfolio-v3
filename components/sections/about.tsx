'use client';

import { profile } from '@/data/profile';

export function About() {
  return (
    <section id="about" className="flex items-center py-12 md:py-16 lg:py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="sticky-header bg-[#0a0a0a]/95 backdrop-blur-sm py-6 md:py-8 mb-6 md:mb-8">
          <span className="text-primary-500 text-base md:text-lg font-semibold">&gt; WHO I AM</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 md:mt-4">
            ABOUT <span className="text-gradient">ME</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 md:space-y-5">
          {profile.bio.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed text-center">
              {paragraph}
            </p>
          ))}

          <div className="bg-linear-to-br from-primary-500/20 to-electric-500/20 border-2 border-white/20 p-5 md:p-6 lg:p-7 mt-6 md:mt-8 card-rounded">
            <div className="text-sm md:text-base text-primary-400 mb-2 md:mb-3 font-semibold text-center">&gt; CURRENT FOCUS</div>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed text-center">
              Building scalable micro-frontend architectures and exploring Web3/DeFi technologies
              while mentoring junior developers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
