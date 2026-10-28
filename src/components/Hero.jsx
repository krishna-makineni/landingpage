import React from 'react';
import { ArrowRight, Clock, Code2, GraduationCap, ChevronDown } from 'lucide-react';
import { AiProjectMockup } from './AiProjectMockup';
import { getVariantContent } from '../lib/attribution';

export function Hero({ onRegisterClick, onExploreClick, variant = 'default' }) {
  const content = getVariantContent(variant);

  return (
    <section id="workshop" className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 overflow-hidden">
      
      {/* Refined subtle ambient light (Linear/Apple restrained glow) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-[#4ADFFF]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          
          {/* Left Column: Headlines & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badge & Tagline Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-[#0D1523] border border-white/[0.08] text-[#F5F7FB]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5F56A]" />
                {content.badge}
              </span>

              <span className="text-[11px] font-mono tracking-widest text-[#4ADFFF] uppercase font-medium">
                {content.tagline}
              </span>
            </div>

            {/* Main Headline (Space Grotesk, precise negative tracking) */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-bold tracking-tight text-[#F5F7FB] leading-[1.05]">
              {content.titleLine1}{' '}
              <span className="text-[#C5F56A] block sm:inline drop-shadow-[0_0_20px_rgba(197,245,106,0.25)]">
                {content.titleHighlight}
              </span>{' '}
              {content.titleLine2}
            </h1>

            {/* Supporting Headline & Copy */}
            <div className="space-y-2 max-w-xl">
              <p className="font-display text-xl sm:text-2xl font-semibold text-[#F5F7FB] tracking-tight">
                {content.subhead}
              </p>
              <p className="font-sans text-sm sm:text-base text-[#A5B2C5] leading-relaxed">
                {content.description}
              </p>
            </div>

            {/* Audience Banner Label */}
            <div className="pt-0.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0D1523] border border-white/[0.08] text-xs font-mono text-[#4ADFFF]">
                <GraduationCap className="w-3.5 h-3.5 text-[#C5F56A]" strokeWidth={1.75} />
                <span>FOR FINAL-YEAR ENGINEERING STUDENTS</span>
              </div>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onRegisterClick}
                id="hero-register-cta"
                className="group inline-flex items-center justify-center gap-2 bg-[#C5F56A] hover:bg-[#b5e955] text-[#070B14] font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-150 shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(197,245,106,0.35)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F56A]"
              >
                <span>REGISTER FREE</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" strokeWidth={2} />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[#A5B2C5] hover:text-[#F5F7FB] py-3 px-3.5 rounded-lg hover:bg-white/[0.03] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/[0.2]"
              >
                <span>Explore the workshop</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#4ADFFF]" strokeWidth={1.75} />
              </button>
            </div>

            {/* Verified Trust Bar (Conservative & Verified Only) */}
            <div className="pt-5 border-t border-white/[0.06]">
              <div className="grid grid-cols-3 gap-3 sm:gap-6 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#0D1523] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#C5F56A]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono font-bold text-[#F5F7FB] uppercase">60-MINUTE</span>
                    <span className="text-[10px] text-[#A5B2C5]/80">Focused session</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#0D1523] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <Code2 className="w-3.5 h-3.5 text-[#4ADFFF]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono font-bold text-[#F5F7FB] uppercase">HANDS-ON</span>
                    <span className="text-[10px] text-[#A5B2C5]/80">Practical learning</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#0D1523] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-3.5 h-3.5 text-[#C5F56A]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono font-bold text-[#F5F7FB] uppercase">FREE PASS</span>
                    <span className="text-[10px] text-[#A5B2C5]/80">Built for students</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Code Editor Mockup */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <AiProjectMockup />
          </div>

        </div>
      </div>
    </section>
  );
}
