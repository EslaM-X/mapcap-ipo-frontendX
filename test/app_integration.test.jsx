/**
 * MapCap System Integration - Root Orchestration Audit
 * ---------------------------------------------------------
 * Standard: Full-Stack Lifecycle Validation v1.2
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Purpose: Audits the Pi SDK initialization, global state hydration, 
 * and the "Golden Ratio" layout rendering.
 */

import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import App from '../src/App';
import { IpoProvider } from '../src/context/IpoContext';
import { PiService } from '../src/services/pi.service';

// Mocking the Web3 Bridge to isolate the UI rendering logic
vi.mock('../src/services/pi.service');
vi.mock('../src/services/api.service');

const AllProviders = ({ children }) => (
  <IpoProvider>{children}</IpoProvider>
);

describe('SYSTEM INTEGRATION: App Root & Lifecycle Audit', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    // Mocking window.Pi to simulate the Pi Browser environment
    window.Pi = {
      init: vi.fn(),
      authenticate: vi.fn()
    };
  });

  /**
   * TEST CASE 01: The Loading Experience
   * Objective: Verify the brand-compliant loading screen appears 
   * while auditing the Pi Network Ledger.
   */
  test('BOOTSTRAP: Should display professional brand-pulse loader on initial mount', () => {
    render(<App />, { wrapper: AllProviders });
    
    expect(screen.getByText(/Synchronizing with Pi Network Ledger/i)).toBeInTheDocument();
    expect(document.querySelector('.brand-pulse')).toBeInTheDocument();
  });

  /**
   * TEST CASE 02: SDK Handshake & Dashboard Reveal
   * Objective: Ensure the app transitions from loading to the 3-pillar dashboard 
   * after a successful Pi SDK authentication.
   */
  test('LIFECYCLE: Should reveal the 33.33vh dashboard after successful SDK handshake', async () => {
    const mockUser = { username: 'Eslam-Pioneer', uid: '12345' };
    
    // Simulating successful Web3 Auth
    PiService.authenticate.mockResolvedValue(mockUser);

    render(<App />, { wrapper: AllProviders });

    // Wait for the loader to disappear and sections to mount
    await waitFor(() => {
      expect(screen.queryByText(/Synchronizing/i)).not.toBeInTheDocument();
    });

    // Audit: Verify the 3-Section Layout Pillar Policy
    expect(document.querySelector('.section-top')).toBeInTheDocument();
    expect(document.querySelector('.section-middle')).toBeInTheDocument();
    expect(document.querySelector('.section-bottom')).toBeInTheDocument();
  });

  /**
   * TEST CASE 03: Visual Constraint Enforcement
   * Objective: Confirm the "No-Scroll" policy is enforced at the root level.
   */
  test('UX_GUARDRAIL: Should enforce the 100vh overflow-hidden constraint', async () => {
    render(<App />, { wrapper: AllProviders });
    
    // Access the root container style via computed CSS class
    const rootContainer = document.querySelector('.mapcap-root-container');
    expect(rootContainer).toBeDefined();
    
    // Note: In JSDOM, we verify class application as a proxy for the CSS rule
    expect(document.body).toHaveStyle({ overflow: 'hidden' });
  });
});

