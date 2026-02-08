/**
 * MapCap IPO Statistics Panel
 * Based on Philip Jennings' Specification [Source: Page 4]
 * Displays critical wallet and investment metrics for the Pioneer.
 */
import React from 'react';

const StatsPanel = ({ metrics }) => {
  // Value 4: User's capital gain calculation (20% above Value 3) [Source: 10, 75]
  const capitalGain = metrics.userPi * 1.20;

  return (
    <section className="stats-panel">
      {/* Title as seen in the screen layout image [Source: 96] */}
      <h3 className="section-title">MapCap IPO Statistics:</h3>
      
      <div className="stats-list">
        {/* Value 1: Total unique IPO pioneers [Source: 73] */}
        <div className="stat-item">
          • Total investors to date: <strong>{metrics.totalInvestors.toLocaleString()}</strong>
        </div>

        {/* Value 2: Total Pi accumulated in the MapCapIPO wallet [Source: 74] */}
        <div className="stat-item">
          • Total pi invested to date: <strong>{metrics.totalPi.toLocaleString()} π</strong>
        </div>

        {/* Value 3: Current user's specific pi balance [Source: 75] */}
        <div className="stat-item">
          • Your pi invested to date: <strong>{metrics.userPi.toLocaleString()} π</strong>
        </div>

        {/* Value 4: Projected value after 20% capital increase [Source: 10, 75] */}
        <div className="stat-item highlight-gain">
          • Your capital gain to date: <strong>{capitalGain.toLocaleString()} π</strong>
        </div>
      </div>
    </section>
  );
};

export default StatsPanel;
