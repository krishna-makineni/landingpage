import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, ArrowLeft, Calendar, Mail, Building, GraduationCap, ShieldCheck, Tag } from 'lucide-react';

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
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="bg-[#10172A] border-2 border-[#C5F56A] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden animate-fadeIn">
      {/* Background soft glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5F56A]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Status Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C5F56A]/20 border-2 border-[#C5F56A] text-[#C5F56A] mb-2 animate-soft-pulse">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#17243D] text-[#C5F56A] border border-[#C5F56A]/40">
          {isDuplicate ? 'EXISTING REGISTRATION FOUND' : 'REGISTRATION CONFIRMED'}
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isDuplicate ? 'Welcome back! You are already registered.' : 'You are all set for the workshop!'}
        </h3>

        <p className="text-sm text-[#A8B6C8] max-w-md mx-auto">
          {isDuplicate
            ? 'We found your existing registration in local storage with the verified email below.'
            : 'Your free seat has been reserved. Keep your reference ID handy for your records.'}
        </p>
      </div>

      {/* Workshop Digital Pass Card */}
      <div className="bg-[#0B1322] border border-[#203254] rounded-xl p-5 sm:p-6 mb-8 relative font-mono text-xs">
        
        {/* Pass Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#203254]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5F56A]" />
            <span className="font-bold text-white text-sm">AI BUILD LAB // PASS</span>
          </div>
          <span className="text-[11px] text-[#50DFFF] bg-[#50DFFF]/10 px-2 py-0.5 rounded border border-[#50DFFF]/20">
            60-MIN SESSION
          </span>
        </div>

        {/* Reference ID Highlight */}
        <div className="py-4 my-2 bg-[#10172A] rounded-lg p-4 border border-[#203254] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-[#A8B6C8] uppercase tracking-wider">Registration Reference ID</div>
            <div className="text-xl sm:text-2xl font-black text-[#C5F56A] tracking-wider mt-0.5">
              {record.id}
            </div>
          </div>

          <button
            onClick={copyDetails}
            className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#17243D] hover:bg-[#203254] text-[#F7F9FC] text-xs font-sans transition-colors border border-[#203254]"
            aria-label="Copy reference ID and registration pass"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C5F56A]" />
                <span className="text-[#C5F56A] font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#50DFFF]" />
                <span>Copy Pass</span>
              </>
            )}
          </button>
        </div>

        {/* Attendee Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-sans text-xs">
          <div className="flex items-center gap-2 text-[#A8B6C8]">
            <span className="font-semibold text-white">Name:</span>
            <span>{record.fullName}</span>
          </div>
          <div className="flex items-center gap-2 text-[#A8B6C8]">
            <Mail className="w-3.5 h-3.5 text-[#50DFFF]" />
            <span className="text-white truncate">{record.normalizedEmail}</span>
          </div>
          <div className="flex items-center gap-2 text-[#A8B6C8]">
            <Building className="w-3.5 h-3.5 text-[#50DFFF]" />
            <span className="truncate">{record.college}</span>
          </div>
          <div className="flex items-center gap-2 text-[#A8B6C8]">
            <GraduationCap className="w-3.5 h-3.5 text-[#C5F56A]" />
            <span>{record.yearOfStudy}</span>
          </div>
          {record.referralCode && (
            <div className="flex items-center gap-2 text-[#A8B6C8] sm:col-span-2">
              <Tag className="w-3.5 h-3.5 text-[#C5F56A]" />
              <span>Referral: <strong className="text-white font-mono">{record.referralCode}</strong></span>
            </div>
          )}
        </div>

        {/* Demo Mode Notice */}
        <div className="mt-4 pt-3 border-t border-[#203254]/60 flex items-center justify-between text-[10px] text-[#64748B]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#50DFFF]" />
            <span>Data Tier: LocalStorage Demo Record</span>
          </div>
          <span>Registered: {new Date(record.registeredAt).toLocaleDateString()}</span>
        </div>

      </div>

      {/* Verified Event Notice */}
      <div className="bg-[#17243D]/50 border border-[#203254] rounded-lg p-3.5 mb-8 text-xs text-[#A8B6C8] flex items-start gap-2.5">
        <Mail className="w-4 h-4 text-[#C5F56A] shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">What happens next:</strong> Official joining instructions, virtual meeting link, and session agenda will be communicated directly by the workshop organizer to <code className="text-[#50DFFF]">{record.normalizedEmail}</code> prior to the session.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={copyDetails}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C5F56A] hover:bg-[#b6ea54] text-[#07111F] font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-md"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Pass Copied to Clipboard' : 'Copy Confirmation Details'}</span>
        </button>

        <button
          onClick={onResetForm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#17243D] hover:bg-[#203254] text-[#F7F9FC] font-semibold text-sm px-6 py-3 rounded-xl transition-colors border border-[#203254]"
        >
          <ArrowLeft className="w-4 h-4 text-[#A8B6C8]" />
          <span>Register Another Student</span>
        </button>
      </div>

    </div>
  );
}
