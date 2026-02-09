/**
 * MapCap IPO - Main Application Layout (Context-Enabled)
 * ---------------------------------------------------------
 * Architect: Eslam Kora | Visionaries: Philip Jennings & Daniel
 * Role: Structural Orchestrator for the Single-Screen Web3 UI.
 * * * DESIGN PRINCIPLE:
 * This component remains "Lean" by consuming state from IpoContext.
 * It enforces the 33.33% vertical split required by the specification.
 */

import React, { useEffect } from 'react';
import './App.css';

// Importing UI Components [Source: Page 8 - Screen Design]
import Navbar from './components/Navbar';
import PriceGraph from './components/PriceGraph';
import StatsPanel from './components/StatsPanel';
import ActionButtons from './components/ActionButtons';

// Importing the Global State Hook
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
   * Lifecycle: Bootstrapping the MapCap Ecosystem within Pi Browser.
   */
  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (window.Pi) {
          // Initialize Pi SDK (Sandbox mode for testing phase)
          window.Pi.init({ version: "2.0", sandbox: true });
          
          // Authenticate Pioneer and establish the global session
          const user = await PiService.authenticate();
          setCurrentUser(user);
          
          // Sync data specifically for this Pioneer username
          await refreshData(user.username);
        }
      } catch (err) {
        console.error("Critical Engine Failure: Auth or SDK initialization error", err);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  /**
   * Loading State: Branded UX during Pi SDK handshake and Blockchain sync.
   */
  if (loading) {
    return (
      <div className="flex-center loading-screen" style={{height: '100vh', background: 'var(--mapcap-green)', color: 'var(--mapcap-gold)'}}>
        <div className="text-center animate-pulse">
          <h2 style={{letterSpacing: '2px'}}>MAPCAP IPO</h2>
          <p style={{fontSize: '0.9rem', marginTop: '10px'}}>Synchronizing Pi Ledger...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mapcap-root">
      
      {/* SECTION 1: TOP (33.33vh) - Branding & Market Visualization
          Displays the dynamic growth graph based on IPO water-level logic. */}
      <section className="section-top">
        <Navbar username={currentUser?.username} />
        <PriceGraph dailyPrices={metrics.dailyPrices} />
      </section>

      {/* SECTION 2: MIDDLE (33.33vh) - Transparent Tokenomics Stats
          Consumes real-time metrics for Value 1, 2, 3, and 4. */}
      <section className="section-middle">
        <StatsPanel />
      </section>

      {/* SECTION 3: BOTTOM (33.33vh) - Pioneer Liquidity Controls
          Invest (U2A) and Withdraw (A2UaaS) action center. */}
      <section className="section-bottom">
        <ActionButtons />
      </section>

    </div>
  );
}

export default App;
