import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Loader2, Sparkles, Check, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { validateRegistrationForm, YEAR_OPTIONS } from '../lib/validation';
import { registerStudent } from '../lib/storage';
import { getAttribution } from '../lib/attribution';
import { RegistrationConfirmation } from './RegistrationConfirmation';

export function RegistrationCard({ onRegistrationSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    college: '',
    yearOfStudy: 'Final year', // Pre-select target cohort for lowest friction
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
          colors: ['#C5F56A', '#4ADFFF', '#F5F7FB']
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

  // If already submitted in current view, show confirmation pass
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
      className="relative bg-[#0D1523] border border-white/[0.08] hover:border-white/[0.14] rounded-2xl p-6 sm:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_48px_-12px_rgba(0,0,0,0.7)] transition-all duration-300"
    >
      {/* Precision top specular highlight */}
      <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#C5F56A]/60 to-transparent" />

      {/* Card Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider text-[#C5F56A] bg-[#C5F56A]/10 border border-[#C5F56A]/20">
          <Sparkles className="w-3 h-3" />
          FREE REGISTRATION
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F7FB] tracking-tight">
          READY TO BUILD YOUR FIRST AI PROJECT?
        </h2>

        <p className="font-sans text-xs sm:text-sm text-[#A5B2C5] max-w-md mx-auto leading-relaxed">
          Reserve your place in the free online workshop. Zero fees, zero prerequisite gates.
        </p>

        {/* Target Audience Clarity Pill */}
        <div className="pt-0.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#4ADFFF] bg-[#111C2E] px-2.5 py-1 rounded-md border border-white/[0.06]">
            <Info className="w-3 h-3 text-[#4ADFFF]" />
            Optimized for Final-Year Students • Open to all engineering cohorts
          </span>
        </div>
      </div>

      {/* General Submission Error */}
      {errors.general && (
        <div className="mb-6 p-3.5 rounded-lg bg-red-950/30 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errors.general}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        
        {/* Full Name Field */}
        <div>
          <label htmlFor="field-fullName" className="block text-[11px] font-mono uppercase tracking-wider text-[#A5B2C5] font-medium mb-1.5">
            Full Name <span className="text-[#C5F56A]">*</span>
          </label>
          <input
            type="text"
            id="field-fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Priya Sharma"
            className={`w-full px-3.5 py-2.5 bg-[#080E18] border rounded-lg text-sm text-[#F5F7FB] placeholder-[#53647B] font-sans focus:outline-none transition-colors ${
              errors.fullName
                ? 'border-red-500/80 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-white/[0.08] focus:border-[#C5F56A] focus:ring-1 focus:ring-[#C5F56A]'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-sans">
              <AlertCircle className="w-3 h-3" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Address Field */}
        <div>
          <label htmlFor="field-email" className="block text-[11px] font-mono uppercase tracking-wider text-[#A5B2C5] font-medium mb-1.5">
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
            className={`w-full px-3.5 py-2.5 bg-[#080E18] border rounded-lg text-sm text-[#F5F7FB] placeholder-[#53647B] font-sans focus:outline-none transition-colors ${
              errors.email
                ? 'border-red-500/80 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-white/[0.08] focus:border-[#C5F56A] focus:ring-1 focus:ring-[#C5F56A]'
            }`}
          />
          <p className="mt-1 text-[11px] text-[#A5B2C5]/70 font-sans">
            Workshop joining links and session materials will be delivered to this email.
          </p>
          {errors.email && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-sans">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* College / University Field */}
        <div>
          <label htmlFor="field-college" className="block text-[11px] font-mono uppercase tracking-wider text-[#A5B2C5] font-medium mb-1.5">
            College or University <span className="text-[#C5F56A]">*</span>
          </label>
          <input
            type="text"
            id="field-college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="e.g. IIT Bombay, JNTU Hyderabad, RV College of Engg"
            className={`w-full px-3.5 py-2.5 bg-[#080E18] border rounded-lg text-sm text-[#F5F7FB] placeholder-[#53647B] font-sans focus:outline-none transition-colors ${
              errors.college
                ? 'border-red-500/80 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-white/[0.08] focus:border-[#C5F56A] focus:ring-1 focus:ring-[#C5F56A]'
            }`}
          />
          {errors.college && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-sans">
              <AlertCircle className="w-3 h-3" />
              {errors.college}
            </p>
          )}
        </div>

        {/* Current Year of Study Dropdown */}
        <div>
          <label htmlFor="field-yearOfStudy" className="block text-[11px] font-mono uppercase tracking-wider text-[#A5B2C5] font-medium mb-1.5">
            Current Year of Study <span className="text-[#C5F56A]">*</span>
          </label>
          <select
            id="field-yearOfStudy"
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 bg-[#080E18] border rounded-lg text-sm text-[#F5F7FB] font-sans focus:outline-none transition-colors ${
              errors.yearOfStudy
                ? 'border-red-500/80 focus:border-red-400'
                : 'border-white/[0.08] focus:border-[#C5F56A]'
            }`}
          >
            {YEAR_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-[#0D1523] text-white">
                {opt.label}
              </option>
            ))}
          </select>
          {errors.yearOfStudy && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-sans">
              <AlertCircle className="w-3 h-3" />
              {errors.yearOfStudy}
            </p>
          )}
        </div>

        {/* Optional Referral Code */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="field-referralCode" className="block text-[11px] font-mono uppercase tracking-wider text-[#A5B2C5] font-medium">
              Referral Code <span className="text-[#A5B2C5]/60 font-normal">(Optional)</span>
            </label>
            {activeAttribution?.ref && (
              <span className="text-[10px] font-mono text-[#4ADFFF] bg-[#4ADFFF]/10 px-2 py-0.5 rounded border border-[#4ADFFF]/20">
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
            className="w-full px-3.5 py-2.5 bg-[#080E18] border border-white/[0.08] rounded-lg text-sm text-[#F5F7FB] placeholder-[#53647B] font-mono uppercase focus:border-[#4ADFFF] focus:outline-none transition-colors"
          />
          {errors.referralCode && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-sans">
              <AlertCircle className="w-3 h-3" />
              {errors.referralCode}
            </p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="pt-1.5">
          <label htmlFor="field-agreeConsent" className="flex items-start gap-2.5 cursor-pointer group select-none">
            <input
              type="checkbox"
              id="field-agreeConsent"
              name="agreeConsent"
              checked={formData.agreeConsent}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div
              aria-hidden="true"
              className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#C5F56A] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#0D1523] ${
                formData.agreeConsent
                  ? 'bg-[#C5F56A] border-[#C5F56A] text-[#070B14]'
                  : errors.agreeConsent
                  ? 'border-red-500 bg-[#080E18]'
                  : 'border-white/[0.12] bg-[#080E18] group-hover:border-white/[0.25]'
              }`}
            >
              {formData.agreeConsent && <Check className="w-3 h-3 stroke-[2.5]" />}
            </div>
            <span className="text-xs text-[#A5B2C5] leading-relaxed font-sans">
              I agree to the use of my registration details for workshop-related communication.{' '}
              <span className="text-[#C5F56A]">*</span>
            </span>
          </label>
          {errors.agreeConsent && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-sans">
              <AlertCircle className="w-3 h-3" />
              {errors.agreeConsent}
            </p>
          )}
        </div>

        {/* Primary CTA Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            id="register-submit-btn"
            className="w-full relative group flex items-center justify-center gap-2 bg-[#C5F56A] hover:bg-[#b5e955] text-[#070B14] font-semibold text-sm py-3.5 rounded-xl transition-all duration-150 shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:shadow-[0_0_24px_rgba(197,245,106,0.35)] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F56A]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#070B14]" />
                <span className="font-mono text-xs uppercase tracking-wider">Confirming Registration...</span>
              </>
            ) : (
              <>
                <span>REGISTER FREE</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" strokeWidth={2} />
              </>
            )}
          </button>
        </div>

        {/* Trust Notice */}
        <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-[#A5B2C5]/70 font-sans">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4ADFFF]" />
          <span>100% Free • No credit card or phone number required</span>
        </div>

      </form>
    </div>
  );
}
