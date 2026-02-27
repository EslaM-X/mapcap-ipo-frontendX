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
        <div className="min-h-screen bg-[#f4f1ea] flex flex-col">
            {/* 1. النيفبار ثابت في الأعلى */}
            <Navbar username={ipoData.username} onRefresh={refreshData} />

            {/* 2. الحاوية الرئيسية: تم ضبط الـ pt والـ gap لمنع التداخل */}
            <main className="w-full max-w-[480px] mx-auto pt-[95px] px-0 flex flex-col gap-6 pb-12">
                
                {/* قسم الشارت: يُعرض مباشرة بدون Section خارجي */}
                <div className="w-full">
                    <IpoChart data={ipoData.history} />
                </div>

                {/* قسم الإحصائيات: يُعرض بداخل مسافة جانبية (px-4) */}
                <div className="w-full px-4">
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        userPiInvested={ipoData.userPiInvested} 
                        capitalGain={ipoData.capitalGain}
                    />
                </div>

                {/* قسم الأزرار: أسفل الإحصائيات مباشرة */}
                <div className="w-full px-4">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </div>

            </main>
        </div>
    );
};

export default App;
