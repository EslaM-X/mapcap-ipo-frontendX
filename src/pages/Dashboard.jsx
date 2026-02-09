/**
 * Dashboard.jsx - The MapCap IPO "Single-Screen" Experience
 * ---------------------------------------------------------
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Goal: Implements Philip's Page 4 Spec with real-time Pi metrics.
 */

import React from 'react';
import { useIpoStats } from '../hooks/useIpoStats';
import { usePiNetwork } from '../hooks/usePiNetwork';

const Dashboard = () => {
  // 1. Initialize Pi SDK context (Daniel's Security Pillar)
  const { user, authenticated, createPayment } = usePiNetwork();

  // 2. Initialize Real-time Stats using the authenticated username
  const { 
    totalInvestors,    // Value 1
    totalPiInvested,   // Value 2
    userPiInvested,    // Value 3
    userCapitalGain,   // Value 4
    spotPrice, 
    loading, 
    error 
  } = useIpoStats(user?.username);

  if (loading) return <div className="loader">Synchronizing with MapCap Ledger...</div>;
  if (error) return <div className="error-banner">{error}</div>;

  return (
    <div className="dashboard-wrapper">
      <header className="hero-section">
        <h1 className="gold-text">MapCap IPO Pulse</h1>
        <p>Live Valuation Metrics for Pioneers</p>
      </header>

      <div className="stats-grid">
        {/* Value 1: Community Growth */}
        <div className="stat-card">
          <h3>Total Investors</h3>
          <p className="value">{totalInvestors.toLocaleString()}</p>
        </div>

        {/* Value 2: The Water-Level (Global Pool) */}
        <div className="stat-card highlight">
          <h3>Total Pi Contributed</h3>
          <p className="value">{totalPiInvested.toFixed(2)} π</p>
        </div>

        {/* Value 3: Personal Stake */}
        <div className="stat-card">
          <h3>Your Contribution</h3>
          <p className="value">{userPiInvested.toFixed(2)} π</p>
        </div>

        {/* Value 4: ALPHA GAIN (The 20% Guaranteed Appreciation) */}
        <div className="stat-card gold-border">
          <h3>Your Capital Gain (20%)</h3>
          <p className="value">+{userCapitalGain.toFixed(2)} π</p>
          <small>Estimated Profit on Maturity</small>
        </div>
      </div>

      <section className="action-area">
        <div className="price-indicator">
          <span>Current Spot Price:</span>
          <strong>{spotPrice} π / Share</strong>
        </div>

        <button 
          className="invest-btn"
          onClick={() => createPayment(10, "MapCap IPO Share Acquisition")}
        >
          Invest 10 π Now
        </button>
      </section>

      <footer className="security-note">
        <p>Shielded by Whale-Cap Level 4 Protocol | Verified by Pi SDK</p>
      </footer>
    </div>
  );
};

export default Dashboard;
