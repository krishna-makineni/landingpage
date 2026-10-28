import React from 'react';

export function Footer({ onRegisterClick }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050D18] border-t border-[#203254] py-12 text-sm text-[#A8B6C8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[#203254]/60">
          
          {/* Brand Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#111C30] border border-[#203254] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#C5F56A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12,2 22,8 22,18 12,24 2,18 2,8" stroke="currentColor" />
                  <circle cx="12" cy="13" r="2.5" fill="#50DFFF" />
                </svg>
              </div>
              <span className="font-extrabold text-white font-mono tracking-wider">
                AI BUILD LAB
              </span>
            </div>
            <p className="text-xs text-[#A8B6C8]">
              Build Your First AI Project in 60 Minutes
            </p>
          </div>

          {/* Clean Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-medium">
            <button
              onClick={() => scrollTo('workshop')}
              className="hover:text-white transition-colors focus:outline-none"
            >
              Workshop
            </button>
            <button
              onClick={() => scrollTo('learn')}
              className="hover:text-white transition-colors focus:outline-none"
            >
              What You'll Learn
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="hover:text-white transition-colors focus:outline-none"
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
              className="hover:text-white transition-colors focus:outline-none"
            >
              FAQ
            </button>
          </nav>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
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
