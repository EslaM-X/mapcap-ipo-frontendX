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

    const [loading, setLoading] = useState<boolean>(false);

    const refreshData = async () => {
        setLoading(true);
        try {
            const data = await piService.getIpoStatus();
            setIpoData(prev => ({ 
                ...prev, 
                ...data,
                userPiInvested: data.userPiBalance || 0,
                capitalGain: data.spotPrice || 0
            }));
        } catch (error) {
            console.error("Dashboard synchronization failed.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <div className="app-wrapper min-h-screen bg-[#f4f1ea]">
            <Navbar username={ipoData.username} onRefresh={refreshData} />

            <main className="content pt-[90px] p-4 space-y-6 max-w-md mx-auto w-full">
                
                <section className="chart-container bg-white rounded-xl shadow-sm border border-gray-100 p-2">
                    <h3 className="text-center font-bold text-gray-700 text-sm mb-2">MapCap Spot-price</h3>
                    <div className="h-64">
                        <IpoChart data={ipoData.history} />
                    </div>
                </section>

                <section className="stats-container bg-[#f9f7f0] rounded-2xl shadow-sm border border-[#e0e0e0] p-5">
                    <h2 className="text-[#007a33] font-bold text-sm mb-4 uppercase tracking-wider">
                        MapCap IPO Statistics
                    </h2>
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        userPiInvested={ipoData.userPiInvested} 
                        capitalGain={ipoData.capitalGain}
                    />
                </section>

                <section className="actions-footer pb-10">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </section>

            </main>
        </div>
    );
};

export default App;
