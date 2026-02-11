/**
 * MapCap Hook Synchronization - Heartbeat Suite
 * ---------------------------------------------------------
 * Standard: Real-time Polling & Resilience v1.0
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Purpose: Verifies the 30-second polling logic and error 
 * boundaries for the 4 Mandatory IPO Metrics.
 */

import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import { useIpoStats } from '../src/hooks/useIpoStats';
import { getIpoMetrics } from '../src/services/api.service';

// Mock the API service
vi.mock('../src/services/api.service');

describe('HOOK AUDIT: useIpoStats Heartbeat & Sync', () => {

  beforeEach(() => {
    vi.useFakeTimers(); // Controlled time for polling tests
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * TEST CASE 01: Initial Hydration
   */
  test('SYNC: Should fetch metrics immediately on mount', async () => {
    getIpoMetrics.mockResolvedValue({ totalPiInvested: 56700 });

    const { result } = renderHook(() => useIpoStats('Eslam-X'));

    await waitFor(() => {
      expect(result.current.totalPiInvested).toBe(56700);
      expect(result.current.loading).toBe(false);
    });
  });

  /**
   * TEST CASE 02: Polling Execution (The 30s Rule)
   * Objective: Ensure the "Water-Level" logic refreshes periodically.
   */
  test('POLLING: Should trigger refreshStats every 30 seconds', async () => {
    getIpoMetrics.mockResolvedValue({ totalPiInvested: 100 });

    renderHook(() => useIpoStats('Eslam-X'));

    // Move time forward by 31 seconds
    vi.advanceTimersByTime(31000);

    expect(getIpoMetrics).toHaveBeenCalledTimes(2); // Initial + 1st Poll
  });

  /**
   * TEST CASE 03: Error Handling Compliance
   */
  test('RESILIENCE: Should catch API failures and set professional error message', async () => {
    getIpoMetrics.mockRejectedValue(new Error("Network Down"));

    const { result } = renderHook(() => useIpoStats('Eslam-X'));

    await waitFor(() => {
      expect(result.current.error).toContain("Sync Failure");
      expect(result.current.loading).toBe(false);
    });
  });
});
