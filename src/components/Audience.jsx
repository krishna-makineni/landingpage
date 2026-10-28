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
      color: '#50DFFF',
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
    <section className="py-20 bg-[#0B1322] border-t border-[#203254]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#50DFFF] uppercase">
            AUDIENCE & RELEVANCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F7F9FC]">
            BUILT FOR CURIOUS ENGINEERING STUDENTS
          </h2>
          <p className="text-base sm:text-lg text-[#A8B6C8] leading-relaxed">
            Interested in AI and looking for a practical place to start? This workshop is designed for final-year engineering students who want to explore AI project development.
          </p>
        </div>

        {/* 3 Cohort Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cohorts.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className="bg-[#10172A] border border-[#203254] rounded-xl p-6 flex flex-col justify-between hover:border-[#50DFFF]/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#17243D] border border-[#203254] flex items-center justify-center text-[#C5F56A]">
                      <Icon className="w-5 h-5" style={{ color: c.color }} />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-[#17243D] text-[#A8B6C8] border border-[#203254]">
                      {c.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                      <span>{c.label}</span>
                    </h3>
                    <p className="text-xs text-[#A8B6C8] leading-relaxed mt-2">
                      {c.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#203254]/40 flex items-center gap-1.5 text-xs text-[#C5F56A]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Workshop is open to this group</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inclusive Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#64748B]">
            While optimized for final-year engineering curriculums, all passionate engineering undergraduates are welcome to participate.
          </p>
        </div>

      </div>
    </section>
  );
}
