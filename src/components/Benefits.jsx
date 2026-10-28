import React from 'react';
import { Terminal, Workflow, Compass, Sparkles, ArrowRight } from 'lucide-react';

export function Benefits({ onRegisterClick }) {
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
      color: '#50DFFF',
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
    <section id="learn" className="py-20 sm:py-28 bg-[#0B1322] border-y border-[#203254]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider text-[#50DFFF] bg-[#50DFFF]/10 border border-[#50DFFF]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#50DFFF]" />
            WHAT YOU'LL EXPLORE
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F7F9FC]">
            ONE HOUR. A PRACTICAL START WITH AI.
          </h2>

          <p className="text-base sm:text-lg text-[#A8B6C8] leading-relaxed">
            Explore the process of turning an idea into an AI project in a focused, beginner-friendly session.
          </p>
        </div>

        {/* 3 Responsive Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.num}
                className="group relative bg-[#10172A] border border-[#203254] hover:border-[#50DFFF]/50 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 flex flex-col justify-between"
              >
                {/* Top Number & Tag */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-[#50DFFF]">
                      {b.num}
                    </span>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-[#17243D] text-[#A8B6C8] border border-[#203254]">
                      {b.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#17243D] border border-[#203254] flex items-center justify-center text-[#C5F56A] group-hover:bg-[#C5F56A]/10 group-hover:border-[#C5F56A]/40 transition-colors">
                    <Icon className="w-6 h-6" style={{ color: b.color }} />
                  </div>

                  {/* Title & Core Copy */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#F7F9FC] tracking-tight group-hover:text-white">
                      {b.title}
                    </h3>
                    <p className="text-sm font-medium text-[#C5F56A] leading-snug">
                      {b.desc}
                    </p>
                    <p className="text-xs text-[#A8B6C8] leading-relaxed pt-1">
                      {b.detail}
                    </p>
                  </div>
                </div>

                {/* Bottom Visual Accent */}
                <div className="pt-6 mt-6 border-t border-[#203254]/40 flex items-center justify-between text-xs text-[#A8B6C8]">
                  <span>60-min interactive module</span>
                  <span className="font-mono text-[#50DFFF]">0{b.num.slice(1)}/03</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Footnote / Clarification */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#64748B] max-w-xl mx-auto">
            Note: This session provides a practical architectural walkthrough and live code demonstration. Attendees follow along live and receive all reference code to continue building.
          </p>
        </div>

      </div>
    </section>
  );
}
