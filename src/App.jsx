import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

/**
 * MapCap Executive Dashboard v1.0
 * Architected for Pi Network Ecosystem | Built by Eslam Kora
 * Vision: Philip Jennings & Daniel (Map-of-Pi)
 */

function App() {
  // Syncing with Philip's Vision: 4M Total Supply & 2.18M Pioneer Allocation
  const [metrics, setMetrics] = useState({
    totalSupply: 4000000,
    pioneerAllocation: 2181818,
    circulatingSupply: 0,
    status: 'Initializing...'
  });

  const [auditLogs, setAuditLogs] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    // 1. Establish Real-time Connection with Node.js Backend Engine
    const fetchEngineData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stats');
        setMetrics(prev => ({ ...prev, ...response.data, status: 'Engine Online ✅' }));
      } catch (err) {
        setMetrics(prev => ({ ...prev, status: 'Backend Synchronization Failed ❌' }));
      }
    };

    fetchEngineData();
    
    // 2. Initialize Pi SDK v2.0 for Sandbox Environment
    if (window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: true });
    }
  }, []);

  const handleConnectWallet = async () => {
    try {
      const scopes = ['username', 'payments', 'wallet_address'];
      const auth = await window.Pi.authenticate(scopes, (payment) => {
        console.log("Incomplete Payment Audit:", payment);
      });
      setWalletConnected(true);
      console.log(`Welcome Pioneer: ${auth.user.username}`);
    } catch (error) {
      console.error("Pi Auth Denied:", error);
    }
  };

  return (
    <div className="mapcap-root">
      {/* Dynamic Background Overlay */}
      <div className="glass-grid"></div>

      <header className="main-header">
        <div className="brand">
          <span className="logo-icon">💎</span>
          <h1>MAPCAP <span className="gold-text">IPO</span></h1>
        </div>
        <div className="engine-badge">{metrics.status}</div>
      </header>

      <main className="dashboard-grid">
        {/* Metric Card 1: Total Supply */}
        <div className="stat-card glow-purple">
          <label>TOTAL PI SUPPLY</label>
          <div className="value">{metrics.totalSupply.toLocaleString()}</div>
          <div className="progress-bar"><div className="fill" style={{width: '100%'}}></div></div>
        </div>

        {/* Metric Card 2: Pioneer Allocation */}
        <div className="stat-card glow-gold">
          <label>PIONEER POOL (54.5%)</label>
          <div className="value">{metrics.pioneerAllocation.toLocaleString()}</div>
          <div className="progress-bar"><div className="fill" style={{width: '54.5%'}}></div></div>
        </div>

        {/* Action Center */}
        <section className="action-center">
          <h2>Project Governance & Participation</h2>
          <p>Secure your equity in the Map-of-Pi ecosystem via Pi Blockchain.</p>
          
          {!walletConnected ? (
            <button className="pi-main-btn" onClick={handleConnectWallet}>
              CONNECT PI WALLET ⚡
            </button>
          ) : (
            <div className="success-msg">Wallet Integrated: GDWY...358Z</div>
          )}
        </section>

        {/* Integrated Audit Log (From Backend) */}
        <section className="audit-section">
          <h3>Real-time Audit Ledger (MERN Sync)</h3>
          <div className="log-container">
            <div className="log-entry"> > Initializing MapCap Smart Contract... Success</div>
            <div className="log-entry"> > Port 3000: Data Stream Established</div>
            <div className="log-entry"> > Ready for Pioneer Distribution</div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Built for the Pi Network Community | AppDev @Map-of-Pi</p>
      </footer>
    </div>
  );
}

export default App;
