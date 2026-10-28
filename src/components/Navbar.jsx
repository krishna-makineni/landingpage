import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export function Navbar({ onRegisterClick, variantName }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#070B14]/85 backdrop-blur-md border-b border-white/[0.06] py-2.5 shadow-lg shadow-black/40'
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5F56A] rounded-md"
            aria-label="AI Build Lab Home"
          >
            {/* Geometric AI Mark */}
            <div className="relative w-7 h-7 rounded-md bg-[#0D1523] border border-white/[0.1] flex items-center justify-center group-hover:border-[#C5F56A]/50 transition-colors">
              <svg className="w-4 h-4 text-[#C5F56A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <polygon points="12,2 22,8 22,18 12,24 2,18 2,8" />
                <circle cx="12" cy="13" r="2.5" fill="#4ADFFF" stroke="none" />
              </svg>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-display font-semibold tracking-tight text-sm text-[#F5F7FB]">
                AI BUILD LAB
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-wider text-[#A5B2C5]/70 border-l border-white/[0.08] pl-2">
                Student Series
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Linear & Stripe style minimal link bar) */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-[#A5B2C5]">
            <button
              onClick={() => scrollToSection('workshop')}
              className="hover:text-[#F5F7FB] transition-colors focus:outline-none focus-visible:text-[#C5F56A]"
            >
              Workshop
            </button>
            <button
              onClick={() => scrollToSection('learn')}
              className="hover:text-[#F5F7FB] transition-colors focus:outline-none focus-visible:text-[#C5F56A]"
            >
              What You'll Learn
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-[#F5F7FB] transition-colors focus:outline-none focus-visible:text-[#C5F56A]"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-[#F5F7FB] transition-colors focus:outline-none focus-visible:text-[#C5F56A]"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            {variantName && variantName !== 'default' && (
              <span className="hidden lg:inline-flex text-[10px] font-mono text-[#4ADFFF] bg-[#4ADFFF]/10 border border-[#4ADFFF]/20 px-2 py-0.5 rounded">
                variant:{variantName}
              </span>
            )}
            <button
              onClick={onRegisterClick}
              id="nav-register-btn"
              className="inline-flex items-center gap-1.5 bg-[#C5F56A] hover:bg-[#b5e955] text-[#070B14] font-semibold text-xs tracking-wide px-4 py-2 rounded-lg transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.3)] hover:shadow-[0_0_16px_rgba(197,245,106,0.3)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F56A]"
            >
              <span>Register Free</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onRegisterClick}
              className="bg-[#C5F56A] text-[#070B14] font-semibold text-xs px-3 py-1.5 rounded-md"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#A5B2C5] hover:text-[#F5F7FB] p-1.5 rounded-md border border-white/[0.08] bg-[#0D1523] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" strokeWidth={1.75} /> : <Menu className="w-4 h-4" strokeWidth={1.75} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pb-3 border-t border-white/[0.06] pt-3 space-y-1 bg-[#070B14] rounded-b-lg">
            <button
              onClick={() => scrollToSection('workshop')}
              className="block w-full text-left py-2 px-3 text-xs font-medium text-[#F5F7FB] hover:bg-[#0D1523] rounded-md transition-colors"
            >
              Workshop Overview
            </button>
            <button
              onClick={() => scrollToSection('learn')}
              className="block w-full text-left py-2 px-3 text-xs font-medium text-[#F5F7FB] hover:bg-[#0D1523] rounded-md transition-colors"
            >
              What You'll Learn
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left py-2 px-3 text-xs font-medium text-[#F5F7FB] hover:bg-[#0D1523] rounded-md transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left py-2 px-3 text-xs font-medium text-[#F5F7FB] hover:bg-[#0D1523] rounded-md transition-colors"
            >
              FAQ
            </button>
            <div className="pt-2 px-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRegisterClick();
                }}
                className="w-full flex items-center justify-center gap-1.5 bg-[#C5F56A] text-[#070B14] font-semibold text-xs py-2.5 rounded-lg shadow-sm"
              >
                <span>Register Free Now</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
