import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FinalCTA({ onRegisterClick }) {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-[#07111F] to-[#0B1322] border-t border-[#203254]/80">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#C5F56A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest text-[#C5F56A] bg-[#C5F56A]/10 border border-[#C5F56A]/30 uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          YOUR 60-MINUTE AI TRANSFORMATION
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          STOP SCROLLING.{' '}
          <span className="text-[#C5F56A] drop-shadow-[0_0_20px_rgba(197,245,106,0.3)]">
            START BUILDING.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-[#A8B6C8] max-w-xl mx-auto leading-relaxed">
          Take the first step toward exploring AI project development.
        </p>

        <div className="pt-4">
          <button
            onClick={onRegisterClick}
            id="final-cta-btn"
            className="group inline-flex items-center justify-center gap-3 bg-[#C5F56A] hover:bg-[#b6ea54] text-[#07111F] font-extrabold text-base sm:text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-xl shadow-[#C5F56A]/25 hover:shadow-[#C5F56A]/40 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-[#C5F56A]/40"
          >
            <span>REGISTER FREE</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        <p className="text-xs text-[#64748B] pt-2">
          Takes under 30 seconds • 100% free • Limited cohort access
        </p>

      </div>
    </section>
  );
}
