'use client';

import { ExternalLink } from 'lucide-react';

const portfolioVersions = [
  {
    version: 'V1',
    year: '2023',
    url: 'https://jazzdev-v1.vercel.app',
    description: 'First iteration - Simple and functional design focusing on showcasing projects',
    technologies: ['React', 'CSS'],
    highlights: ['Clean layout', 'Project showcase', 'Contact form'],
  },
  {
    version: 'V2',
    year: '2024',
    url: 'https://jazzdev-v2.vercel.app',
    description: 'Enhanced version with improved UI/UX and interactive elements',
    technologies: ['Next.js', 'Tailwind CSS', 'GSAP'],
    highlights: ['Modern design', 'Animations', 'Better responsiveness'],
  },
  {
    version: 'V3',
    year: '2025',
    url: '#',
    description: 'Current version - Professional portfolio with admin panel, analytics, and testimonials',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind V4'],
    highlights: ['Admin dashboard', 'Analytics tracking', 'Testimonial system', 'Contact management'],
    isCurrent: true,
  },
];

export function Evolution() {
  return (
    <section id="evolution" className="py-8 md:py-10 lg:py-12 px-6 lg:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <span className="text-primary-500 text-sm md:text-base font-semibold">&gt; PORTFOLIO JOURNEY</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
            EVOLUTION
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {portfolioVersions.map((version) => (
            <div
              key={version.version}
              className={`group border-2 card-rounded p-4 md:p-5 transition-all duration-300 ${
                version.isCurrent
                  ? 'border-primary-500 bg-primary-500/5'
                  : 'border-white/20 hover:border-primary-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary-500">{version.version}</h3>
                  <p className="text-xs text-gray-500">{version.year}</p>
                </div>
                {version.isCurrent && (
                  <span className="px-2 py-0.5 text-xs bg-primary-500 text-white font-semibold rounded">
                    Current
                  </span>
                )}
              </div>

              <p className="text-xs md:text-sm text-gray-400 mb-3 leading-relaxed line-clamp-2">
                {version.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {version.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs border border-white/20 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {!version.isCurrent && (
                <a
                  href={version.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/30 hover:border-primary-500 hover:bg-primary-500/10 text-xs md:text-sm transition-all rounded group/link"
                >
                  <span>View {version.version}</span>
                  <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {version.isCurrent && (
                <div className="text-xs text-primary-500 font-semibold">
                  ✓ Active Version
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
