/**
 * MapCap Spot-price Dynamic Graph
 * Architected by Eslam Kora | Based on Philip Jennings' Use Case [Page 3, 8]
 * * Purpose: Visualizes the real-time growth of the MapCap token spot price.
 * Technical Spec: Responsive SVG-based line chart with dynamic scaling logic.
 */
import React from 'react';

const PriceGraph = ({ dailyPrices = [] }) => {
  // Configuration constants derived from the 4-week IPO roadmap [Source: 63]
  const TOTAL_DAYS = 28; 
  const GRAPH_WIDTH = 320; // Available horizontal span for the timeline
  const GRAPH_HEIGHT = 140; // Available vertical span for price movement
  const X_OFFSET = 40;     // Left padding for Y-axis labels
  const Y_OFFSET = 160;    // Bottom padding for X-axis labels

  /**
   * Defensive Check: If the system is in 'Initial Minting' or Day 0,
   * display a placeholder to maintain UI integrity as per Philip's spec.
   */
  if (!dailyPrices || dailyPrices.length === 0) {
    return (
      <div className="graph-container flex-center">
        <div className="calculating-placeholder">
          <p className="animate-pulse">Synchronizing Market Data...</p>
          <small>Spot-price calculation starts on Day 1</small>
        </div>
      </div>
    );
  }

  /**
   * Dynamic Scaling Logic:
   * Finds the maximum price in the current dataset to ensure the graph 
   * remains visible regardless of the price magnitude.
   */
  const maxPrice = Math.max(...dailyPrices, 1); // Avoid division by zero
  const yScaleFactor = GRAPH_HEIGHT / (maxPrice * 1.2); // Adding 20% overhead for visual comfort

  return (
    <div className="graph-container">
      <svg viewBox="0 0 400 200" className="mapcap-svg-graph" preserveAspectRatio="xMidYMid meet">
        
        {/* X-AXIS: Represents the 4-calendar-week timeline */}
        <line x1={X_OFFSET} y1={Y_OFFSET} x2="360" y2={Y_OFFSET} className="axis-line" />
        <text x={X_OFFSET} y={Y_OFFSET + 20} className="axis-label text-start">Week 1</text>
        <text x="360" y={Y_OFFSET + 20} className="axis-label text-end">Week 4</text>

        {/* Y-AXIS: Represents the Spot-price in Pi */}
        <line x1={X_OFFSET} y1="20" x2={X_OFFSET} y2={Y_OFFSET} className="axis-line" />
        <text x="10" y={Y_OFFSET} className="axis-label">0 π</text>
        <text x="10" y="30" className="axis-label highlight-price">
          {maxPrice.toFixed(4)}
        </text>

        {/* DATA PATH: Generates the growth line based on daily back-end points */}
        <polyline
          fill="none"
          stroke="#1b5e20" /* Official MapCap Green */
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={dailyPrices.map((price, index) => {
            const x = X_OFFSET + (index * (GRAPH_WIDTH / (TOTAL_DAYS - 1)));
            const y = Y_OFFSET - (price * yScaleFactor);
            return `${x},${y}`;
          }).join(' ')}
        />
        
        {/* DATA NODES: Circles at each data point for touch interaction/visibility */}
        {dailyPrices.map((price, index) => {
          const x = X_OFFSET + (index * (GRAPH_WIDTH / (TOTAL_DAYS - 1)));
          const y = Y_OFFSET - (price * yScaleFactor);
          
          // Only highlight the 'Current Day' node with a larger radius
          const isCurrentDay = index === dailyPrices.length - 1;
          
          return (
            <circle 
              key={index} 
              cx={x} 
              cy={y} 
              r={isCurrentDay ? "5" : "3"} 
              fill={isCurrentDay ? "#ffd700" : "#1b5e20"} /* Gold for current price */
              className={isCurrentDay ? "glow-node" : ""}
            />
          );
        })}

        {/* WATER-LEVEL INDICATOR: Optional visual aid for 'Water Level' formula [Source: Page 3] */}
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
      
      <div className="graph-footer-title">
        Current MapCap Spot-price (Daily Growth)
      </div>
    </div>
  );
};

export default PriceGraph;
