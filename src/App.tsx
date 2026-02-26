import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsBoard from './components/StatsBoard';
import IpoChart from './components/IpoChart';
import ActionButtons from './components/ActionButtons';
import { piService } from './services/piService';
import './App.css';

/**
 * Main MapCapIPO Application Container
 * Aligned with Philip Jennings' Spec [Page 8]
 */
const App: React.FC = () => {
    // Standardizing state according to Use Case requirements
    const [ipoData, setIpoData] = useState({
        username: "Pioneer", // Placeholder for Pi SDK Auth
        totalInvestors: 0,
        totalPiInvested: 0,
        userPiInvested: 0, 
        capitalGain: 0,
        history: [] 
    });

    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Logic: Blockchain Sync
     * Fetches real-time IPO metrics from the Backend/On-chain
     */
    const refreshData = async () => {
        setLoading(true);
        try {
            const data = await piService.getIpoStatus();
            setIpoData(prev => ({ ...prev, ...data }));
        } catch (error) {
            console.error("Dashboard sync error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* 1. Standardized Green Navbar (Philip's Primary Requirement) */}
            <Navbar 
                username={ipoData.username} 
                onRefresh={refreshData} 
            />

            {/* 2. Main Content Area - Split into 3 Clear Sections [Page 8] */}
            <main className="flex-grow flex flex-col p-4 space-y-6 max-w-md mx-auto w-full">
                
                {/* SECTION 1: MapCap Spot-price Graph */}
                <section className="h-64 bg-white rounded-lg shadow-sm border border-gray-50 p-2">
                    <IpoChart data={ipoData.history} />
                </section>

                {/* SECTION 2: MapCap IPO Statistics */}
                <section className="py-2 border-t border-b border-gray-100">
                    <h2 className="text-[#007a33] font-bold text-sm mb-3">MapCap IPO Statistics:</h2>
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        userPiInvested={ipoData.userPiInvested} 
                        capitalGain={ipoData.capitalGain}
                    />
                </section>

                {/* SECTION 3: Action Buttons (Invest/Withdraw) */}
                <section className="pb-6">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </section>

            </main>
        </div>
    );
};

export default App;
