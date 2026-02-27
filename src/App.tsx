import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import StatsBoard from './components/StatsBoard.tsx';
import IpoChart from './components/IpoChart.tsx';
import ActionButtons from './components/ActionButtons.tsx';
import { piService } from './services/piService.ts';
import './App.css';

/**
 * Main Application Component
 * Handles on-chain data synchronization and main layout assembly.
 */
const App: React.FC = () => {
    // IPO data state initialized with default values for early rendering
    const [ipoData, setIpoData] = useState({
        username: "Pioneer",
        totalInvestors: 125,
        totalPiInvested: 4850.00,
        userPiInvested: 50.00, 
        capitalGain: 445.269,
        history: [] 
    });

    /**
     * Fetches the latest IPO status from the backend/piService
     * Ensures UI is reactive to on-chain transaction changes
     */
    const refreshData = async () => {
        try {
            const data = await piService.getIpoStatus();
            setIpoData(prev => ({ ...prev, ...data }));
        } catch (error) {
            console.error("Blockchain synchronization failed:", error);
        }
    };

    // Initial data fetch on component mount
    useEffect(() => { refreshData(); }, []);

    return (
        /* Viewport wrapper with consistent Pi Network background color */
        <div className="min-h-screen bg-[#f4f1ea] flex flex-col items-center overflow-x-hidden">
            
            {/* 1. Navigation Layer: Persistent top bar with user identity */}
            <Navbar username={ipoData.username} onRefresh={refreshData} />

            {/* 2. Primary Layout Container:
                - pt-[100px] ensures content starts below the fixed Navbar
                - items-center forces all children to be horizontally centered
                - space-y-6 provides clean vertical breathing room between modules
            */}
            <main className="w-full max-w-[450px] pt-[100px] flex flex-col items-center px-4 pb-16 space-y-6">
                
                {/* Visual Data Module: Market price trends */}
                <div className="w-full flex justify-center">
                    <IpoChart data={ipoData.history} />
                </div>

                {/* Analytical Module: Real-time investment metrics */}
                <div className="w-full">
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        userPiInvested={ipoData.userPiInvested} 
                        capitalGain={ipoData.capitalGain}
                    />
                </div>

                {/* Interaction Module: Financial transaction gateway */}
                <div className="w-full">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </div>

            </main>
        </div>
    );
};

export default App;
