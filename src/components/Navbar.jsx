/**
 * MapCapIPO Official Navbar
 * Based on Philip Jennings' Use Case Document (Feb 6, 2026)
 * [Source: Page 3]
 */
import React from 'react';

const Navbar = () => {
  /**
   * Help Action: Opens Chat With Map (M.A.C AI Chatbot)
   * [span_1](start_span)[Source:[span_1](end_span)]
   */
  const handleHelpClick = () => {
    window.location.href = "https://chatwithmac.com";
  };

  /**
   * Refresh Action: Refreshes the screen with latest data
   * [span_2](start_span)[Source:[span_2](end_span)]
   */
  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <nav className="main-navbar">
      [span_3](start_span){/* App Title: Gold font, centralized in the top half[span_3](end_span) */}
      <div className="navbar-title">MapCapIPO app</div>

      [span_4](start_span){/* Navigation Icons: Five gold icons spread across the width[span_4](end_span) */}
      <div className="navbar-icons">
        
        [span_5](start_span){/* Left: Inactive Back button (Gold left-facing arrow)[span_5](end_span) */}
        <span className="icon-gold" title="Back">←</span>

        [span_6](start_span){/* Left/Middle: Inactive Home button (Gold silhouette of a house)[span_6](end_span) */}
        <span className="icon-gold" title="Home">🏠</span>

        [span_7](start_span){/* Middle: MapCap token icon (Circular gold border, light green background)[span_7](end_span) */}
        <div className="token-icon-wrapper">
          <span className="icon-gold pi-logo">π</span>
        </div>

        [span_8](start_span){/* Right/Middle: Active Help button (Circle with question mark)[span_8](end_span) */}
        <span 
          className="icon-gold active-btn" 
          title="Help" 
          onClick={handleHelpClick}
        >
          ?
        </span>

        [span_9](start_span){/* Right: Active Refresh button (Two arrows around a circle)[span_9](end_span) */}
        <span 
          className="icon-gold active-btn" 
          title="Refresh" 
          onClick={handleRefreshClick}
        >
          ↻
        </span>

      </div>
    </nav>
  );
};

export default Navbar;
