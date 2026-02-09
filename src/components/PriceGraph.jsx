/**
 * MapCap Spot-price Dynamic Graph (Context-Enabled)
 * ---------------------------------------------------------
 * Lead Architect: Eslam Kora | Spec: Philip Jennings [Page 3, 8]
 * Project: MapCap Ecosystem | Map-of-Pi
 * * Purpose: 
 * Visualizes the 28-day price trajectory using SVG. 
 * Consumes 'dailyPrices' from IpoContext for real-time market reflection.
 */

import React from 'react';
import { useIpo } from '../context/IpoContext';

const PriceGraph = () => {
  // Consuming global metrics from Context
  const { metrics, loading } = useIpo();
  const { dailyPrices = [] } = metrics;

  // Configuration constants for the 4-week roadmap [Source: Requirement 63]
  const TOTAL_DAYS = 28; 
  const GRAPH_WIDTH = 320; 
  const GRAPH_HEIGHT = 140; 
  const X_OFFSET = 40;     
  const Y_OFFSET = 160;    

  /**
   * Placeholder Logic: Displays during initial handshake or if Day 0.
   * Aligns with Philip's requirement for a "clean, professional entry".
   */
  if (loading || !dailyPrices || dailyPrices.length === 0) {
    return (
      <div className="graph-container flex-center">
        <div className="calculating-placeholder text-center">
          <p className="animate-pulse" style={{color: 'var(--mapcap-green)', fontWeight: '600'}}>
            Synchronizing Market Data...
          </p>
          <small style={{color: 'var(--text-muted)'}}>Spot-price calculation starts on Day 1</small>
        </div>
      </div>
    );
  }

  /**
   * Dynamic Scaling: Normalizes the price points to fit the SVG viewport.
   */
  const maxPrice = Math.max(...dailyPrices, 0.0001); 
  const yScaleFactor = GRAPH_HEIGHT / (maxPrice * 1.2); 

  return (
    <div className="graph-container">
      <svg viewBox="0 0 400 200" className="mapcap-svg-graph" preserveAspectRatio="xMidYMid meet">
        
        {/* X-AXIS: The 4-Calendar-Week Timeline */}
        <line x1={X_OFFSET} y1={Y_OFFSET} x2="360" y2={Y_OFFSET} className="axis-line" />
        <text x={X_OFFSET} y={Y_OFFSET + 20} className="axis-label">Week 1</text>
        <text x="360" y={Y_OFFSET + 20} className="axis-label" textAnchor="end">Week 4</text>

        {/* Y-AXIS: Price Magnitude in Pi */}
        <line x1={X_OFFSET} y1="20" x2={X_OFFSET} y2={Y_OFFSET} className="axis-line" />
        <text x="10" y={Y_OFFSET} className="axis-label">0 π</text>
        <text x="10" y="30" className="axis-label highlight-price" style={{fill: 'var(--mapcap-green)', fontWeight: '700'}}>
          {maxPrice.toFixed(4)}
        </text>

        {/* GROWTH PATH: The core visualization of the 'Water-Level' growth */}
        <polyline
          fill="none"
          stroke="var(--mapcap-green)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={dailyPrices.map((price, index) => {
            const x = X_OFFSET + (index * (GRAPH_WIDTH / (TOTAL_DAYS - 1)));
            const y = Y_OFFSET - (price * yScaleFactor);
            return `${x},${y}`;
          }).join(' ')}
        />
        
        {/* NODES: Data points for visual clarity */}
        {dailyPrices.map((price, index) => {
          const x = X_OFFSET + (index * (GRAPH_WIDTH / (TOTAL_DAYS - 1)));
          const y = Y_OFFSET - (price * yScaleFactor);
          const isCurrentDay = index === dailyPrices.length - 1;
          
          return (
            <circle 
              key={index} 
              cx={x} 
              cy={y} 
              r={isCurrentDay ? "6" : "3"} 
              fill={isCurrentDay ? "var(--mapcap-gold)" : "var(--mapcap-green)"}
              className={isCurrentDay ? "glow-node" : ""}
            />
          );
        })}

        {/* CURRENT PRICE INDICATOR: Horizontal dashed guideline [Source: Page 3] */}
        {dailyPrices.length > 0 && (
          <line 
            x1={X_OFFSET} 
            y1={Y_OFFSET - (dailyPrices[dailyPrices.length - 1] * yScaleFactor)} 
            x2="360" 
            y2={Y_OFFSET - (dailyPrices[dailyPrices.length - 1] * yScaleFactor)} 
            className="price-guideline" 
            strokeDasharray="4"
          />
        )}
      </svg>
      
      <div className="graph-footer-title" style={{color: 'var(--mapcap-green)', fontSize: '0.8rem', marginTop: '5px', fontWeight: '600'}}>
        Spot Price: {dailyPrices[dailyPrices.length - 1]?.toFixed(4)} Pi
      </div>
    </div>
  );
};

export default PriceGraph;
