import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import StatsBoard from './components/StatsBoard.tsx';
import IpoChart from './components/IpoChart.tsx';
import ActionButtons from './components/ActionButtons.tsx';
import { piService } from './services/piService.ts';
import './App.css';

const App: React.FC = () => {
    // Initial state matching on-chain data structure
    const [ipoData, setIpoData] = useState({
        username: "Pioneer",
        totalInvestors: 0,
        totalPiInvested: 0,
        userPiInvested: 0, 
        capitalGain: 0,
        history: [] 
    });

    // Sync with Pi Network Sandbox / Backend
    const refreshData = async () => {
        try {
            const data = await piService.getIpoStatus();
            setIpoData(prev => ({ ...prev, ...data }));
        } catch (error) {
            console.error("On-chain sync failed");
        }
    };

    useEffect(() => { refreshData(); }, []);

    return (
        <div className="min-h-screen bg-[#f4f1ea] flex flex-col">
            <Navbar username={ipoData.username} onRefresh={refreshData} />

            <main className="w-full max-w-[480px] mx-auto pt-[90px] flex flex-col gap-2 pb-10">
                
                {/* Visualizing MapCap Spot-price trend */}
                <IpoChart data={ipoData.history} />

                {/* MapCap Performance Statistics Card */}
                <div className="px-4">
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        userPiInvested={ipoData.userPiInvested} 
                        capitalGain={ipoData.capitalGain}
                    />
                </div>

                {/* Transaction Controls (Invest/Withdraw) */}
                <div className="px-4 mt-2">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </div>

            </main>
        </div>
    );
};

export default App;
