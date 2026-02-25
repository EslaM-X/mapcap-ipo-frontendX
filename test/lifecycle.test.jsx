/**
 * MapCap IPO System Lifecycle - Orchestration Suite
 * ---------------------------------------------------------
 * Standard: Golden Ratio Layout & Pi SDK Handshake v2.0
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Purpose: Verifies the critical bootstrap sequence from SDK 
 * authentication to global state hydration.
 */

import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import App from '../src/App';
import { IpoProvider } from '../src/context/IpoContext';
import { PiService } from '../src/services/pi.service';

// Mocking External Bridges
vi.mock('../src/services/pi.service');
vi.mock('../src/services/api.service');

// Wrapper to provide global context during testing
const AllProviders = ({ children }) => (
  <IpoProvider>{children}</IpoProvider>
);

describe('SYSTEM LIFECYCLE: Bootstrap & Layout Integrity', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    // Simulate Pi SDK Presence in Window
    window.Pi = { init: vi.fn(), authenticate: vi.fn() };
  });

  /**
   * TEST CASE 01: The Handshake Sequence
   * Objective: Ensure the app initializes SDK and authenticates before showing UI.
   */
  test('BOOTSTRAP: Should execute Pi SDK handshake and reveal Dashboard', async () => {
    PiService.authenticate.mockResolvedValue({ username: 'Eslam-X' });

    render(<App />, { wrapper: AllProviders });

    // 1. Check if Loading Screen appears first
    expect(screen.getByText(/Synchronizing with Pi Network Ledger/i)).toBeInTheDocument();

    // 2. Wait for the Auth and Data Hydration to finish
    await waitFor(() => {
      // Ensure the "Golden Ratio" sections are rendered
      expect(screen.getByText(/MapCap IPO/i)).toBeInTheDocument();
      expect(screen.getByText(/@Eslam-X/i)).toBeInTheDocument();
    });

    expect(window.Pi.init).toHaveBeenCalledWith(expect.objectContaining({ sandbox: true }));
  });

  /**
   * TEST CASE 02: Layout Specification Compliance
   * Objective: Verify the presence of the 3 mandatory vertical sections.
   */
  test('LAYOUT: Should render the 33.33vh Single-Screen architecture', async () => {
    PiService.authenticate.mockResolvedValue({ username: 'Eslam-X' });
    render(<App />, { wrapper: AllProviders });

    await waitFor(() => {
      // Top: Navbar & Graph
      expect(document.querySelector('.section-top')).toBeInTheDocument();
      // Middle: Stats Ledger
      expect(document.querySelector('.section-middle')).toBeInTheDocument();
      // Bottom: Liquidity Controls
      expect(document.querySelector('.section-bottom')).toBeInTheDocument();
    });
  });

  /**
   * TEST CASE 03: Fail-Safe for Missing SDK
   * Objective: Ensure appropriate warning when not in Pi Browser.
   */
  test('COMPATIBILITY: Should log warning if Pi SDK is missing', () => {
    delete window.Pi;
    const consoleSpy = vi.spyOn(console, 'warn');
    
    render(<App />, { wrapper: AllProviders });
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Pi SDK not detected"));
  });
});
