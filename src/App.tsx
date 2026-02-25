import React, { useState, useEffect } from 'react';
// Explicit extensions for Termux resolution
import StatsBoard from './components/StatsBoard.tsx';
import IpoChart from './components/IpoChart.tsx';
import ActionButtons from './components/ActionButtons.tsx';
import { piService } from './services/piService.ts';
import './App.css';

/**
 * MapCap IPO Dashboard - MVP.
 * Simple, maintainable UI integrated with Pi Blockchain Sandbox.
 */
const App: React.FC = () => {
    const [ipoData, setIpoData] = useState<any>({
        totalInvestors: 0,
        totalPiInvested: 0,
        userPiBalance: 0,
        spotPrice: 0,
        history: [] 
    });

    /**
     * Syncs local state with Backend metrics.
     */
    const refreshData = async () => {
        try {
            const data = await piService.getIpoStatus();
            setIpoData(data);
        } catch (error) {
            console.error("Dashboard sync failed");
        }
    };

    // Auto-refresh ensures real-time price movement during Demo
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
                {/* Visualizing price growth curve */}
                <section className="top-section">
                    <IpoChart data={ipoData.history} />
                </section>

                {/* Core IPO Metrics - Real-time stats */}
                <section className="middle-section">
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        spotPrice={ipoData.spotPrice}
                    />
                </section>

                {/* On-chain interactions */}
                <section className="bottom-section">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </section>
            </main>
        </div>
    );
};

export default App;
