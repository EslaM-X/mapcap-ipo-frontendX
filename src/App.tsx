import React, { useState, useEffect } from 'react';
import StatsBoard from './components/StatsBoard';
import IpoChart from './components/IpoChart';
import ActionButtons from './components/ActionButtons';
import { piService } from './services/piService';
import './App.css';

/**
 * MapCap IPO Dashboard - MVP.
 * Focus: Simple, maintainable UI synced with Pi Blockchain backend.
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
     * Synchronizes local state with backend metrics.
     */
    const refreshData = async () => {
        try {
            const data = await piService.getIpoStatus();
            setIpoData(data);
        } catch (error) {
            console.error("Dashboard sync failed");
        }
    };

    // Auto-refresh ensures the user sees price movements during the Demo
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

                {/* On-chain interactions: U2A Invest / A2U Withdraw */}
                <section className="bottom-section">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </section>
            </main>
        </div>
    );
};

export default App;
