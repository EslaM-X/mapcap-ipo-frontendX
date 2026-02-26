import React, { useState, useEffect } from 'react';
// استخدام المسارات الكاملة بالامتدادات لضمان التعرف عليها في بيئة Termux
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

    // Synchronize UI with blockchain metrics via backend service
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
        <div className="app-wrapper min-h-screen bg-[#f8f9fa]">
            {/* Fixed Navigation bar at the top */}
            <Navbar username={ipoData.username} onRefresh={refreshData} />

            {/* Main Content Area: Padding top adjusted for fixed Navbar */}
            <main className="content pt-[90px] p-4 space-y-6 max-w-md mx-auto w-full">
                
                {/* Real-time IPO Chart Visualization */}
                <section className="chart-container h-64 bg-white rounded-xl shadow-sm border border-gray-100 p-2">
                    <IpoChart data={ipoData.history} />
                </section>

                {/* Core On-chain Statistics Board */}
                <section className="stats-container bg-white rounded-xl shadow-sm border border-gray-100 p-4">
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

                {/* Transaction Controls (Invest/Withdraw) */}
                <section className="actions-footer pb-8">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </section>

            </main>
        </div>
    );
};

export default App;
