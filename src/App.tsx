import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import StatsBoard from './components/StatsBoard.tsx';
import IpoChart from './components/IpoChart.tsx';
import ActionButtons from './components/ActionButtons.tsx';
import { piService } from './services/piService.ts';
import './App.css';

/**
 * Main Application Component - Map of Pi Ecosystem.
 * Orchestrates global state and ensures seamless UI/UX synchronization.
 */
const App: React.FC = () => {
    // IPO data state - Initialized with default values for immediate hydration
    const [ipoData, setIpoData] = useState({
        username: "Pioneer",
        totalInvestors: 125,
        totalPiInvested: 4850.00,
        userPiInvested: 50.00, 
        capitalGain: 445.269,
        history: [] 
    });

    /**
     * Synchronizes local state with backend/on-chain data via piService.
     * Triggered on mount, manual refresh, and successful transactions.
     */
    const refreshData = async () => {
        try {
            const data = await piService.getIpoStatus();
            setIpoData(prev => ({ ...prev, ...data }));
        } catch (error) {
            console.warn("Blockchain synchronization warning:", error);
            // Fallback logic or error handling can be placed here
        }
    };

    // Auto-sync on component mount
    useEffect(() => { 
        refreshData(); 
    }, []);

    return (
        /* The 'app-wrapper' class from App.css handles the global padding-top
           to prevent the fixed Navbar from covering the main content.
        */
        <div className="app-wrapper min-h-screen bg-[#f4f1ea] flex flex-col items-center">
            
            {/* 1. Header Navigation: Persistent across all views */}
            <Navbar username={ipoData.username} onRefresh={refreshData} />

            {/* Main Content Layer: 
               - pt-[20px] provides spacing below the global padding-top.
               - space-y-4 ensures a tight, professional mobile layout.
            */}
            <main className="w-full max-w-[480px] pt-4 flex flex-col items-center px-4 pb-12 space-y-4">
                
                {/* 2. Market Analytics: Real-time Price Chart */}
                <section className="w-full chart-section">
                    <IpoChart data={ipoData.history} />
                </section>

                {/* 3. Performance Metrics: Stats Dashboard */}
                <section className="w-full">
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        userPiInvested={ipoData.userPiInvested} 
                        capitalGain={ipoData.capitalGain}
                    />
                </section>

                {/* 4. Financial Gateway: Investment & Withdrawal Controls */}
                <section className="w-full">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </section>

            </main>
        </div>
    );
};

export default App;
