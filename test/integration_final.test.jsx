/**
 * MapCap Final Integration - Web3 & SDK Handshake
 * ---------------------------------------------------------
 * Security Standard: Non-Custodial Payment Integrity
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Purpose: Audits the Pi SDK lifecycle from main.jsx mounting 
 * to the final server-side approval callback.
 */

import { vi, describe, test, expect, beforeEach } from 'vitest';
import { PiService } from '../src/services/pi.service';

describe('FINAL AUDIT: Web3 Bridge & SDK Integrity', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    // Mocking the global Pi window object used in PiService
    window.Pi = {
      authenticate: vi.fn(),
      createPayment: vi.fn()
    };
  });

  /**
   * TEST CASE 01: Secure Authentication Lifecycle
   * Objective: Verify scopes and incomplete payment handling.
   */
  test('WEB3 AUTH: Should request correct scopes and handle auth handshake', async () => {
    const mockUser = { username: 'Eslam-X', uid: '123' };
    window.Pi.authenticate.mockResolvedValue({ user: mockUser });

    const user = await PiService.authenticate();

    expect(window.Pi.authenticate).toHaveBeenCalledWith(
      expect.arrayContaining(['username', 'payments', 'wallet_address']),
      expect.any(Function) // The incomplete payment callback
    );
    expect(user.username).toBe('Eslam-X');
  });

  /**
   * TEST CASE 02: Payment Orchestration (U2A Flow)
   * Objective: Verify the bridge between SDK approval and our backend sync.
   */
  test('PAYMENT: Should trigger onApproved callback when SDK is ready for server approval', async () => {
    const onApprovedMock = vi.fn();
    const mockPaymentId = 'pid_556677';

    // Simulating the SDK behavior: immediately trigger the onReadyForServerApproval callback
    window.Pi.createPayment.mockImplementation((config, callbacks) => {
      callbacks.onReadyForServerApproval(mockPaymentId);
    });

    await PiService.createIpoPayment(10, onApprovedMock);

    // Validation: Ensures our bridge to the backend is called
    expect(onApprovedMock).toHaveBeenCalledWith(mockPaymentId);
    expect(window.Pi.createPayment).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 10,
        metadata: expect.objectContaining({ phase: "IPO_2026" })
      }),
      expect.any(Object)
    );
  });
});

