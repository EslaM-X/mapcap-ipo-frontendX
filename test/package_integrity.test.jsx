/**
 * Package Manifest & Dependency Integrity Audit
 * ---------------------------------------------------------
 * Standard: MapCap Ecosystem Supply Chain Security
 * Architect: EslaM-X | AppDev @Map-of-Pi
 * Purpose: Audits the package.json to ensure critical dependencies 
 * (React 19, Zod, Axios) are locked and scripts are standardized.
 */

import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('INTEGRITY AUDIT: Package Manifest (package.json)', () => {

  // Load the manifest file
  const packagePath = path.resolve(__dirname, '../package.json');
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  /**
   * TEST CASE 01: Core Engine Versions
   * Objective: Ensure we are running on the latest stable React 19 
   * to leverage improved concurrent rendering.
   */
  test('ENGINE: Should use React 19 and React-DOM 19', () => {
    expect(pkg.dependencies.react).toContain('19');
    expect(pkg.dependencies['react-dom']).toContain('19');
  });

  /**
   * TEST CASE 02: Data Integrity & Security
   * Objective: Verify Zod and Axios are present for Daniel's 
   * strict schema validation and API communication.
   */
  test('SECURITY: Should include Zod for schema validation and Axios for API', () => {
    expect(pkg.dependencies.zod).toBeDefined();
    expect(pkg.dependencies.axios).toBeDefined();
  });

  /**
   * TEST CASE 03: Automation Scripts
   * Objective: Confirm that standard development and build scripts 
   * are available for the CI/CD pipeline.
   */
  test('AUTOMATION: Should define mandatory Vite and ESLint scripts', () => {
    expect(pkg.scripts.build).toBe('vite build');
    expect(pkg.scripts.lint).toBe('eslint .');
    expect(pkg.scripts.dev).toBe('vite');
  });

  /**
   * TEST CASE 04: Project Identity
   * Objective: Ensure the project is marked as private to prevent 
   * accidental publishing to public NPM registries.
   */
  test('COMPLIANCE: Should be marked as a private repository', () => {
    expect(pkg.private).toBe(true);
    expect(pkg.name).toBe('mapcap-ipo-frontend');
  });
});
