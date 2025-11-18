'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      >
        <div className="flex flex-col gap-8 relative">
          {/* Connecting line */}
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-white/20" />

          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="group relative"
            >
              {/* Indicator dot */}
              <div className="relative z-10">
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border-2 border-white transition-all duration-300',
                    activeSection === item.href.slice(1)
                      ? 'bg-primary-500 scale-150 shadow-lg shadow-primary-500/50'
                      : 'bg-black group-hover:bg-primary-500/50 group-hover:scale-125'
                  )}
                />
                {/* Animated pulse for active section */}
                {activeSection === item.href.slice(1) && (
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary-500 animate-ping opacity-75" />
                )}
              </div>

              {/* Label */}
              <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </motion.nav>

      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 lg:hidden"
      >
        <div className="flex justify-between items-center p-6 bg-black/80 backdrop-blur-lg border-b-2 border-white/10">
          <span className="font-mono text-lg font-bold">TB</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 border-2 border-white flex items-center justify-center btn-rounded"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    'text-4xl font-bold transition-colors duration-300',
                    activeSection === item.href.slice(1)
                      ? 'text-gradient'
                      : 'text-white hover:text-primary-500'
                  )}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-8 right-8 z-50 hidden lg:flex flex-col gap-4"
      >
        <a
          href="https://github.com/TheJazzDev"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group btn-rounded"
        >
          <Github size={20} className="group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="https://linkedin.com/in/taiwobabarinde"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group btn-rounded"
        >
          <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="mailto:babsman4all@gmail.com"
          className="w-12 h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group btn-rounded"
        >
          <Mail size={20} className="group-hover:scale-110 transition-transform" />
        </a>
      </motion.div>
    </>
  );
}
