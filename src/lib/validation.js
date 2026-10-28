/**
 * Form Validation and Sanitization Rules
 */

export const YEAR_OPTIONS = [
  { value: 'Final year', label: 'Final year (Target Cohort)', recommended: true },
  { value: 'Third year', label: 'Third year' },
  { value: 'Second year', label: 'Second year' },
  { value: 'First year', label: 'First year' },
  { value: 'Other', label: 'Other (PG / Alum / Enthusiast)' }
];

export function normalizeEmail(email) {
  if (!email) return '';
  return email.trim().toLowerCase();
}

export function validateRegistrationForm(formData) {
  const errors = {};

  // Name validation
  const name = (formData.fullName || '').trim();
  if (!name) {
    errors.fullName = 'Please enter your full name.';
  } else if (name.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  } else if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
    errors.fullName = 'Please enter a valid name (letters and spaces only).';
  }

  // Email validation
  const rawEmail = formData.email || '';
  const normalized = normalizeEmail(rawEmail);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!normalized) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(normalized)) {
    errors.email = 'Please enter a valid email address (e.g., student@college.edu).';
  }

  // College validation
  const college = (formData.college || '').trim();
  if (!college) {
    errors.college = 'Please enter your college or university name.';
  } else if (college.length < 3) {
    errors.college = 'College name must be at least 3 characters.';
  }

  // Year of study validation
  const validYears = YEAR_OPTIONS.map(y => y.value);
  if (!formData.yearOfStudy) {
    errors.yearOfStudy = 'Please select your current year of study.';
  } else if (!validYears.includes(formData.yearOfStudy)) {
    errors.yearOfStudy = 'Please choose a valid year option from the list.';
  }

  // Referral code validation (optional)
  if (formData.referralCode && formData.referralCode.trim().length > 20) {
    errors.referralCode = 'Referral code cannot exceed 20 characters.';
  }

  // Consent validation
  if (!formData.agreeConsent) {
    errors.agreeConsent = 'You must agree to receive workshop communication to register.';
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors
  };
}
