/**
 * Registration Storage & Local Data Layer
 * Uses LocalStorage for prototype & evaluation demonstrations.
 * Enforces email normalization, duplicate prevention, and full campaign attribution.
 */

import { normalizeEmail } from './validation';
import { getAttribution } from './attribution';

const REGISTRATIONS_STORAGE_KEY = 'aibl_workshop_registrations_v1';

/**
 * Generate a unique, professional registration reference ID
 * Example format: AIBL-2026-K9P4
 */
function generateReferenceId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AIBL-2026-${code}`;
}

/**
 * Retrieve all locally stored registrations
 */
export function getAllRegistrations() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read registrations from storage:', err);
    return [];
  }
}

/**
 * Find an existing registration by normalized email
 */
export function findRegistrationByEmail(email) {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;
  const list = getAllRegistrations();
  return list.find(r => r.normalizedEmail === normalized) || null;
}

/**
 * Submit a registration with duplicate prevention and attribution capture
 */
export function registerStudent(formData) {
  const normalized = normalizeEmail(formData.email);
  const existing = findRegistrationByEmail(normalized);

  if (existing) {
    return {
      success: false,
      isDuplicate: true,
      message: 'You have already registered with this email address.',
      record: existing
    };
  }

  const attribution = getAttribution();

  const newRecord = {
    id: generateReferenceId(),
    fullName: formData.fullName.trim(),
    email: formData.email.trim(),
    normalizedEmail: normalized,
    college: formData.college.trim(),
    yearOfStudy: formData.yearOfStudy,
    referralCode: (formData.referralCode || attribution.ref || '').toUpperCase().trim(),
    attribution: {
      source: attribution.utm_source || 'direct',
      medium: attribution.utm_medium || 'web',
      campaign: attribution.utm_campaign || 'ai_workshop',
      content: attribution.utm_content || '',
      term: attribution.utm_term || '',
      variant: attribution.variant || 'default'
    },
    registeredAt: new Date().toISOString(),
    isDemo: true,
    dataTier: 'DEMO_LOCALSTORAGE',
    attendanceStatus: 'REGISTERED'
  };

  const list = getAllRegistrations();
  list.unshift(newRecord);

  try {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to persist registration:', err);
    return {
      success: false,
      isDuplicate: false,
      message: 'Local browser storage is full. Please clear cache.',
      record: null
    };
  }

  return {
    success: true,
    isDuplicate: false,
    message: 'Registration confirmed successfully!',
    record: newRecord
  };
}

/**
 * Get aggregated stats for the demo inspector
 */
export function getRegistrationStats() {
  const list = getAllRegistrations();
  const total = list.length;
  const finalYearCount = list.filter(r => r.yearOfStudy === 'Final year').length;
  
  // Breakdown by channel source
  const sourceBreakdown = list.reduce((acc, cur) => {
    const src = cur.attribution?.source || 'direct';
    acc[src] = (acc[src] || 0) + 1;
    return acc;
  }, {});

  // Unique colleges count
  const colleges = new Set(list.map(r => r.college.toLowerCase()));

  return {
    totalRegistrations: total,
    finalYearCount,
    finalYearPercentage: total > 0 ? Math.round((finalYearCount / total) * 100) : 0,
    uniqueCollegesCount: colleges.size,
    sourceBreakdown
  };
}

/**
 * Reset local demo data
 */
export function resetDemoRegistrations() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(REGISTRATIONS_STORAGE_KEY);
  }
}

/**
 * Seed realistic mock registrations for evaluator demonstration
 */
export function seedDemoRegistrations() {
  const sampleData = [
    {
      id: 'AIBL-2026-F9W2',
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@vtu.ac.in',
      normalizedEmail: 'aarav.sharma@vtu.ac.in',
      college: 'Visvesvaraya Technological University',
      yearOfStudy: 'Final year',
      referralCode: 'CAMPUS_VTU',
      attribution: {
        source: 'whatsapp',
        medium: 'student_community',
        campaign: 'ai_workshop',
        variant: 'default'
      },
      registeredAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      isDemo: true,
      dataTier: 'DEMO_LOCALSTORAGE',
      attendanceStatus: 'REGISTERED'
    },
    {
      id: 'AIBL-2026-M4K7',
      fullName: 'Ananya Reddy',
      email: 'ananya.reddy@jntuh.ac.in',
      normalizedEmail: 'ananya.reddy@jntuh.ac.in',
      college: 'JNTU Hyderabad',
      yearOfStudy: 'Final year',
      referralCode: 'AMBASSADOR01',
      attribution: {
        source: 'campus_ambassador',
        medium: 'qr_poster',
        campaign: 'ai_workshop',
        variant: 'outcome'
      },
      registeredAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      isDemo: true,
      dataTier: 'DEMO_LOCALSTORAGE',
      attendanceStatus: 'REGISTERED'
    },
    {
      id: 'AIBL-2026-R8T1',
      fullName: 'Rohan Deshmukh',
      email: 'rohan.d@coep.ac.in',
      normalizedEmail: 'rohan.d@coep.ac.in',
      college: 'COEP Technological University',
      yearOfStudy: 'Third year',
      referralCode: '',
      attribution: {
        source: 'college_club',
        medium: 'coding_club_discord',
        campaign: 'ai_workshop',
        variant: 'career'
      },
      registeredAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      isDemo: true,
      dataTier: 'DEMO_LOCALSTORAGE',
      attendanceStatus: 'REGISTERED'
    }
  ];

  if (typeof window !== 'undefined') {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(sampleData));
  }
}
