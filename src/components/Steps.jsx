import React from 'react';
import { UserCheck, Video, Rocket, ArrowRight } from 'lucide-react';

export function Steps({ onRegisterClick }) {
  const steps = [
    {
      step: '01',
      title: 'Register for free.',
      description: 'Fill in your name, college, and study year. Takes less than 30 seconds with immediate confirmation.',
      icon: UserCheck,
      highlight: '30-second signup'
    },
    {
      step: '02',
      title: 'Join the online workshop.',
      description: 'Access the live virtual classroom using the official link provided by the organizer via email.',
      icon: Video,
      highlight: 'Direct email access'
    },
    {
      step: '03',
      title: 'Explore building an AI project.',
      description: 'Follow the 60-minute hands-on breakdown, review practical code scaffolds, and kickstart your own build.',
      icon: Rocket,
      highlight: 'Live demonstration'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 sm:mb-16">
          <span className="text-[11px] font-mono font-medium tracking-widest text-[#C5F56A] uppercase">
            SIMPLE 3-STEP JOURNEY
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F7FB]">
            YOUR FIRST STEP STARTS HERE
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#A5B2C5]">
            No complex installations or prior setup required before the session.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-16 right-16 h-px border-t border-dashed border-white/[0.1] -translate-y-8 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative z-10">
            {steps.map((s, index) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="bg-[#0D1523] border border-white/[0.08] hover:border-white/[0.18] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_24px_-8px_rgba(0,0,0,0.5)] group"
                >
                  <div className="space-y-4">
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-[#111C2E] border border-white/[0.08] flex items-center justify-center text-[#C5F56A]">
                        <Icon className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <span className="font-display text-2xl font-bold text-[#A5B2C5]/30 group-hover:text-[#4ADFFF] transition-colors">
                        {s.step}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-1.5">
                      <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-[#C5F56A] bg-[#C5F56A]/10 border border-[#C5F56A]/20 px-2 py-0.5 rounded">
                        {s.highlight}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#F5F7FB] tracking-tight">
                        {s.title}
                      </h3>
                      <p className="text-xs text-[#A5B2C5] leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/[0.05] text-[11px] font-mono text-[#627288] flex items-center justify-between">
                    <span>Step {index + 1} of 3</span>
                    <span className="text-[#4ADFFF]">Verified Flow</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick CTA Prompt */}
        <div className="mt-10 text-center">
          <button
            onClick={onRegisterClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5F56A] hover:text-[#b5e955] transition-colors focus:outline-none"
          >
            <span>Take Step 1 now: Register free</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>

      </div>
    </section>
  );
}
