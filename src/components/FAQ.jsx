import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

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
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#50DFFF] bg-[#50DFFF]/10 border border-[#50DFFF]/20">
            <HelpCircle className="w-3.5 h-3.5" />
            COMMON QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F7F9FC]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-base text-[#A8B6C8]">
            Clear, verified answers to help you prepare for the workshop.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="bg-[#10172A] border border-[#203254] rounded-xl overflow-hidden transition-colors hover:border-[#50DFFF]/40"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#50DFFF] transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-bold text-base sm:text-lg text-white pr-4">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-lg bg-[#17243D] border border-[#203254] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#C5F56A]/15 border-[#C5F56A]/40' : ''}`}>
                    <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-[#C5F56A]' : 'text-[#A8B6C8]'}`} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-5 pb-6 sm:px-6 pt-1 text-sm sm:text-base text-[#A8B6C8] leading-relaxed border-t border-[#203254]/40 animate-fadeIn"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Note on Organizer Confirmation */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#64748B]">
            Have an additional question? Event communications will be issued directly via your registered email.
          </p>
        </div>

      </div>
    </section>
  );
}
