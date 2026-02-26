import React, { useState, useEffect } from 'react';
import StatsBoard from './components/StatsBoard.tsx';
import IpoChart from './components/IpoChart.tsx';
import ActionButtons from './components/ActionButtons.tsx';
import { piService } from './services/piService.ts';
import './App.css';

const App: React.FC = () => {
    const [ipoData, setIpoData] = useState<any>({
        totalInvestors: 0,
        totalPiInvested: 0,
        userPiBalance: 0,
        spotPrice: 0.35,
        history: [] 
    });

    const refreshData = async () => {
        try {
            const data = await piService.getIpoStatus();
            setIpoData(data);
        } catch (error) {
            console.error("Dashboard sync error");
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <div className="app-wrapper">
            <header className="navbar">
                MapCapIPO
            </header>

            <main className="content">
                <section className="top-section">
                    <IpoChart data={ipoData.history} />
                </section>

                <section className="middle-section">
                    <StatsBoard 
                        totalInvestors={ipoData.totalInvestors}
                        totalPiInvested={ipoData.totalPiInvested}
                        userPiBalance={ipoData.userPiBalance} 
                        spotPrice={ipoData.spotPrice}
                    />
                </section>

                <section className="bottom-section">
                    <ActionButtons onTransactionSuccess={refreshData} />
                </section>
            </main>
        </div>
    );
};

export default App;
