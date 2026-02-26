import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsBoard from './components/StatsBoard';
import IpoChart from './components/IpoChart';
import ActionButtons from './components/ActionButtons';
import { piService } from './services/piService';
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

    // Sync UI with On-chain data from Backend
    const refreshData = async () => {
        setLoading(true);
        try {
            const data = await piService.getIpoStatus();
            setIpoData(prev => ({ ...prev, ...data }));
        } catch (error) {
            console.error("Sync failed: Check backend connectivity");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar 
                username={ipoData.username} 
                onRefresh={refreshData} 
            />

            <main className="flex-grow flex flex-col p-4 space-y-6 max-w-md mx-auto w-full">
                
                {/* Visualizing Market Performance */}
                <section className="h-64 bg-white rounded-lg shadow-sm border border-gray-50 p-2">
                    <IpoChart data={ipoData.history} />
                </section>

                {/* Real-time IPO Metrics */}
                <section className="py-2 border-t border-b border-gray-100">
                    <h2 className="text-[#007a33] font-bold text-sm mb-3">MapCap IPO Statistics:</h2>
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        userPiInvested={ipoData.userPiInvested} 
                        capitalGain={ipoData.capitalGain}
                    />
                </section>

                {/* Transaction Controls */}
                <section className="pb-6">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </section>

            </main>
        </div>
    );
};

export default App;
