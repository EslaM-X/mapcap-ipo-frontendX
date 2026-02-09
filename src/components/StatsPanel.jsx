/**
 * MapCap IPO Statistics Panel (Final Specification Build v1.4)
 * ---------------------------------------------------------
 * Architect: Eslam Kora | Spec: Philip Jennings & Daniel
 * Role: Real-time UI synchronization with Backend Whale-Shield logic.
 */
import React from 'react';
import { useIpo } from '../context/IpoContext';

const StatsPanel = () => {
  // Consuming metrics from Global Context (Hydrated by IpoController.js)
  const { metrics, loading } = useIpo();
  
  // Extracting values sent by the backend v1.4
  const { 
    totalInvestors, 
    totalPiInvested, 
    userPiInvested, 
    userCapitalGain,
    isWhale // The flag calculated by Daniel's logic on the server
  } = metrics;

  /**
   * LOADING STATE:
   * Professional branding transition while synchronizing with the Node.js Ledger.
   */
  if (loading) {
    return (
      <section className="stats-panel flex-center">
        <div className="animate-pulse" style={{ color: 'var(--mapcap-green)', fontWeight: '600' }}>
          Auditing MapCap Ledger...
        </div>
      </section>
    );
  }

  return (
    <section className="stats-panel">
      {/* SECTION HEADING: Per Philip's UX Layout Page 8 */}
      <h3 className="section-title">MapCap IPO Statistics:</h3>
      
      <div className="stats-list">
        {/* VALUE 1: Global Pioneer Count */}
        <div className="stat-item">
          <span className="stat-label">• Total investors to date.</span>
          <span className="stat-value">{(totalInvestors || 0).toLocaleString()}</span>
        </div>

        {/* VALUE 2: Global Liquidity Pool */}
        <div className="stat-item">
          <span className="stat-label">• Total pi invested to date.</span>
          <span className="stat-value">{(totalPiInvested || 0).toLocaleString()} π</span>
        </div>

        {/* VALUE 3: Individual Contribution */}
        <div className="stat-item">
          <span className="stat-label">• Your pi invested to date.</span>
          <span className="stat-value">{(userPiInvested || 0).toLocaleString()} π</span>
        </div>

        {/* VALUE 4: Alpha Gain (Automatic 20% Uplift) */}
        <div className="stat-item highlight-gain">
          <span className="stat-label">• Your capital gain to date.</span>
          <span className="stat-value">
            {(userCapitalGain || 0).toLocaleString(undefined, { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 4 
            })} π
          </span>
        </div>
      </div>

      {/* DANIEL'S WHALE SHIELD: Server-side Compliance UI [Page 5 & 6] */}
      {isWhale && (
        <div className="whale-warning animate-pulse">
          ⚠️ Compliance: Investment exceeds 10% pool limit. Excess will be refunded.
        </div>
      )}
    </section>
  );
};

export default StatsPanel;
