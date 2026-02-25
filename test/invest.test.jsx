/**
 * MapCap IPO Investment & Withdrawal Logic - Validation Suite
 * ---------------------------------------------------------
 * Security Standard: A2UaaS & U2A Compliance (v1.4)
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Purpose: Safeguards the EscrowPi flow and ensures transaction 
 * synchronization with the Node.js Ledger.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import ActionButtons from '../src/components/ActionButtons';
import { useIpo } from '../src/context/IpoContext';
import { PiService } from '../src/services/pi.service';

// Mocking dependencies to isolate logic [Daniel's Audit Rule]
vi.mock('../src/context/IpoContext');
vi.mock('../src/services/pi.service');
vi.mock('../src/services/api.service');

describe('ACTION CENTER AUDIT: Investment & Withdrawal Flow', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * TEST CASE 01: Investment Validation (U2A)
   * Objective: Ensure minimum investment of 1 pi is enforced before SDK trigger.
   */
  test('VALIDATION: Should block investment amounts less than 1 pi', async () => {
    useIpo.mockReturnValue({
      currentUser: { username: 'Eslam-X' },
      refreshData: vi.fn()
    });

    render(<ActionButtons />);

    // Set input to 0.5 pi (Below minimum)
    const input = screen.getByDisplayValue('1');
    fireEvent.change(input, { target: { value: '0.5' } });

    const investBtn = screen.getByText(/Invest pi/i);
    fireEvent.click(investBtn);

    // SDK should NOT be called
    expect(PiService.createIpoPayment).not.toHaveBeenCalled();
  });

  /**
   * TEST CASE 02: SDK Integration & Backend Sync
   * Objective: Verify that a valid investment triggers the Pi SDK and syncs with the Ledger.
   */
  test('SDK SYNC: Should trigger Pi Payment flow and backend sync on valid input', async () => {
    const mockRefresh = vi.fn();
    useIpo.mockReturnValue({
      currentUser: { username: 'Eslam-X' },
      refreshData: mockRefresh
    });

    // Simulate successful Pi Payment
    PiService.createIpoPayment.mockImplementation((amount, callback) => {
      callback('mock-payment-id-123');
      return Promise.resolve();
    });

    render(<ActionButtons />);

    const investBtn = screen.getByText(/Invest pi/i);
    fireEvent.click(investBtn);

    await waitFor(() => {
      // Validation: SDK Payment Triggered
      expect(PiService.createIpoPayment).toHaveBeenCalledWith(1, expect.any(Function));
      // Validation: Refresh Data called after sync
      expect(mockRefresh).toHaveBeenCalledWith('Eslam-X');
    });
  });

  /**
   * TEST CASE 03: Withdrawal Percentage Safety
   * Objective: Enforce 1-100% range for A2UaaS transfers.
   */
  test('A2UaaS SAFETY: Should prevent out-of-range withdrawal percentages', () => {
    useIpo.mockReturnValue({
      currentUser: { username: 'Eslam-X' },
      refreshData: vi.fn()
    });

    render(<ActionButtons />);

    const withdrawInput = screen.getByDisplayValue('50');
    fireEvent.change(withdrawInput, { target: { value: '150' } }); // Exceeds 100%

    const withdrawBtn = screen.getByText(/Withdraw pi/i);
    fireEvent.click(withdrawBtn);

    // Should stay in processing or show alert (Logic check)
    expect(screen.queryByText(/Wait.../i)).not.toBeInTheDocument();
  });
});
