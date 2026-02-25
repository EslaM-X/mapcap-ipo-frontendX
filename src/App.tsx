import React, { useState, useEffect } from 'react';
import StatsBoard from './components/StatsBoard';
import IpoChart from './components/IpoChart';
import ActionButtons from './components/ActionButtons';
import { MapCapData } from './types/ipo';
import './App.css';

/**
 * Main Application Component.
 * Manages IPO state and layout structure as per Page 3 specs.
 */
const App: React.FC = () => {
    // Initial state based on Page 4 status requirements
    const [ipoData, setIpoData] = useState<MapCapData>({
        totalInvestors: 0,
        totalPiInvested: 0,
        userPiBalance: 0,
        spotPrice: 0
    });

    return (
        <div className="app-wrapper">
            {/* Header: Green bar with gold text (Page 3) */}
            <header className="navbar">
                <h1>MapCapIPO app</h1>
            </header>

            <main className="content">
                {/* Top Section: Price Graph (Page 4) */}
                <section className="top-section">
                    <IpoChart data={[]} />
                </section>

                {/* Middle Section: Dashboard Stats (Page 4) */}
                <section className="middle-section">
                    <StatsBoard {...ipoData} />
                </section>

                {/* Bottom Section: Invest/Withdraw Buttons (Page 4) */}
                <section className="bottom-section">
                    <ActionButtons />
                </section>
            </main>
        </div>
    );
};

export default App;

