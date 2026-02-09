/**
 * MapCap API Gateway Service v1.3 - Production Grade
 * ---------------------------------------------------------
 * Lead Architect: Eslam Kora | AppDev @Map-of-Pi
 * Project: MapCap Ecosystem Bridge (React -> Node.js)
 * * Compliance Checklist:
 * - Philip Jennings: Real-time IPO Transparency & Metrics [Spec Page 4]
 * - Daniel: Financial Data Integrity Audit via Zod Schema Validation
 */

import axios from 'axios';
import { z } from 'zod';

/**
 * FINANCIAL DATA SCHEMA (Audit Pillar)
 * Enforces strict typing for inbound ledger data to prevent UI corruption
 * and ensure mathematical consistency for Capital Gain calculations.
 */
const IpoMetricsSchema = z.object({
  totalInvestors: z.number().min(0),
  totalPiInvested: z.number().min(0),
  userPiInvested: z.number().min(0),
  userCapitalGain: z.number().default(0),
  dailyPrices: z.array(z.number()).nonempty("Price history required for SVG rendering"),
  spotPrice: z.number().positive("Real-time spot price must be greater than zero")
});

/**
 * GATEWAY CONFIGURATION
 * Proxies requests to the MERN Backend with pre-defined timeouts 
 * for optimized performance within the Pi Browser environment.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10s threshold for mobile network resilience
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * GET IPO METRICS
 * Synchronizes the 4 Mandatory Metrics from the distributed ledger.
 * @param {string} username - Pioneer's unique identifier.
 * @returns {Promise<object>} Validated financial dataset.
 */
export const getIpoMetrics = async (username) => {
  try {
    const response = await apiClient.get('/mapcap-stats', { 
      params: { username } 
    });
    
    // Data Integrity Handshake: Validates raw API response against Financial Schema
    return IpoMetricsSchema.parse(response.data);
    
  } catch (error) {
    // Audit Logging: Catches schema mismatches or network failures
    if (error instanceof z.ZodError) {
      console.error("[Audit Alert] Schema Validation Failed:", error.errors);
    }
    
    console.error("[System Error] API Handshake Failed:", error.message);
    
    // Fail-Safe: Return zeroed state to maintain UI stability during downtime
    return {
      totalInvestors: 0,
      totalPiInvested: 0,
      userPiInvested: 0,
      userCapitalGain: 0,
      dailyPrices: [0, 0, 0, 0, 0],
      spotPrice: 0.00
    };
  }
};

/**
 * SYNC PAYMENT WITH BACKEND
 * Finalizes the bridge between Pi SDK Blockchain confirmation 
 * and the internal MapCap Equity Ledger.
 * @param {object} paymentData - { paymentId, username, amount }
 */
export const syncPaymentWithBackend = async (paymentData) => {
  try {
    const response = await apiClient.post('/approve-payment', paymentData);
    return response.data;
  } catch (error) {
    console.error("[Ledger Sync Error]: Transaction not recorded internally.", error.message);
    
    // Compliance: Alert the user to retain Payment ID for manual auditing if sync fails
    throw new Error("Transaction confirmed on Pi Network but pending in MapCap Ledger. Contact support.");
  }
};

/**
 * REQUEST WITHDRAWAL (A2UaaS)
 * Triggers the Asset-to-User Liquidity Flow based on user-defined equity percentage.
 * @param {string} username - Authenticated Pioneer.
 * @param {number} percentage - Liquidation portion requested.
 */
export const requestWithdrawal = async (username, percentage) => {
  try {
    const response = await apiClient.post('/request-withdraw', { username, percentage });
    return response.data;
  } catch (error) {
    console.error("[Liquidation Error]: Failed to process withdrawal request.", error.message);
    throw error;
  }
};
