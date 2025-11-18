'use client';

import { useRef, useState } from 'react';
import { Send, CheckCircle, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="sticky-header bg-[#0a0a0a]/95 backdrop-blur-sm pb-4 mb-4">
          <span className="text-primary-500 text-base md:text-lg font-semibold">&gt; GET IN TOUCH</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            LET&apos;S <span className="text-gradient">TALK</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <div className="space-y-5 md:space-y-6">
            <div>
              <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                Have a project in mind or want to collaborate? I&apos;m always interested in
                hearing about new opportunities and interesting projects.
              </p>
            </div>

            <div className="space-y-4 md:space-y-5">
              {[
                {
                  label: 'Email',
                  value: 'babsman4all@gmail.com',
                  href: 'mailto:taiwojazz@gmail.com',
                },
                {
                  label: 'GitHub',
                  value: '@TheJazzDev',
                  href: 'https://github.com/TheJazzDev',
                },
                {
                  label: 'LinkedIn',
                  value: 'Taiwo Babarinde',
                  href: 'https://linkedin.com/in/taiwo-babarinde',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border-l-4 border-primary-500 pl-4 md:pl-5 hover:border-primary-400 transition-colors"
                >
                  <div className="text-sm md:text-base text-gray-500 mb-0.5 md:mb-1">{item.label}</div>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-base md:text-lg font-bold hover:text-gradient transition-colors"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>

            <div className="bg-linear-to-br from-primary-500/10 to-electric-500/10 border-2 border-white/20 p-4 md:p-5 card-rounded">
              <div className="text-sm md:text-base text-primary-500 mb-2 font-semibold">
                &gt; AVAILABILITY STATUS
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-neon-500 rounded-full animate-pulse" />
                <span className="text-base md:text-lg font-bold">Available for new projects</span>
              </div>
            </div>
          </div>

          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm md:text-base text-gray-400 mb-1.5 md:mb-2">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  required
                  className="w-full bg-transparent border-2 border-white/30 focus:border-primary-500 px-3 md:px-4 py-3 md:py-3.5 outline-none transition-colors text-sm md:text-base input-rounded"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm md:text-base text-gray-400 mb-1.5 md:mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="from_email"
                  required
                  className="w-full bg-transparent border-2 border-white/30 focus:border-primary-500 px-3 md:px-4 py-3 md:py-3.5 outline-none transition-colors text-sm md:text-base input-rounded"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm md:text-base text-gray-400 mb-1.5 md:mb-2">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full bg-transparent border-2 border-white/30 focus:border-primary-500 px-3 md:px-4 py-3 md:py-3.5 outline-none transition-colors text-sm md:text-base input-rounded"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm md:text-base text-gray-400 mb-1.5 md:mb-2">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-transparent border-2 border-white/30 focus:border-primary-500 px-3 md:px-4 py-3 md:py-3.5 outline-none transition-colors text-sm md:text-base resize-none input-rounded"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 md:py-3.5 border-4 border-primary-500 bg-primary-500 text-white font-bold text-base md:text-lg hover:bg-transparent hover:text-primary-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-rounded"
              >
                {isSubmitting ? (
                  'SENDING...'
                ) : (
                  <>
                    SEND MESSAGE
                    <Send size={20} />
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 text-neon-500 text-sm md:text-base">
                  <CheckCircle size={18} />
                  Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-sm md:text-base">
                  <XCircle size={18} />
                  Failed to send message. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 pt-8 md:pt-10 lg:pt-12 border-t-2 border-white/10 text-center">
          <p className="text-xs md:text-sm text-gray-500">
            Built with Next.js • TypeScript • Tailwind CSS • Framer Motion
          </p>
          <p className="text-xs md:text-sm text-gray-500 mt-1.5 md:mt-2">
            © 2024 Taiwo Babarinde. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
