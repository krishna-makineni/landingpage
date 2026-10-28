import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FinalCTA({ onRegisterClick }) {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#070B14] border-t border-white/[0.06]">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[240px] bg-gradient-to-b from-[#C5F56A]/[0.05] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
        
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider text-[#C5F56A] bg-[#C5F56A]/10 border border-[#C5F56A]/20 uppercase">
          <Sparkles className="w-3 h-3" />
          YOUR 60-MINUTE AI TRANSFORMATION
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FB] leading-tight">
          STOP SCROLLING.{' '}
          <span className="text-[#C5F56A] drop-shadow-[0_0_20px_rgba(197,245,106,0.25)]">
            START BUILDING.
          </span>
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#A5B2C5] max-w-lg mx-auto leading-relaxed">
          Take the first step toward exploring AI project development.
        </p>

        <div className="pt-2">
          <button
            onClick={onRegisterClick}
            id="final-cta-btn"
            className="group inline-flex items-center justify-center gap-2 bg-[#C5F56A] hover:bg-[#b5e955] text-[#070B14] font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-150 shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:shadow-[0_0_24px_rgba(197,245,106,0.35)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F56A]"
          >
            <span>REGISTER FREE</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" strokeWidth={2} />
          </button>
        </div>

        <p className="text-xs text-[#627288] pt-1 font-sans">
          Takes under 30 seconds • 100% free • Limited cohort access
        </p>

      </div>
    </section>
  );
}
