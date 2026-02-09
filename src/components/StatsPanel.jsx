/**
 * MapCap IPO Statistics Panel (Enhanced with Context API)
 * ---------------------------------------------------------
 * Architect: Eslam Kora | Based on Philip Jennings' Specification
 * Role: Real-time UI synchronization for Pioneer Metrics.
 */
import React from 'react';
import { useIpo } from '../context/IpoContext';

const StatsPanel = () => {
  // Pulling shared state from our custom Hook [Source: Requirements 73-75]
  const { metrics, loading } = useIpo();

  /**
   * Value 4: Capital Gain Calculation
   * Logic: IPO entries are pegged at a 20% discount relative to LP value.
   * Visualization shows the immediate equity gain for the Pioneer.
   */
  const capitalGain = (metrics.userPi || 0) * 1.20;

  // Placeholder with branding animation during Pi SDK handshake
  if (loading) {
    return (
      <section className="stats-panel flex-center">
        <div className="animate-pulse" style={{color: 'var(--mapcap-green)'}}>
          Auditing MapCap Ledger...
        </div>
      </section>
    );
  }

  return (
    <section className="stats-panel">
      {/* Official Layout Heading [Source: Page 8] */}
      <h3 className="section-title">MapCap IPO Statistics:</h3>
      
      <div className="stats-list">
        {/* Value 1: Global Pioneer Participation */}
        <div className="stat-item">
          <span className="stat-label">• Total investors to date:</span>
          <span className="stat-value">{(metrics.totalInvestors || 0).toLocaleString()}</span>
        </div>

        {/* Value 2: Total Liquidity in Escrow */}
        <div className="stat-item">
          <span className="stat-label">• Total pi invested to date:</span>
          <span className="stat-value">{(metrics.totalPi || 0).toLocaleString()} π</span>
        </div>

        {/* Value 3: Individual Pioneer Portfolio */}
        <div className="stat-item">
          <span className="stat-label">• Your pi invested to date:</span>
          <span className="stat-value">{(metrics.userPi || 0).toLocaleString()} π</span>
        </div>

        {/* Value 4: Alpha Gain (The 20% Early Adopter Benefit) */}
        <div className="stat-item highlight-gain">
          <span className="stat-label">• Your capital gain (+20%):</span>
          <span className="stat-value">{capitalGain.toLocaleString()} π</span>
        </div>
      </div>

      {/* Anti-Whale Compliance Alert [Source: Page 5] */}
      {metrics.userPi > (metrics.totalPi * 0.1) && metrics.totalPi > 0 && (
        <div className="whale-warning animate-pulse">
          ⚠️ Compliance: Contribution exceeds 10% total pool limit.
        </div>
      )}
    </section>
  );
};

export default StatsPanel;
