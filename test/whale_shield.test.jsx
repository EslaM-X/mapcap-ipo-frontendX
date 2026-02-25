/**
 * Whale-Shield Protocol - Compliance & Security Suite
 * ---------------------------------------------------------
 * Security Standard: MapCap Level 4 Security (Whale-Cap)
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Purpose: Verifies that the UI enforces Daniel's 10% pool limit 
 * and accurately reflects server-side compliance flags.
 */

import { render, screen } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import StatsPanel from '../src/components/StatsPanel';
import { useIpo } from '../src/context/IpoContext';

// Mocking the Global Context to simulate different ledger scenarios
vi.mock('../src/context/IpoContext');

describe('SECURITY AUDIT: Whale-Shield Compliance Logic', () => {

  /**
   * TEST CASE 01: Standard Pioneer Compliance
   * Objective: Ensure no warnings are displayed for users within the safe limit.
   */
  test('COMPLIANCE: Should NOT display whale warning for standard investments', () => {
    useIpo.mockReturnValue({
      loading: false,
      metrics: {
        totalInvestors: 100,
        totalPiInvested: 1000,
        userPiInvested: 50, // Only 5% of the pool
        userCapitalGain: 10,
        isWhale: false 
      }
    });

    render(<StatsPanel />);
    
    const warning = screen.queryByText(/Compliance: Investment exceeds/i);
    expect(warning).not.toBeInTheDocument();
  });

  /**
   * TEST CASE 02: Whale Breach Detection
   * Objective: Verify the UI triggers the "Whale Warning" pulse when a breach is flagged.
   */
  test('ALERT: Should trigger Whale-Shield warning when isWhale flag is TRUE', () => {
    useIpo.mockReturnValue({
      loading: false,
      metrics: {
        totalInvestors: 100,
        totalPiInvested: 1000,
        userPiInvested: 250, // 25% of pool (Breach detected by backend)
        userCapitalGain: 50,
        isWhale: true 
      }
    });

    render(<StatsPanel />);
    
    // Check for the specific legal text required in Daniel's Spec (Page 5)
    const warning = screen.getByText(/exceeds 10% pool limit/i);
    expect(warning).toBeInTheDocument();
    
    // Verify professional branding (The warning must pulse)
    expect(warning).toHaveClass('animate-pulse');
  });

  /**
   * TEST CASE 03: Alpha Gain Precision
   * Objective: Ensure the 20% guaranteed appreciation is rendered with 4 decimal precision.
   */
  test('PRECISION: Should render Alpha Gain with high-fidelity decimal formatting', () => {
    useIpo.mockReturnValue({
      loading: false,
      metrics: {
        totalInvestors: 5,
        totalPiInvested: 50000,
        userPiInvested: 1000,
        userCapitalGain: 200.75893, // RAW backend value
        isWhale: false
      }
    });

    render(<StatsPanel />);
    
    // Should be formatted according to .toLocaleString(undefined, { maximumFractionDigits: 4 })
    // Expected: 200.7589 (or localized equivalent)
    expect(screen.getByText(/200.7589/i)).toBeInTheDocument();
  });
});

