/**
 * MapCap IPO Dashboard - Stabilization & Data Integrity Suite
 * ---------------------------------------------------------
 * Security Standard: Whale-Shield v4.0 Compatible
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Purpose: Ensures zero-data rendering is eliminated and UI remains 
 * synchronous with Node.js Backend telemetry.
 */

import { render, screen } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import Dashboard from '../src/pages/Dashboard';
import { useIpoStats } from '../src/hooks/useIpoStats';
import { usePiNetwork } from '../src/hooks/usePiNetwork';

// CORE MODULE MOCKING: Safeguarding the execution environment from network dependency
vi.mock('../src/hooks/useIpoStats');
vi.mock('../src/hooks/usePiNetwork');

describe('STABILIZATION AUDIT: Dashboard Metrics & UX Compliance', () => {
  
  /**
   * TEST CASE 01: Data Hydration Integrity
   * Objective: Verify that backend telemetry (e.g., 56,700 Pi) is correctly parsed and rendered.
   */
  test('INTEGRITY: Should render verified backend metrics (Eliminate Zero-State)', () => {
    // Injecting Mock Auth State
    usePiNetwork.mockReturnValue({
      user: { username: 'Eslam-X' },
      authenticated: true
    });

    // Injecting Mock Backend Telemetry (Reflecting the 56,700 Pi Snapshot)
    useIpoStats.mockReturnValue({
      totalInvestors: 150,
      totalPiInvested: 56700,
      userPiInvested: 100,
      userCapitalGain: 20,
      spotPrice: 0.0001,
      loading: false,
      error: null
    });

    render(<Dashboard />);

    // Validation: Ensures Global Pool Display is accurate and localized
    const totalPiValue = screen.getByText(/56,700/i);
    expect(totalPiValue).toBeInTheDocument();
    
    // Validation: Community Count Check
    const investorCount = screen.getByText(/150/i);
    expect(investorCount).toBeInTheDocument();
  });

  /**
   * TEST CASE 02: UX Synchronization
   * Objective: Ensure the "Synchronizing" state is active during ledger audit.
   */
  test('UX SYNC: Should display MapCap Ledger synchronization state', () => {
    useIpoStats.mockReturnValue({ loading: true });
    render(<Dashboard />);
    
    expect(screen.getByText(/Synchronizing with MapCap Ledger/i)).toBeInTheDocument();
  });

  /**
   * TEST CASE 03: Security & Stability (Anti-Regression)
   * Objective: Ensure specific UI elements for Whale-Shield remain visible.
   */
  test('SECURITY: Dashboard should render the Whale-Cap Protocol footer', () => {
    useIpoStats.mockReturnValue({ loading: false, totalPiInvested: 56700 });
    render(<Dashboard />);
    
    const footerNote = screen.getByText(/Shielded by Whale-Cap/i);
    expect(footerNote).toBeInTheDocument();
  });
});
