import React from 'react';
import { ArrowRight, Clock, Code, GraduationCap, ChevronDown, Sparkles } from 'lucide-react';
import { AiProjectMockup } from './AiProjectMockup';
import { getVariantContent } from '../lib/attribution';

export function Hero({ onRegisterClick, onExploreClick, variant = 'default' }) {
  const content = getVariantContent(variant);

  return (
    <section id="workshop" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background radial gradients for depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#50DFFF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-[#C5F56A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badge & Tagline Row */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-semibold tracking-wider uppercase bg-[#111C30] border border-[#203254] text-[#F7F9FC]">
                <span className="w-2 h-2 rounded-full bg-[#C5F56A]" />
                {content.badge}
              </span>

              <span className="text-xs font-mono tracking-widest text-[#50DFFF] uppercase font-semibold">
                {content.tagline}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F7F9FC] leading-[1.08]">
              {content.titleLine1}{' '}
              <span className="text-[#C5F56A] block sm:inline drop-shadow-[0_0_25px_rgba(197,245,106,0.3)]">
                {content.titleHighlight}
              </span>{' '}
              {content.titleLine2}
            </h1>

            {/* Supporting Headline & Copy */}
            <div className="space-y-2 max-w-xl">
              <p className="text-xl sm:text-2xl font-bold text-[#F7F9FC] tracking-tight">
                {content.subhead}
              </p>
              <p className="text-base sm:text-lg text-[#A8B6C8] leading-relaxed">
                {content.description}
              </p>
            </div>

            {/* Audience Banner Badge */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111C30] border border-[#203254]/80 text-xs sm:text-sm font-semibold tracking-wide text-[#50DFFF]">
                <GraduationCap className="w-4 h-4 text-[#C5F56A]" />
                <span>FOR FINAL-YEAR ENGINEERING STUDENTS</span>
              </div>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onRegisterClick}
                id="hero-register-cta"
                className="group relative inline-flex items-center justify-center gap-3 bg-[#C5F56A] hover:bg-[#b6ea54] text-[#07111F] font-extrabold text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#C5F56A]/20 hover:shadow-[#C5F56A]/35 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-[#C5F56A]/40"
              >
                <span>REGISTER FREE</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[#A8B6C8] hover:text-[#F7F9FC] py-3 px-4 rounded-lg hover:bg-[#111C30] transition-colors focus:outline-none focus:ring-2 focus:ring-[#50DFFF]"
              >
                <span>Explore the workshop</span>
                <ChevronDown className="w-4 h-4 text-[#50DFFF] animate-bounce" />
              </button>
            </div>

            {/* Compact Trust Bar (Verified Facts Only) */}
            <div className="pt-6 border-t border-[#203254]/60">
              <div className="grid grid-cols-3 gap-3 sm:gap-6 text-left">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#111C30] border border-[#203254] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#C5F56A]" />
                  </div>
                  <div>
                    <span className="block text-[11px] sm:text-xs font-mono font-bold text-white uppercase">60-MINUTE</span>
                    <span className="text-[10px] sm:text-[11px] text-[#A8B6C8]">Focused session</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#111C30] border border-[#203254] flex items-center justify-center shrink-0">
                    <Code className="w-4 h-4 text-[#50DFFF]" />
                  </div>
                  <div>
                    <span className="block text-[11px] sm:text-xs font-mono font-bold text-white uppercase">HANDS-ON</span>
                    <span className="text-[10px] sm:text-[11px] text-[#A8B6C8]">Practical learning</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#111C30] border border-[#203254] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4 text-[#C5F56A]" />
                  </div>
                  <div>
                    <span className="block text-[11px] sm:text-xs font-mono font-bold text-white uppercase">FREE PASS</span>
                    <span className="text-[10px] sm:text-[11px] text-[#A8B6C8]">Built for students</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive AI Project Mockup */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <AiProjectMockup />
          </div>

        </div>
      </div>
    </section>
  );
}
