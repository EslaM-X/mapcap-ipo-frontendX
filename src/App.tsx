import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import StatsBoard from './components/StatsBoard';
import IpoChart from './components/IpoChart';
import ActionButtons from './components/ActionButtons';
import { MapCapData } from './types/ipo';
import './App.css';

const App: React.FC = () => {
    const [ipoData, setIpoData] = useState<MapCapData>({
        totalInvestors: 0,
        totalPiInvested: 0,
        userPiBalance: 0,
        spotPrice: 0
    });

    /**
     * Fetch real-time IPO data from Backend
     * This fulfills the Dynamic Data requirement
     */
    useEffect(() => {
        const fetchIpoStatus = async () => {
            try {
                // Replace with your actual backend URL later
                const response = await axios.get('http://localhost:3001/api/ipo/status');
                setIpoData(response.data);
            } catch (error) {
                console.error("Failed to fetch IPO data:", error);
            }
        };

        fetchIpoStatus();
        
        // Refresh data every 30 seconds for real-time feel
        const interval = setInterval(fetchIpoStatus, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="app-wrapper">
            <header className="navbar">
                <h1>MapCapIPO app</h1>
            </header>

            <main className="content">
                <section className="top-section">
                    <IpoChart data={[]} />
                </section>

                <section className="middle-section">
                    <StatsBoard {...ipoData} />
                </section>

                <section className="bottom-section">
                    <ActionButtons />
                </section>
            </main>
        </div>
    );
};

export default App;
