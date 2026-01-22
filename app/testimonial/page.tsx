'use client';

import { useState } from 'react';
import { Send, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TestimonialPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    email: '',
    project: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          role: '',
          company: '',
          email: '',
          project: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-12 md:py-16 lg:py-20 px-6 lg:px-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm md:text-base text-gray-400 hover:text-primary-500 transition-colors mb-6 md:mb-8"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          Back to Portfolio
        </Link>

        <div className="mb-8 md:mb-10">
          <span className="text-primary-500 text-base md:text-lg font-semibold">
            &gt; SHARE YOUR FEEDBACK
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-3 md:mb-4">
            SUBMIT A <span className="text-primary-500">TESTIMONIAL</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            I&apos;d love to hear about your experience working with me. Your testimonial
            will be reviewed and may be featured on my portfolio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm md:text-base text-gray-400 mb-1.5 md:mb-2"
              >
                FULL NAME <span className="text-primary-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-2 border-white/30 focus:border-primary-500 px-3 md:px-4 py-3 md:py-3.5 outline-none transition-colors text-sm md:text-base input-rounded"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm md:text-base text-gray-400 mb-1.5 md:mb-2"
              >
                EMAIL (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-2 border-white/30 focus:border-primary-500 px-3 md:px-4 py-3 md:py-3.5 outline-none transition-colors text-sm md:text-base input-rounded"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <label
                htmlFor="role"
                className="block text-sm md:text-base text-gray-400 mb-1.5 md:mb-2"
              >
                YOUR ROLE/POSITION <span className="text-primary-500">*</span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-transparent border-2 border-white/30 focus:border-primary-500 px-3 md:px-4 py-3 md:py-3.5 outline-none transition-colors text-sm md:text-base input-rounded"
                placeholder="CEO, Product Manager, etc."
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm md:text-base text-gray-400 mb-1.5 md:mb-2"
              >
                COMPANY/ORGANIZATION <span className="text-primary-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-transparent border-2 border-white/30 focus:border-primary-500 px-3 md:px-4 py-3 md:py-3.5 outline-none transition-colors text-sm md:text-base input-rounded"
                placeholder="Company Name"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="project"
              className="block text-sm md:text-base text-gray-400 mb-1.5 md:mb-2"
            >
              PROJECT YOU WORKED ON WITH ME <span className="text-primary-500">*</span>
            </label>
            <input
              type="text"
              id="project"
              name="project"
              required
              value={formData.project}
              onChange={handleChange}
              className="w-full bg-transparent border-2 border-white/30 focus:border-primary-500 px-3 md:px-4 py-3 md:py-3.5 outline-none transition-colors text-sm md:text-base input-rounded"
              placeholder="E-commerce Website, Mobile App, etc."
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm md:text-base text-gray-400 mb-1.5 md:mb-2"
            >
              YOUR TESTIMONIAL <span className="text-primary-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent border-2 border-white/30 focus:border-primary-500 px-3 md:px-4 py-3 md:py-3.5 outline-none transition-colors text-sm md:text-base resize-none input-rounded"
              placeholder="Share your experience working with me, the results achieved, and what stood out to you..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 md:py-3.5 border-4 border-primary-500 bg-primary-500 text-white font-bold text-base md:text-lg hover:bg-transparent hover:text-primary-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-rounded"
          >
            {isSubmitting ? (
              'SUBMITTING...'
            ) : (
              <>
                SUBMIT TESTIMONIAL
                <Send className="w-5 h-5" />
              </>
            )}
          </button>

          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 text-neon-500 text-sm md:text-base p-3 md:p-4 bg-neon-500/10 border border-neon-500/30 card-rounded">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>
                Thank you for your testimonial! It has been submitted for review and
                will be visible on the portfolio once approved.
              </span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-500 text-sm md:text-base p-3 md:p-4 bg-red-500/10 border border-red-500/30 card-rounded">
              <XCircle className="w-5 h-5 shrink-0" />
              <span>
                Failed to submit testimonial. Please try again or contact me directly.
              </span>
            </div>
          )}
        </form>

        <div className="mt-8 md:mt-10 p-4 md:p-5 bg-white/5 border border-white/20 card-rounded">
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
            <span className="text-primary-500 font-semibold">Note:</span> All
            testimonials are reviewed before being published. I reserve the right to
            edit testimonials for length and clarity while maintaining the original
            meaning. By submitting this form, you consent to your testimonial being
            displayed publicly on this portfolio.
          </p>
        </div>
      </div>
    </main>
  );
}
