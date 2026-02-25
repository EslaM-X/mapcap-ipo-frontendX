/**
 * HTML Entry Point & SDK Delivery Audit
 * ---------------------------------------------------------
 * Standard: Pi Browser Environment Compliance v1.2
 * Architect: EslaM-X | AppDev @Map-of-Pi
 * Purpose: Verifies the integrity of the HTML shell, viewport 
 * constraints, and mandatory SDK script injection.
 */

import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('ENTRY AUDIT: index.html Integrity Check', () => {

  // Reading the physical index.html file
  const htmlPath = path.resolve(__dirname, '../index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  /**
   * TEST CASE 01: SDK Availability
   * Objective: Verify the Pi SDK script is loaded from the official source.
   */
  test('SDK_INJECTION: Should include the official Pi Network SDK script', () => {
    expect(html).toContain('https://sdk.minepi.com/pi-sdk.js');
  });

  /**
   * TEST CASE 02: Viewport Guardrails
   * Objective: Ensure the viewport prevents accidental zooming which 
   * breaks Philip's 33.33vh layout logic.
   */
  test('UI_STABILITY: Should enforce non-scalable viewport for mobile UX', () => {
    expect(html).toContain('user-scalable=no');
    expect(html).toContain('viewport-fit=cover');
  });

  /**
   * TEST CASE 03: Branding & SEO
   * Objective: Verify the brand identity and theme colors for Android/iOS status bars.
   */
  test('BRANDING: Should define the correct MapCap Green theme color', () => {
    expect(html).toContain('content="#1b5e20"');
    expect(html).toContain('MapCap IPO');
  });

  /**
   * TEST CASE 04: Root Mounting Point
   * Objective: Ensure the #root div exists for React to mount.
   */
  test('DOM_READY: Should contain the root mounting element', () => {
    expect(html).toContain('id="root"');
  });
});

