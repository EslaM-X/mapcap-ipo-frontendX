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
            console.error("Sync failed");
        }
    };

    useEffect(() => { refreshData(); }, []);

    return (
        <div className="app-wrapper min-h-screen bg-[#f4f1ea]">
            {/* النيفبار ثابت في الأعلى */}
            <Navbar username={ipoData.username} onRefresh={refreshData} />

            {/* الحاوية الرئيسية مضبوطة لتطابق عرض شاشة الموبايل في الصورة */}
            <main className="content pt-[85px] max-w-[450px] mx-auto w-full flex flex-col items-center">
                
                {/* قسم الشارت: تم إزالة العناوين المكررة والـ padding الزائد 
                   لأن المكون IpoChart أصبح يحتوي على بروازه وعنوانه الخاص
                */}
                <div className="w-full">
                    <IpoChart data={ipoData.history} />
                </div>

                {/* قسم الإحصائيات: تم إزالة العناوين المكررة 
                   لأن المكون StatsBoard يحتوي داخله على العنوان والبرواز الدائري
                */}
                <div className="w-full">
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        userPiInvested={ipoData.userPiInvested} 
                        capitalGain={ipoData.capitalGain}
                    />
                </div>

                {/* قسم الأزرار: كما هو لضمان عمل الـ Transaction */}
                <div className="w-full px-4 mt-2">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </div>

            </main>
        </div>
    );
};

export default App;
