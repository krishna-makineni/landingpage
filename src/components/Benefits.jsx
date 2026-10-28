import React from 'react';
import { Terminal, Workflow, Compass } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      num: '01',
      title: 'Learn by doing',
      desc: 'Understand a practical approach to building an AI project.',
      detail: 'Step away from passive video lectures. We examine actual code snippets, libraries, and prompt workflows that turn logic into functional prototypes.',
      icon: Terminal,
      color: '#C5F56A',
      tag: 'Hands-on practice'
    },
    {
      num: '02',
      title: 'See the process',
      desc: 'Explore the journey from an initial idea to a working project.',
      detail: 'Follow a transparent architectural breakdown from selecting your engineering problem, formatting data, testing inferences, and organizing your capstone structure.',
      icon: Workflow,
      color: '#4ADFFF',
      tag: 'Architecture breakdown'
    },
    {
      num: '03',
      title: 'Start with curiosity',
      desc: 'Take your first step toward experimenting with AI tools.',
      detail: 'No deep mathematical prerequisites needed to begin. Learn how modern AI APIs, developer SDKs, and local models can be integrated into student projects today.',
      icon: Compass,
      color: '#C5F56A',
      tag: 'Zero barrier entry'
    }
  ];

  return (
    <section id="learn" className="py-20 sm:py-28 bg-[#090F1A] border-y border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 sm:mb-16">
          <span className="text-[11px] font-mono font-medium tracking-widest text-[#4ADFFF] uppercase">
            WHAT YOU'LL EXPLORE
          </span>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F7FB]">
            ONE HOUR. A PRACTICAL START WITH AI.
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#A5B2C5] leading-relaxed">
            Explore the process of turning an idea into an AI project in a focused, beginner-friendly session.
          </p>
        </div>

        {/* 3 Responsive Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.num}
                className="group relative bg-[#0D1523] border border-white/[0.08] hover:border-white/[0.18] rounded-xl p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_24px_-8px_rgba(0,0,0,0.5)] flex flex-col justify-between"
              >
                {/* Top Number & Tag */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-[#4ADFFF]">
                      {b.num}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111C2E] text-[#A5B2C5] border border-white/[0.06]">
                      {b.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[#111C2E] border border-white/[0.08] flex items-center justify-center text-[#C5F56A]">
                    <Icon className="w-5 h-5" style={{ color: b.color }} strokeWidth={1.75} />
                  </div>

                  {/* Title & Core Copy */}
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-bold text-[#F5F7FB] tracking-tight">
                      {b.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#C5F56A] leading-snug">
                      {b.desc}
                    </p>
                    <p className="text-xs text-[#A5B2C5] leading-relaxed pt-1">
                      {b.detail}
                    </p>
                  </div>
                </div>

                {/* Bottom Visual Accent */}
                <div className="pt-5 mt-6 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-[#A5B2C5]/70 font-mono">
                  <span>Module {b.num}</span>
                  <span className="text-[#4ADFFF]">60-min scope</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Footnote / Clarification */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#627288] max-w-xl mx-auto font-sans">
            Note: This session provides a practical architectural walkthrough and live code demonstration. Attendees follow along live and receive all reference code to continue building.
          </p>
        </div>

      </div>
    </section>
  );
}
