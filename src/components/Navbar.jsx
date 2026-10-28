import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';

export function Navbar({ onRegisterClick, variantName }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07111F]/90 backdrop-blur-md border-b border-[#203254] py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C5F56A] rounded-lg p-1"
            aria-label="AI Build Lab Home"
          >
            {/* Geometric AI Mark */}
            <div className="relative w-9 h-9 rounded-lg bg-[#111C30] border border-[#203254] flex items-center justify-center group-hover:border-[#C5F56A] transition-colors">
              <svg className="w-5 h-5 text-[#C5F56A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12,2 22,8 22,18 12,24 2,18 2,8" stroke="currentColor" />
                <circle cx="12" cy="13" r="2.5" fill="#50DFFF" stroke="none" />
              </svg>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#50DFFF] animate-ping" />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold tracking-wider text-base sm:text-lg text-white font-mono flex items-center gap-1.5">
                AI BUILD LAB
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#A8B6C8] font-mono">
                Student Workshop Series
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A8B6C8]">
            <button
              onClick={() => scrollToSection('workshop')}
              className="hover:text-white transition-colors focus:outline-none focus:text-[#C5F56A]"
            >
              Workshop
            </button>
            <button
              onClick={() => scrollToSection('learn')}
              className="hover:text-white transition-colors focus:outline-none focus:text-[#C5F56A]"
            >
              What You'll Learn
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-white transition-colors focus:outline-none focus:text-[#C5F56A]"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            {variantName && variantName !== 'default' && (
              <span className="hidden lg:inline-flex text-[11px] font-mono text-[#50DFFF] bg-[#50DFFF]/10 border border-[#50DFFF]/30 px-2 py-0.5 rounded">
                variant:{variantName}
              </span>
            )}
            <button
              onClick={onRegisterClick}
              id="nav-register-btn"
              className="inline-flex items-center gap-2 bg-[#C5F56A] hover:bg-[#b6ea54] text-[#07111F] font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-md shadow-[#C5F56A]/10 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C5F56A] focus:ring-offset-[#07111F]"
            >
              <span>Register Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onRegisterClick}
              className="bg-[#C5F56A] text-[#07111F] font-bold text-xs px-3 py-2 rounded-md"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#A8B6C8] hover:text-white p-2 rounded-lg border border-[#203254] bg-[#111C30] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pb-4 border-t border-[#203254] pt-4 space-y-3 bg-[#07111F] rounded-b-xl animate-fadeIn">
            <button
              onClick={() => scrollToSection('workshop')}
              className="block w-full text-left py-2 px-3 text-sm text-[#F7F9FC] hover:bg-[#111C30] rounded-md"
            >
              Workshop Overview
            </button>
            <button
              onClick={() => scrollToSection('learn')}
              className="block w-full text-left py-2 px-3 text-sm text-[#F7F9FC] hover:bg-[#111C30] rounded-md"
            >
              What You'll Learn
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left py-2 px-3 text-sm text-[#F7F9FC] hover:bg-[#111C30] rounded-md"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left py-2 px-3 text-sm text-[#F7F9FC] hover:bg-[#111C30] rounded-md"
            >
              Frequently Asked Questions
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRegisterClick();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#C5F56A] text-[#07111F] font-bold text-sm py-3 rounded-lg shadow"
              >
                <span>Register Free Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
