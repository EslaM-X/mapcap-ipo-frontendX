/**
 * MapCap Auth Service - Persistence & SDK Compliance Audit
 * ---------------------------------------------------------
 * Security Standard: Pi Network SDK v2.0 Handshake Logic
 * Lead Architect: Eslam Kora | AppDev @Map-of-Pi
 * Purpose: Ensures continuous session hydration and secure data 
 * disposal during the Pioneer authentication lifecycle.
 */

import { vi, describe, test, expect, beforeEach } from 'vitest';
import { authenticatePioneer, getStoredPioneer, clearPioneerSession } from '../src/services/auth.service';

describe('AUTH SERVICE AUDIT: Session Lifecycle & SDK Integration', () => {
  
  beforeEach(() => {
    // Resetting mocks and sandbox storage to ensure test isolation
    vi.clearAllMocks();
    localStorage.clear();

    // Mocking the global Pi window object to simulate Pi Browser environment
    window.Pi = {
      authenticate: vi.fn()
    };
  });

  /**
   * TEST CASE 01: SDK Handshake & Local Hydration
   * Objective: Verify that successful Pi Auth triggers persistent storage 
   * to support Philip's requirement for a seamless single-screen experience.
   */
  test('AUTH_BOOTSTRAP: Should persist session in localStorage post-SDK success', async () => {
    const mockAuthResponse = {
      user: { username: 'Eslam-X', uid: 'pi_123' }
    };
    
    // Simulating a successful user-granted permission flow
    window.Pi.authenticate.mockResolvedValue(mockAuthResponse);

    const user = await authenticatePioneer();

    // Audit: Verify data residency in LocalStorage for session persistence
    const storedSession = JSON.parse(localStorage.getItem('pioneer_session'));
    
    expect(storedSession.username).toBe('Eslam-X');
    expect(user.uid).toBe('pi_123');
    expect(storedSession.authenticatedAt).toBeDefined();
  });

  /**
   * TEST CASE 02: Stateless Session Recovery
   * Objective: Ensure the app can recover identity from the local cache 
   * without re-triggering the Pi SDK popup, optimizing Pioneer UX.
   */
  test('SESSION_RECOVERY: Should retrieve valid session from local storage cache', () => {
    const mockSession = { username: 'Eslam-X', uid: 'pi_123' };
    localStorage.setItem('pioneer_session', JSON.stringify(mockSession));

    const recoveredUser = getStoredPioneer();

    expect(recoveredUser.username).toBe('Eslam-X');
    expect(recoveredUser.uid).toBe('pi_123');
  });

  /**
   * TEST CASE 03: Secure Data Disposal (Logout Integrity)
   * Objective: Confirm that sensitive session tokens and identity data 
   * are purged completely upon Pioneer logout, fulfilling Daniel's Audit requirement.
   */
  test('LOGOUT_INTEGRITY: Should purge all persistent session data on termination', () => {
    // Setup: Simulate an active authenticated session
    localStorage.setItem('pioneer_session', JSON.stringify({ user: 'active' }));
    
    clearPioneerSession();

    // Audit: Ensure zero data leakage post-logout
    expect(localStorage.getItem('pioneer_session')).toBeNull();
  });

  /**
   * TEST CASE 04: SDK Exception Handling
   * Objective: Ensure the service propagates SDK errors gracefully 
   * to the UI for appropriate user feedback.
   */
  test('FAIL_SAFE: Should throw and log error when SDK handshake is rejected', async () => {
    window.Pi.authenticate.mockRejectedValue(new Error("Pioneer Rejected Auth"));

    await expect(authenticatePioneer()).rejects.toThrow("Pioneer Rejected Auth");
  });
});
