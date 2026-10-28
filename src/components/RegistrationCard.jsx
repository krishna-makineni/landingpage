import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Loader2, Sparkles, CheckSquare, Square, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { validateRegistrationForm, YEAR_OPTIONS } from '../lib/validation';
import { registerStudent } from '../lib/storage';
import { getAttribution } from '../lib/attribution';
import { RegistrationConfirmation } from './RegistrationConfirmation';

export function RegistrationCard({ onRegistrationSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    college: '',
    yearOfStudy: 'Final year', // Pre-select target cohort by default for lower friction
    referralCode: '',
    agreeConsent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [activeAttribution, setActiveAttribution] = useState(null);

  // Load attribution on mount and populate referral code if present in URL
  useEffect(() => {
    const attr = getAttribution();
    setActiveAttribution(attr);
    if (attr.ref) {
      setFormData(prev => ({ ...prev, referralCode: attr.ref }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear field error on change
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Run client-side validation
    const validation = validateRegistrationForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Focus first error field
      const firstErrorKey = Object.keys(validation.errors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    // Simulate realistic 450ms network delay for professional feel
    setTimeout(() => {
      const result = registerStudent(formData);
      setIsSubmitting(false);

      if (result.success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#C5F56A', '#50DFFF', '#F7F9FC']
        });

        setIsDuplicate(false);
        setSubmittedRecord(result.record);
        if (onRegistrationSuccess) onRegistrationSuccess(result.record);
      } else if (result.isDuplicate) {
        setIsDuplicate(true);
        setSubmittedRecord(result.record);
      } else {
        setErrors({ general: result.message || 'Registration failed. Please try again.' });
      }
    }, 450);
  };

  const handleResetForm = () => {
    setSubmittedRecord(null);
    setIsDuplicate(false);
    setErrors({});
    const attr = getAttribution();
    setFormData({
      fullName: '',
      email: '',
      college: '',
      yearOfStudy: 'Final year',
      referralCode: attr.ref || '',
      agreeConsent: false
    });
  };

  // If already submitted in current view, show confirmation
  if (submittedRecord) {
    return (
      <RegistrationConfirmation
        record={submittedRecord}
        isDuplicate={isDuplicate}
        onResetForm={handleResetForm}
      />
    );
  }

  return (
    <div
      id="register"
      className="relative bg-[#10172A] border-2 border-[#203254] hover:border-[#50DFFF]/60 rounded-2xl p-6 sm:p-10 shadow-2xl transition-all duration-300"
    >
      {/* Decorative top accent border */}
      <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-[#C5F56A] to-transparent opacity-80" />

      {/* Card Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#C5F56A] bg-[#C5F56A]/10 border border-[#C5F56A]/30">
          <Sparkles className="w-3.5 h-3.5" />
          FREE REGISTRATION
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F7F9FC] tracking-tight">
          READY TO BUILD YOUR FIRST AI PROJECT?
        </h2>

        <p className="text-sm sm:text-base text-[#A8B6C8] max-w-lg mx-auto">
          Reserve your place in the free online workshop. Zero fees, zero prerequisite gates.
        </p>

        {/* Target Audience Clarity Pill */}
        <div className="pt-1">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#50DFFF] bg-[#17243D] px-3 py-1 rounded-md border border-[#203254]">
            <Info className="w-3 h-3 text-[#50DFFF]" />
            Optimized for Final-Year Engineering Students • Open to all engineering cohorts
          </span>
        </div>
      </div>

      {/* General Submission Error */}
      {errors.general && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errors.general}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        
        {/* Full Name Field */}
        <div>
          <label htmlFor="field-fullName" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#F7F9FC] mb-1.5">
            Full Name <span className="text-[#C5F56A]">*</span>
          </label>
          <input
            type="text"
            id="field-fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Priya Sharma"
            className={`w-full px-4 py-3 bg-[#0B1322] border rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors ${
              errors.fullName
                ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-[#203254] focus:border-[#C5F56A] focus:ring-1 focus:ring-[#C5F56A]'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Address Field */}
        <div>
          <label htmlFor="field-email" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#F7F9FC] mb-1.5">
            Email Address <span className="text-[#C5F56A]">*</span>
          </label>
          <input
            type="email"
            id="field-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. student@college.edu or name@gmail.com"
            autoComplete="email"
            className={`w-full px-4 py-3 bg-[#0B1322] border rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors ${
              errors.email
                ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-[#203254] focus:border-[#C5F56A] focus:ring-1 focus:ring-[#C5F56A]'
            }`}
          />
          <p className="mt-1 text-[11px] text-[#A8B6C8]">
            Workshop joining links and session materials will be delivered to this email.
          </p>
          {errors.email && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* College / University Field */}
        <div>
          <label htmlFor="field-college" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#F7F9FC] mb-1.5">
            College or University <span className="text-[#C5F56A]">*</span>
          </label>
          <input
            type="text"
            id="field-college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="e.g. IIT Bombay, JNTU Hyderabad, RV College of Engg"
            className={`w-full px-4 py-3 bg-[#0B1322] border rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors ${
              errors.college
                ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-[#203254] focus:border-[#C5F56A] focus:ring-1 focus:ring-[#C5F56A]'
            }`}
          />
          {errors.college && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.college}
            </p>
          )}
        </div>

        {/* Current Year of Study Dropdown */}
        <div>
          <label htmlFor="field-yearOfStudy" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#F7F9FC] mb-1.5">
            Current Year of Study <span className="text-[#C5F56A]">*</span>
          </label>
          <select
            id="field-yearOfStudy"
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-[#0B1322] border rounded-xl text-sm text-white focus:outline-none transition-colors ${
              errors.yearOfStudy
                ? 'border-red-500 focus:border-red-400'
                : 'border-[#203254] focus:border-[#C5F56A]'
            }`}
          >
            {YEAR_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-[#10172A] text-white">
                {opt.label}
              </option>
            ))}
          </select>
          {errors.yearOfStudy && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.yearOfStudy}
            </p>
          )}
        </div>

        {/* Optional Referral Code */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-referralCode" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#F7F9FC]">
              Referral Code <span className="text-[#A8B6C8] font-normal">(Optional)</span>
            </label>
            {activeAttribution?.ref && (
              <span className="text-[10px] font-mono text-[#50DFFF] bg-[#50DFFF]/10 px-2 py-0.5 rounded border border-[#50DFFF]/20">
                Applied from link
              </span>
            )}
          </div>
          <input
            type="text"
            id="field-referralCode"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            placeholder="e.g. AMBASSADOR01 or CLUB_CODE"
            className="w-full px-4 py-3 bg-[#0B1322] border border-[#203254] rounded-xl text-sm text-white placeholder-[#64748B] font-mono uppercase focus:border-[#50DFFF] focus:outline-none transition-colors"
          />
          {errors.referralCode && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.referralCode}
            </p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              id="field-agreeConsent"
              name="agreeConsent"
              checked={formData.agreeConsent}
              onChange={handleChange}
              className="sr-only"
            />
            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
              formData.agreeConsent
                ? 'bg-[#C5F56A] border-[#C5F56A] text-[#07111F]'
                : errors.agreeConsent
                ? 'border-red-500 bg-[#0B1322]'
                : 'border-[#203254] bg-[#0B1322] group-hover:border-[#A8B6C8]'
            }`}>
              {formData.agreeConsent && <CheckSquare className="w-4 h-4 fill-current stroke-current" />}
            </div>
            <span className="text-xs text-[#A8B6C8] leading-relaxed select-none">
              I agree to the use of my registration details for workshop-related communication.{' '}
              <span className="text-[#C5F56A]">*</span>
            </span>
          </label>
          {errors.agreeConsent && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.agreeConsent}
            </p>
          )}
        </div>

        {/* Primary CTA Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            id="register-submit-btn"
            className="w-full relative group flex items-center justify-center gap-3 bg-[#C5F56A] hover:bg-[#b6ea54] text-[#07111F] font-extrabold text-base py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#C5F56A]/20 hover:shadow-[#C5F56A]/35 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:pointer-events-none focus:outline-none focus:ring-4 focus:ring-[#C5F56A]/40"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#07111F]" />
                <span>CONFIRMING REGISTRATION...</span>
              </>
            ) : (
              <>
                <span>REGISTER FREE</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        {/* Trust & Privacy Notice */}
        <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#A8B6C8] font-sans">
          <ShieldCheck className="w-3.5 h-3.5 text-[#50DFFF]" />
          <span>100% Free • No credit card or phone number required</span>
        </div>

      </form>
    </div>
  );
}
