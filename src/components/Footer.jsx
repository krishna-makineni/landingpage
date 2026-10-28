import React from 'react';

export function Footer({ onRegisterClick }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050811] border-t border-white/[0.06] py-12 text-sm text-[#A5B2C5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#0D1523] border border-white/[0.1] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-[#C5F56A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <polygon points="12,2 22,8 22,18 12,24 2,18 2,8" />
                  <circle cx="12" cy="13" r="2.5" fill="#4ADFFF" />
                </svg>
              </div>
              <span className="font-display font-semibold text-[#F5F7FB] text-sm">
                AI BUILD LAB
              </span>
            </div>
            <p className="text-xs text-[#A5B2C5]/70 font-sans">
              Build Your First AI Project in 60 Minutes
            </p>
          </div>

          {/* Clean Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-7 text-xs font-medium">
            <button
              onClick={() => scrollTo('workshop')}
              className="hover:text-[#F5F7FB] transition-colors focus:outline-none"
            >
              Workshop
            </button>
            <button
              onClick={() => scrollTo('learn')}
              className="hover:text-[#F5F7FB] transition-colors focus:outline-none"
            >
              What You'll Learn
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="hover:text-[#F5F7FB] transition-colors focus:outline-none"
            >
              How It Works
            </button>
            <button
              onClick={onRegisterClick}
              className="hover:text-[#C5F56A] transition-colors focus:outline-none"
            >
              Registration
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="hover:text-[#F5F7FB] transition-colors focus:outline-none"
            >
              FAQ
            </button>
          </nav>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#627288] font-sans">
          <p>
            Workshop information is subject to confirmation by the organizer.
          </p>
          <p className="font-mono text-[11px]">
            AI Build Lab Student Initiative • All Rights Reserved
          </p>
        </div>

      </div>
    </footer>
  );
}
