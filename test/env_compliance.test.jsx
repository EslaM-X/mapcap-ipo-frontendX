/**
 * Environment Compliance & Secret Integrity Audit
 * ---------------------------------------------------------
 * Standard: MapCap Production Guardrails v1.2
 * Architect: EslaM-X | AppDev @Map-of-Pi
 * Purpose: Verifies that all mandatory Vercel environment 
 * variables are present and formatted correctly for the Pi Browser.
 */

import { describe, test, expect } from 'vitest';

describe('SECURITY AUDIT: Environment Variables (.env)', () => {

  /**
   * TEST CASE 01: API Gateway Integrity
   * Objective: Ensure the frontend points to the correct Vercel 
   * production backend URL to avoid 404/CORS errors.
   */
  test('NETWORK: Should have a valid VITE_API_URL pointing to Vercel', () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    expect(apiUrl).toBeDefined();
    expect(apiUrl).toContain('vercel.app');
    expect(apiUrl).toContain('/api/ipo'); // Ensuring the route suffix
  });

  /**
   * TEST CASE 02: Pi SDK Application Identity
   * Objective: Confirm the App ID is set for A2UaaS authentication 
   * as per Daniel's security requirement.
   */
  test('WEB3_ID: Should have the correct VITE_PI_APP_ID', () => {
    expect(import.meta.env.VITE_PI_APP_ID).toBe('mapcap-ipo-prod-001');
  });

  /**
   * TEST CASE 03: Tokenomics Logic Sync
   * Objective: Ensure UI calculations for the IPO Pool match 
   * the backend logic (2.18M Pi).
   */
  test('TOKENOMICS: Should have the correct VITE_IPO_POOL constant', () => {
    // Ensuring the pool matches the 2,181,818 requirement
    expect(Number(import.meta.env.VITE_IPO_POOL)).toBe(2181818);
  });

  /**
   * TEST CASE 04: Visual Feature Flags
   * Objective: Verify Philip's requirement for Live Charts is enabled.
   */
  test('UX_CONFIG: Should enable live charts for the IPO recap version', () => {
    expect(import.meta.env.VITE_ENABLE_LIVE_CHARTS).toBe('true');
    expect(import.meta.env.VITE_IPO_RECAP_VERSION).toBe('v1.5');
  });
});
