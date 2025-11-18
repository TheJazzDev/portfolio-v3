'use client';

import { profile } from '@/data/profile';

export function Experience() {
  return (
    <section id="experience" className="py-12 md:py-16 lg:py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="sticky-header bg-[#0a0a0a]/95 backdrop-blur-sm pb-4 mb-4">
          <span className="text-primary-500 text-base md:text-lg font-semibold">&gt; MY JOURNEY</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            PROFESSIONAL <span className="text-gradient">EXPERIENCE</span>
          </h2>
        </div>

        <div className="space-y-5 md:space-y-6 max-w-6xl mx-auto">
          {profile.experience.map((exp, index) => (
            <div
              key={index}
              className="border-2 border-white/20 p-5 md:p-6 lg:p-7 card-rounded hover:border-primary-500 transition-all duration-300 bg-linear-to-br from-white/5 to-transparent backdrop-blur-sm"
            >
              <div className="flex flex-col gap-2 md:gap-2.5 mb-3 md:mb-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1.5 md:gap-2">
                  <h3 className="text-xl md:text-2xl font-bold text-gradient">{exp.role}</h3>
                  <span className="text-sm md:text-base text-gray-400 md:text-right">{exp.period}</span>
                </div>
                <p className="text-primary-500 text-base md:text-lg font-semibold">{exp.company}</p>
                {exp.location && (
                  <p className="text-xs md:text-sm text-gray-500">{exp.location}</p>
                )}
              </div>

              <p className="text-sm md:text-base text-gray-400 mb-3 md:mb-4 italic">{exp.description}</p>

              {exp.highlights && (
                <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-2 text-sm md:text-base text-gray-300">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}

              {exp.skills && (
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10">
                  <p className="text-xs md:text-sm text-gray-500">
                    <strong className="text-primary-500">Skills:</strong> {exp.skills}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
