/**
 * MapCap IPO - Main Application Layout (Context-Enabled)
 * ---------------------------------------------------------
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Project: MapCap Ecosystem | Spec: Philip Jennings & Daniel
 * * DESIGN PRINCIPLE:
 * This component enforces the 33.33% vertical split while acting
 * as the orchestrator for Pi SDK authentication and data hydration.
 */

import React, { useEffect } from 'react';
import './App.css';

// Importing UI Components per Philip's Layout [Source: Page 8]
import Navbar from './components/Navbar';
import PriceGraph from './components/PriceGraph';
import StatsPanel from './components/StatsPanel';
import ActionButtons from './components/ActionButtons';

// Global State Management
import { useIpo } from './context/IpoContext';
import { PiService } from './services/pi.service';

function App() {
  const { 
    currentUser, 
    setCurrentUser, 
    metrics, 
    loading, 
    setLoading, 
    refreshData 
  } = useIpo();

  /**
   * Lifecycle: Bootstrapping the MapCap Ecosystem.
   * Handles Pi SDK Handshake and initial data fetch.
   */
  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (window.Pi) {
          // Initialize Pi SDK (Set sandbox: false for Production Launch)
          window.Pi.init({ version: "2.0", sandbox: true });
          
          // Step 1: Secure Pioneer Authentication
          const user = await PiService.authenticate();
          setCurrentUser(user);
          
          // Step 2: Hydrate Global State with Pioneer-specific Metrics
          await refreshData(user.username);
        }
      } catch (err) {
        console.error("Critical: SDK handshake failed or Pioneer rejected Auth.", err);
      } finally {
        setLoading(false); // Transition out of loading state
      }
    };

    initializeApp();
  }, [setCurrentUser, refreshData, setLoading]);

  /**
   * LOADING SCREEN (U2A Branding)
   * Enforced during the verification of the Pi Ledger and User Auth.
   */
  if (loading) {
    return (
      <div className="flex-center loading-screen" style={{height: '100vh', background: 'var(--mapcap-green)', color: 'var(--mapcap-gold)'}}>
        <div className="text-center animate-pulse">
          <h2 style={{letterSpacing: '3px', fontWeight: '800'}}>MAPCAP IPO</h2>
          <p style={{fontSize: '0.85rem', marginTop: '12px', opacity: '0.9'}}>Auditing Pi Network Ledger...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mapcap-root">
      
      {/* SECTION 1: TOP (33.33vh) - Branding & Market Visualization
          Displays the PriceGraph fed by dailyPrices dataset. */}
      
      <section className="section-top">
        <Navbar username={currentUser?.username} />
        <PriceGraph />
      </section>

      {/* SECTION 2: MIDDLE (33.33vh) - Transparency Ledger
          Renders Value 1, 2, 3, and 4 (Capital Gain) metrics. */}
      <section className="section-middle">
        <StatsPanel />
      </section>

      {/* SECTION 3: BOTTOM (33.33vh) - Pioneer Liquidity Controls
          The action hub for IPO participation (Invest/Withdraw). */}
      <section className="section-bottom">
        <ActionButtons />
      </section>

    </div>
  );
}

export default App;
