import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqs = [
    {
      q: 'Is the workshop free?',
      a: 'Yes, this workshop is 100% free of charge. There are no registration fees, hidden charges, or payment requirements. Your registration gives you complete access to the 60-minute live session and reference resources.'
    },
    {
      q: 'Who should register?',
      a: 'The workshop is specifically designed for final-year engineering students preparing for capstones, technical interviews, and early career projects. However, any engineering student curious about hands-on AI project development is welcome to register.'
    },
    {
      q: 'Do I need prior AI experience?',
      a: 'The workshop begins with foundational concepts and demonstrates a step-by-step practical approach. Specific software prerequisites and recommended setup (if any) will be communicated by the organizer prior to the session.'
    },
    {
      q: 'How long is the workshop?',
      a: 'The workshop lasts exactly 60 minutes. It is structured into focused modules—Plan, Build, and Test—to provide maximum practical value without taking up excessive time.'
    },
    {
      q: 'How will I receive the joining details?',
      a: 'Verified joining instructions, including the virtual session link and schedule confirmation, will be communicated by the organizer to your registered email address before the event.'
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14 sm:mb-16">
          <span className="text-[11px] font-mono font-medium tracking-widest text-[#4ADFFF] uppercase">
            COMMON QUESTIONS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F7FB]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#A5B2C5]">
            Clear, verified answers to help you prepare for the workshop.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="bg-[#0D1523] border border-white/[0.08] hover:border-white/[0.16] rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#4ADFFF] transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-display font-semibold text-sm sm:text-base text-[#F5F7FB] pr-4">
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-md bg-[#111C2E] border border-white/[0.08] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#C5F56A]/10 border-[#C5F56A]/30' : ''}`}>
                    <ChevronDown className={`w-3.5 h-3.5 ${isOpen ? 'text-[#C5F56A]' : 'text-[#A5B2C5]'}`} strokeWidth={1.75} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-4 pb-5 sm:px-5 pt-1 text-xs sm:text-sm text-[#A5B2C5] leading-relaxed border-t border-white/[0.04] font-sans"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Note on Organizer Confirmation */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#627288] font-sans">
            Have an additional question? Event communications will be issued directly via your registered email.
          </p>
        </div>

      </div>
    </section>
  );
}
