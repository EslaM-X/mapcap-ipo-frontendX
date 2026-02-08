/**
 * StatCard Component
 * Reusable card for displaying key IPO metrics with a glassmorphism effect.
 */
import React from 'react';

const StatCard = ({ label, value, colorClass, percentage }) => {
  return (
    <div className={`stat-card ${colorClass}`}>
      <label className="stat-label">{label}</label>
      <div className="stat-value">{value.toLocaleString()}</div>
      {percentage && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
          <span className="percentage-text">{percentage}% Allocation</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;

