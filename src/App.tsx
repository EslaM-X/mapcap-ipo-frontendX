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
        totalPiInvested: 4900,
        userPiInvested: 50, 
        capitalGain: 445.269,
        history: [] 
    });

    const refreshData = async () => {
        try {
            const data = await piService.getIpoStatus();
            setIpoData(prev => ({ ...prev, ...data }));
        } catch (error) {
            console.error("Sync failed");
        }
    };

    useEffect(() => { refreshData(); }, []);

    return (
        <div className="app-wrapper min-h-screen bg-[#f4f1ea]">
            <Navbar username={ipoData.username} onRefresh={refreshData} />

            <main className="content pt-[95px] px-4 pb-12 max-w-[420px] mx-auto w-full space-y-5">
                
                <section className="bg-white rounded-xl shadow-sm border border-[#d1cfc8] p-3">
                    <h3 className="text-center font-bold text-[#444] text-[13px] mb-3 uppercase tracking-tight">
                        MapCap Spot-price
                    </h3>
                    <div className="h-[220px] w-full">
                        <IpoChart data={ipoData.history} />
                    </div>
                </section>

                <section className="bg-[#f9f7f0] rounded-[24px] shadow-sm border border-[#e0ddd5] p-6">
                    <h2 className="text-[#007a33] font-bold text-[14px] mb-4 uppercase">
                        MapCap IPO Statistics:
                    </h2>
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        userPiInvested={ipoData.userPiInvested} 
                        capitalGain={ipoData.capitalGain}
                    />
                </section>

                <section className="w-full">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </section>

            </main>
        </div>
    );
};

export default App;
