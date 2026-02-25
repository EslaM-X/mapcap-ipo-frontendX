import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatsBoard from './components/StatsBoard';
import IpoChart from './components/IpoChart';
import ActionButtons from './components/ActionButtons';
import './App.css';

/**
 * Main MVP Dashboard.
 * Syncs Graph, Stats, and Actions with Backend.
 */
const App: React.FC = () => {
    const [ipoData, setIpoData] = useState<any>({
        totalInvestors: 0,
        totalPiInvested: 0,
        userPiBalance: 0,
        spotPrice: 0,
        history: [] // Added to support the graph
    });

    const fetchIpoStatus = async () => {
        try {
            // Updated to ensure it hits your local backend
            const response = await axios.get('http://localhost:3001/api/ipo/status');
            setIpoData(response.data);
        } catch (error) {
            console.error("Sync failed:", error);
        }
    };

    useEffect(() => {
        fetchIpoStatus();
        const interval = setInterval(fetchIpoStatus, 15000); // Shorter interval for better Demo feel
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="app-wrapper">
            <header className="navbar">
                <h1>MapCapIPO</h1>
            </header>

            <main className="content">
                {/* 1. Graph Section (Dynamic History) */}
                <section className="top-section">
                    <IpoChart data={ipoData.history} />
                </section>

                {/* 2. Stats Section (Real-time Numbers) */}
                <section className="middle-section">
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        spotPrice={ipoData.spotPrice}
                    />
                </section>

                {/* 3. Actions Section (Invest/Withdraw) */}
                <section className="bottom-section">
                    <ActionButtons onTransactionSuccess={fetchIpoStatus} />
                </section>
            </main>
        </div>
    );
};

export default App;
