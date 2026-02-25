/**
 * MapCap API Service - Financial Integrity & Schema Audit
 * ---------------------------------------------------------
 * Security Standard: Daniel's Zod Validation Compliance
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Purpose: Validates the data handshake between Frontend and 
 * Node.js Ledger, ensuring zero-data fail-safes.
 */

import { vi, describe, test, expect, beforeEach } from 'vitest';
import axios from 'axios';
import { getIpoMetrics, syncPaymentWithBackend } from '../src/services/api.service';

// Mocking axios to intercept network requests
vi.mock('axios');

describe('API SERVICE AUDIT: Financial Data & Ledger Sync', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * TEST CASE 01: Successful Schema Validation
   * Objective: Ensure that a valid backend response (e.g., 56,700 Pi) passes the Zod handshake.
   */
  test('INTEGRITY: Should validate and return correct metrics for a Pioneer', async () => {
    const mockBackendData = {
      totalInvestors: 150,
      totalPiInvested: 56700,
      userPiInvested: 100,
      userCapitalGain: 20,
      dailyPrices: [10, 12, 15, 14, 18],
      spotPrice: 0.0001
    };

    axios.create.mockReturnValue({
      get: vi.fn().mockResolvedValue({ data: mockBackendData })
    });

    const data = await getIpoMetrics('Eslam-X');

    // Validation: Ensures Zod successfully parsed the 56,700 Pi value
    expect(data.totalPiInvested).toBe(56700);
    expect(data.totalInvestors).toBe(150);
  });

  /**
   * TEST CASE 02: Fail-Safe Trigger (Zod Validation Failure)
   * Objective: If backend sends corrupt data, ensure the UI reverts to a zeroed state.
   */
  test('FAIL-SAFE: Should return zeroed state if schema validation fails', async () => {
    const corruptData = { 
        totalInvestors: "Not a Number", // This should trigger a Zod error
        totalPiInvested: 56700 
    };

    axios.create.mockReturnValue({
      get: vi.fn().mockResolvedValue({ data: corruptData })
    });

    const data = await getIpoMetrics('Eslam-X');

    // Validation: Ensures the return of the hardcoded fail-safe state
    expect(data.totalInvestors).toBe(0);
    expect(data.totalPiInvested).toBe(0);
  });

  /**
   * TEST CASE 03: Ledger Sync Reliability (POST Request)
   * Objective: Verify that payments are synchronized with the MapCap Ledger.
   */
  test('LEDGER SYNC: Should synchronize payment details with backend internally', async () => {
    const paymentPayload = {
      paymentId: 'pay_12345',
      username: 'Eslam-X',
      amount: 10
    };

    const mockResponse = { success: true, message: "Ledger Updated" };
    
    const postMock = vi.fn().mockResolvedValue({ data: mockResponse });
    axios.create.mockReturnValue({ post: postMock });

    const result = await syncPaymentWithBackend(paymentPayload);

    // Validation: Ensures the correct endpoint and payload were used
    expect(postMock).toHaveBeenCalledWith('/approve-payment', paymentPayload);
    expect(result.success).toBe(true);
  });
});
