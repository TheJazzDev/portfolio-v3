'use client';

import { useEffect } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Testimonials } from '@/components/sections/testimonials';
import { Evolution } from '@/components/sections/evolution';
import { Skills } from '@/components/sections/skills';
import { Contact } from '@/components/sections/contact';
import { usePageView } from '@/lib/hooks/useAnalytics';

export default function Home() {
  usePageView('/');

  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Testimonials />
      <Evolution />
      <Skills />
      <Contact />
    </main>
  );
}
