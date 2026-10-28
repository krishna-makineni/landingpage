/**
 * Attribution & Campaign Tracking Utility
 * Captures UTM parameters, referral codes, and headline experiment variants from URL.
 * Preserves attribution across page reloads via sessionStorage and localStorage backup.
 */

const STORAGE_KEY = 'aibl_campaign_attribution_v1';

export function getAttribution() {
  if (typeof window === 'undefined') {
    return {
      utm_source: 'direct',
      utm_medium: 'website',
      utm_campaign: 'ai_workshop',
      ref: '',
      variant: 'default',
      captured_at: new Date().toISOString()
    };
  }

  const urlParams = new URLSearchParams(window.location.search);
  const hasQueryParams = urlParams.has('utm_source') || urlParams.has('ref') || urlParams.has('variant');

  // If query parameters are present in current URL, prioritize and save them
  if (hasQueryParams) {
    const freshAttribution = {
      utm_source: urlParams.get('utm_source') || 'direct',
      utm_medium: urlParams.get('utm_medium') || 'web',
      utm_campaign: urlParams.get('utm_campaign') || 'ai_workshop',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || '',
      ref: (urlParams.get('ref') || urlParams.get('referral') || '').toUpperCase().trim(),
      variant: urlParams.get('variant') || 'default',
      referrer: document.referrer || '',
      captured_at: new Date().toISOString()
    };

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(freshAttribution));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(freshAttribution));
    } catch {
      // Ignore storage errors in restrictive environments
    }

    return freshAttribution;
  }

  // Otherwise check preserved attribution from session/local storage
  try {
    const cached = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // Ignore storage parse errors
  }

  // Default organic attribution
  const defaultAttribution = {
    utm_source: 'organic',
    utm_medium: 'direct_visit',
    utm_campaign: 'ai_workshop',
    ref: '',
    variant: 'default',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    captured_at: new Date().toISOString()
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAttribution));
  } catch {
    // Ignore
  }

  return defaultAttribution;
}

/**
 * Headline Experiment Variants
 * Default: "BUILD YOUR FIRST AI PROJECT IN 60 MINUTES."
 * Outcome: "BUILD & DEPLOY YOUR FIRST AI APP IN 60 MINUTES."
 * Career:  "BOOST YOUR ENGINEERING RESUME: BUILD AN AI PROJECT IN 60 MINUTES."
 */
export const HEADLINE_VARIANTS = {
  default: {
    badge: 'FREE ONLINE WORKSHOP',
    tagline: 'AI • BUILD • CREATE',
    titleLine1: 'BUILD YOUR FIRST',
    titleHighlight: 'AI PROJECT',
    titleLine2: 'IN 60 MINUTES.',
    subhead: 'Less scrolling. More building.',
    description: 'Turn your curiosity about AI into your first hands-on project.'
  },
  outcome: {
    badge: 'FREE PRACTICAL WORKSHOP',
    tagline: 'HANDS-ON • CODE • SHIP',
    titleLine1: 'BUILD & DEPLOY',
    titleHighlight: 'YOUR FIRST AI APP',
    titleLine2: 'IN 60 MINUTES.',
    subhead: 'From blank screen to working prototype.',
    description: 'Stop watching tutorials. Experience building a live AI application in one focused session.'
  },
  career: {
    badge: 'ENGINEERING CAREER ACCELERATOR',
    tagline: 'PORTFOLIO • SKILLS • IMPACT',
    titleLine1: 'STAND OUT IN CAMPUS PLACEMENTS:',
    titleHighlight: 'BUILD AN AI PROJECT',
    titleLine2: 'IN 60 MINUTES.',
    subhead: 'Projects speak louder than certificates.',
    description: 'Add a tangible, demonstrable AI project foundation to your final-year engineering profile.'
  }
};

export function getVariantContent(variantKey) {
  const normalizedKey = (variantKey || '').toLowerCase();
  return HEADLINE_VARIANTS[normalizedKey] || HEADLINE_VARIANTS.default;
}
