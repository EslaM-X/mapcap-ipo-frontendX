/**
 * Repository Hygiene & Security Audit
 * ---------------------------------------------------------
 * Standard: Daniel's "Zero-Leak" Policy v1.0
 * Architect: EslaM-X | AppDev @Map-of-Pi
 * Purpose: Audits the .gitignore configuration to prevent 
 * sensitive data (API Keys, node_modules) from leaking to GitHub.
 */

import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('SECURITY AUDIT: Repository Hygiene (.gitignore)', () => {

  // Load the .gitignore file content
  const gitignorePath = path.resolve(__dirname, '../.gitignore');
  const content = fs.readFileSync(gitignorePath, 'utf8');

  /**
   * TEST CASE 01: Environment Secret Protection
   * Objective: Ensure .env files are NEVER tracked to prevent 
   * leaking Daniel's backend URLs and API keys.
   */
  test('SECURITY: Should strictly ignore all .env variations', () => {
    expect(content).toContain('.env');
    expect(content).toContain('*.local');
  });

  /**
   * TEST CASE 02: Dependency Hygiene
   * Objective: Prevent tracking of node_modules to keep the 
   * repository lightweight and professional.
   */
  test('HYGIENE: Should ignore dependency artifacts (node_modules)', () => {
    expect(content).toContain('node_modules/');
  });

  /**
   * TEST CASE 03: Build Artifacts Isolation
   * Objective: Ensure production builds (dist/build) are not tracked 
   * to avoid merge conflicts in the MapCap ecosystem.
   */
  test('STABILITY: Should ignore build/distribution folders', () => {
    expect(content).toContain('dist/');
    expect(content).toContain('build/');
  });

  /**
   * TEST CASE 04: OS Junk Prevention
   * Objective: Keep the repo clean from .DS_Store or VSCode internal files.
   */
  test('CLEANLINESS: Should ignore OS and IDE-specific junk files', () => {
    expect(content).toContain('.DS_Store');
    expect(content).toContain('.vscode/');
  });
});
