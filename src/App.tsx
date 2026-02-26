import React, { useState, useEffect } from 'react';
// توجيه Webpack للمسار الصحيح المقطوع به في Termux عبر مجلد src
import Navbar from './src/components/Navbar';
import StatsBoard from './src/components/StatsBoard';
import IpoChart from './src/components/IpoChart';
import ActionButtons from './src/components/ActionButtons';
import { piService } from './src/services/piService';
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

    // Sync UI with on-chain metrics via backend API
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
            console.error("Dashboard sync failed.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <div className="app-wrapper min-h-screen bg-white">
            <Navbar username={ipoData.username} onRefresh={refreshData} />

            <main className="content p-4 space-y-6 max-w-md mx-auto w-full">
                
                {/* Visualizing real-time spot price history */}
                <section className="chart-container h-64 bg-white rounded-lg shadow-sm border border-gray-50 p-2">
                    <IpoChart data={ipoData.history} />
                </section>

                {/* MapCap IPO Key Metrics */}
                <section className="stats-card py-2 border-t border-b border-gray-100">
                    <h2 className="text-[#007a33] font-bold text-sm mb-3">MapCap IPO Statistics:</h2>
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        userPiInvested={ipoData.userPiInvested} 
                        capitalGain={ipoData.capitalGain}
                    />
                </section>

                {/* On-chain Transaction Hub */}
                <section className="actions-footer pb-6">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </section>

            </main>
        </div>
    );
};

export default App;
