import React, { useState, useEffect } from 'react';
import StatsBoard from './components/StatsBoard.tsx';
import IpoChart from './components/IpoChart.tsx';
import ActionButtons from './components/ActionButtons.tsx';
import { piService } from './services/piService.ts';
import './App.css';

/**
 * Main Dashboard: Orchestrates data flow between Backend and UI.
 * Designed for simplicity and real-time synchronization.
 */
const App: React.FC = () => {
    // Initial state with logical defaults to ensure a smooth UI on load
    const [ipoData, setIpoData] = useState<any>({
        totalInvestors: 125,
        totalPiInvested: 5000,
        userPiBalance: 10.0,
        spotPrice: 0.35,
        history: [
            { day: 1, price: 0.350 },
            { day: 2, price: 0.410 },
            { day: 3, price: 0.436 }
        ] 
    });

    /**
     * Pulls latest metrics from the Backend (Port 3001).
     */
    const refreshData = async () => {
        try {
            const data = await piService.getIpoStatus();
            setIpoData(data);
        } catch (error) {
            console.error("Dashboard failed to sync with backend.");
        }
    };

    // Auto-refresh hook: Updates dashboard every 15 seconds
    useEffect(() => {
        refreshData();
        const interval = setInterval(refreshData, 15000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="app-wrapper">
            <header className="navbar">
                <h1>MapCapIPO</h1>
            </header>

            <main className="content">
                {/* Visualizing price trends - Now visible from start */}
                <section className="top-section">
                    <IpoChart data={ipoData.history} />
                </section>

                {/* Core IPO Metrics Display */}
                <section className="middle-section">
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        spotPrice={ipoData.spotPrice}
                    />
                </section>

                {/* Triggering On-chain actions */}
                <section className="bottom-section">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </section>
            </main>
        </div>
    );
};

export default App;
