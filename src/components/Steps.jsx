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
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#C5F56A] uppercase">
            SIMPLE 3-STEP JOURNEY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F7F9FC]">
            YOUR FIRST STEP STARTS HERE
          </h2>
          <p className="text-base text-[#A8B6C8]">
            No complex installations or prior setup required before the session.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-[#203254] via-[#50DFFF]/40 to-[#203254] -translate-y-8 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((s, index) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="bg-[#10172A] border border-[#203254] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#C5F56A]/60 transition-all duration-200 group"
                >
                  <div className="space-y-4">
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#17243D] border border-[#203254] flex items-center justify-center text-[#C5F56A] group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-3xl font-black text-[#50DFFF]/40 group-hover:text-[#50DFFF] transition-colors">
                        {s.step}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-2">
                      <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-[#C5F56A] bg-[#C5F56A]/10 px-2 py-0.5 rounded">
                        {s.highlight}
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {s.title}
                      </h3>
                      <p className="text-sm text-[#A8B6C8] leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#203254]/50 text-[11px] font-mono text-[#64748B] flex items-center justify-between">
                    <span>Step {index + 1} of 3</span>
                    <span className="text-[#50DFFF]">→ Next</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick CTA Prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onRegisterClick}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#C5F56A] hover:text-[#b6ea54] hover:underline transition-colors focus:outline-none"
          >
            <span>Take Step 1 now: Register free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
