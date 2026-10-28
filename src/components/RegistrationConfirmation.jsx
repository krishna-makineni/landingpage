import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, ArrowLeft, Mail, Building, GraduationCap, ShieldCheck, Tag } from 'lucide-react';

export function RegistrationConfirmation({ record, isDuplicate = false, onResetForm }) {
  const [copied, setCopied] = useState(false);

  const copyDetails = () => {
    const text = `AI BUILD LAB WORKSHOP PASS
Reference ID: ${record.id}
Attendee: ${record.fullName}
Email: ${record.normalizedEmail}
College: ${record.college}
Year: ${record.yearOfStudy}
Workshop: Build Your First AI Project in 60 Minutes
Status: Confirmed (Free Session)`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-[#0D1523] border border-white/[0.12] rounded-2xl p-6 sm:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_48px_-12px_rgba(0,0,0,0.7)] relative overflow-hidden animate-fadeIn">
      {/* Precision top highlight */}
      <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#C5F56A]/60 to-transparent" />

      {/* Top Status Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#C5F56A]/10 border border-[#C5F56A]/30 text-[#C5F56A] mb-1">
          <CheckCircle2 className="w-6 h-6" strokeWidth={1.75} />
        </div>

        <div className="block">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-[#111C2E] text-[#C5F56A] border border-[#C5F56A]/30">
            {isDuplicate ? 'EXISTING REGISTRATION FOUND' : 'REGISTRATION CONFIRMED'}
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F7FB] tracking-tight">
          {isDuplicate ? 'Welcome back! You are already registered.' : 'You are all set for the workshop!'}
        </h3>

        <p className="font-sans text-xs sm:text-sm text-[#A5B2C5] max-w-md mx-auto">
          {isDuplicate
            ? 'We found your existing registration in local storage with the verified email below.'
            : 'Your free seat has been reserved. Keep your reference ID handy for your records.'}
        </p>
      </div>

      {/* Workshop Digital Pass Card */}
      <div className="bg-[#080E18] border border-white/[0.08] rounded-xl p-5 sm:p-6 mb-6 font-mono text-xs">
        
        {/* Pass Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5F56A]" />
            <span className="font-display font-semibold text-[#F5F7FB] text-xs tracking-wider">
              AI BUILD LAB // STUDENT PASS
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#4ADFFF] bg-[#4ADFFF]/10 px-2 py-0.5 rounded border border-[#4ADFFF]/20">
            60-MIN SESSION
          </span>
        </div>

        {/* Reference ID Highlight */}
        <div className="py-3.5 my-3 bg-[#0D1523] rounded-lg px-4 border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-[#A5B2C5]/70 uppercase tracking-wider font-mono">Reference ID</div>
            <div className="font-display text-xl sm:text-2xl font-bold text-[#C5F56A] tracking-wider mt-0.5">
              {record.id}
            </div>
          </div>

          <button
            onClick={copyDetails}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#111C2E] hover:bg-white/[0.06] text-[#F5F7FB] text-xs font-sans transition-colors border border-white/[0.08]"
            aria-label="Copy reference ID and registration pass"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C5F56A]" strokeWidth={2} />
                <span className="text-[#C5F56A] font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#4ADFFF]" strokeWidth={1.75} />
                <span>Copy Pass</span>
              </>
            )}
          </button>
        </div>

        {/* Attendee Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-sans text-xs">
          <div className="flex items-center gap-2 text-[#A5B2C5]">
            <span className="text-[#A5B2C5]/70">Name:</span>
            <span className="text-[#F5F7FB] font-medium">{record.fullName}</span>
          </div>
          <div className="flex items-center gap-2 text-[#A5B2C5]">
            <Mail className="w-3.5 h-3.5 text-[#4ADFFF]" strokeWidth={1.75} />
            <span className="text-[#F5F7FB] truncate font-mono text-[11px]">{record.normalizedEmail}</span>
          </div>
          <div className="flex items-center gap-2 text-[#A5B2C5]">
            <Building className="w-3.5 h-3.5 text-[#4ADFFF]" strokeWidth={1.75} />
            <span className="truncate">{record.college}</span>
          </div>
          <div className="flex items-center gap-2 text-[#A5B2C5]">
            <GraduationCap className="w-3.5 h-3.5 text-[#C5F56A]" strokeWidth={1.75} />
            <span>{record.yearOfStudy}</span>
          </div>
          {record.referralCode && (
            <div className="flex items-center gap-2 text-[#A5B2C5] sm:col-span-2">
              <Tag className="w-3.5 h-3.5 text-[#C5F56A]" strokeWidth={1.75} />
              <span>Referral: <strong className="text-[#F5F7FB] font-mono">{record.referralCode}</strong></span>
            </div>
          )}
        </div>

        {/* Demo Mode Notice */}
        <div className="mt-3.5 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-[#627288]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4ADFFF]" strokeWidth={1.75} />
            <span>Tier: LocalStorage Demo Record</span>
          </div>
          <span>Registered: {new Date(record.registeredAt).toLocaleDateString()}</span>
        </div>

      </div>

      {/* Verified Event Notice */}
      <div className="bg-[#080E18] border border-white/[0.06] rounded-lg p-3.5 mb-6 text-xs text-[#A5B2C5] flex items-start gap-2.5">
        <Mail className="w-4 h-4 text-[#C5F56A] shrink-0 mt-0.5" strokeWidth={1.75} />
        <div className="font-sans leading-relaxed">
          <strong className="text-[#F5F7FB]">Next step:</strong> Verified session links and prerequisites will be communicated directly by the workshop organizer to <code className="text-[#4ADFFF] font-mono text-[11px]">{record.normalizedEmail}</code> prior to the event.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={copyDetails}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C5F56A] hover:bg-[#b5e955] text-[#070B14] font-semibold text-xs py-3 px-5 rounded-lg transition-colors shadow-sm"
        >
          {copied ? <Check className="w-3.5 h-3.5" strokeWidth={2} /> : <Copy className="w-3.5 h-3.5" strokeWidth={1.75} />}
          <span>{copied ? 'Pass Copied to Clipboard' : 'Copy Confirmation Details'}</span>
        </button>

        <button
          onClick={onResetForm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#111C2E] hover:bg-white/[0.06] text-[#F5F7FB] font-medium text-xs py-3 px-5 rounded-lg transition-colors border border-white/[0.08]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#A5B2C5]" strokeWidth={1.75} />
          <span>Register Another Student</span>
        </button>
      </div>

    </div>
  );
}
