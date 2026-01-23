'use client';

import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { cn } from '@/lib/utils';
import { trackProjectView } from '@/lib/hooks/useAnalytics';

const categories = ['all', 'webapp', 'website', 'mobile'] as const;
type Category = typeof categories[number];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    trackProjectView(project.id, project.title);
  };

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 md:py-20 lg:py-24 px-6 lg:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="sticky-header bg-[#0a0a0a]/95 backdrop-blur-sm pb-4 mb-4">
          <span className="text-primary-500 text-base md:text-lg font-semibold">&gt; MY WORK</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
FEATURED <span className="text-primary-500">PROJECTS</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-4 md:px-6 py-2 md:py-3 border-2 btn-rounded text-sm md:text-base uppercase transition-all duration-300',
                activeCategory === category
                  ? 'border-primary-500 bg-primary-500 text-white'
                  : 'border-white/30 hover:border-primary-500 hover:text-primary-500'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 items-stretch">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer border-2 border-white/20 transition-all duration-300 overflow-hidden bg-black card-rounded flex flex-col h-full"
    >
      <div className="p-4 md:p-5 space-y-3 md:space-y-3.5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg md:text-xl font-bold group-hover:text-primary-500 transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-1.5 md:gap-2 shrink-0">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 md:w-9 md:h-9 border border-white/30 hover:border-primary-500 hover:bg-primary-500/10 flex items-center justify-center transition-colors btn-rounded"
              >
                <Github size={16} />
              </a>
            )}
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 md:w-9 md:h-9 border border-white/30 hover:border-primary-500 hover:bg-primary-500/10 flex items-center justify-center transition-colors btn-rounded"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm md:text-base text-gray-300 line-clamp-2 leading-relaxed">{project.description}</p>

        <div className="font-mono text-xs md:text-sm text-primary-500 line-clamp-1">
          {project.languages}
        </div>

        <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 md:px-2.5 py-1 border border-white/20 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 md:px-2.5 py-1 text-xs text-gray-500">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="project-modal bg-linear-to-br from-black/95 to-primary-900/20 border-2 border-primary-500/30 max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-6xl xl:max-w-7xl w-full max-h-[90vh] overflow-y-auto modal-rounded shadow-2xl shadow-primary-500/20"
      >
        <div className="sticky top-0 bg-linear-to-b from-black to-black/95 border-b-2 border-primary-500/20 p-4 sm:p-5 md:p-6 flex justify-between items-start gap-3 sm:gap-4 z-10 backdrop-blur-xl">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">{project.title}</h2>
            {project.role && (
              <p className="text-sm sm:text-base md:text-lg text-primary-500 mt-2 font-semibold">{project.role}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 border-2 border-white/30 hover:border-primary-500 hover:bg-primary-500/20 transition-all flex items-center justify-center shrink-0 text-lg sm:text-xl btn-rounded"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-5 sm:space-y-6 md:space-y-7">
          <div className="border-l-4 border-primary-500 pl-4 sm:pl-5">
            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">{project.fullDescription}</p>
          </div>

          <div className="bg-linear-to-r from-primary-500/10 to-transparent p-4 sm:p-5 md:p-6 card-rounded border border-primary-500/20">
            <h3 className="text-primary-500 text-base sm:text-lg md:text-xl mb-2 sm:mb-3 font-bold uppercase tracking-wide">Tech Stack</h3>
            <p className="text-sm sm:text-base text-gray-300">{project.languages}</p>
          </div>

          {project.features && (
            <div>
              <h3 className="text-primary-500 text-base sm:text-lg md:text-xl mb-3 sm:mb-4 font-bold uppercase tracking-wide">Key Features</h3>
              <ul className="space-y-2 sm:space-y-2.5 grid md:grid-cols-2 gap-2 sm:gap-2.5">
                {project.features.map((feature, i) => (
                  <li key={i} className="text-sm sm:text-base text-gray-300 flex gap-2 sm:gap-3 p-2.5 sm:p-3 border border-white/10 card-rounded hover:border-primary-500/30 transition-colors">
                    <span className="text-primary-500 text-base sm:text-lg shrink-0">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.technicalHighlights && (
            <div>
              <h3 className="text-primary-500 text-base sm:text-lg md:text-xl mb-3 sm:mb-4 font-bold uppercase tracking-wide">Technical Highlights</h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {project.technicalHighlights.map((highlight, i) => (
                  <li key={i} className="text-sm sm:text-base text-gray-300 flex gap-2 sm:gap-3 p-2.5 sm:p-3 border border-white/10 card-rounded hover:border-electric-500/30 transition-colors">
                    <span className="text-electric-500 text-base sm:text-lg shrink-0">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.microApps && (
            <div>
              <h3 className="text-primary-500 text-base sm:text-lg md:text-xl mb-3 sm:mb-4 font-bold uppercase tracking-wide">Micro Apps</h3>
              <ul className="space-y-2 sm:space-y-2.5 grid md:grid-cols-2 gap-2 sm:gap-2.5">
                {project.microApps.map((app, i) => (
                  <li key={i} className="text-sm sm:text-base text-gray-300 flex gap-2 sm:gap-3 p-2.5 sm:p-3 border border-white/10 card-rounded hover:border-primary-500/30 transition-colors">
                    <span className="text-electric-500 text-base sm:text-lg shrink-0">◆</span>
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.npmPackages && (
            <div>
              <h3 className="text-primary-500 text-base sm:text-lg md:text-xl mb-3 sm:mb-4 font-bold uppercase tracking-wide">NPM Packages</h3>
              <div className="space-y-2 sm:space-y-2.5">
                {project.npmPackages.map((pkg) => (
                  <a
                    key={pkg.name}
                    href={pkg.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-2 border-white/20 hover:border-primary-500 hover:bg-primary-500/5 p-3 sm:p-4 md:p-5 transition-all group card-rounded"
                  >
                    <div className="text-base sm:text-lg font-semibold group-hover:text-primary-500 transition-colors">
                      {pkg.name}
                    </div>
                    <div className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2">{pkg.description}</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {project.impact && (
            <div className="bg-linear-to-br from-primary-500/15 to-electric-500/15 border-2 border-primary-500/30 p-4 sm:p-5 md:p-6 card-rounded">
              <h3 className="text-primary-500 text-base sm:text-lg md:text-xl mb-2 sm:mb-3 font-bold uppercase tracking-wide">Impact</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">{project.impact}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-3 sm:pt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 border border-white/30 hover:border-primary-500 text-xs sm:text-sm btn-rounded bg-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 sm:py-3.5 md:py-4 px-4 sm:px-5 md:px-6 border-3 border-primary-500 bg-primary-500 text-white font-bold text-sm sm:text-base md:text-lg text-center hover:bg-primary-600 hover:border-primary-600 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 btn-rounded shadow-lg shadow-primary-500/30"
              >
                <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 sm:py-3.5 md:py-4 px-4 sm:px-5 md:px-6 border-3 border-white/50 font-bold text-sm sm:text-base md:text-lg text-center hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 btn-rounded"
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
