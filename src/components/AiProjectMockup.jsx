import React, { useState } from 'react';
import { Terminal, CheckCircle2, Play, Layers, Cpu, Sparkles, ChevronRight } from 'lucide-react';

export function AiProjectMockup() {
  const [activeStep, setActiveStep] = useState('build');

  const stepDetails = {
    plan: {
      title: '01. PLAN YOUR AI PROJECT',
      file: 'architecture.spec.json',
      content: `// Step 1: Map the Problem & Solution
{
  "project": "AI Resume & Portfolio Matcher",
  "target_user": "Engineering Final-Year Student",
  "input": "Project specs & code repositories",
  "ai_pipeline": "Contextual Semantic Analysis",
  "build_time_budget": "60 minutes"
}`,
      status: 'Specs Verified',
      statusColor: 'text-[#50DFFF]'
    },
    build: {
      title: '02. BUILD THE PIPELINE',
      file: 'build_pipeline.py',
      content: `import { BuildLabAI } from '@buildlab/core';

// 60-Minute Hands-On Scaffold
const pipeline = new BuildLabAI({
  model: 'curated-student-model',
  framework: 'fast-inference'
});

const project = await pipeline.initializeProject({
  scaffold: 'engineering-capstone',
  executionMode: 'hands-on-guided'
});`,
      status: 'Ready to Run',
      statusColor: 'text-[#C5F56A]'
    },
    test: {
      title: '03. TEST & DEMONSTRATE',
      file: 'test_output.log',
      content: `[AI BUILD LAB] Initializing runtime environment...
[SYS CHECK] Memory: OK | Latency: 18ms
[TEST RUN] Input: "Final Year IoT Capstone"
[ACCURACY] Metric matched: 98.4%
[SUCCESS] Your prototype is ready to demonstrate!`,
      status: 'All Tests Passed',
      statusColor: 'text-[#C5F56A]'
    }
  };

  const current = stepDetails[activeStep];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Decorative ambient boundary glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#50DFFF]/20 via-[#C5F56A]/15 to-[#50DFFF]/10 rounded-2xl blur-lg opacity-60 pointer-events-none" />

      {/* Main Container / Laptop IDE Shell */}
      <div className="relative bg-[#10172A] border border-[#203254] rounded-xl overflow-hidden shadow-2xl shadow-black/80 font-mono text-xs">
        
        {/* Window Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0B1322] border-b border-[#203254]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
            <span className="ml-2 text-[11px] text-[#A8B6C8] hidden sm:inline">
              ai-build-lab // student-workspace
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C5F56A] animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider text-[#C5F56A] font-semibold">
              Live Hands-On Demo
            </span>
          </div>
        </div>

        {/* 3 Step Navigation Pills (Plan, Build, Test) */}
        <div className="grid grid-cols-3 bg-[#0E1729] border-b border-[#203254] text-[11px]">
          <button
            onClick={() => setActiveStep('plan')}
            className={`py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors border-r border-[#203254] ${
              activeStep === 'plan'
                ? 'bg-[#17243D] text-[#50DFFF] font-bold border-b-2 border-b-[#50DFFF]'
                : 'text-[#A8B6C8] hover:text-white hover:bg-[#131E33]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>01 PLAN</span>
          </button>

          <button
            onClick={() => setActiveStep('build')}
            className={`py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors border-r border-[#203254] ${
              activeStep === 'build'
                ? 'bg-[#17243D] text-[#C5F56A] font-bold border-b-2 border-b-[#C5F56A]'
                : 'text-[#A8B6C8] hover:text-white hover:bg-[#131E33]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>02 BUILD</span>
          </button>

          <button
            onClick={() => setActiveStep('test')}
            className={`py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
              activeStep === 'test'
                ? 'bg-[#17243D] text-[#C5F56A] font-bold border-b-2 border-b-[#C5F56A]'
                : 'text-[#A8B6C8] hover:text-white hover:bg-[#131E33]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>03 TEST</span>
          </button>
        </div>

        {/* Editor Subheader with File & Step Name */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#131E33] text-[11px] border-b border-[#203254]/60">
          <span className="text-[#A8B6C8] font-sans flex items-center gap-1.5">
            <span className="text-white font-semibold">{current.title}</span>
            <ChevronRight className="w-3 h-3 text-[#A8B6C8]" />
            <code className="text-[#50DFFF]">{current.file}</code>
          </span>

          <span className={`text-[10px] font-bold uppercase tracking-wider ${current.statusColor}`}>
            ● {current.status}
          </span>
        </div>

        {/* Code Content Area */}
        <div className="p-4 bg-[#09101D] overflow-x-auto min-h-[160px] sm:min-h-[175px]">
          <pre className="text-[12px] leading-relaxed text-[#F7F9FC] font-mono">
            <code>{current.content}</code>
          </pre>
        </div>

        {/* Interactive Step Preview Footer */}
        <div className="px-4 py-3 bg-[#0E1729] border-t border-[#203254] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-[#A8B6C8] font-sans">
            <Terminal className="w-3.5 h-3.5 text-[#50DFFF]" />
            <span>Interactive Session: <strong className="text-white">60 Min Walkthrough</strong></span>
          </div>

          <div className="flex items-center gap-1">
            {['plan', 'build', 'test'].map((stepKey) => (
              <button
                key={stepKey}
                onClick={() => setActiveStep(stepKey)}
                aria-label={`View step ${stepKey}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeStep === stepKey ? 'w-5 bg-[#C5F56A]' : 'bg-[#203254] hover:bg-[#A8B6C8]'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Floating Accent Card: 60-Minute Benchmark */}
      <div className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-5 bg-[#17243D]/95 backdrop-blur-md border border-[#203254] p-3 rounded-xl shadow-xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#C5F56A]/15 border border-[#C5F56A]/40 flex items-center justify-center text-[#C5F56A]">
          <Play className="w-4 h-4 fill-[#C5F56A]" />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#A8B6C8]">Structured Roadmap</div>
          <div className="text-xs font-bold text-white font-sans">Zero to AI Project in 60m</div>
        </div>
      </div>

      {/* Floating Accent Card: Target Cohort */}
      <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 bg-[#111C30]/95 backdrop-blur-md border border-[#50DFFF]/30 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#50DFFF]" />
        <span className="text-[11px] font-semibold text-[#F7F9FC] font-sans">Student Focused</span>
      </div>
    </div>
  );
}
