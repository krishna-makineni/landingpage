import React, { useState } from 'react';
import { Terminal, Check, Layers, Cpu, CheckCircle2, ChevronRight, Play } from 'lucide-react';

export function AiProjectMockup() {
  const [activeStep, setActiveStep] = useState('build');

  const stepDetails = {
    plan: {
      file: 'project.spec.ts',
      status: 'Specs Verified',
      statusColor: 'text-[#4ADFFF]',
      lines: [
        { type: 'comment', text: '// Step 1: Define Student Engineering Capstone' },
        { type: 'code', tokens: [{ k: 'export const', c: 'code-keyword' }, { k: ' workshopConfig', c: 'text-white' }, { k: ' = {', c: 'text-[#A5B2C5]' }] },
        { type: 'code', indent: 2, tokens: [{ k: 'project: ', c: 'text-[#A5B2C5]' }, { k: '"Smart AI Project Assistant"', c: 'code-string' }, { k: ',', c: 'text-[#A5B2C5]' }] },
        { type: 'code', indent: 2, tokens: [{ k: 'targetCohort: ', c: 'text-[#A5B2C5]' }, { k: '"Final-Year Engineers"', c: 'code-string' }, { k: ',', c: 'text-[#A5B2C5]' }] },
        { type: 'code', indent: 2, tokens: [{ k: 'pipeline: ', c: 'text-[#A5B2C5]' }, { k: '"Contextual Semantic Analysis"', c: 'code-string' }, { k: ',', c: 'text-[#A5B2C5]' }] },
        { type: 'code', indent: 2, tokens: [{ k: 'sessionBudget: ', c: 'text-[#A5B2C5]' }, { k: '"60 minutes"', c: 'code-function font-semibold' }] },
        { type: 'code', tokens: [{ k: '};', c: 'text-[#A5B2C5]' }] }
      ]
    },
    build: {
      file: 'pipeline.ts',
      status: 'Ready to Run',
      statusColor: 'text-[#C5F56A]',
      lines: [
        { type: 'comment', text: '// Step 2: Assemble Hands-On Inference Pipeline' },
        { type: 'code', tokens: [{ k: 'import', c: 'code-keyword' }, { k: ' { BuildLabAI } ', c: 'text-white' }, { k: 'from', c: 'code-keyword' }, { k: " '@buildlab/core'", c: 'code-string' }, { k: ';', c: 'text-[#A5B2C5]' }] },
        { type: 'code', tokens: [] },
        { type: 'code', tokens: [{ k: 'const', c: 'code-keyword' }, { k: ' app', c: 'text-white' }, { k: ' = ', c: 'text-[#A5B2C5]' }, { k: 'new', c: 'code-keyword' }, { k: ' BuildLabAI', c: 'code-function' }, { k: '({', c: 'text-[#A5B2C5]' }] },
        { type: 'code', indent: 2, tokens: [{ k: 'model: ', c: 'text-[#A5B2C5]' }, { k: "'student-accelerator-v1'", c: 'code-string' }, { k: ',', c: 'text-[#A5B2C5]' }] },
        { type: 'code', indent: 2, tokens: [{ k: 'latencyBudgetMs: ', c: 'text-[#A5B2C5]' }, { k: '50', c: 'code-keyword' }] },
        { type: 'code', tokens: [{ k: '});', c: 'text-[#A5B2C5]' }] },
        { type: 'code', tokens: [] },
        { type: 'code', tokens: [{ k: 'await', c: 'code-keyword' }, { k: ' app.', c: 'text-white' }, { k: 'deployPrototype', c: 'code-function' }, { k: '({ port: ', c: 'text-[#A5B2C5]' }, { k: '8080', c: 'code-keyword' }, { k: ' });', c: 'text-[#A5B2C5]' }] }
      ]
    },
    test: {
      file: 'eval_results.log',
      status: 'Tests Passed',
      statusColor: 'text-[#C5F56A]',
      lines: [
        { type: 'comment', text: '// Step 3: Verify Output & Live Metrics' },
        { type: 'code', tokens: [{ k: '[AI BUILD LAB]', c: 'code-keyword font-semibold' }, { k: ' Initializing virtual runtime...', c: 'text-[#A5B2C5]' }] },
        { type: 'code', tokens: [{ k: '[PIPELINE]', c: 'text-[#A5B2C5]' }, { k: ' Memory: 142MB | Latency: 18ms', c: 'text-[#F5F7FB]' }] },
        { type: 'code', tokens: [{ k: '[INFERENCE]', c: 'text-[#A5B2C5]' }, { k: ' Validation Accuracy: ', c: 'text-[#A5B2C5]' }, { k: '98.4%', c: 'code-function font-semibold' }] },
        { type: 'code', tokens: [{ k: '[SUCCESS]', c: 'code-function font-semibold' }, { k: ' Prototype running on http://localhost:8080', c: 'text-[#F5F7FB]' }] }
      ]
    }
  };

  const current = stepDetails[activeStep];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      
      {/* Precision Editor Shell (Linear & Stripe aesthetic) */}
      <div className="relative bg-[#0D1523] border border-white/[0.08] rounded-xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_48px_-12px_rgba(0,0,0,0.7)] text-xs font-mono">
        
        {/* Editor Window Header */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#090F1A] border-b border-white/[0.06]">
          {/* Traffic lights with refined, muted tones */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.12] border border-white/[0.06]" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.12] border border-white/[0.06]" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.12] border border-white/[0.06]" />
            <span className="ml-2 text-[11px] text-[#A5B2C5]/70 hidden sm:inline font-sans">
              ai-build-lab <span className="text-white/[0.2]">/</span> {current.file}
            </span>
          </div>

          {/* Clean live session pill */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#111C2E] border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5F56A]" />
            <span className="text-[10px] text-[#A5B2C5] font-sans">
              Live Walkthrough
            </span>
          </div>
        </div>

        {/* Step Selector Tabs (Plan, Build, Test) */}
        <div className="grid grid-cols-3 bg-[#0B121E] border-b border-white/[0.06] text-[11px]">
          <button
            type="button"
            onClick={() => setActiveStep('plan')}
            className={`py-2 px-3 flex items-center justify-center gap-1.5 transition-all border-r border-white/[0.06] ${
              activeStep === 'plan'
                ? 'bg-[#0D1523] text-[#4ADFFF] font-semibold border-b border-b-[#4ADFFF]'
                : 'text-[#A5B2C5]/70 hover:text-[#F5F7FB] hover:bg-white/[0.02]'
            }`}
          >
            <Layers className="w-3 h-3" strokeWidth={1.75} />
            <span>01 PLAN</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStep('build')}
            className={`py-2 px-3 flex items-center justify-center gap-1.5 transition-all border-r border-white/[0.06] ${
              activeStep === 'build'
                ? 'bg-[#0D1523] text-[#C5F56A] font-semibold border-b border-b-[#C5F56A]'
                : 'text-[#A5B2C5]/70 hover:text-[#F5F7FB] hover:bg-white/[0.02]'
            }`}
          >
            <Cpu className="w-3 h-3" strokeWidth={1.75} />
            <span>02 BUILD</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStep('test')}
            className={`py-2 px-3 flex items-center justify-center gap-1.5 transition-all ${
              activeStep === 'test'
                ? 'bg-[#0D1523] text-[#C5F56A] font-semibold border-b border-b-[#C5F56A]'
                : 'text-[#A5B2C5]/70 hover:text-[#F5F7FB] hover:bg-white/[0.02]'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" strokeWidth={1.75} />
            <span>03 TEST</span>
          </button>
        </div>

        {/* Sub-header status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#0A101C] text-[10px] text-[#A5B2C5] border-b border-white/[0.04]">
          <span className="font-mono flex items-center gap-1 text-[#A5B2C5]/80">
            <span>module:</span>
            <code className="text-[#F5F7FB]">{current.file}</code>
          </span>
          <span className={`font-mono font-medium ${current.statusColor}`}>
            ● {current.status}
          </span>
        </div>

        {/* Code Content Area with Line Numbers */}
        <div className="p-4 bg-[#080E18] overflow-x-auto min-h-[190px]">
          <div className="space-y-1 text-[12px] leading-relaxed">
            {current.lines.map((line, idx) => (
              <div key={idx} className="flex items-start">
                <span className="w-6 text-[10px] text-white/[0.2] select-none text-right pr-3 font-mono shrink-0">
                  {idx + 1}
                </span>
                <div
                  className="font-mono whitespace-pre"
                  style={{ paddingLeft: line.indent ? `${line.indent * 12}px` : 0 }}
                >
                  {line.type === 'comment' ? (
                    <span className="code-comment">{line.text}</span>
                  ) : line.tokens && line.tokens.length > 0 ? (
                    line.tokens.map((token, tIdx) => (
                      <span key={tIdx} className={token.c}>
                        {token.k}
                      </span>
                    ))
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Status Row (Integrated without clunky floating elements) */}
        <div className="px-3.5 py-2.5 bg-[#090F1A] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#A5B2C5]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#4ADFFF]" strokeWidth={1.75} />
            <span className="font-sans text-[11px]">
              Session scope: <span className="text-[#F5F7FB] font-medium">Hands-On Code Walkthrough</span>
            </span>
          </div>

          <span className="text-[10px] font-mono text-[#C5F56A] bg-[#C5F56A]/10 px-2 py-0.5 rounded border border-[#C5F56A]/20">
            60-min project
          </span>
        </div>

      </div>

      {/* Subtle indicator bar */}
      <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-[#A5B2C5]/70 font-sans">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADFFF]" />
          Click tabs above to preview session steps
        </span>
        <span className="font-mono text-[10px]">Step {activeStep === 'plan' ? '1' : activeStep === 'build' ? '2' : '3'} of 3</span>
      </div>

    </div>
  );
}
