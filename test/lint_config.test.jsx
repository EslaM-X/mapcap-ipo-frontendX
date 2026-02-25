/**
 * MapCap ESLint Configuration & Quality Audit
 * ---------------------------------------------------------
 * Standard: MapCap Clean Code v1.2
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Purpose: Verifies that the linting engine protects the Pi SDK 
 * global namespace and enforces React 19 best practices.
 */

import { describe, test, expect } from 'vitest';
import eslintConfig from '../eslint.config.js';

describe('QUALITY AUDIT: ESLint Configuration Integrity', () => {

  /**
   * TEST CASE 01: Global Namespace Protection
   * Objective: Ensure 'Pi' is defined as a readonly global to prevent 
   * 'Pi is not defined' errors during Web3 handshake.
   */
  test('WEB3_SECURITY: Should define Pi SDK as a readonly global variable', () => {
    const mainConfig = eslintConfig.find(conf => conf.files && conf.files.includes('**/*.{js,jsx}'));
    expect(mainConfig.languageOptions.globals.Pi).toBe('readonly');
  });

  /**
   * TEST CASE 02: React Refresh Compliance
   * Objective: Verify that HMR (Hot Module Replacement) rules are active 
   * to ensure a smooth developer experience for Philip & the team.
   */
  test('DX_INTEGRITY: Should enforce react-refresh component exports', () => {
    const mainConfig = eslintConfig.find(conf => conf.plugins && conf.plugins['react-refresh']);
    expect(mainConfig.rules['react-refresh/only-export-components']).toBeDefined();
    expect(mainConfig.rules['react-refresh/only-export-components'][0]).toBe('warn');
  });

  /**
   * TEST CASE 03: Web3 Pattern Resilience
   * Objective: Ensure 'no-unused-vars' allows underscore patterns common 
   * in API/Smart Contract response handling.
   */
  test('CLEAN_CODE: Should allow unused variables starting with underscores', () => {
    const mainConfig = eslintConfig.find(conf => conf.rules && conf.rules['no-unused-vars']);
    const pattern = mainConfig.rules['no-unused-vars'][1].varsIgnorePattern;
    expect(pattern).toContain('^[A-Z_]');
  });

  /**
   * TEST CASE 04: Build Pipeline Hygiene
   * Objective: Confirm that build artifacts are ignored to prevent 
   * unnecessary linting overhead in CI/CD.
   */
  test('BUILD_HYGIENE: Should ignore distribution and vite cache folders', () => {
    const ignoreConfig = eslintConfig.find(conf => conf.ignores);
    expect(ignoreConfig.ignores).toContain('dist');
    expect(ignoreConfig.ignores).toContain('.vite');
  });
});

