'use client';

import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching testimonials:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-16 md:py-20 lg:py-24 px-6 lg:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <span className="text-primary-500 text-base md:text-lg font-semibold">&gt; CLIENT FEEDBACK</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
WHAT CLIENTS <span className="text-primary-500">SAY</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="group border-2 border-white/20 hover:border-primary-500/50 transition-all duration-300 bg-black card-rounded p-5 md:p-6 flex flex-col h-full">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-linear-to-br from-primary-500 to-electric-500 flex items-center justify-center card-rounded">
          <Quote className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-bold text-white truncate">
            {testimonial.name}
          </h3>
          <p className="text-xs md:text-sm text-gray-400 truncate">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>

      <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4 flex-1">
        &quot;{testimonial.message}&quot;
      </p>

      {/* <div className="pt-3 border-t border-white/10">
        <p className="text-xs md:text-sm text-primary-500 font-semibold">
          Project: {testimonial.project}
        </p>
      </div> */}
    </div>
  );
}
