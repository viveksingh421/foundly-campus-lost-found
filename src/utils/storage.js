import { SAMPLE_REPORTS, SAMPLE_CLAIMS } from '../data/sampleData';

const STORAGE_KEYS = {
  REPORTS: 'foundly_campus_reports_v1',
  CLAIMS: 'foundly_campus_claims_v1',
  INITIALIZED: 'foundly_initialized_flag_v1'
};

/**
 * Load Reports from localStorage or initialize from SAMPLE_REPORTS
 */
export const loadReports = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REPORTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading reports from localStorage:', err);
  }

  // Fallback to sample data and persist
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(SAMPLE_REPORTS));
  localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  return SAMPLE_REPORTS;
};

/**
 * Save reports array into localStorage
 */
export const saveReports = (reports) => {
  try {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  } catch (err) {
    console.error('Error saving reports to localStorage:', err);
  }
};

/**
 * Load claims array
 */
export const loadClaims = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLAIMS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading claims from localStorage:', err);
  }

  localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(SAMPLE_CLAIMS));
  return SAMPLE_CLAIMS;
};

/**
 * Save claims array
 */
export const saveClaims = (claims) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(claims));
  } catch (err) {
    console.error('Error saving claims to localStorage:', err);
  }
};

/**
 * Reset all demo data to fresh initial samples
 */
export const resetDemoData = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(SAMPLE_REPORTS));
    localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(SAMPLE_CLAIMS));
    return {
      reports: SAMPLE_REPORTS,
      claims: SAMPLE_CLAIMS
    };
  } catch (err) {
    console.error('Error resetting demo data:', err);
    return null;
  }
};
