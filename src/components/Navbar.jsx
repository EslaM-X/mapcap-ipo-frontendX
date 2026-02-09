/**
 * MapCap IPO Official Navbar (Context-Aware)
 * ---------------------------------------------------------
 * Architect: Eslam Kora | Spec: Philip Jennings [Page 3, 8]
 * Project: MapCap Ecosystem | Map-of-Pi
 * * This component renders the top-tier branding and navigation icons.
 * Enhanced to support real-time data re-sync via Context Hook.
 */

import React from 'react';
import { useIpo } from '../context/IpoContext';

const Navbar = () => {
  // Accessing global state and refresh trigger from Context
  const { currentUser, refreshData, setLoading } = useIpo();

  /**
   * Action: External Help
   * Redirects the Pioneer to the M.A.C AI Chatbot for support.
   */
  const handleHelpClick = () => {
    window.location.href = "https://chatwithmac.com";
  };

  /**
   * Action: Smart Sync
   * Re-fetches the latest IPO metrics from the MERN engine without a full page reload.
   * Aligns with Requirement [78] for data transparency.
   */
  const handleRefreshClick = async () => {
    if (currentUser?.username) {
      setLoading(true);
      await refreshData(currentUser.username);
      setLoading(false);
    } else {
      // Fallback: If session is lost, reload the entire SDK lifecycle
      window.location.reload();
    }
  };

  return (
    <nav className="main-navbar">
      {/* App Branding: Centralized gold title on green background [Page 8] */}
      <div className="navbar-title">
        MapCapIPO {currentUser ? `- @${currentUser.username}` : 'app'}
      </div>

      {/* Navigation Icons: Balanced 5-icon spread across the viewport */}
      <div className="navbar-icons">
        
        {/* Left: Navigational Placeholder (Gold left-facing arrow) */}
        <span className="icon-gold" title="Back">←</span>

        {/* Left/Middle: Home silhouette - Inactive in Single-Screen layout */}
        <span className="icon-gold" title="Home">🏠</span>

        {/* Center: The MapCap/Pi Token Branding */}
        <div className="token-icon-wrapper">
          <span className="icon-gold pi-logo animate-pulse">π</span>
        </div>

        {/* Right/Middle: Active Help (Link to Chat with Map) */}
        <span 
          className="icon-gold active-btn" 
          title="Help" 
          onClick={handleHelpClick}
        >
          ❓
        </span>

        {/* Right: Active Smart-Refresh (Real-time Ledger Sync) */}
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
