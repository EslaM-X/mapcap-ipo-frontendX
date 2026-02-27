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
        totalInvestors: 125,
        totalPiInvested: 4850.00,
        userPiInvested: 50.00, 
        capitalGain: 445.269,
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
            {/* 1. Header Layer */}
            <Navbar username={ipoData.username} onRefresh={refreshData} />

            {/* 2. Content Layer - Clean Layout without redundant headings */}
            <main className="w-full max-w-[480px] pt-[95px] flex flex-col gap-6 pb-12">
                
                {/* Chart: Self-contained component with its own frame and title */}
                <IpoChart data={ipoData.history} />

                {/* Statistics: Self-contained rounded card with its own title */}
                <div className="px-4">
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        userPiInvested={ipoData.userPiInvested} 
                        capitalGain={ipoData.capitalGain}
                    />
                </div>

                {/* Action Buttons: Pi Network Integration */}
                <div className="px-4">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </div>

            </main>
        </div>
    );
};

export default App;
