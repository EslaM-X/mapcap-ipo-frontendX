/**
 * MapCap IPO Statistics Panel (Final Specification Build)
 * ---------------------------------------------------------
 * Architect: Eslam Kora | Spec: Philip Jennings [Page 4, 8]
 * Role: Real-time UI synchronization for Pioneer Metrics.
 */
import React from 'react';
import { useIpo } from '../context/IpoContext';

const StatsPanel = () => {
  [cite_start]// Consumption of Global State [cite: 73-75]
  const { metrics, loading } = useIpo();

  /**
   * Value 4: Capital Gain Calculation
   * [cite_start]Spec: This value is 20% greater than Value 3 (User's pi invested).[span_5](end_span)
   */
  const capitalGain = (metrics.userPi || 0) * 1.20;

  [span_6](start_span)// Placeholder while auditing the Pi Network Ledger[span_6](end_span)
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
      [span_7](start_span){/* Heading as per Page 8 visual layout[span_7](end_span) */}
      <h3 className="section-title">MapCap IPO Statistics:</h3>
      
      <div className="stats-list">
        [span_8](start_span){/* Value 1: Unique IPO pioneers count[span_8](end_span) */}
        <div className="stat-item">
          <span className="stat-label">• Total investors to date.</span>
          <span className="stat-value">{(metrics.totalInvestors || 0).toLocaleString()}</span>
        </div>

        [span_9](start_span){/* Value 2: Aggregate pi invested by all pioneers[span_9](end_span) */}
        <div className="stat-item">
          <span className="stat-label">• Total pi invested to date.</span>
          <span className="stat-value">{(metrics.totalPi || 0).toLocaleString()} π</span>
        </div>

        [span_10](start_span){/* Value 3: Current user's specific pi balance[span_10](end_span) */}
        <div className="stat-item">
          <span className="stat-label">• Your pi invested to date.</span>
          <span className="stat-value">{(metrics.userPi || 0).toLocaleString()} π</span>
        </div>

        [span_11](start_span)[span_12](start_span){/* Value 4: Capital gain projection (20% uplift)[span_11](end_span)[span_12](end_span) */}
        <div className="stat-item highlight-gain">
          <span className="stat-label">• Your capital gain to date.</span>
          <span className="stat-value">{capitalGain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} π</span>
        </div>
      </div>

      [span_13](start_span)[span_14](start_span){/* Daniel's Anti-Whale Enforcement Visibility [cite: 90-91] */}
      {metrics.userPi > (metrics.totalPi * 0.1) && metrics.totalPi > 0 && (
        <div className="whale-warning animate-pulse">
          ⚠️ Compliance: Investment exceeds 10% limit. Excess will be refunded.
        </div>
      )}
    </section>
  );
};

export default StatsPanel;
