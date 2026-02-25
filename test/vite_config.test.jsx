/**
 * Vite Configuration & Build Pipeline Audit
 * ---------------------------------------------------------
 * Standard: MapCap Optimized MERN Deployment v1.2
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Purpose: Verifies the proxy-bridge, port stability, and 
 * chunking strategies for the Pi Browser environment.
 */

import { describe, test, expect } from 'vitest';
import viteConfig from '../vite.config.js';

describe('INFRASTRUCTURE AUDIT: Vite Configuration', () => {

  /**
   * TEST CASE 01: API Proxy Integrity (MERN Bridge)
   * Objective: Ensure the frontend can communicate with the Node.js 
   * backend without CORS issues during development.
   */
  test('NETWORK: Should have a correctly configured proxy for /api', () => {
    const proxy = viteConfig.server.proxy['/api'];
    expect(proxy).toBeDefined();
    expect(proxy.target).toBe('http://localhost:3000');
    expect(proxy.changeOrigin).toBe(true);
  });

  /**
   * TEST CASE 02: Deployment Port Guardrail
   * Objective: Guarantee a fixed port (5173) to ensure consistent 
   * Pi Sandbox testing environments.
   */
  test('ENVIRONMENT: Should enforce strictPort on 5173', () => {
    expect(viteConfig.server.port).toBe(5173);
    expect(viteConfig.server.strictPort).toBe(true);
  });

  /**
   * TEST CASE 03: Performance Optimization (Chunking)
   * Objective: Verify manual chunking for 'vendor' libraries to 
   * speed up initial load in the Pi Browser.
   */
  test('PERFORMANCE: Should implement manual chunking for React & Axios', () => {
    const manualChunks = viteConfig.build.rollupOptions.output.manualChunks;
    expect(manualChunks.vendor).toContain('react');
    expect(manualChunks.vendor).toContain('axios');
  });

  /**
   * TEST CASE 04: Base Path Accessibility
   * Objective: Ensure the base path is relative ('./') for flexible 
   * hosting options within the Pi ecosystem.
   */
  test('DEPLOYMENT: Should use a relative base path for portability', () => {
    expect(viteConfig.base).toBe('./');
  });
});
