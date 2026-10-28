import React from 'react';
import { GraduationCap, Brain, Hammer, CheckCircle2 } from 'lucide-react';

export function Audience() {
  const cohorts = [
    {
      label: 'Final-year students',
      badge: 'Target Cohort',
      icon: GraduationCap,
      color: '#C5F56A',
      desc: 'Looking for a fresh, distinctive technical foundation for capstone projects, seminar topics, or placement portfolios.'
    },
    {
      label: 'AI-curious learners',
      badge: 'Exploration',
      icon: Brain,
      color: '#4ADFFF',
      desc: 'Enthusiastic about generative AI, LLMs, and computer vision, wanting to move beyond chat prompts to building software.'
    },
    {
      label: 'Aspiring project builders',
      badge: 'Practical Focus',
      icon: Hammer,
      color: '#C5F56A',
      desc: 'Eager to learn how modern developers integrate pre-trained models, REST endpoints, and UI layers into real projects.'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#090F1A] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14 sm:mb-16">
          <span className="text-[11px] font-mono font-medium tracking-widest text-[#4ADFFF] uppercase">
            AUDIENCE & RELEVANCE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F7FB]">
            BUILT FOR CURIOUS ENGINEERING STUDENTS
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#A5B2C5] leading-relaxed">
            Interested in AI and looking for a practical place to start? This workshop is designed for final-year engineering students who want to explore AI project development.
          </p>
        </div>

        {/* 3 Cohort Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {cohorts.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className="bg-[#0D1523] border border-white/[0.08] hover:border-white/[0.18] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#111C2E] border border-white/[0.08] flex items-center justify-center text-[#C5F56A]">
                      <Icon className="w-5 h-5" style={{ color: c.color }} strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#111C2E] text-[#A5B2C5] border border-white/[0.06]">
                      {c.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#F5F7FB] tracking-tight">
                      {c.label}
                    </h3>
                    <p className="text-xs text-[#A5B2C5] leading-relaxed mt-2 font-sans">
                      {c.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-white/[0.05] flex items-center gap-1.5 text-xs text-[#C5F56A] font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                  <span>Workshop is open to this group</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inclusive Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#627288] font-sans">
            While optimized for final-year engineering curriculums, all passionate engineering undergraduates are welcome to participate.
          </p>
        </div>

      </div>
    </section>
  );
}
