import React from 'react';

interface StatsProps {
    totalInvestors: number;
    totalPiInvested: number;
    userPiBalance: number;
    spotPrice: number;
}

/**
 * Enhanced StatsBoard with Null-safety.
 * Prevents white screen by providing default values during initial fetch.
 */
const StatsBoard: React.FC<StatsProps> = ({ 
    totalInvestors = 0, 
    totalPiInvested = 0, 
    userPiBalance = 0, 
    spotPrice = 0.35 
}) => {
    
    // Fallback logic to ensure numbers never break the UI
    const initialPrice = 0.35;
    const currentPrice = spotPrice || initialPrice;
    const safeBalance = userPiBalance || 0;
    
    const capitalGain = safeBalance > 0 
        ? ((currentPrice - initialPrice) / initialPrice * 100).toFixed(2)
        : "0.00";

    return (
        <div className="stats-card">
            <h3 className="stats-header">MapCap IPO Statistics:</h3>
            <ul className="stats-list">
                <li>Total investors to date: <b>{(totalInvestors || 0).toLocaleString()}</b></li>
                <li>Total pi invested to date: <b>{(totalPiInvested || 0).toLocaleString()} π</b></li>
                <li>Your pi invested to date: <b>{safeBalance.toLocaleString()} π</b></li>
                <li>Your capital gain to date: <span className="gain-text">+{capitalGain}%</span></li>
            </ul>
        </div>
    );
};

export default StatsBoard;
