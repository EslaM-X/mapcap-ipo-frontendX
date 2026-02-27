import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import StatsBoard from './components/StatsBoard.tsx';
import IpoChart from './components/IpoChart.tsx';
import ActionButtons from './components/ActionButtons.tsx';
import { piService } from './services/piService.ts';
import './App.css';

const App: React.FC = () => {
    const [ipoData, setIpoData] = useState({
        username: "Pioneer",
        totalInvestors: 0,
        totalPiInvested: 0,
        userPiInvested: 0, 
        capitalGain: 0,
        history: [] 
    });

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
        <div className="min-h-screen bg-[#f4f1ea] flex flex-col items-center">
            {/* Navigation Layer */}
            <Navbar username={ipoData.username} onRefresh={refreshData} />

            {/* Main Content Layer - Optimized for Mobile Viewport */}
            <main className="w-full max-w-[480px] pt-[85px] flex flex-col pb-12">
                
                {/* 1. Market Chart - Full Width to prevent text overlap */}
                <IpoChart data={ipoData.history} />

                {/* 2. Statistics Section - Rounded Container */}
                <div className="px-4">
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        userPiInvested={ipoData.userPiInvested} 
                        capitalGain={ipoData.capitalGain}
                    />
                </div>

                {/* 3. User Actions Layer */}
                <div className="px-4 mt-4">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </div>

            </main>
        </div>
    );
};

export default App;
